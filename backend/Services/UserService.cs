using System.ComponentModel.DataAnnotations;
using DAL;
using DAL.Entities;
using DAL.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Services.Models.Request;
using Services.Models.Response;

namespace Services;

/// <summary>
///   Class represents specific user services beside the base services.
/// </summary>
public class UserService : BaseService<User> {
  public UserService(PostgresDbContext context) : base(context) {
  }


  #region Get

  public override async Task<ItemResponseModel<User>> Get(string id) {
    var includes = new List<string>();
    var response = await base.Get(id, includes);

    if (response == null) {
      return new ItemResponseModel<User>();
    }

    return response;
  }

  #endregion

  #region Update

  /// <summary>
  ///   Updates an user in the database.
  /// </summary>
  /// <param name="id">Id of the user</param>
  /// <param name="request">Update User request containing the properties to be updated</param>
  /// <typeparam name="T">BasicUser or BusinessUser</typeparam>
  /// <returns>Updated User</returns>
  public async Task<ItemResponseModel<User>> UpdateUser(string id, UpdateUserRequest request) {
    var response = new ItemResponseModel<User>();

    // Check if current user is authenticated (was obtained successfully from the authentication information)
    if (CurrentUser == null) {
      response.ErrorMessages.Add("You are not authenticated!");
      return response;
    }

    // Check if user is updating themselves
    if (CurrentUser.ID != Guid.Parse(id)) {
      response.ErrorMessages.Add("You can only update your own user!");
      return response;
    }

    // Update current user with provided changes

    var user = CurrentUser;

    // Set updated date
    user.UpdatedAt = DateTime.UtcNow;

    // If new email is provided, update it
    // Note: If email is changed, the user has to reauthenticate
    if (request.Email != user.Email && !string.IsNullOrEmpty(request.Email)) {
      user.Email = request.Email;
    }

    if (request.Username != user.Username && !string.IsNullOrEmpty(request.Username)) {
      user.Username = request.Username;
    }

    if (request.Displayname != user.Displayname && !string.IsNullOrEmpty(request.Displayname)) {
      user.Displayname = request.Displayname;
    }

    // If new password is provided, check if the current password is also provided and correct, encrypt and update it
    if (!string.IsNullOrEmpty(request.NewPassword) &&
        Password.EncryptPassword(request.NewPassword) != user.Password) {
      if (string.IsNullOrEmpty(request.CurrentPassword) ||
          !Password.CheckPassword(request.CurrentPassword, user.Password)) {
        response.ErrorMessages.Add("Current password is incorrect");
        return response;
      }

      user.Password = Password.EncryptPassword(request.NewPassword);
    }

    // Validate user
    var validation = await ValidateUpdate(user);

    if (validation.HasError) {
      response.ErrorMessages.Add("Validation Error");
      response.ErrorMessages.AddRange(validation.ErrorMessages);
      return response;
    }

    // DB operation
    var dbResponse = Context.User.Update(user);
    await Context.SaveChangesAsync();

    // DB operation check
    if (dbResponse.State != EntityState.Unchanged) {
      response.ErrorMessages.Add("Wrong database response state. (State: " + dbResponse.State + ")");
      return response;
    }

    // Success response
    response.Data = dbResponse.Entity;
    return await Task.FromResult(response);
  }

  #endregion

  #region Login/Register

  /// <summary>
  ///   Checks login request with database content.
  /// </summary>
  /// <param name="loginRequest">Represents the login request for an user.</param>
  /// <returns>Returns the response information with user.</returns>
  public async Task<ItemResponseModel<UserResponse>> Login(LoginRequest loginRequest) {
    var response = new ItemResponseModel<UserResponse> {
      Data = new UserResponse()
    };

    // Validation
    var validation = ValidateLogin(loginRequest);

    if (validation.HasError) {
      response.ErrorMessages.AddRange(validation.ErrorMessages);
      return response;
    }

    var user = Context.User.FirstOrDefault(x => x.Email == loginRequest.Email);

    // Check email
    if (user == null) {
      response.ErrorMessages.Add("Email is incorrect");
      return response;
    }

    // Check password
    if (!Password.CheckPassword(loginRequest.Password, user.Password)) {
      response.ErrorMessages.Add("Password is incorrect");
      return response;
    }

    // Check Authentication
    var auth = new Authentication.Authentication(Context);
    var info = await auth.Authenticate(user);

    if (info == null) {
      response.ErrorMessages.Add("Authentication error");
      return response;
    }

    // Success response
    response.Data.AuthenticationInformation = info;
    response.Data.User = user;
    return await Task.FromResult(response);
  }

  /// <summary>
  ///   Registers new basic user in database.
  /// </summary>
  /// <param name="registerRequest">Represents request for an new basic user.</param>
  /// <returns>Returns the response information with user.</returns>
  public async Task<ItemResponseModel<User>> Register(RegisterRequest registerRequest) {
    return await CreateUser(registerRequest.ToEntity());
  }

  #endregion

  #region Create

  /// <summary>
  ///   Creates an new user in the database.
  /// </summary>
  /// <param name="user">Represents the new user.</param>
  /// <returns>Returns the response information with user.</returns>
  private async Task<ItemResponseModel<User>> CreateUser(User user) {
    var response = new ItemResponseModel<User>();

    // Validation
    var validation = await ValidateCreate(user);

    if (validation.HasError) {
      response.ErrorMessages.AddRange(validation.ErrorMessages);
      return response;
    }

    // Encrypt Password
    user.Password = Password.EncryptPassword(user.Password);

    // DB operation
    var dbResponse = await Context.User.AddAsync(user);
    await Context.SaveChangesAsync();

    // DB operation check
    if (dbResponse.State != EntityState.Unchanged) {
      response.ErrorMessages.Add("Wrong database response state. (State: " + dbResponse.State + ")");
      return response;
    }

    response.Data = user;

    // Success response
    return await Task.FromResult(response);
  }

  /// <summary>
  ///   The Create method is not supported for users.
  ///   For users the Register method is provided.
  /// </summary>
  /// <param name="user">Not used.</param>
  public override async Task<ItemResponseModel<User>> Create(User user) {
    throw new NotSupportedException("Use Register method to create an user!");
  }

  #endregion

  #region Validation

  /// <summary>
  ///   Overrides the base validation of the base services.
  /// </summary>
  /// <param name="entity">Represents the operating entity.</param>
  /// <returns>Returns the error information.</returns>
  public override async Task<ResponseModel> ValidateBase(User entity) {
    var response = new ResponseModel();

    var baseValidation = await base.ValidateBase(entity);

    if (baseValidation.HasError) {
      response.ErrorMessages.AddRange(baseValidation.ErrorMessages);
      return response;
    }

    // Check email
    if (entity.Email.IsNullOrEmpty()) {
      response.ErrorMessages.Add("No email provided!");
      return response;
    }

    var email = new EmailAddressAttribute();

    if (!email.IsValid(entity.Email)) {
      response.ErrorMessages.Add("Email pattern does not match!");
      return response;
    }

    // Check password
    if (entity.Password.IsNullOrEmpty()) {
      response.ErrorMessages.Add("No password provided!");
      return response;
    }

    // Check role
    if (entity.Role == null) {
      response.ErrorMessages.Add("No role provided!");
      return response;
    }

    if (entity.Username.IsNullOrEmpty()) {
      response.ErrorMessages.Add("No name provided!");
      return response;
    }

    return await Task.FromResult(response);
  }

  /// <summary>
  ///   Overrides the validation for creation of the base services.
  /// </summary>
  /// <param name="entity">Represents the operating entity.</param>
  /// <returns>Returns the error information.</returns>
  public override async Task<ResponseModel> ValidateCreate(User entity) {
    var response = new ResponseModel();

    var baseValidation = await base.ValidateCreate(entity);

    if (baseValidation.HasError) {
      response.ErrorMessages.AddRange(baseValidation.ErrorMessages);
      return response;
    }

    // Check if email exists
    var dbResponse = await Context.User.Where(x => x.Email == entity.Email).FirstOrDefaultAsync();

    if (dbResponse != null) {
      response.ErrorMessages.Add("Email already exists!");
      return response;
    }

    return await Task.FromResult(response);
  }

  /// <summary>
  ///   Overrides the validation for updates of the base services.
  /// </summary>
  /// <param name="entity">Represents the operating entity.</param>
  /// <returns>Returns the error information.</returns>
  public override async Task<ResponseModel> ValidateUpdate(User entity) {
    var response = new ResponseModel();

    var baseValidation = await base.ValidateUpdate(entity);

    if (baseValidation.HasError) {
      response.ErrorMessages.AddRange(baseValidation.ErrorMessages);
      return response;
    }

    // Check if email exists
    var dbResponse = await Context.User.Where(x => x.Email == entity.Email && x.ID != entity.ID).FirstOrDefaultAsync();

    if (dbResponse != null) {
      response.ErrorMessages.Add("Email already exists!");
      return response;
    }

    return await Task.FromResult(response);
  }

  /// <summary>
  ///   Validates the login request.
  /// </summary>
  /// <param name="loginRequest">Represents the login request for an user.</param>
  /// <returns>Returns the response information with user and authentication information.</returns>
  private static ResponseModel ValidateLogin(LoginRequest loginRequest) {
    var response = new ResponseModel();

    // Check email
    if (loginRequest.Email.IsNullOrEmpty()) {
      response.ErrorMessages.Add("No email provided!");
      return response;
    }

    var email = new EmailAddressAttribute();

    if (!email.IsValid(loginRequest.Email)) {
      response.ErrorMessages.Add("Email format is not valid!");
      return response;
    }

    // Check password
    if (loginRequest.Password.IsNullOrEmpty()) {
      response.ErrorMessages.Add("No password provided!");
      return response;
    }

    return response;
  }

  #endregion
}
