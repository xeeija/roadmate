using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Utils;

namespace DAL;

public class PostgresDbContext : DbContext {
  protected ILogger log = Logger.ContextLog<PostgresDbContext>();
  public DbSet<User> User { get; set; }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
    var settings = SettingsReader.GetSettings<DBSettings>("Postgres");
    var port = settings?.Port ?? 5432;
    var schema = settings?.Schema != null ? $"SearchPath={settings?.Schema};" : "";

    // For debugging only
    var includeErrorDetail = false;

    var connectionString =
      $"Host={settings?.Host}:{port};Database={settings?.Database};Username={settings?.Username};Password={settings?.Password};{schema}{(includeErrorDetail ? ";Include Error Detail=true" : "")}";
    if (Constants.IsProduction) {
      var host = Environment.GetEnvironmentVariable("POSTGRES_HOST");
      var p = Environment.GetEnvironmentVariable("POSTGRES_PORT") ?? port.ToString();
      var database = Environment.GetEnvironmentVariable("POSTGRES_DATABASE");
      var username = Environment.GetEnvironmentVariable("POSTGRES_USER");
      var password = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD");
      var s = Environment.GetEnvironmentVariable("POSTGRES_SCHEMA") ?? schema;
      connectionString =
        $"Host={host}:{p};Database={database};Username={username};Password={password};{schema}{(includeErrorDetail ? ";Include Error Detail=true" : "")}";
    }

    optionsBuilder.UseNpgsql(connectionString);
  }

  // Possibility to configure the model manually or exclude migrations
  protected override void OnModelCreating(ModelBuilder modelBuilder) {
    base.OnModelCreating(modelBuilder);
    modelBuilder.HasPostgresExtension("uuid-ossp");

    // UUID Defaul values
    modelBuilder.Entity<User>().Property(p => p.ID).HasDefaultValueSql("uuid_generate_v4()");
  }
}
