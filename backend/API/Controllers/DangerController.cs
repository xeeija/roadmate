using DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;
using Services.Models.Response;

namespace API.Controllers;

public class DangerController : BaseController<Danger, DangerModel> {
  public DangerController(GlobalService service, IHttpContextAccessor accessor) :
    base(service.DangerService, accessor) {
  }

  [HttpGet("{id}/WithMessages")]
  public async Task<ActionResult<ItemResponseModel<Danger>>> GetWithMessages(string id) {
    var response = await Service.Get(id, new List<string> { "Messages" });

    if (!response.IsAuthorized) {
      return Forbid();
    }

    if (response.HasError) {
      return BadRequest(response);
    }

    return response;
  }
}
