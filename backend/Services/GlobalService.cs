using DAL;
using DAL.Entities;

namespace Services;

public class GlobalService {
  private readonly PostgresDbContext dbContext;

  public GlobalService() {
    var context = new PostgresDbContext();
    dbContext = context;

    DangerService = new DangerService(context);
    DangerCategoryService = new DangerCategoryService(context);
    DangerMessageService = new DangerMessageService(context);
    DangerRequestService = new DangerRequestService(context);
    DangerResolveRequestService = new DangerResolveRequestService(context);
    ExpertRequestService = new ExpertRequestService(context);
    NotificationService = new NotificationService(context);
    RouteService = new RouteService(context);
    UserService = new UserService(context);
  }

  public DangerService DangerService { get; set; }
  public DangerCategoryService DangerCategoryService { get; set; }
  public DangerMessageService DangerMessageService { get; set; }
  public DangerRequestService DangerRequestService { get; set; }
  public DangerResolveRequestService DangerResolveRequestService { get; set; }
  public ExpertRequestService ExpertRequestService { get; set; }
  public NotificationService NotificationService { get; set; }
  public RouteService RouteService { get; set; }
  public UserService UserService { get; set; }

  public BaseService<T> GetService<T>() where T : Entity {
    return new BaseService<T>(dbContext);
  }
}
