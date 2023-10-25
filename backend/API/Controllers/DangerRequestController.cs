using DAL;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;

namespace API.Controllers;

[Route("api/Danger/Request")]
public class DangerRequestController : BaseController<DangerRequest, DangerRequestModel> {
  public DangerRequestController(GlobalService service, IHttpContextAccessor accessor) :
    base(service.DangerRequestService, accessor) {
  }
}
