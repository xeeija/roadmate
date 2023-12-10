using System.Linq.Expressions;
using DAL;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Serilog;
using Services.Models.Response;
using Utils;

namespace Services;

/// <summary>
///   Class represents the base services.
/// </summary>
public class BaseService<TEntity> where TEntity : Entity {
  /// <value>Represents the DB Context.</value>
  public PostgresDbContext Context;

  protected ILogger Log = Logger.ContextLog<BaseService<TEntity>>();

  public BaseService(PostgresDbContext context) {
    Context = context;
  }

  /// <value>Represents the current user.</value>
  public User? CurrentUser { get; private set; }

  #region base methods

  /// <summary>
  ///   Creates a new entry into the DB.
  /// </summary>
  /// <param name="entity">Represents the operating entity.</param>
  /// <returns>Returns the operating entity and error information.</returns>
  public virtual async Task<ItemResponseModel<TEntity>> Create(TEntity entity) {
    // Validation
    var validation = await ValidateCreate(entity);

    var response = new ItemResponseModel<TEntity>(validation);

    if (!response.IsAuthorized || response.HasError) {
      return response;
    }

    // DB operation
    try {
      var dbResponse = await Context.Set<TEntity>().AddAsync(entity);
      await Context.SaveChangesAsync();

      // DB operation check
      if (dbResponse.State != EntityState.Unchanged) {
        response.ErrorMessages.Add("Wrong database response state. (State: " + dbResponse.State + ")");
        return response;
      }

      // Success response
      response.Data = dbResponse.Entity;
      return response;
    }
    catch (Exception ex) {
      if (ex.InnerException is PostgresException dbex) {
        // if (dbex.SqlState == "23503") {
        //   var column = dbex.ConstraintName?.Split("_").Last();
        //   response.ErrorMessages.Add($"{column} is invalid (Code {dbex.SqlState})");
        // }
        // else {
        response.ErrorMessages.Add($"{dbex.MessageText} (Code {dbex.SqlState})");
        // }

        return response;
      }

      throw;
    }
  }

  /// <summary>
  ///   Update an entry into the DB.
  /// </summary>
  /// <param name="entity">Represents the operating entity.</param>
  /// <returns>Returns the operating entity and error information.</returns>
  public virtual async Task<ItemResponseModel<TEntity>> Update(TEntity entity) {
    // Validation
    var validation = await ValidateUpdate(entity);

    var response = new ItemResponseModel<TEntity>(validation);

    if (validation.HasError || !validation.IsAuthorized) {
      return response;
    }

    // Set updated date
    entity.UpdatedAt = DateTime.UtcNow;

    // DB operation
    try {
      var dbResponse = Context.Set<TEntity>().Update(entity);
      await Context.SaveChangesAsync();

      // DB operation check
      if (dbResponse.State != EntityState.Unchanged) {
        response.ErrorMessages.Add("Wrong database response state. (State: " + dbResponse.State + ")");
        return response;
      }

      // Success response
      response.Data = dbResponse.Entity;
      return response;
    }
    catch (Exception ex) {
      if (ex.InnerException is PostgresException dbex) {
        response.ErrorMessages.Add($"{dbex.MessageText} (Code {dbex.SqlState})");
        return response;
      }

      throw;
    }
  }

  /// <summary>
  ///   Deletes an entry into the DB.
  /// </summary>
  /// <param name="entity">Represents the operating entity.</param>
  /// <returns>Returns the operating entity and error information.</returns>
  public virtual async Task<ItemResponseModel<TEntity>> Delete(TEntity entity) {
    var response = new ItemResponseModel<TEntity> {
      IsAuthorized = await Authorize(entity)
    };

    if (!response.IsAuthorized) {
      return response;
    }

    // DB operation
    try {
      var dbResponse = Context.Set<TEntity>().Remove(entity);
      await Context.SaveChangesAsync();

      // DB operation check
      if (dbResponse.State != EntityState.Detached) {
        response.ErrorMessages.Add("Wrong database response state. (State: " + dbResponse.State + ")");
        return response;
      }

      // Success response
      response.Data = dbResponse.Entity;
      return response;
    }
    catch (Exception ex) {
      if (ex.InnerException is PostgresException dbex) {
        response.ErrorMessages.Add($"{dbex.MessageText} (Code {dbex.SqlState})");
        return response;
      }

      throw;
    }
  }

  /// <summary>
  ///   Deletes an entry into the DB.
  /// </summary>
  /// <param name="id">Unique DB id.</param>
  /// <returns>Returns the operating entity and error information.</returns>
  public virtual async Task<ItemResponseModel<TEntity>> Delete(string id) {
    var response = new ItemResponseModel<TEntity>();

    // Check GUID
    var guidValid = Guid.TryParse(id, out var guid);

    if (!guidValid) {
      response.ErrorMessages.Add("Invalid UUID format");
      return response;
    }

    var existingModel = await Get(id);
    if (existingModel.Data != null && !await Authorize(existingModel.Data)) {
      existingModel.IsAuthorized = false;
      return existingModel;
    }

    // TODO: Don't know why this fuck is not working?!?!
    //// DB operation - Get entity
    //var getResponse = await Get(id);

    //if (getResponse.HasError && getResponse.Data != null)
    //{
    //    return getResponse;
    //}

    //// DB operation - delete
    //var dbResponseX = Context.Set<TEntity>().Remove(getResponse.Data);
    //await Context.SaveChangesAsync();

    // DB operation - delete
    var dbResponse = Context.Set<TEntity>().Where(x => x.ID == guid).ExecuteDelete();

    // DB operation check
    if (dbResponse == 0) {
      response.ErrorMessages.Add("No data deleted.");
      return response;
    }

    // Success response

    return await Task.FromResult(response);
  }

  /// <summary>
  ///   Deletes the entries of the entity by the filterExpression.
  /// </summary>
  /// <param name="filterExpression">Defines what should be filtered by</param>
  /// <returns>Returns count of deleted entries.</returns>
  public virtual async Task<int> Delete(Expression<Func<TEntity, bool>> filterExpression) {
    // DB operation - delete
    var dbResponse = Context.Set<TEntity>().Where(filterExpression).ExecuteDelete();

    // Success response
    return await Task.FromResult(dbResponse);
  }

  /// <summary>
  ///   Gets an entry by the id.
  /// </summary>
  /// <param name="id">unique ID of the entity</param>
  /// <param name="includes">Related entities to include</param>
  /// <returns>Returns the operating entity and error information.</returns>
  public virtual async Task<ItemResponseModel<TEntity>> Get(string id, List<string>? includes) {
    var response = new ItemResponseModel<TEntity>();

    var guidValid = Guid.TryParse(id, out var guid);

    if (!guidValid) {
      response.ErrorMessages.Add("Invalid UUID format");
      return response;
    }

    // DB operation
    var dbResponse = Context.Set<TEntity>().Where(x => x.ID == guid);

    // Add includes
    if (includes != null) {
      foreach (var include in includes) {
        dbResponse = dbResponse.Include(include);
      }
    }

    // DB operation check
    if (dbResponse.Count() > 1) {
      response.ErrorMessages.Add("Multiple return values.");
      return response;
    }

    var entity = dbResponse.FirstOrDefault();

    // TODO: Not relevant for now, we would need a seperate "authorize" for read, that allows more than for crud

    // if (entity != null && !await Authorize(entity))
    // {
    //     response.IsAuthorized = false;
    //     return response;
    // }

    // Success response
    response.Data = entity;
    return await Task.FromResult(response);
  }


  /// <summary>
  ///   Gets an entry by the id.
  /// </summary>
  /// <param name="id">Unique DB id.</param>
  /// <returns>Returns the operating entity and error information.</returns>
  public virtual async Task<ItemResponseModel<TEntity>> Get(string id) {
    return await Get(id, null);
  }

  /// <summary>
  ///   Gets all entries of the entity.
  /// </summary>
  /// <returns>Returns the operating entity and error information.</returns>
  public virtual async Task<ItemResponseModel<List<TEntity>>> GetAll(List<string>? includes) {
    var response = new ItemResponseModel<List<TEntity>>();

    // DB operation
    var dbResponse = Context.Set<TEntity>().Select(x => x);

    // Add includes
    if (includes != null) {
      foreach (var include in includes) {
        dbResponse = dbResponse.Include(include);
      }
    }

    response.Data = dbResponse.ToList();

    return await Task.FromResult(response);
  }

  /// <summary>
  ///   Gets all entries of the entity.
  ///   <returns>Returns the operating entities and error information.</returns>
  /// </summary>
  public virtual async Task<ItemResponseModel<List<TEntity>>> GetAll() {
    return await GetAll(null);
  }

  /// <summary>
  ///   Filters the entries of the entity by the filterExpression.
  /// </summary>
  /// <param name="filterExpression">Defines what should be filtered by</param>
  /// <returns>Returns the operating entities and error information.</returns>
  public virtual async Task<ItemResponseModel<List<TEntity>>> Filter(Expression<Func<TEntity, bool>> filterExpression) {
    var response = new ItemResponseModel<List<TEntity>>();

    // DB operation
    var dbResponse = Context.Set<TEntity>().Where(filterExpression);

    // Success response
    response.Data = dbResponse.ToList();
    return await Task.FromResult(response);
  }

  /// <summary>
  ///   Sets the current user by email.
  /// </summary>
  /// <param name="email">Defines the email.</param>
  public Task LoadUser(string email) {
    CurrentUser = Context.User.First(x => x.Email.ToLower() == email.ToLower());
    return Task.CompletedTask;
  }

  #endregion

  #region validation

  /// <summary>
  ///   Validates an entry for update and create.
  /// </summary>
  /// <param name="entity">Represents the operating entity.</param>
  /// <returns>Returns the error information.</returns>
  public virtual async Task<ResponseModel> ValidateBase(TEntity entity) {
    var response = new ResponseModel {
      IsAuthorized = await Authorize(entity)
    };

    return await Task.FromResult(response);
  }

  /// <summary>
  ///   Validates an create entry.
  /// </summary>
  /// <param name="entity">Represents the operating entity.</param>
  /// <returns>Returns the error information.</returns>
  public virtual async Task<ResponseModel> ValidateCreate(TEntity entity) {
    var response = new ResponseModel();

    var baseValidation = await ValidateBase(entity);
    response.IsAuthorized = baseValidation.IsAuthorized;

    if (baseValidation.HasError) {
      response.ErrorMessages.AddRange(baseValidation.ErrorMessages);
      return response;
    }

    return await Task.FromResult(response);
  }

  /// <summary>
  ///   Validates an update entry.
  /// </summary>
  /// <param name="entity">Represents the operating entity.</param>
  /// <returns>Returns the error information.</returns>
  public virtual async Task<ResponseModel> ValidateUpdate(TEntity entity) {
    var response = new ResponseModel();

    var baseValidation = await ValidateBase(entity);
    response.IsAuthorized = baseValidation.IsAuthorized;

    if (baseValidation.HasError) {
      response.ErrorMessages.AddRange(baseValidation.ErrorMessages);
      return response;
    }

    return await Task.FromResult(response);
  }

  public virtual Task<bool> Authorize(TEntity entity) {
    return Task.FromResult(true);
  }

  // TODO: Not needed currently, needed for GetAll filter async
  // private async Task<IEnumerable<T>> FilterAsync<T>(IEnumerable<T> sourceEnumerable, Func<T, Task<bool>> predicateAsync)
  // {
  //     return (await Task.WhenAll(
  //         sourceEnumerable.Select(
  //             v => predicateAsync(v)
  //             .ContinueWith(task => new { Predicate = task.Result, Value = v })))
  //         ).Where(a => a.Predicate).Select(a => a.Value);
  // }

  #endregion
}
