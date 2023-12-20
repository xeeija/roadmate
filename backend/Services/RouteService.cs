using DAL;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Services;

public class RouteService : BaseService<Route> {
  public RouteService(PostgresDbContext context) : base(context) {
  }
  public async Task<List<Route>> GetUserRoutes(string userId) {
    return await Routes
        .Where(route => route.UserId == userId)
        .ToListAsync();
  }
}
