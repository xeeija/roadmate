using DAL;
using DAL.Entities;

namespace Services;

public class NotificationService : BaseService<Notification> {
  public NotificationService(PostgresDbContext context) : base(context) {
  }
}
