using System.Security.Cryptography;

namespace DAL.Internal;

public static class Password {
  #region Properties

  public static string? HashedPassword { get; set; }

  #endregion

  #region Settings

  private static class Options {
    public const int SaltSize = 16;
    public const int KeySize = 32;
    public const int Iterations = 10000;
    public static readonly HashAlgorithmName Algorithm = HashAlgorithmName.SHA256;
  }

  #endregion

  #region Public methods

  public static bool CheckPassword(string password) {
    if (HashedPassword == null) {
      return false;
    }

    return CheckPassword(password, HashedPassword);
  }

  public static bool CheckPassword(string password, string hash) {
    // Check password format
    var parts = hash.Split('.', 3);

    if (parts.Length != 3) {
      throw new FormatException("Unexpected hash format!");
    }

    // Decrypt password
    var iterations = Convert.ToInt32(parts[0]);
    var salt = Convert.FromBase64String(parts[1]);
    var key = Convert.FromBase64String(parts[2]);

    var algorithm = new Rfc2898DeriveBytes(
      password,
      salt,
      iterations,
      Options.Algorithm
    );

    return algorithm.GetBytes(Options.KeySize).SequenceEqual(key);
  }

  public static string EncryptPassword(string password) {
    var algorithm = new Rfc2898DeriveBytes(
      password,
      Options.SaltSize,
      Options.Iterations,
      Options.Algorithm
    );

    var key = Convert.ToBase64String(algorithm.GetBytes(Options.KeySize));
    var salt = Convert.ToBase64String(algorithm.Salt);

    HashedPassword = Options.Iterations + "." + salt + "." + key;

    return HashedPassword;
  }

  public static string? EncryptPassword() {
    if (HashedPassword == null) {
      return null;
    }

    return EncryptPassword(HashedPassword);
  }

  #endregion
}
