using DAL;

namespace Services;

public class RouteService : BaseService<Route> {
  public RouteService(PostgresDbContext context) : base(context) {
  }
}
