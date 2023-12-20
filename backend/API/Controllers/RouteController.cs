using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;
using Route = DAL.Entities.Route;

namespace API.Controllers;

public class RouteController : BaseController<Route, RouteRequest> {
  public RouteController(GlobalService service, IHttpContextAccessor accessor) : base(service.RouteService, accessor) {
  }
  [HttpGet("user/{userId}")]
  public async Task<ActionResult<List<Route>>> GetAllUserRoutes(string userId) {
    var routes = await RouteService.GetUserRoutes(userId);

    if (routes == null) {
      return NotFound();
    }

    return Ok(routes);
  }
}
