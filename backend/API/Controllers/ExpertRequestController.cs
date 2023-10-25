using API.Controllers;
using DAL;
using Services;
using Services.Models.Request;

namespace API;

public class ExpertRequestController : BaseController<ExpertRequest, ExpertRequestModel> {
  public ExpertRequestController(GlobalService service, IHttpContextAccessor accessor) :
    base(service.ExpertRequestService, accessor) {
  }
}
