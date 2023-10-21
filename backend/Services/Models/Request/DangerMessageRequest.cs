using DAL;

namespace Services.Models.Request;

public class DangerMessageRequest : IRequestModel<DangerMessage> {
  public string Message { get; set; }
  public Guid DangerId { get; set; }
  public Guid? ReferencedMessageId { get; set; }

  public DangerMessage ToEntity() {
    return new DangerMessage {
      Message = Message,
      DangerId = DangerId,
      ReferencedMessageId = ReferencedMessageId
    };
  }
}
