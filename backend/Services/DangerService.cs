using DAL;
using DAL.Entities;

namespace Services;

public class DangerService : BaseService<Danger> {
  public DangerService(PostgresDbContext context) : base(context) {
  }
}
