using DAL.Entities;
using Services;
using Services.Models.Request;

namespace API.Controllers;

public class ExpertRequestController : BaseController<ExpertRequest, ExpertRequestModel> {
  public ExpertRequestController(GlobalService service, IHttpContextAccessor accessor) :
    base(service.ExpertRequestService, accessor) {
  }
}
