﻿using DAL.Entities;

namespace Services.Models.Request;

public class RegisterRequest : IRequestModel<User> {
  public string Username { get; set; }
  public string Email { get; set; }
  public string Password { get; set; }
  public string? Displayname { get; set; }

  public User ToEntity() {
    return new User {
      Email = Email,
      Password = Password,
      Username = Username,
      Displayname = Displayname
    };
  }
}
