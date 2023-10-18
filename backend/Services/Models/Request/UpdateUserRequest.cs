using DAL.Entities;

namespace Services.Models.Request;

public class UpdateUserRequest : IRequestModel<User> {
  public string? Username { get; set; }
  public string? Email { get; set; }
  public string? CurrentPassword { get; set; }
  public string? NewPassword { get; set; }
  public string? Displayname { get; set; }

  public User ToEntity() {
    return new User {
      Username = Username ?? string.Empty,
      Email = Email ?? string.Empty,
      Password = NewPassword ?? string.Empty,
    };
  }
}
