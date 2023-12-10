using Microsoft.Extensions.Configuration;
using Serilog;
using Serilog.Debugging;

namespace Utils;

public static class Logger {
  private static bool IsInitialized;


  public static ILogger ILogger { get; private set; }

  public static ILogger ContextLog<T>() where T : class {
    if (!IsInitialized) {
      InitLogger();
    }

    return ILogger.ForContext<T>();
  }

  /// <summary>Initializes the Logger based on the Logger Config file</summary>
  public static void InitLogger() {
    if (!IsInitialized) {
      var folder = Constants.CurrentFolder;

      SelfLog.Enable(Console.WriteLine);

      var configuration = new ConfigurationBuilder()
        .SetBasePath(folder ?? "")
        // .AddJsonFile("loggerconfig.json")
        // If differentiation between dev and prod is needed, uncomment and add loggerconfig.Development.json
        // .AddJsonFile("loggerconfig.Development.json")
        .Build();

      Log.Logger = new LoggerConfiguration()
        .ReadFrom
        .Configuration(configuration)
        .CreateLogger();

      ILogger = Log.Logger;
      Log.Verbose("Logger initialized in Folder " + folder);
      IsInitialized = true;
    }
  }
}
