using DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;
using Services.Models.Response;

namespace API.Controllers;

[Route("api/Danger/{dangerId}/Message")]
public class DangerMessageController : BaseController<DangerMessage, DangerMessageRequest> {
  public DangerMessageController(GlobalService service, IHttpContextAccessor accessor) :
    base(service.DangerMessageService, accessor) {
  }

  [HttpGet]
  public async Task<ActionResult<ItemResponseModel<List<DangerMessage>>>> GetAll(
    [FromRoute(Name = "dangerId")] Guid dangerId
  ) {
    return await Service.Filter(d => d.DangerId == dangerId);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<ItemResponseModel<DangerMessage>>> Get(
    string id,
    [FromRoute(Name = "dangerId")] Guid dangerId
  ) {
    var response = await Service.Get(id);

    if (!response.IsAuthorized) {
      return Forbid();
    }

    if (response.HasError) {
      return BadRequest(response);
    }

    if (response.Data?.DangerId != dangerId) {
      return NotFound();
    }

    return response;
  }

  [HttpPost]
  public async Task<ActionResult<ItemResponseModel<DangerMessage>>> Create(
    [FromBody] DangerMessageRequest request,
    [FromRoute(Name = "dangerId")] Guid dangerId
  ) {
    var entity = request.ToEntity();
    entity.DangerId = dangerId;

    var response = await Service.Create(entity);

    if (!response.IsAuthorized) {
      return Forbid();
    }

    if (response.HasError) {
      return BadRequest(response);
    }

    return response;
  }

  [HttpPut]
  public async Task<ActionResult<ItemResponseModel<DangerMessage>>> Update(
    [FromBody] DangerMessage entity,
    [FromRoute(Name = "dangerId")] Guid dangerId
  ) {
    var response = await Service.Get(entity.ID.ToString());

    if (response.Data?.DangerId != dangerId) {
      return NotFound();
    }

    return await base.Update(entity);
  }

  [HttpDelete]
  public async Task<ActionResult<ItemResponseModel<DangerMessage>>> Delete(
    string id,
    [FromRoute(Name = "dangerId")] Guid dangerId
  ) {
    var response = await Service.Get(id);

    if (response.Data?.DangerId != dangerId) {
      return NotFound();
    }

    return await base.Delete(id);
  }

  #region Disable Base

  [NonAction]
  public override Task<ActionResult<ItemResponseModel<DangerMessage>>> Get(string id) {
    return base.Get(id);
  }

  [NonAction]
  public override Task<ActionResult<ItemResponseModel<List<DangerMessage>>>> GetAll() {
    return base.GetAll();
  }

  [NonAction]
  public override Task<ActionResult<ItemResponseModel<DangerMessage>>> Create([FromBody] DangerMessageRequest request) {
    return base.Create(request);
  }

  [NonAction]
  public override Task<ActionResult<ItemResponseModel<DangerMessage>>> Update([FromBody] DangerMessage entity) {
    return base.Update(entity);
  }

  [NonAction]
  public override Task<ActionResult<ItemResponseModel<DangerMessage>>> Delete(string id) {
    return base.Delete(id);
  }

  #endregion
}
