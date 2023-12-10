using DAL.Entities;

namespace Services.Models.Request;

public class DangerModel : IRequestModel<Danger> {
  public DangerType Type { get; set; }
  public string Description { get; set; }
  public double Lat { get; set; }
  public double Lon { get; set; }
  public string? AddressName { get; set; }
  public string? Title { get; set; }
  public Guid CategoryId { get; set; }
  public string? OtherCategory { get; set; }
  public DateTime? ActiveAt { get; set; }

  public Danger ToEntity() {
    return new Danger {
      Type = Type,
      Description = Description,
      Lat = Lat,
      Lon = Lon,
      AddressName = AddressName,
      Title = Title,
      CategoryId = CategoryId,
      OtherCategory = OtherCategory,
      ActiveAt = ActiveAt
    };
  }
}
