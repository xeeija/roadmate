namespace DAL.Entities;

/// <summary>
///   Base interface for all other classes which represent an entity
/// </summary>
public interface IEntity {
  /// <summary>Unique Identifier</summary>
  Guid ID { get; set; }

  /// <summary>Timestamp of creation</summary>
  DateTime CreatedAt { get; set; }

  /// <summary>Timestamp of last update</summary>
  DateTime? UpdatedAt { get; set; }
}
