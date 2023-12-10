using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities;

/// <summary>
///   Base Class for all other classes which represent an entity
/// </summary>
public class Entity : IEntity {
  /// <summary>Unique Identifier</summary>
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid ID { get; set; } = Guid.NewGuid();

  /// <summary>Timestamp of creation</summary>
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

  /// <summary>Timestamp of last update</summary>
  public DateTime? UpdatedAt { get; set; }
}
