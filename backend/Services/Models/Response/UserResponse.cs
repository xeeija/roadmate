using DAL.Entities;
using Services.Authentication;

//using Services.Authentication;

namespace Services.Models.Response;

public class UserResponse {
  public User? User { get; set; }

  public AuthenticationInformation? Authentication { get; set; }
}
