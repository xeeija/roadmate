using DAL;
using DAL.Entities;

namespace Services;

public class DangerMessageService : BaseService<DangerMessage> {
  public DangerMessageService(PostgresDbContext context) : base(context) {
  }
}
