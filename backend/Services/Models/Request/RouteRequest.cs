using DAL.Entities;

namespace Services.Models.Request;

public class RouteRequest : IRequestModel<Route> {
  public Guid UserId { get; set; }
  public string Name { get; set; }
  public double FromLat { get; set; }
  public double FromLon { get; set; }
  public double ToLat { get; set; }
  public double ToLon { get; set; }
  public string? FromAddressName { get; set; }
  public string? ToAddressName { get; set; }

  public bool NotificationEnabled { get; set; }

  public Route ToEntity() {
    return new Route {
      UserId = UserId,
      Name = Name,
      FromLat = FromLat,
      FromLon = FromLon,
      ToLat = ToLat,
      ToLon = ToLon,
      FromAddressName = FromAddressName,
      ToAddressName = ToAddressName,
      NotificationEnabled = NotificationEnabled
    };
  }
}
