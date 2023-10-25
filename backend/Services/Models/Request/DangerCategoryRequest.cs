using DAL;

namespace Services.Models.Request;

public class DangerCategoryRequest : IRequestModel<DangerCategory> {
  public string Name { get; set; }

  public DangerCategory ToEntity() {
    return new DangerCategory {
      Name = Name
    };
  }
}
