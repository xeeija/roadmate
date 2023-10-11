namespace DAL.Entities;

/// <summary>
///   Base interface for all other classes which represent an entity
/// </summary>
/// <param name="ID">Unique Identifier</param>
/// <param name="CreatedAt">Shows when it was created</param>
/// <param name="UpdatedAt">Shows when it was last updated</param>
public interface IEntity {
  // string ID { get; set; }
  Guid ID { get; set; }
  DateTime CreatedAt { get; set; }
  DateTime? UpdatedAt { get; set; }
}
