namespace Services.Authentication;

public class AuthenticationInformation {
  public string Token { get; set; }

  public long ExpirationDate { get; set; }
}
