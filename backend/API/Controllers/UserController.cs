using DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;
using Services.Models.Response;

namespace API.Controllers;

public class UserController : BaseController<User, RegisterRequest> {
  private readonly UserService userService;

  public UserController(GlobalService service, IHttpContextAccessor accessor) : base(service.UserService, accessor) {
    userService = service.UserService;
  }

  [NonAction]
  public override Task<ActionResult<ItemResponseModel<User>>> Create([FromBody] RegisterRequest request) {
    return base.Create(request);
  }

  #region Update

  /// <summary>
  ///   Endpoint for updating an user
  /// </summary>
  /// <param name="entity">User entity which should be updated</param>
  /// <returns></returns>
  [NonAction]
  public override async Task<ActionResult<ItemResponseModel<User>>> Update(User entity) {
    return await base.Update(entity);
  }

  /// <summary>
  ///   Endpoint to update a user.
  /// </summary>
  /// <param name="id">Id of the User</param>
  /// <param name="request">UpdateBasicUserRequest that contains the properties to be updated</param>
  /// <returns>Updated User</returns>
  [HttpPut("{id}")]
  public async Task<ActionResult<ItemResponseModel<User>>> UpdateUser(string id, [FromBody] UpdateUserRequest request) {
    var result = await userService.UpdateUser(id, request);

    if (!result.IsAuthorized) {
      return Forbid();
    }

    if (result.HasError) {
      return BadRequest(result);
    }

    return Ok(result);
  }

  /// <summary>
  ///   Endpoint to ban a user.
  /// </summary>
  /// <param name="id">Id of the User which should be banned</param>
  /// <param name="banned">Sets banned to true or false (default: true)</param>
  /// <returns>Updated User</returns>
  [HttpPut("{id}/Ban")]
  public async Task<ActionResult<ItemResponseModel<User>>> BanUser(string id, [FromBody] bool banned = true) {
    var user = await userService.Get(id);

    if (user == null || user.Data == null) {
      return NotFound(new NotFoundObjectResult(null));
    }

    user.IsAuthorized = CurrentUser.Role == Role.Admin;

    if (!user.IsAuthorized) {
      return Forbid();
    }

    user.Data.IsBanned = banned;

    var result = await userService.Update(user.Data);

    if (result.HasError) {
      return BadRequest(result);
    }

    return Ok(result);
  }

  /// <summary>
  ///   Endpoint which gets all banned user.
  /// </summary>
  /// <returns>Updated User</returns>
  [HttpGet("Banned")]
  public async Task<ActionResult<ItemResponseModel<List<User>>>> GetBannedUser() {
    var result = await userService.Filter(x => x.IsBanned);

    result.IsAuthorized = CurrentUser.Role == Role.Admin;

    if (!result.IsAuthorized) {
      return Forbid();
    }

    if (result.HasError) {
      return BadRequest(result);
    }

    return Ok(result);
  }

  #endregion
}
