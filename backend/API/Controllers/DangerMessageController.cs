using DAL;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;

namespace API.Controllers;

[Route("api/Danger/{dangerId}/Message")]
public class DangerMessageController : BaseController<DangerMessage, DangerMessageRequest> {
  public DangerMessageController(GlobalService service, IHttpContextAccessor accessor) :
    base(service.DangerMessageService, accessor) {
  }
}
