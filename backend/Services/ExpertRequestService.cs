using DAL;
using DAL.Entities;

namespace Services;

public class ExpertRequestService : BaseService<ExpertRequest> {
  public ExpertRequestService(PostgresDbContext context) : base(context) {
  }
}
