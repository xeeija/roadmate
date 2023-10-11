namespace Services.Models.Request;

/// <summary>
///   Default request model for Entities that don't require any specific request model.
///   Necessary to satisfy the generic implementation of the RequestModel interface.
/// </summary>
/// <typeparam name="T">Type of the Entity</typeparam>
public class RequestModel<T> : IRequestModel<T> {
  public T Entity { get; set; }

  public T ToEntity() {
    return Entity;
  }
}
