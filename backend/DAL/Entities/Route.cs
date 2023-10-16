using DAL.Entities;

namespace DAL;

public class Route : Entity {
  public Guid UserId { get; set; }
  public string Name { get; set; }
  public double FromLat { get; set; }
  public double FromLon { get; set; }
  public double ToLat { get; set; }
  public double ToLon { get; set; }
  public string? FromAddressName { get; set; }
  public string? ToAddressName { get; set; }

  public bool NotificationEnabled { get; set; }

  // Foreign Keys
  public User User { get; set; }

  // Reverse Navigation
  public ICollection<Notification> Notifications { get; set; }
}
