using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace DAL.Entities;

/// <summary>
///   Base Class for Entity User
/// </summary>
public class User : Entity {
  /// <summary>Username of the user</summary>
  public string Username { get; set; }

  /// <summary>Specifies the E-Mail of the User</summary>
  public string Email { get; set; }

  /// <summary>Password-Hash for Login</summary>
  [JsonIgnore]
  public string Password { get; set; }

  /// <summary>Each user has a Role which allows them to do or see different things</summary>
  public Role Role { get; set; } = Role.User;

  /// <summary>Bool which shows if a User is Banned or not</summary>
  public bool IsBanned { get; set; }

  /// <summary>Defines if the user generally allows notifcations</summary>
  public bool NotificationAllowed { get; set; }

  //Reverse Navigation
  [InverseProperty("User")]
  public ICollection<ExpertRequest> ExpertRequests { get; set; }

  [InverseProperty("ApprovedUser")]
  public ICollection<ExpertRequest> ApprovedExpertRequests { get; set; }

  public ICollection<DangerRequest> DangerRequests { get; set; }
  public ICollection<Notification> Notifications { get; set; }
}

/// <summary>
///   User Roles which allow them to do or see different things.
/// </summary>
public enum Role {
  User,
  Expert,
  Admin
}
