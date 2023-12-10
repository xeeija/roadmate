using DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;
using Services.Models.Response;

namespace API.Controllers;

public class DangerCategoryController : BaseController<DangerCategory, DangerCategoryRequest> {
  public DangerCategoryController(GlobalService service, IHttpContextAccessor accessor) :
    base(service.DangerCategoryService, accessor) {
  }

  [Authorize(Roles = "Admin")]
  public override Task<ActionResult<ItemResponseModel<DangerCategory>>> Update([FromBody] DangerCategory entity) {
    return base.Update(entity);
  }

  [Authorize(Roles = "Admin")]
  public override Task<ActionResult<ItemResponseModel<DangerCategory>>> Delete(string id) {
    return base.Delete(id);
  }
}
