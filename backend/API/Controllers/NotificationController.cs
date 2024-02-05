using DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;
using Services.Models.Response;

namespace API.Controllers;

public class NotificationController : BaseController<Notification, NotificationRequest> {
  public NotificationController(GlobalService service, IHttpContextAccessor accessor) :
    base(service.NotificationService, accessor) {
  }

  /// <summary>
  ///   Manually create a Notification. This should not be used, as Notifications are generated automatically in other
  ///   controllers/services.
  /// </summary>
  /// <param name="request"></param>
  /// <returns></returns>
  [Authorize(Roles = "Admin")]
  public override Task<ActionResult<ItemResponseModel<Notification>>> Create([FromBody] NotificationRequest request) {
    return base.Create(request);
  }

  [Authorize(Roles = "Admin")]
  public override Task<ActionResult<ItemResponseModel<Notification>>> Delete(string id) {
    return base.Delete(id);
  }

  [HttpGet("WithDanger")]
  public async Task<ActionResult<ItemResponseModel<List<Notification>>>> GetWithDanger() {
    var response = await Service.GetAll(new List<string> { "Danger", "Route" });

    if (!response.IsAuthorized) {
      return Forbid();
    }

    if (response.HasError) {
      return BadRequest(response);
    }

    return response;
  }
}
