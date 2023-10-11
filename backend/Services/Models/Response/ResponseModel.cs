namespace Services.Models.Response;

public class ResponseModel {
  public bool HasError { get; set; } // => ErrorMessages.Count > 0;

  public bool IsAuthorized { get; set; } = true;

  public List<string> ErrorMessages { get; set; } = new();
}
