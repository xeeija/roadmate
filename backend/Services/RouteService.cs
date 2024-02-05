using DAL;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Services;

public class RouteService : BaseService<Route> {
  public RouteService(PostgresDbContext context) : base(context) {
  }

  public async Task<List<Route>> GetRoutesByUserId(Guid userId) {
    return await Context.Route.Where(r => r.UserId == userId).ToListAsync();
  }
}
