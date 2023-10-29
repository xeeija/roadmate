using DAL;
using Utils;

namespace Tests;

[NonParallelizable]
public class BaseUnitTests : DefaultValues {
  protected PostgresDbContext Context;

  [OneTimeSetUp]
  public void Initialization() {
    Logger.InitLogger();
    Context = new PostgresDbContext();
    GenerateNewTestId();
  }


  [OneTimeTearDown]
  public void ClearDatabase() {
    ClearDataDefaultTemplates(Context);
  }
}
