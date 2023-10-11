using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities;

/// <summary>
///   Base Class for all other classes which represent an entity
/// </summary>
/// <param name="ID">Unique Identifier</param>
/// <param name="CreatedAt">Shows when it was created</param>
/// <param name="UpdatedAt">Shows when it was last updated</param>
public class Entity : IEntity {
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid ID { get; set; } = Guid.NewGuid();

  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

  public DateTime? UpdatedAt { get; set; }
}
