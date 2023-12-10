namespace Utils;

public static class MathUtils {
  // public static double DistanceSphericalDb(double lat1, double lon1, double lat2, double lon2) {
  //   var earthRadiusMeters = 6371 * 1000;

  //   return Math.Acos(
  //       Math.Sin(DbFuncs.ToRadians(lat)) * Math.Sin(DbFuncs.ToRadians(danger.Lat)) +
  //       Math.Cos(DbFuncs.ToRadians(lat)) * Math.Cos(DbFuncs.ToRadians(danger.Lat)) *
  //       Math.Cos(DbFuncs.ToRadians(lon) - DbFuncs.ToRadians(danger.Lon))
  //     ) * earthRadiusMeters;
  // }

  public const double EarthRadiusMeters = 6371 * 1000;

  public static double ToRadians(double value) {
    return value * Math.PI / 180.0;
  }

  /// <summary>
  ///   Use haversine formula to calculate great-circle distance between 2 points on a sphere
  /// </summary>
  /// <param name="lat1"></param>
  /// <param name="lon1"></param>
  /// <param name="lat2"></param>
  /// <param name="lon2"></param>
  /// <param name="sphereRadius"></param>
  /// <returns></returns>
  public static double DistanceSpherical(
    double lat1,
    double lon1,
    double lat2,
    double lon2,
    double sphereRadius = EarthRadiusMeters
  ) {
    return Math.Acos(
      Math.Sin(ToRadians(lat1)) * Math.Sin(ToRadians(lat2)) +
      Math.Cos(ToRadians(lat1)) * Math.Cos(ToRadians(lat2)) *
      Math.Cos(ToRadians(lon1) - ToRadians(lon2))
    ) * sphereRadius;
  }
}
