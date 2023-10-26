using DAL.Entities;
using Services;
using Services.Models.Request;

namespace API.Controllers;

public class DangerController : BaseController<Danger, DangerModel> {
  public DangerController(GlobalService service, IHttpContextAccessor accessor) :
    base(service.DangerService, accessor) {
  }
}
