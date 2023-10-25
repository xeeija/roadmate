using DAL.Entities;
using Services;
using Services.Models.Request;

namespace Tests.ServiceTests;

/// <summary>
///     Unit tests for UserService
/// </summary>
public class UserServiceTest : BaseUnitTests {
  #region TestCases

  /// <summary>
  ///     Tests Create() of the UserService
  /// </summary>
  /// <returns></returns>
  [Test]
  public async Task CreateUserTest() {
    var userService = new UserService(Context);
    var user = CreateUserRegisterRequest();

    var response = await userService.Register(user);
    Assert.IsNotNull(response);
    Assert.IsFalse(response.HasError);

    var expertUser = CreateExpertUserRegisterRequest();

    var responseExpert = await userService.Register(expertUser);
    Assert.IsNotNull(responseExpert);
    Assert.IsFalse(responseExpert.HasError);

    var responseError = await userService.Register(user);
    Assert.That(responseError, Is.Not.Null);
    Assert.Multiple(() => {
      Assert.That(responseError.HasError, Is.True);
      Assert.That(responseError.ErrorMessages?.Count, Is.GreaterThan(0));
    });
  }

  /// <summary>
  ///     Tests Login() of the UserService
  /// </summary>
  /// <returns></returns>
  [Test]
  public async Task LoginTest() {
    var userService = new UserService(Context);

    var user = CreateUserRegisterRequest();
    await userService.Register(user);

    var request = new LoginRequest(user.Email, "correctPassword");

    var response = await userService.Login(request);

    Assert.IsNotNull(response);
    Assert.IsNotNull(response.Data);
    Assert.IsNotNull(response.Data.User);
    Assert.IsNotNull(response.Data.Authentication);
    Assert.IsFalse(response.HasError);

    var requestError = new LoginRequest(user.Email, "falsePassword");

    var responseError = await userService.Login(requestError);

    Assert.IsNotNull(responseError);
    Assert.IsNull(responseError.Data.User);
    Assert.IsNull(responseError.Data.Authentication);
    Assert.IsTrue(responseError.HasError);
    Assert.That(responseError.ErrorMessages?.Count > 0);

    var requestErrorEmail = new LoginRequest("wrongmail@roadmate.com", "correctPassword");

    var responseErrorEmail = await userService.Login(requestErrorEmail);

    Assert.IsNotNull(responseErrorEmail);
    Assert.IsNull(responseErrorEmail?.Data?.User);
    Assert.IsNull(responseErrorEmail?.Data?.Authentication);
    Assert.IsTrue(responseErrorEmail?.HasError);
    Assert.That(responseErrorEmail?.ErrorMessages?.Count > 0);
  }

  #endregion

}
