﻿using DAL;
using Services.Models.Request;

namespace Services;

public class ExpertRequestModel : IRequestModel<ExpertRequest> {

  public Guid UserId { get; set; }
  public string Description { get; set; }

  public ExpertRequest ToEntity() {
    return new ExpertRequest {
      Description = Description,
      UserId = UserId
    };
  }
}
