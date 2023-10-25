using System.Net.Http.Headers;
using DAL.Entities;
using Microsoft.AspNetCore.Mvc.Testing;
using Services;
using Services.Models.Request;
using Services.Models.Response;

namespace Tests.ControllerTests;

/// <summary>
///     Basic test template for all controller tests.
///     Http client and users are initialized.
/// </summary>
public class ControllerTestTemplate : BaseUnitTests {
  protected WebApplicationFactory<Program> Application;
  protected UserResponse UserResponse;
  protected string UserPassword;
  protected UserResponse AdminResponse;
  protected string AdminPassword;
  protected HttpClient Client;
  protected HttpClient ClientAdmin;


  /// <summary>
  ///     Initialize the Http client
  /// </summary>
  [OneTimeSetUp]
  public async Task SetupTestServer() {
    Application = new WebApplicationFactory<Program>();
    Client = Application.CreateClient();
    ClientAdmin = Application.CreateClient();
  }

  /// <summary>
  ///     Initialize the basic user and authentication
  /// </summary>
  [OneTimeSetUp]
  public async Task SetupBasicTestUser() {
    var userService = new UserService(Context);

    // Get Authentication of basic user
    var user = CreateUserRegisterRequest();
    var register = await userService.Register(user);
    Assert.That(register, Is.Not.Null);
    Assert.That(register.HasError, Is.False);

    var loginResult = await userService.Login(new LoginRequest(user.Email, user.Password));
    Assert.IsNotNull(loginResult);
    Assert.IsFalse(loginResult.HasError);

    UserPassword = user.Password;
    UserResponse = loginResult.Data ?? throw new InvalidOperationException();

    Client.DefaultRequestHeaders.Authorization =
        new AuthenticationHeaderValue("Bearer", UserResponse.Authentication.Token);
  }

  /// <summary>
  ///     Initialize the admin user and authentication
  /// </summary>
  [OneTimeSetUp]
  public async Task SetupAdminTestUser() {
    var userService = new UserService(Context);

    // Get Authentication of basic user
    var adminUser = CreateAdminUserRegisterRequest();
    var register = await userService.Register(adminUser);
    register?.ErrorMessages.ForEach(e => log.Debug("register admin " + e));

    Assert.That(register, Is.Not.Null);
    Assert.Multiple(() => {
      Assert.That(register?.HasError, Is.False);
      Assert.That(register?.Data, Is.Not.Null);
    });
    if (register?.Data != null) {
      register.Data.Role = Role.Admin;
    }
    var updateUser = await userService.Update(register.Data);
    Assert.That(updateUser, Is.Not.Null);
    Assert.Multiple(() => {
      Assert.That(updateUser.HasError, Is.False);
      Assert.That(updateUser?.Data?.Role, Is.EqualTo(Role.Admin));
    });
    var loginResult = await userService.Login(new LoginRequest(adminUser.Email, adminUser.Password));
    Assert.That(loginResult, Is.Not.Null);
    Assert.That(loginResult.HasError, Is.False);

    AdminPassword = adminUser.Password;
    AdminResponse = loginResult.Data ?? throw new InvalidOperationException();
    log.Debug("Auth admin " + AdminResponse.Authentication.Token);

    ClientAdmin.DefaultRequestHeaders.Authorization =
        new AuthenticationHeaderValue("Bearer", AdminResponse.Authentication.Token);
  }

  /// <summary>
  ///     Dispose Http Client
  /// </summary>
  [OneTimeTearDown]
  public new async Task ClearDatabase() {
    Client.Dispose();
    ClientAdmin.Dispose();
    await Application.DisposeAsync();
  }
}
