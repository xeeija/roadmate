using Microsoft.EntityFrameworkCore;
using Serilog;

namespace Tests.DBTests;

public class CreateDatabase : BaseDBTests {
  // Used as script to create the database (and apply migrations)
  [Test]
  public void ApplyPendingMigrations() {
    // Uncomment the lines below and the EntityFrameworkCore using, and then execute this test

    // Log.Logger.Debug(Context.Database.GetDbConnection().ConnectionString.Split("Password")[0]);
    // await Context.Database.MigrateAsync();
  }

  [Test]
  public async Task ShouldConnectToDatabase() {
    Assert.That(Context.Database, Is.Not.Null);

    // Log which Database is used
    Log.Logger.Debug($"Environment: {Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}");
    Log.Logger.Debug(Context.Database.GetDbConnection().ConnectionString.Split("Password")[0]);

    var connected = await Context.Database.CanConnectAsync();
    Assert.That(connected, Is.True);
  }
}
