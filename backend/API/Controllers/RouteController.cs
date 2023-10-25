using Services;
using Services.Models.Request;
using Route = DAL.Route;

namespace API.Controllers;

public class RouteController : BaseController<Route, RouteRequest> {
  public RouteController(GlobalService service, IHttpContextAccessor accessor) : base(service.RouteService, accessor) {
  }
}
