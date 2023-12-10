namespace Services.Models.Response;

public class ResponseModel : IResponseModel {
  public bool HasError => ErrorMessages.Count > 0;

  public bool IsAuthorized { get; set; } = true;

  public List<string> ErrorMessages { get; set; } = new();
}
