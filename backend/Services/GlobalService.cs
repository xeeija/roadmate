using DAL;

namespace Services;

public class GlobalService {
  public GlobalService() {
    var context = new PostgresDbContext();

    // UserServices = new UserService(context);
    // BadgeService = new BaseService<Badge>(context);
  }

  // public UserService UserServices { get; set; }
  // public BaseService<Badge> BadgeService { get; set; }
}
