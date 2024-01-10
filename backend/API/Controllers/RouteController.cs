using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;
using Route = DAL.Entities.Route;

namespace API.Controllers;

public class RouteController : BaseController<Route, RouteRequest> {
  private readonly RouteService _routeService;
  private readonly IHttpContextAccessor _accessor;
  public RouteController(GlobalService service, IHttpContextAccessor accessor) : base(service.RouteService, accessor) {
    _routeService = service.RouteService;
    _accessor = accessor;
  }
  /// <summary>
  ///   Gets all Routes per User.
  /// </summary>
  /// <returns>All entities.</returns>
  [HttpGet("user")]
  public async Task<IActionResult> GetRoutesByUserId() {
    var userIdClaim = _accessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier);
    if (userIdClaim == null) {
      return BadRequest("User ID claim not found.");
    }

    var userId = Guid.Parse(userIdClaim.Value);
    var routes = await _routeService.GetRoutesByUserId(userId);
    return Ok(routes);
  }
}
