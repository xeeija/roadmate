using DAL;
using Utils;

namespace Tests;

[NonParallelizable]
public class BaseUnitTests : DefaultValues {
  protected PostgresDbContext Context;

  [OneTimeSetUp]
  public async Task Initialization() {
    Logger.InitLogger();
    Context = new PostgresDbContext();
    GenerateNewTestId();
  }


  [OneTimeTearDown]
  public async Task ClearDatabase() {
    ClearDataDefaultTemplates(Context);
  }
}
