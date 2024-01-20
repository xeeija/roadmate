using DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;
using Services.Models.Response;

namespace API.Controllers;

[Route("api/Danger/Request")]
public class DangerRequestController : BaseController<DangerRequest, DangerRequestModel> {
  private const int createDangerThreshold = 2;
  private const int resolveDangerThreshold = 2;

  private readonly DangerRequestService dangerRequestService;
  private readonly DangerResolveRequestService dangerResolveRequestService;
  private readonly DangerService dangerService;
  private readonly NotificationService notificationService;
  private readonly UserService userService;

  public DangerRequestController(GlobalService service, IHttpContextAccessor accessor) :
    base(service.DangerRequestService, accessor) {
    dangerRequestService = service.DangerRequestService;
    dangerRequestService.LoadUser(Email).Wait();
    dangerResolveRequestService = service.DangerResolveRequestService;
    dangerResolveRequestService.LoadUser(Email).Wait();
    dangerService = service.DangerService;
    dangerService.LoadUser(Email).Wait();
    notificationService = service.NotificationService;
    notificationService.LoadUser(Email).Wait();
    userService = service.UserService;
    userService.LoadUser(Email).Wait();
  }

  [HttpPost("Create")]
  public override async Task<ActionResult<ItemResponseModel<DangerRequest>>> Create([FromBody] DangerRequestModel request) {
    // var result = await base.Create(request);
    var result = await Service.Create(request.ToEntity());

    if (!result.IsAuthorized) {
      return Forbid();
    }

    if (result.Data == null || result.HasError) {
      return BadRequest(result);
    }

    // Find any nearby danger that is pending
    // and check if the request threshold is met already

    // TODO: Filter only recent danger requests (1-2h?)
    var requestsInRange = await dangerRequestService.FindDangersInRadius(request.Lat, request.Lon, dr => dr.DangerId == null);
    Log.Debug($"requests in range: {requestsInRange.Count} ({request.Lat}, {request.Lon})");

    // Create danger if enough requests are in range
    var distinctCount = requestsInRange.DistinctBy(dr => dr.UserId).Count();

    if (distinctCount >= createDangerThreshold) {
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

      var users = await userService.GetAll();
      foreach(var item in users.Data ?? new List<User>()) {
        await notificationService.Create(new NotificationRequest {
          Description = request.Description,
          DangerId = createdDanger.Data?.ID ?? Guid.Empty,
          //Url = new Uri($"https://localhost:5001/danger/{.DangerId}"),
          UserId = item.ID,
        }.ToEntity());
      }
      
      if (result.Data != null && createdDanger.Data != null) {
        // TODO: Update many / UpdateRange -> BaseService
        foreach (var dr in requestsInRange) {
          dr.DangerId = createdDanger.Data.ID;
          await dangerRequestService.Update(result.Data);
        }
      }
    }

    return Created(result.Data?.ID.ToString() ?? "", result);
  }

  [HttpPost("Resolve")]
  public async Task<ActionResult<ItemResponseModel<DangerResolveRequest>>> Resolve([FromBody] DangerResolveRequestModel request) {
    var danger = await dangerService.Get(request.DangerId.ToString(), new List<string> { "Requests", "ResolveRequests" });

    if (!danger.IsAuthorized) {
      danger.ErrorMessages.Add("Unauthorized to resolve danger");
      return BadRequest(danger);
    }

    if (danger.HasError) {
      return BadRequest(danger);
    }

    if (danger.Data == null) {
      danger.ErrorMessages.Add("Danger is null");
      return BadRequest(danger);
    }

    // Resolve
    var result = await dangerResolveRequestService.Create(request.ToEntity());

    if (!result.IsAuthorized) {
      return Forbid();
    }

    if (result.Data == null || result.HasError) {
      return BadRequest(result);
    }

    var distinctCount = danger.Data.ResolveRequests.DistinctBy(dr => dr.UserId).Count();

    // Resolve danger
    if (distinctCount >= resolveDangerThreshold) {
      danger.Data.ResolvedAt = DateTime.UtcNow;
      await dangerService.Update(danger.Data);
    }

    return Ok(result);
  }
}
