namespace Services.Models.Response;

public class ItemResponseModel<T> : ResponseModel where T : class {
  public ItemResponseModel() {
  }

  public ItemResponseModel(ResponseModel model) {
    HasError = model.HasError;
    ErrorMessages = model.ErrorMessages;
    IsAuthorized = model.IsAuthorized;
  }

  public T? Data { get; set; }
}
