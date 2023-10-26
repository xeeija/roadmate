using DAL;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
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

  public static string TestBaseUser = "testuser";
  public static string TestAdminUser = "testadmin";
  public static string TestExpertUser = "testexpert";
  public static string TestUserEmailDomain = "@roadmate.com";
  public static string TestDangerTitle = "Test Danger";
  public static string TestDangerCategoryTitle = "Test Category";

  public static int GenerateNewTestId() {
    RandomTestId = new Random().Next(999);
    RandomTestIdList.Add(RandomTestId);
    return RandomTestId;
  }

  public static void ClearDataDefaultTemplates(PostgresDbContext context) {
    log.Debug("test ids: " + RandomTestIdList.Count);
    foreach (var id in RandomTestIdList) {
      context.User.Where(user => user.Email == TestBaseUser + id + TestUserEmailDomain).ExecuteDelete();
      context.User.Where(user => user.Email == TestExpertUser + id + TestUserEmailDomain).ExecuteDelete();
      context.User.Where(user => user.Email == TestAdminUser + id + TestUserEmailDomain).ExecuteDelete();
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


  // /// <summary>
  // ///     Creates default Activity for testing
  // /// </summary>
  // /// <returns></returns>
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
      Name = TestDangerCategoryTitle + RandomTestId
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
      Email = TestBaseUser + RandomTestId + TestUserEmailDomain,
      Role = Role.User,
      Password = "correctPassword"
    };
  }

  /// <summary>
  ///   Creates default BasicUser request for testing
  /// </summary>
  /// <returns></returns>
  public static RegisterRequest CreateUserRegisterRequest() {
    var email = TestBaseUser + RandomTestId + TestUserEmailDomain;
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
    var email = TestAdminUser + RandomTestId + TestUserEmailDomain;
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
    var email = TestExpertUser + RandomTestId + TestUserEmailDomain;
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
