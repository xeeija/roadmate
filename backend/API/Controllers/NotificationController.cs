using DAL.Entities;
using Services;
using Services.Models.Request;

namespace API.Controllers;

public class NotificationController : BaseController<Notification, NotificationRequest> {
  public NotificationController(GlobalService service, IHttpContextAccessor accessor) :
    base(service.NotificationService, accessor) {
  }
}
