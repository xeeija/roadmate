using DAL;

namespace Services;

public class GlobalService {
  public GlobalService() {
    var context = new PostgresDbContext();

    UserService = new UserService(context);
    ExpertRequestService = new ExpertRequestService(context);
  }

  public UserService UserService { get; set; }
  public ExpertRequestService ExpertRequestService { get; set; }
}
