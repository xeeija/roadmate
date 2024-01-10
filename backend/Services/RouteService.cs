using DAL;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Services;

public class RouteService : BaseService<Route> {
  private readonly PostgresDbContext _context;
  public RouteService(PostgresDbContext context) : base(context) {
    _context = context;
  }
  public async Task<IEnumerable<Route>> GetRoutesByUserId(Guid userId) {
    return await _context.Route.Where(r => r.UserId == userId).ToListAsync();
  }
}
