using Services;

namespace Tests.ServiceTests;

public class ServiceTestTemplate : BaseUnitTests {
  protected GlobalService Service;

  public ServiceTestTemplate() {
    Service = new GlobalService();
  }
}
