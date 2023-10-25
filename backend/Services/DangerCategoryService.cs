using DAL;

namespace Services;

public class DangerCategoryService : BaseService<DangerCategory> {
  public DangerCategoryService(PostgresDbContext context) : base(context) {
  }
}
