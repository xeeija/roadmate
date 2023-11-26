using DAL;
using DAL.Entities;
using DAL.Helpers;
using Microsoft.EntityFrameworkCore;

namespace Services;

public class DangerRequestService : BaseService<DangerRequest> {
  public DangerRequestService(PostgresDbContext context) : base(context) {
    FindDangersInRadius(47.0553989831388, 15.4452536266200).Wait();
  }

  public Task<IEnumerable<Danger>> FindDangersInRadius(double lat, double lon, Func<Danger, bool>? filter = null, double radiusMeters = 50) {
    // used to scale everything to meters
    var earthRadiusMeters = 6371 * 1000;

    // use haversine formula to calculate great-circle distance between 2 points on a sphere
    // var distanceSphere = (Danger danger) => DbFuncs.Acos(
    //     DbFuncs.Sin(DbFuncs.ToRadians(lat)) * DbFuncs.Sin(DbFuncs.ToRadians(danger.Lat)) +
    //     DbFuncs.Cos(DbFuncs.ToRadians(lat)) * DbFuncs.Cos(DbFuncs.ToRadians(danger.Lat)) *
    //     DbFuncs.Cos(DbFuncs.ToRadians(lon) - DbFuncs.ToRadians(danger.Lon))
    //   ) * earthRadiusMeters;

    var foundDangers = Context.Danger
      .Where(d => filter == null || filter(d))
      .Where(danger =>
        DbFuncs.Acos(
          DbFuncs.Sin(DbFuncs.ToRadians(lat)) * DbFuncs.Sin(DbFuncs.ToRadians(danger.Lat)) +
          DbFuncs.Cos(DbFuncs.ToRadians(lat)) * DbFuncs.Cos(DbFuncs.ToRadians(danger.Lat)) *
          DbFuncs.Cos(DbFuncs.ToRadians(lon) - DbFuncs.ToRadians(danger.Lon))
        ) * earthRadiusMeters <= radiusMeters
      )
      .Include(e => e.Requests)

      // var foundDanger = Context.Danger
      //   .Where(d => filter == null || filter(d))
      //   .Include(e => e.Requests).AsEnumerable()
      //   .Where(danger => MathUtils.DistanceSpherical(lat, lon, danger.Lat, danger.Lon) <= radiusMeters)
      // .OrderBy(danger => MathUtils.DistanceSpherical(lat, lon, danger.Lat, danger.Lon))
      .AsEnumerable();

    return Task.FromResult(foundDangers);
  }

}
