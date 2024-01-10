using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;
using Services.Models.Response;
using Route = DAL.Entities.Route;

namespace API.Controllers;

public class RouteController : BaseController<Route, RouteRequest> {
  private readonly RouteService routeService;
  public RouteController(GlobalService service, IHttpContextAccessor accessor) : base(service.RouteService, accessor) {
    routeService = service.RouteService;
  }
  /// <summary>
  ///   Gets all Routes per User.
  /// </summary>
  /// <returns>All entities.</returns>
  [HttpGet("User")]
  public async Task<ActionResult<ItemResponseModel<List<Route>>>> GetRoutesByUserId() {
    if (CurrentUser?.ID == null) {
      return Forbid();
    }

    var routes = await routeService.GetRoutesByUserId(CurrentUser.ID);
    return Ok(routes.ToList());
  }
}
