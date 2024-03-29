﻿using Microsoft.Extensions.Configuration;

namespace Utils;

public static class SettingsReader {
  public static T? GetSettings<T>(string section) where T : class {
    var builder = new ConfigurationBuilder()
      .SetBasePath(Constants.CurrentFolder ?? "")
      .AddJsonFile("appsettings.json");

    // If we are in development, we want to use the local db,
    // otherwise, we want to use the hosted one
    if (Constants.IsDevelopment) {
      builder.AddJsonFile("appsettings.Development.json");
    }
    else if (Constants.IsHosted) {
      // builder.AddJsonFile("dbconnection.json");
    }

    // If we are in production, we want to read credentials from the environment variables,
    // otherwise, we want to use the local ones stored in the credentials.json
    if (Constants.IsProduction) {
      builder.AddEnvironmentVariables();
    }
    else {
      builder.AddJsonFile("credentials.json");
    }

    return builder.Build().GetSection(section).Get<T>();
  }
}
