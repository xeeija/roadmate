using DAL;
using DAL.Entities;

namespace Services;

public class RouteService : BaseService<Route> {
  public RouteService(PostgresDbContext context) : base(context) {
  }
}
