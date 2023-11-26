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

    // var result = await base.Create(request);
    var result = await Service.Create(request.ToEntity());

    if (!result.IsAuthorized) {
      return Forbid();
    }

    if (result == null || result.Data == null || result.HasError) {
      return BadRequest(result);
    }

    // Find any nearby danger that is pending
    // and check if the request threshold is met already
    var dangerThreshold = 2;


    if (request.Type == RequestType.Create) {
      // Create
      // var dangersInRadius = await dangerRequestService.FindDangersInRadius(request.Lat, request.Lon);

      // var danger = dangersInRadius.Where(d => !d.IsActive && !d.IsResolved).FirstOrDefault();

      // TODO: Filter only recent danger requests (1-2h?)
      var requestsInRange = await dangerRequestService.FindDangersInRadius(request.Lat, request.Lon, dr => dr.DangerId == null);
      Log.Debug($"requests in range: {requestsInRange.Count} ({request.Lat}, {request.Lon})");

      // if (danger == null) {
      //   result.Value.ErrorMessages.Add("Danger is null");
      //   return BadRequest(result.Value);
      // }

      // request.DangerId = danger.ID;

      // Create danger if enough requests are in range
      var distinctCount = requestsInRange.DistinctBy(dr => dr.UserId).Count();

      if (distinctCount >= dangerThreshold) {
        //   danger.ActiveAt = DateTime.UtcNow;
        //   await dangerService.Update(danger);
        // }

        // else {

        // Otherwise create a new pending danger

        // if (request.CategoryId == null) {
        //   result.Value.ErrorMessages.Add("CategoryID may not be null");
        //   return BadRequest(result.Value);
        // }

        var createdDanger = await dangerService.Create(new DangerModel {
          Type = DangerType.Temporary,
          // TODO: Middle point of all requests? Centroid or mean of coordinates maybe
          Lat = request.Lat,
          Lon = request.Lon,
          // TODO: Category modal (most occurences)?
          CategoryId = request.CategoryId,
          Description = request.Description,
          ActiveAt = DateTime.UtcNow
        }.ToEntity());

        if (!createdDanger.IsAuthorized) {
          createdDanger.ErrorMessages.Add("Unauthorized to create danger");
          return BadRequest(createdDanger);
        }
        if (createdDanger.HasError) {
          return BadRequest(createdDanger);
        }

        if (result?.Data != null && createdDanger.Data != null) {

          // result.Value.Data.DangerId = createdDanger.Data.ID;
          // await dangerRequestService.Update(result.Value.Data);

          // TODO: Update many / UpdateRange -> BaseService
          foreach (var dr in requestsInRange) {
            dr.DangerId = createdDanger.Data.ID;
            await dangerRequestService.Update(result.Data);
          }
        }
      }
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
        result?.ErrorMessages.Add("Danger is null");
        return BadRequest(result);
      }

      var resolveRequests = danger.Data.Requests.Where(dr => dr.Type == RequestType.Resolve);
      var distinctCount = resolveRequests.DistinctBy(dr => dr.UserId).Count();

      // Resolve danger
      if (distinctCount >= dangerThreshold) {
        danger.Data.ResolvedAt = DateTime.UtcNow;
        await dangerService.Update(danger.Data);
      }

    }

    return Created(result?.Data.ID.ToString() ?? "", result);

  }

}
