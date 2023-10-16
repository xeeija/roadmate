using System.Security.Claims;
using DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;
using Services.Models.Response;
using Utils;
using ILogger = Serilog.ILogger;

namespace API.Controllers;

/// <summary>
///   Base controller for API endpoints.
/// </summary>
/// <typeparam name="TEntity">The entity type.</typeparam>
/// <typeparam name="TRequest">The request model type.</typeparam>
[ApiController]
[Authorize]
[Route("api/[controller]")]
[ProducesResponseType(StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
public abstract class BaseController<TEntity, TRequest> : ControllerBase
  where TEntity : Entity where TRequest : IRequestModel<TEntity> {
  protected ClaimsPrincipal ClaimsPrincipal;

  protected string Email;

  protected ILogger Log = Logger.ContextLog<BaseController<TEntity, TRequest>>();
  protected BaseService<TEntity> Service;

  /// <summary>
  ///   Initializes a new instance of the <see cref="BaseController{TEntity, TRequest}" /> class.
  /// </summary>
  /// <param name="service">The base service.</param>
  /// <param name="accessor">The HTTP context accessor.</param>
  public BaseController(BaseService<TEntity> service, IHttpContextAccessor accessor) {
    Service = service;

    if (accessor == null) {
      Log.Debug("Accessor is null");
      return;
    }

    if (accessor.HttpContext == null) {
      Log.Debug("HttpContext is null");
      return;
    }

    if (accessor.HttpContext.User == null) {
      Log.Debug("HttpContext.User is null");
      return;
    }

    ClaimsPrincipal = accessor.HttpContext.User;

    if (ClaimsPrincipal.Identity == null) {
      Log.Debug("Identity is null");
      return;
    }

    var identity = (ClaimsIdentity)ClaimsPrincipal.Identity;
    var email = identity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);

    if (email?.Value != null) {
      Email = email.Value;
      var loadUser = Service.LoadUser(Email);
      loadUser.Wait();

      CurrentUser = service.CurrentUser;
    }
    else {
      Log.Debug("Load user not possible. Email is null");
    }
  }

  public User CurrentUser { get; private set; }

  /// <summary>
  ///   Gets the entity with the specified ID.
  /// </summary>
  /// <param name="id">The ID of the entity to get.</param>
  /// <returns>The entity with the specified ID.</returns>
  [HttpGet("{id}")]
  public virtual async Task<ActionResult<ItemResponseModel<TEntity>>> Get(string id) {
    var result = await Service.Get(id);

    if (!result.IsAuthorized) {
      return Forbid();
    }

    if (result.HasError) {
      return BadRequest(result);
    }

    if (result.Data == null) {
      return NotFound(new NotFoundObjectResult(null));
    }

    return Ok(result);
  }

  /// <summary>
  ///   Gets all entities.
  /// </summary>
  /// <returns>All entities.</returns>
  [HttpGet]
  public virtual async Task<ActionResult<ItemResponseModel<List<TEntity>>>> GetAll() {
    var result = await Service.GetAll();

    if (result.HasError) {
      return BadRequest(result);
    }

    return Ok(result);
  }

  /// <summary>
  ///   Creates a new entity.
  /// </summary>
  /// <param name="request">The request model for the new entity.</param>
  /// <returns>The created entity.</returns>
  [HttpPost]
  [ProducesResponseType(StatusCodes.Status201Created)]
  public virtual async Task<ActionResult<ItemResponseModel<TEntity>>> Create([FromBody] TRequest request) {
    var entity = request.ToEntity();
    var result = await Service.Create(entity);

    if (!result.IsAuthorized) {
      return Forbid();
    }

    if (result.HasError) {
      return BadRequest(result);
    }

    return Created(entity.ID.ToString(), result);
  }

  /// <summary>
  ///   Updates an existing entity.
  /// </summary>
  /// <param name="entity">The updated entity.</param>
  /// <returns>The updated entity.</returns>
  [HttpPut("{id}")]
  public virtual async Task<ActionResult<ItemResponseModel<TEntity>>> Update([FromBody] TEntity entity) {
    var result = await Service.Update(entity);

    if (!result.IsAuthorized) {
      return Forbid();
    }

    if (result.HasError) {
      return BadRequest(result);
    }

    return Ok(result);
  }

  /// <summary>
  ///   Deletes an entity with the specified ID.
  /// </summary>
  /// <param name="id">The ID of the entity to delete.</param>
  /// <returns>The result of the delete operation.</returns>
  [HttpDelete("{id}")]
  public virtual async Task<ActionResult<ItemResponseModel<TEntity>>> Delete(string id) {
    var result = await Service.Delete(id);

    if (!result.IsAuthorized) {
      return Forbid();
    }

    if (result.HasError) {
      return BadRequest(result);
    }

    return Ok(result);
  }
}
