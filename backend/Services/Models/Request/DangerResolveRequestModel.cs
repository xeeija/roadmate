using DAL.Entities;

namespace Services.Models.Request;

public class DangerResolveRequestModel : IRequestModel<DangerResolveRequest> {
  public Guid UserId { get; set; }
  public Guid DangerId { get; set; }
  public DateTime? Timestamp { get; set; }
  public Guid? CategoryId { get; set; }

  public DangerResolveRequest ToEntity() {
    return new DangerResolveRequest {
      Timestamp = Timestamp ?? DateTime.UtcNow,
      UserId = UserId,
      DangerId = DangerId
    };
  }
}
