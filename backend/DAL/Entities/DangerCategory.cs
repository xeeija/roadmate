using DAL.Entities;

namespace DAL;

public class DangerCategory : Entity {
  public string Name { get; set; }

  // Reverse Navigation
  public ICollection<Danger> Dangers { get; set; }
}
