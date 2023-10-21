namespace Services;

public interface IResponseModel {
  public bool HasError { get; }

  public bool IsAuthorized { get; set; }

  public List<string> ErrorMessages { get; set; }
}
