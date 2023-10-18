using DAL;

namespace Services;

public class ExpertRequestService : BaseService<ExpertRequest> {
  public ExpertRequestService(PostgresDbContext context) : base(context) {
  }
}
