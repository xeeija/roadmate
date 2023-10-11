namespace DAL;

public class DBSettings {
  public string Host { get; set; }

  public int? Port { get; set; }

  public string Database { get; set; }
  public string? Schema { get; set; }

  public string Username { get; set; }

  public string Password { get; set; }
}
