using DAL.Entities;

namespace Services.Models.Request;

public class DangerRequestModel : IRequestModel<DangerRequest> {
  // public RequestType Type { get; set; }
  public Guid UserId { get; set; }
  public double Lat { get; set; }
  public double Lon { get; set; }
  public string Description { get; set; }
  public Guid CategoryId { get; set; }
  public DateTime? Timestamp { get; set; }
  // public Guid? DangerId { get; set; }

  public DangerRequest ToEntity() {
    return new DangerRequest {
      Type = RequestType.Create,
      Timestamp = Timestamp ?? DateTime.UtcNow,
      UserId = UserId,
      Lat = Lat,
      Lon = Lon,
      // DangerId = DangerId,
      CategoryId = CategoryId,
      Description = Description,
    };
  }
}
