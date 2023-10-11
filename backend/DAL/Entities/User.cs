using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace DAL.Entities;

/// <summary>
///   Base Class for Entity User
/// </summary>
/// <param name="Email">Specifies the E-Mail of the User</param>
/// <param name="PhoneNumber">
///   Stores the PhoneNumber of the User. The PhoneNumber is needed so that Users can add other
///   Users as friends from their Contacts
/// </param>
/// <param name="HashedPassword">Password-Hash for Login</param>
/// <param name="AddressName">Address of the User</param>
/// <param name="AddressLatitude">Latitude of the address, ranging from +90° (north) to -90° (south)</param>
/// <param name="AddressLongitude">Longitude of the address, ranging from +180° (east) to -180° (west)</param>
/// <param name="ImageId">Foreign Key which is used to get the image for the profile picture</param>
/// <param name="ProfileDescription">Users have the possibility to describe themselves in their Profile-Description</param>
/// <param name="AcceptedPrivacyPolicy">Date and Time when the Privacy Policy was accepted (must be accepted)</param>
/// <param name="Role">Each user has a Role which allows them to do or see different things</param>
/// <param name="IsBanned">Bool which shows if a User is Banned or not</param>
/// <param name="IsActive">Defines if the user is active or not</param>
public class User : Entity {
  public string Email { get; set; }

  [MaxLength(20)]
  public string? PhoneNumber { get; set; }

  [JsonIgnore]
  public string HashedPassword { get; set; }

  public string? AddressName { get; set; }
  public double? AddressLatitdue { get; set; }
  public double? AddressLongitude { get; set; }

  public Guid? ImageId { get; set; }
  public string? ProfileDescription { get; set; }
  public DateTime AcceptedPrivacyPolicy { get; set; } = DateTime.UtcNow;
  public Role Role { get; set; }
  public bool IsBanned { get; set; }
  public bool IsActive { get; set; } = true;

  //Reverse Navigation
}

/// <summary>
///   User Roles which allow them to do or see different things.
/// </summary>
public enum Role {
  User,
  Admin
}
