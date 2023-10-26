using DAL;
using DAL.Entities;
using Serilog;
using Services.Models.Request;
using Utils;

namespace Tests;

/// <summary>
///   Helper for unit tests
///   Here we implement methods which create default entities so that it is not necessary to copy paste code in the unit
///   tests
/// </summary>
public class DefaultValues {
  protected static ILogger log = Logger.ContextLog<DefaultValues>();

  protected static int RandomTestId;
  protected static List<int> RandomTestIdList = new();

  public static class TestNames {
    public const string BaseUser = "testuser";
    public const string AdminUser = "testadmin";
    public const string ExpertUser = "testexpert";
    public const string UserEmailDomain = "@roadmate.com";
    public const string DangerTitle = "Test Danger";
    public const string DangerCategoryTitle = "Test Category";
  }

  public static int GenerateNewTestId() {
    RandomTestId = new Random().Next(999);
    RandomTestIdList.Add(RandomTestId);
    return RandomTestId;
  }

  public static void ClearDataDefaultTemplates(PostgresDbContext context) {
    log.Debug("test ids: " + RandomTestIdList.Count.ToString());
    foreach (var id in RandomTestIdList) {
      // context.User.Where(user => user.Email == TestNames.BaseUser + id + TestNames.UserEmailDomain)
      //     .ExecuteDelete();
      // context.User.Where(user => user.Email == TestNames.BusinessUser + id + TestNames.UserEmailDomain)
      //     .ExecuteDelete();
      // context.User.Where(user => user.Email == TestNames.AdminUser + id + TestNames.UserEmailDomain)
      //     .ExecuteDelete();
      // context.Activity.Where(x => x.Title == TestNames.ActivityTitle + id).ExecuteDelete();
      // context.Category.Where(c => c.Title == TestNames.CategoryTitle + id).ExecuteDelete();

      context.SaveChanges();
    }
  }

  #region GeneralEntities

  // Danger

  // DangerRequest

  // ExpertRequest

  // Route

  // Notification

  // DangerMessage


  /// <summary>
  ///     Creates default Activity for testing
  /// </summary>
  /// <returns></returns>
  // public static Activity CreateActivity() {
  //   return new Activity {
  //     Title = TestNames.ActivityTitle + RandomTestId,
  //     Category = CreateCategory()
  //   };
  // }

  /// <summary>
  ///   Creates default Category for testing
  /// </summary>
  /// <returns></returns>
  public static DangerCategory CreateDangerCategory() {
    return new DangerCategory {
      Name = TestNames.DangerCategoryTitle + RandomTestId,
    };
  }

  #endregion

  #region UserHandling

  /// <summary>
  ///   Creates default BasicUser for testing
  /// </summary>
  /// <returns></returns>
  public static User CreateUser() {
    return new User {
      Username = "Testuser 1",
      Email = TestNames.BaseUser + RandomTestId + TestNames.UserEmailDomain,
      Role = Role.User,
      Password = "correctPassword"
    };
  }

  /// <summary>
  ///   Creates default BasicUser request for testing
  /// </summary>
  /// <returns></returns>
  public static RegisterRequest CreateUserRegisterRequest() {
    var email = TestNames.BaseUser + RandomTestId + TestNames.UserEmailDomain;
    var password = "correctPassword";
    var name = "Testuser 1";

    var request = new RegisterRequest {
      Email = email,
      Password = password,
      Username = name,
      RequestExpert = false
    };

    return request;
  }

  /// <summary>
  ///   Creates default Admin user request for testing
  /// </summary>
  /// <returns></returns>
  public static RegisterRequest CreateAdminUserRegisterRequest() {
    var email = TestNames.AdminUser + RandomTestId + TestNames.UserEmailDomain;
    var password = "correctPassword";
    var name = "Testuser 2";

    var request = new RegisterRequest {
      Email = email,
      Password = password,
      Username = name
    };

    return request;
  }

  /// <summary>
  ///   Creates default BasicUser request for testing
  /// </summary>
  /// <returns></returns>
  public static RegisterRequest CreateExpertUserRegisterRequest() {
    var email = TestNames.ExpertUser + RandomTestId + TestNames.UserEmailDomain;
    var password = "correctPassword";
    var name = "Testuser 3";
    var description = "I wanna be the very best, like no one ever was";

    var request = new RegisterRequest {
      Email = email,
      Password = password,
      Username = name,
      RequestExpert = true,
      ExpertDescription = description
    };
    return request;
  }

  #endregion
}
