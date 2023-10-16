using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace DAL.Entities;

/// <summary>
///   Base Class for Entity User
/// </summary>
/// <param name="Email">Specifies the E-Mail of the User</param>
/// <param name="HashedPassword">Password-Hash for Login</param>
/// <param name="Role">Each user has a Role which allows them to do or see different things</param>
/// <param name="IsBanned">Bool which shows if a User is Banned or not</param>
/// <param name="NotificationAllowed">Defines if the user generally allows notifcations</param>
public class User : Entity {
  public string Username { get; set; }
  public string Email { get; set; }

  [JsonIgnore]
  public string Password { get; set; }

  public string? Displayname { get; set; }

  public Role Role { get; set; } = Role.User;
  public bool IsBanned { get; set; }
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
