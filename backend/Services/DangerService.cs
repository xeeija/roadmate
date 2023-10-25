using DAL;

namespace Services;

public class DangerService : BaseService<Danger> {
  public DangerService(PostgresDbContext context) : base(context) {
  }
}
