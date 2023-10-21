using API.Controllers;
using DAL;
using Services;
using Services.Models.Request;

namespace API;

public class NotificationController : BaseController<Notification, NotificationRequest> {
  public NotificationController(GlobalService service, IHttpContextAccessor accessor) :
    base(service.NotificationService, accessor) {
  }
}
