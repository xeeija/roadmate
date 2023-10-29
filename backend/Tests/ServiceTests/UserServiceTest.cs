using Services;
using Services.Models.Request;

namespace Tests.ServiceTests;

/// <summary>
///   Unit tests for UserService
/// </summary>
public class UserServiceTest : BaseUnitTests {
  #region TestCases

  /// <summary>
  ///   Tests Create() of the UserService
  /// </summary>
  /// <returns></returns>
  [Test]
  public async Task CreateUserTest() {
    var userService = new UserService(Context);
    var user = CreateUserRegisterRequest();

    var response = await userService.Register(user);
    Assert.That(response, Is.Not.Null);
    Assert.That(response.HasError, Is.False);

    var expertUser = CreateExpertUserRegisterRequest();

    var responseExpert = await userService.Register(expertUser);
    Assert.That(responseExpert, Is.Not.Null);
    Assert.That(responseExpert.HasError, Is.False);

    var responseError = await userService.Register(user);
    Assert.That(responseError, Is.Not.Null);
    Assert.That(responseError.HasError, Is.True);
    Assert.That(responseError.ErrorMessages, Is.Not.Empty);
  }

  /// <summary>
  ///   Tests Login() of the UserService
  /// </summary>
  /// <returns></returns>
  [Test]
  public async Task LoginTest() {
    var userService = new UserService(Context);

    var user = CreateUserRegisterRequest();
    await userService.Register(user);

    var request = new LoginRequest(user.Email, "correctPassword");

    var response = await userService.Login(request);

    Assert.That(response, Is.Not.Null);
    Assert.That(response.Data, Is.Not.Null);
    Assert.That(response.Data?.User, Is.Not.Null);
    Assert.That(response.Data?.Authentication, Is.Not.Null);
    Assert.That(response.HasError, Is.False);
    var requestError = new LoginRequest(user.Email, "falsePassword");

    var responseError = await userService.Login(requestError);

    Assert.That(responseError, Is.Not.Null);
    Assert.That(responseError.Data?.User, Is.Null);
    Assert.That(responseError.Data?.Authentication, Is.Null);
    Assert.That(responseError.HasError, Is.True);
    Assert.That(responseError.ErrorMessages, Is.Not.Empty);
    var requestErrorEmail = new LoginRequest("wrongmail@roadmate.com", "correctPassword");

    var responseErrorEmail = await userService.Login(requestErrorEmail);

    Assert.That(responseErrorEmail, Is.Not.Null);
    Assert.That(responseErrorEmail.Data?.User, Is.Null);
    Assert.That(responseErrorEmail.Data?.Authentication, Is.Null);
    Assert.That(responseErrorEmail.HasError, Is.True);
    Assert.That(responseErrorEmail.ErrorMessages, Is.Not.Empty);
  }

  #endregion
}
