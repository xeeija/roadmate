using DAL.Entities;

namespace DAL;

public class Notification : Entity {
  public string Description { get; set; }
  public Uri? Url { get; set; }
  public DateTime? ReadAt { get; set; }
  public Guid UserId { get; set; }
  public Guid RouteId { get; set; }
  public Guid DangerId { get; set; }

  // Foreign Keys
  public User User { get; set; }
  public Route Route { get; set; }
  public Danger Danger { get; set; }
}
