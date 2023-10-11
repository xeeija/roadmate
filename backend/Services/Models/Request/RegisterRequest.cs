using System.ComponentModel.DataAnnotations;
using DAL.Entities;

namespace Services.Models.Request;

public class RegisterRequest : IRequestModel<User> {
  public string Email { get; set; }
  public string Password { get; set; }
  public string Name { get; set; }
  public DateTime BirthDate { get; set; }
  public string? AddressName { get; set; }

  [MaxLength(20)]
  public string? PhoneNumber { get; set; }

  public User ToEntity() {
    return new User {
      Email = Email,
      HashedPassword = Password
      // Name = Name,
      // BirthDate = BirthDate,
      // AddressName = AddressName,
      // PhoneNumber = PhoneNumber,
      // Role = Role.User
    };
  }
}
