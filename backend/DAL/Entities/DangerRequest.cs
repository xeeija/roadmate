namespace DAL.Entities;

public class DangerRequest : Entity {
  public RequestType Type { get; set; }
  public DateTime Timestamp { get; set; }
  public Guid UserId { get; set; }
  public Guid DangerId { get; set; }

  // Foreign Keys
  public User User { get; set; }
  public Danger Danger { get; set; }
}

public enum RequestType {
  Create,
  Resolve
}
