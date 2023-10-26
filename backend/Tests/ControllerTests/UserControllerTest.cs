using System.Net;
using System.Net.Http.Headers;
using Services.Models.Response;

namespace Tests.ControllerTests;

/// <summary>
///   Unit tests for UserService
/// </summary>
public class UserControllerTest : ControllerTestTemplate {
  #region TestCases

  /// <summary>
  ///   Tests the registration of the API
  /// </summary>
  /// <returns></returns>
  [Test]
  public async Task RegistrationTest() {
    // Remove authentication from header
    Client.DefaultRequestHeaders.Authorization = null;

    // Generate new TestId --> First is already in use
    GenerateNewTestId();

    // Get Http request
    var content = HttpHelper.GetContent(CreateUserRegisterRequest());
    var httpResponse = await Client.PostAsync("/api/Auth/Register", content);
    var response = await httpResponse.Content.ReadAsClass<ItemResponseModel<UserResponse>>();

    // Read Http response

    // Check response data
    Assert.That(httpResponse.StatusCode, Is.EqualTo(HttpStatusCode.Created));
    Assert.That(response, Is.Not.Null);
    Assert.That(response.Data?.User, Is.Not.Null);
    Assert.That(response.Data?.Authentication?.Token, Is.Not.Null);
    Assert.That(response.HasError, Is.False);

    // Restore authentication to header
    Client.DefaultRequestHeaders.Authorization =
      new AuthenticationHeaderValue("Bearer", UserResponse.Authentication?.Token);
  }

  /// <summary>
  ///   Tests the login of the API
  /// </summary>
  /// <returns></returns>
  [Test]
  public async Task LoginBasicUserTest() {
    // Remove authentication from header
    Client.DefaultRequestHeaders.Authorization = null;

    // Get Http request
    var content = HttpHelper.GetContent(new { email = UserResponse.User?.Email, password = UserPassword });
    var httpResponse = await Client.PostAsync("/api/Auth/Login", content);

    // Read Http response
    var response = await httpResponse.Content.ReadAsClass<ItemResponseModel<UserResponse>>();

    // Check response data
    Assert.That(httpResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK));
    Assert.That(response, Is.Not.Null);
    Assert.That(response.Data?.User, Is.Not.Null);
    Assert.That(response.Data?.Authentication?.Token, Is.Not.Null);
    Assert.That(response.HasError, Is.False);

    // Restore authentication to header
    Client.DefaultRequestHeaders.Authorization =
      new AuthenticationHeaderValue("Bearer", UserResponse.Authentication?.Token);
  }

  #endregion
}
