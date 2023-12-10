using DAL.Entities;

namespace Services.Models.Request;

public class NotificationRequest : IRequestModel<Notification> {
  public string Description { get; set; }
  public Uri? Url { get; set; }
  public DateTime? ReadAt { get; set; }
  public Guid UserId { get; set; }
  public Guid RouteId { get; set; }
  public Guid DangerId { get; set; }

  public Notification ToEntity() {
    return new Notification {
      Description = Description,
      Url = Url,
      ReadAt = ReadAt,
      UserId = UserId,
      RouteId = RouteId,
      DangerId = DangerId
    };
  }
}
