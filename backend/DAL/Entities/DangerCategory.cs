namespace DAL.Entities;

public class DangerCategory : Entity {
  public string Name { get; set; }

  public int? Order { get; set; }

  // Reverse Navigation
  public ICollection<Danger> Dangers { get; set; }
}
