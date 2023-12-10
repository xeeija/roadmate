using Microsoft.EntityFrameworkCore;

namespace DAL.Helpers;

public static class DbFuncs {
  [DbFunction("sin", IsBuiltIn = true)]
  public static double Sin(double value) {
    throw new NotSupportedException("This method is for use in LINQ queries only.");
  }

  [DbFunction("cos", IsBuiltIn = true)]
  public static double Cos(double value) {
    throw new NotSupportedException("This method is for use in LINQ queries only.");
  }

  [DbFunction("acos", IsBuiltIn = true)]
  public static double Acos(double value) {
    throw new NotSupportedException("This method is for use in LINQ queries only.");
  }

  [DbFunction("radians", IsBuiltIn = true)]
  public static double ToRadians(double value) {
    throw new NotSupportedException("This method is for use in LINQ queries only.");
  }
}
