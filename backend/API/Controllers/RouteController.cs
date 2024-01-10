using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;
using Route = DAL.Entities.Route;

namespace API.Controllers;

public class RouteController : BaseController<Route, RouteRequest> {
  private readonly RouteService _routeService;
  public RouteController(GlobalService service, IHttpContextAccessor accessor) : base(service.RouteService, accessor) {
    _routeService = service.RouteService;
  }
  /// <summary>
  ///   Gets all Routes per User.
  /// </summary>
  /// <returns>All entities.</returns>
  [HttpGet("user/{userId}")]
  public async Task<IActionResult> GetRoutesByUserId(Guid userId) {
    var routes = await _routeService.GetRoutesByUserId(userId);
    return Ok(routes);
  }
}
