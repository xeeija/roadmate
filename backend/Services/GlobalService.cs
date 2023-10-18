using DAL;

namespace Services;

public class GlobalService {
  public GlobalService() {
    var context = new PostgresDbContext();

    UserService = new UserService(context);
    ExpertRequestService = new ExpertRequestService(context);
  }

  public DangerService DangerService { get; set; }
  public DangerCategoryService DangerCategoryService { get; set; }
  public DangerMessageService DangerMessageService { get; set; }
  public DangerRequestService DangerRequestService { get; set; }
  public ExpertRequestService ExpertRequestService { get; set; }
  public NotificationService NotificationService { get; set; }
  public RouteService RouteService { get; set; }
  public UserService UserService { get; set; }
}
