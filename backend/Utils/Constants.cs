using System.Reflection;

namespace Utils;

public class Constants {
  public static string CurrentFolder {
    get {
      var codeBase = Assembly.GetExecutingAssembly().CodeBase;
      var uri = new UriBuilder(codeBase);
      var path = Uri.UnescapeDataString(uri.Path);
      return Path.GetDirectoryName(path);
    }
  }

  public static bool IsDevelopment =>
    Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";

  public static bool IsHosted =>
    Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Hosted";

  public static bool IsProduction =>
    Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production";

  public static bool IsSwaggerEnabled {
    get {
      if (bool.TryParse(Environment.GetEnvironmentVariable("ENABLE_SWAGGER"), out var enabled)) {
        return enabled;
      }

      return false;
    }
  }
}
