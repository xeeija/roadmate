using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DAL;
using DAL.Entities;
using Microsoft.IdentityModel.Tokens;

namespace Services.Authentication;

public class Authentication {
  private const string Secret = "j1Da2sA4hd5Akj6aFs7E8d8h9H0d0aK5";

  private const string Issuer = "http://roadmate.com";

  private const string Audience = "http://roadmate.com";

  private readonly SymmetricSecurityKey SecurityKey = new(Encoding.ASCII.GetBytes(Secret));

  public PostgresDbContext? Context;

  public Authentication(PostgresDbContext context) {
    Context = context;
  }

  public static TokenValidationParameters ValidationParams => new() {
    ValidateIssuerSigningKey = true,
    ValidateIssuer = true,
    ValidateAudience = true,
    ValidIssuer = Issuer,
    ValidAudience = Audience,
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Secret))
  };

  public async Task<AuthenticationInformation> Authenticate(User user) {
    if (user != null) {
      var info = new AuthenticationInformation();

      var expires = DateTime.UtcNow.AddDays(1);

      info.ExpirationDate = new DateTimeOffset(expires).ToUnixTimeSeconds();

      var tokenHandler = new JwtSecurityTokenHandler();

      var tokenDescriptor = new SecurityTokenDescriptor {
        Subject = new ClaimsIdentity(new[] {
          new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
          new Claim(ClaimTypes.Email, user.Email),
          new Claim(ClaimTypes.Role, user.Role.ToString())
        }),
        Expires = expires,
        Issuer = Issuer,
        Audience = Audience,
        SigningCredentials = new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256Signature)
      };

      var token = tokenHandler.CreateToken(tokenDescriptor);
      info.Token = tokenHandler.WriteToken(token);

      return await Task.FromResult(info);
    }

    return null!;
  }


  public static async Task<bool> ValidateCurrentToken(string token) {
    var tokenHandler = new JwtSecurityTokenHandler();

    try {
      var val = tokenHandler.ValidateToken(token, ValidationParams, out var validatedToken);
    }
    catch {
      return await Task.FromResult(false);
    }

    return await Task.FromResult(true);
  }

  public static string? GetEmailByToken(string token) {
    var tokenHandler = new JwtSecurityTokenHandler();

    try {
      var finaltoken = token;

      if (token.StartsWith("Bearer ")) {
        finaltoken = token.Replace("Bearer ", "");
      }

      var val = tokenHandler.ValidateToken(finaltoken, ValidationParams, out var validatedToken);

      if (val.HasClaim(x => x.Type == ClaimTypes.Email)) {
        var claim = val.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email);

        if (claim != null && !string.IsNullOrEmpty(claim.Value)) {
          return claim.Value;
        }
      }
    }
    catch {
      return null;
    }

    return null;
  }

  public static string? GetClaim(string token, string claimType) {
    var tokenHandler = new JwtSecurityTokenHandler();
    var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

    var stringClaimValue = securityToken?.Claims.First(claim => claim.Type == claimType).Value;
    return stringClaimValue;
  }
}
