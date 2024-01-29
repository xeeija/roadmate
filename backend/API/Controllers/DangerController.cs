using DAL.Entities;
using Microsoft.AspNetCore.Authorization;
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
    var response = await Service.Get(id, new List<string> { "Messages", "Messages.User" });

    if (!response.IsAuthorized) {
      return Forbid();
    }

    if (response.HasError) {
      return BadRequest(response);
    }

    return response;
  }

  /// <summary>
  ///   Manually create a Danger. This should not be used usually, because Dangers are created automatically, if the DangerRequest
  ///   threshold in an area is met.
  /// </summary>
  /// <param name="request"></param>
  /// <returns></returns>
  [Authorize(Roles = "Admin")]
  public override Task<ActionResult<ItemResponseModel<Danger>>> Create([FromBody] DangerModel request) {
    return base.Create(request);
  }
}
