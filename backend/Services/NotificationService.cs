using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using DAL;
using DAL.Entities;

namespace Services;

public class NotificationService : BaseService<Notification> {
  public NotificationService(PostgresDbContext context) : base(context) {
    // DangerCreated += OnDangerCreated;


  }
  /* private async void OnDangerCreated(Notification notification) {
     Log.Information($"Danger created: {notification.Description}");

     await Create(new Notification {
       Description = "Test",
       //Url = new Uri($"https://localhost:5001/danger/{danger.Id}"),
       //DateTime = DateTime.UtcNow,
       //UserId = danger.UserId,
       //RouteId = danger.RouteId,
       //DangerId = danger.Id


     });
   }*/

  public Task<List<Notification>> FindLatestNotifications(
    Expression<Func<Danger, bool>>? filter = null
  ) {
    var filteredDanger = filter == null ? Context.Danger.Where(n => n.ActiveAt >= System.DateTime.Now - System.TimeSpan.FromDays(1) && n.ResolvedAt == null) : Context.Danger;
    // TODO: Filter by Location?!
    var foundNotification = filteredDanger.SelectMany(danger => danger.Notifications)
      .OrderByDescending(n => n.CreatedAt)
      .ToList();
    return Task.FromResult(foundNotification);
  }

}

