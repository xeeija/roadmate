using DAL;
using DAL.Entities;

namespace Services;

public class DangerResolveRequestService : BaseService<DangerResolveRequest> {
  public DangerResolveRequestService(PostgresDbContext context) : base(context) {
  }
}
