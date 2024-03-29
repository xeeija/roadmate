using System.Linq.Expressions;
using DAL.Entities;
using DAL.Helpers;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Utils;

namespace DAL;

public class PostgresDbContext : DbContext {
  protected ILogger log = Logger.ContextLog<PostgresDbContext>();
  public DbSet<Danger> Danger { get; set; }
  public DbSet<DangerCategory> DangerCategory { get; set; }
  public DbSet<DangerMessage> DangerMessage { get; set; }
  public DbSet<DangerRequest> DangerRequest { get; set; }
  public DbSet<ExpertRequest> ExpertRequest { get; set; }
  public DbSet<Notification> Notification { get; set; }
  public DbSet<Route> Route { get; set; }
  public DbSet<User> User { get; set; }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
    var settings = SettingsReader.GetSettings<DBSettings>("Postgres");
    var port = settings?.Port ?? 5432;
    var schema = settings?.Schema != null ? $"SearchPath={settings.Schema};" : "";
    // var host = runningInContainer ? Environment.GetEnvironmentVariable("POSTGRES_HOST") : settings?.Host;

    // For debugging only
    var includeErrorDetail = (Environment.GetEnvironmentVariable("INCLUDE_ERROR_DETAIL") ?? "") == "1";
    var runningInContainer = Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true";

    var connectionString =
      $"Host={settings?.Host}:{port};Database={settings?.Database};Username={settings?.Username};Password={settings?.Password};{schema}{(includeErrorDetail ? ";Include Error Detail=true" : "")}";

    if (Constants.IsProduction || runningInContainer) {
      var host = Environment.GetEnvironmentVariable("POSTGRES_HOST") ?? settings?.Host;
      var prodPort = Environment.GetEnvironmentVariable("POSTGRES_PORT") ?? port.ToString();
      var database = Environment.GetEnvironmentVariable("POSTGRES_DATABASE") ?? settings?.Database;
      var username = Environment.GetEnvironmentVariable("POSTGRES_USER") ?? settings?.Username;
      var password = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD") ?? settings?.Password;
      var prodSchemaEnv = Environment.GetEnvironmentVariable("POSTGRES_SCHEMA");
      var prodSchema = prodSchemaEnv != null ? $"SearchPath={prodSchemaEnv};" : schema;

      connectionString =
        $"Host={host}:{prodPort};Database={database};Username={username};Password={password};{prodSchema}{(includeErrorDetail ? ";Include Error Detail=true" : "")}";
    }

    optionsBuilder.UseNpgsql(connectionString);
  }

  // Possibility to configure the model manually or exclude migrations
  protected override void OnModelCreating(ModelBuilder modelBuilder) {
    base.OnModelCreating(modelBuilder);
    modelBuilder.HasPostgresExtension("uuid-ossp");
    // modelBuilder.HasPostgresExtension("postgis");

    // add geometry db functions

    modelBuilder.HasDbFunction(() => DbFuncs.Sin(0));
    modelBuilder.HasDbFunction(() => DbFuncs.Cos(0));
    modelBuilder.HasDbFunction(() => DbFuncs.Acos(0));
    modelBuilder.HasDbFunction(() => DbFuncs.ToRadians(0));

    // UUID Default values
    // modelBuilder.Entity<User>().Property(p => p.ID).HasDefaultValueSql("uuid_generate_v4()");
    generateUuid<Danger>(modelBuilder, p => p.ID);
    generateUuid<DangerCategory>(modelBuilder, p => p.ID);
    generateUuid<DangerMessage>(modelBuilder, p => p.ID);
    generateUuid<DangerRequest>(modelBuilder, p => p.ID);
    generateUuid<ExpertRequest>(modelBuilder, p => p.ID);
    generateUuid<Notification>(modelBuilder, p => p.ID);
    generateUuid<Route>(modelBuilder, p => p.ID);
    generateUuid<User>(modelBuilder, p => p.ID);
  }

  private void generateUuid<T>(ModelBuilder modelBuilder, Expression<Func<T, Guid>> property) where T : Entity {
    modelBuilder.Entity<T>().Property(property).HasDefaultValueSql("uuid_generate_v4()");
  }
}
