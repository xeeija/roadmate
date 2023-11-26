namespace DAL.Entities;

public class DangerRequest : Entity {
  public RequestType Type { get; set; }
  public DateTime Timestamp { get; set; }
  public Guid UserId { get; set; }
  public double Lat { get; set; }
  public double Lon { get; set; }
  public string Description { get; set; }
  public Guid CategoryId { get; set; }
  public Guid? DangerId { get; set; }

  // Foreign Keys
  public User User { get; set; }
  public DangerCategory Category { get; set; }
  public Danger? Danger { get; set; }

}

public enum RequestType {
  Create,
  Resolve
}
