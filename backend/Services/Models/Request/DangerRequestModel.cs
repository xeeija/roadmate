using DAL;

namespace Services.Models.Request;

public class DangerRequestModel : IRequestModel<DangerRequest> {
  public RequestType Type { get; set; }
  public DateTime Timestamp { get; set; }
  public Guid UserId { get; set; }
  public Guid DangerId { get; set; }

  public DangerRequest ToEntity() {
    return new DangerRequest {
      Type = Type,
      Timestamp = Timestamp,
      UserId = UserId,
      DangerId = DangerId
    };
  }
}
