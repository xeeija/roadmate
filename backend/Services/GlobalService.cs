using DAL;

namespace Services;

public class GlobalService {
  public GlobalService() {
    var context = new PostgresDbContext();

    UserService = new UserService(context);
    // BadgeService = new BaseService<Badge>(context);
  }

  public UserService UserService { get; set; }
  // public BaseService<Badge> BadgeService { get; set; }
}
