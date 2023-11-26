using DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;
using Services.Models.Response;

namespace API.Controllers;

[Route("api/Danger/Request")]
public class DangerRequestController : BaseController<DangerRequest, DangerRequestModel> {

  private readonly DangerRequestService dangerRequestService;
  private readonly DangerService dangerService;

  public DangerRequestController(GlobalService service, IHttpContextAccessor accessor) :
    base(service.DangerRequestService, accessor) {
    dangerRequestService = service.DangerRequestService;
    dangerRequestService.LoadUser(Email).Wait();
    dangerService = service.DangerService;
    dangerService.LoadUser(Email).Wait();
  }

  public override async Task<ActionResult<ItemResponseModel<DangerRequest>>> Create([FromBody] DangerRequestModel request) {

    var result = await base.Create(request);


    if ((result.Value?.HasError ?? true) || !(result.Value?.IsAuthorized ?? false)) {
      return result;
    }

    // Find any nearby danger that is pending
    // and check if the request threshold is met already
    var dangerThreshold = 2;


    if (request.Type == RequestType.Create) {
      // Create
      // var dangersInRadius = await dangerRequestService.FindDangersInRadius(request.Lat, request.Lon);

      // var danger = dangersInRadius.Where(d => !d.IsActive && !d.IsResolved).FirstOrDefault();
      var danger = (await dangerRequestService.FindDangersInRadius(request.Lat, request.Lon, d => !d.IsActive && !d.IsResolved)).FirstOrDefault();

      if (danger == null) {
        result.Value.ErrorMessages.Add("Danger is null");
        return BadRequest(result.Value);
      }

      request.DangerId = danger.ID;

      // Update danger to active with current date
      if (danger.Requests.Count >= dangerThreshold - 1) {
        danger.ActiveAt = DateTime.UtcNow;
        await dangerService.Update(danger);
      }

      else {
        // Otherwise create a new pending danger

        // if (request.CategoryId == null) {
        //   result.Value.ErrorMessages.Add("CategoryID may not be null");
        //   return BadRequest(result.Value);
        // }

        var createdDanger = await dangerService.Create(new DangerModel {
          Type = DangerType.Temporary,
          Lat = request.Lat,
          Lon = request.Lon,
          CategoryId = request.CategoryId,
          Description = request.Description,
        }.ToEntity());

        if (!createdDanger.IsAuthorized) {
          createdDanger.ErrorMessages.Add("Unauthorized to create danger");
          return BadRequest(createdDanger);
        }
        if (createdDanger.HasError) {
          return BadRequest(createdDanger);
        }

        if (result.Value.Data != null && createdDanger.Data != null) {
          result.Value.Data.DangerId = createdDanger.Data.ID;
          await dangerRequestService.Update(result.Value.Data);
        }
      }

      return result;
    }
    else {
      // Resolve

      var danger = await dangerService.Get(request.DangerId.ToString() ?? "", new() { "Requests" });

      if (!danger.IsAuthorized) {
        danger.ErrorMessages.Add("Unauthorized to create danger");
        return BadRequest(danger);
      }

      if (danger.HasError) {
        return BadRequest(danger);
      }

      if (danger.Data == null) {
        result.Value.ErrorMessages.Add("Danger is null");
        return BadRequest(result.Value);
      }

      if (danger.Data.Requests.Count >= dangerThreshold - 1) {
        // Update danger to active with current date
        danger.Data.ResolvedAt = DateTime.UtcNow;
        await dangerService.Update(danger.Data);
      }

      return result;
    }
  }

}
