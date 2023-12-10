using DAL;
using DAL.Entities;

namespace Services;

public class DangerCategoryService : BaseService<DangerCategory> {
  public DangerCategoryService(PostgresDbContext context) : base(context) {
  }
}
