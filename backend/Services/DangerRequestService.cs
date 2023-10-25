using DAL;

namespace Services;

public class DangerRequestService : BaseService<DangerRequest> {
  public DangerRequestService(PostgresDbContext context) : base(context) {
  }
}
