using DAL.Entities;

namespace DAL;

public class ExpertRequest : Entity {
  public Guid UserId { get; set; }
  public string Description { get; set; }
  public DateTime? ApprovedAt { get; set; }
  public Guid? ApprovedUserId { get; set; }

  // Foreign Keys
  public User User { get; set; }
  public User? ApprovedUser { get; set; }
}
