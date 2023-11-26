using DAL.Entities;

namespace Services.Models.Request;

public class DangerResolveRequestModel : IRequestModel<DangerRequest> {
  public Guid UserId { get; set; }
  public Guid DangerId { get; set; }
  public DateTime? Timestamp { get; set; }
  public Guid? CategoryId { get; set; }

  public DangerRequest ToEntity() {
    return new DangerRequest {
      Type = RequestType.Resolve,
      Timestamp = Timestamp ?? DateTime.UtcNow,
      UserId = UserId,
      DangerId = DangerId,
      Lat = 0,
      Lon = 0,
      Description = "",
      CategoryId = CategoryId ?? Guid.Empty
    };
  }
}
