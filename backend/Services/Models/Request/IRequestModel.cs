namespace Services.Models.Request;

/// <summary>
///   Base interface for request models that provides the necessary structure for the type conversion
/// </summary>
/// <typeparam name="T">Type which the request model is abstracting</typeparam>
public interface IRequestModel<T> {
  /// <summary>
  ///   Method that converts the request model to the type it is abstracting
  /// </summary>
  /// <returns>The converted Entity</returns>
  public T ToEntity();
}
