namespace DAL.Entities;

public class Danger : Entity {
  public DangerType Type { get; set; }
  public string Description { get; set; }
  public double Lat { get; set; }
  public double Lon { get; set; }
  public string? AddressName { get; set; }
  public string? Title { get; set; }
  public Guid CategoryId { get; set; }
  public string? OtherCategory { get; set; }
  public DateTime? ActiveAt { get; set; }
  public DateTime? ResolvedAt { get; set; }

  public bool IsActive =>
    ActiveAt != null && ActiveAt <= DateTime.UtcNow &&
    (ResolvedAt == null || ResolvedAt > DateTime.UtcNow);

  // Forgein Keys
  public DangerCategory Category { get; set; }

  // Reverse Navigation
  public ICollection<DangerMessage> Messages { get; set; }
  public ICollection<DangerRequest> Requests { get; set; }
  public ICollection<Notification> Notifications { get; set; }
}

public enum DangerType {
  Permanent,
  Temporary
}
