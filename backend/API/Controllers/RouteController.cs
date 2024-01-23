using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Models.Request;
using Services.Models.Response;
using Route = DAL.Entities.Route;
using DAL.Helpers;
using Utils;
using System.Globalization;

namespace API.Controllers;

public class RouteController : BaseController<Route, RouteRequest> {
  private readonly RouteService routeService;
  private readonly HttpClient httpClient;
  private readonly string geoapifyQuery;
  public RouteController(GlobalService service, IHttpContextAccessor accessor) : base(service.RouteService, accessor) {
    routeService = service.RouteService;

    var apiKey = SettingsReader.GetSettings<string>("GEOAPIFY_API_KEY") ?? "";
    geoapifyQuery = $"format=json&lang=de&apiKey={apiKey}";

    httpClient = new HttpClient {
      BaseAddress = new Uri("https://api.geoapify.com/v1/geocode/")
    };
  }

  /// <summary>
  ///   Gets all Routes per User.
  /// </summary>
  /// <returns>All entities.</returns>
  [HttpGet("User")]
  public async Task<ActionResult<ItemResponseModel<List<Route>>>> GetRoutesByUserId() {
    if (CurrentUser?.ID == null) {
      return Forbid();
    }

    var routes = await routeService.GetRoutesByUserId(CurrentUser.ID);
    return Ok(routes.ToList());
  }

  /// <summary>
  ///   Get location autocomplete from Geoapify
  /// </summary>
  /// <returns>All entities.</returns>
  [HttpGet("Geocode/Autocomplete")]
  public async Task<ActionResult<ItemResponseModel<LocationResult>>> GetAddressAutocomplete([FromQuery(Name = "text")] string query) {
    try {
      var response = await httpClient.GetFromJsonAsync<LocationResult>($"autocomplete?text={query}&{geoapifyQuery}");
      return Ok(response);
    }
    catch {
      // return 500 response
      return StatusCode(504);
    }

  }

  /// <summary>
  ///   Get address by coordinates from Geoapify
  /// </summary>
  /// <returns>All entities.</returns>
  [HttpGet("Geocode/Reverse")]
  public async Task<ActionResult<ItemResponseModel<LocationResult>>> GetAddressByCoordinates([FromQuery] double lat, [FromQuery] double lon) {
    var latString = lat.ToString(CultureInfo.InvariantCulture);
    var lonString = lon.ToString(CultureInfo.InvariantCulture);

    try {
      var response = await httpClient.GetFromJsonAsync<LocationResult>($"reverse?lat={latString}&lon={lonString}&{geoapifyQuery}");
      return Ok(response);
    }
    catch {
      // return 500 response
      return StatusCode(504);
    }
  }
}
