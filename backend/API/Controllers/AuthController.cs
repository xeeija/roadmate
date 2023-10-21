using API.Controllers;
using DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;
using Services.Models.Response;

namespace API;

public class AuthController : BaseController<User, RegisterRequest> {
  private readonly ExpertRequestService expertRequestService;
  private readonly UserService userService;

  public AuthController(GlobalService service, IHttpContextAccessor accessor) : base(service.UserService, accessor) {
    userService = service.UserService;
    expertRequestService = service.ExpertRequestService;
  }

  #region Login/Register

  /// <summary>
  ///   Endpoint to login an user.
  /// </summary>
  /// <param name="request">Represents the login request for an user.</param>
  /// <returns>Returns the response information with user.</returns>
  [HttpPost("Login")]
  [AllowAnonymous]
  public async Task<ActionResult<ItemResponseModel<UserResponse>>> Login([FromBody] LoginRequest request) {
    var result = await userService.Login(request);

    if (result.HasError) {
      return BadRequest(result);
    }

    return Ok(result);
  }

  /// <summary>
  ///   Endpoint to register a new user in database.
  /// </summary>
  /// <param name="request">Represents request for an new basic user.</param>
  /// <returns>Returns the response information with user.</returns>
  [HttpPost("Register")]
  [AllowAnonymous]
  [ProducesResponseType(StatusCodes.Status201Created)]
  public async Task<ActionResult<ItemResponseModel<UserResponse>>> Register([FromBody] RegisterRequest request) {
    var registerResult = await userService.Register(request);

    if (registerResult.HasError) {
      return BadRequest(registerResult);
    }

    var expertRequestErrors = new List<string>();

    if (request.RequestExpert) {
      var expertRequest = new ExpertRequestModel {
        Description = request.ExpertDescription ?? "",
        UserId = registerResult.Data?.ID ?? Guid.Empty
      };

      var response = await expertRequestService.Create(expertRequest.ToEntity());

      if (response.HasError || !response.IsAuthorized) {
        Log.Warning($"Failed to create ExpertRequest: ${string.Join("\n", response.ErrorMessages)}");
        expertRequestErrors = response.ErrorMessages;
      }
    }

    var loginRequest = new LoginRequest(request.Email, request.Password);

    var loginResult = await userService.Login(loginRequest);
    if (loginResult.HasError) {
      return BadRequest(loginResult);
    }

    loginResult.ErrorMessages.AddRange(expertRequestErrors);

    return Created(loginResult?.Data?.User?.ID.ToString() ?? "", loginResult);
  }

  #endregion

  #region Disable Crud

  [NonAction]
  public override Task<ActionResult<ItemResponseModel<User>>> Get(string id) {
    return base.Get(id);
  }

  [NonAction]
  public override Task<ActionResult<ItemResponseModel<List<User>>>> GetAll() {
    return base.GetAll();
  }

  [NonAction]
  public override Task<ActionResult<ItemResponseModel<User>>> Create([FromBody] RegisterRequest request) {
    return base.Create(request);
  }

  [NonAction]
  public override Task<ActionResult<ItemResponseModel<User>>> Update([FromBody] User entity) {
    return base.Update(entity);
  }

  [NonAction]
  public override Task<ActionResult<ItemResponseModel<User>>> Delete(string id) {
    return base.Delete(id);
  }

  #endregion
}
