namespace DAL.Entities;

public class DangerMessage : Entity {
  public string Message { get; set; }

  public Guid UserId { get; set; }

  public Guid DangerId { get; set; }

  public Guid? ReferencedMessageId { get; set; }

  // Foreign Keys
  public User User { get; set; }
  public Danger Danger { get; set; }
  public DangerMessage? ReferencedMessage { get; set; }

  // Reverse Navigation
  public ICollection<DangerMessage> Answers { get; set; }
}
