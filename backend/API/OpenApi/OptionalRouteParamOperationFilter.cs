using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace API.OpenApi;

public class OptionalRouteParamOperationFilter : IOperationFilter {
  private const string captureName = "routeParameter";

  private const string pattern = $"{{(?<{captureName}>\\w+)\\?}}";

  public void Apply(OpenApiOperation operation, OperationFilterContext context) {
    var methodAttributes = context.MethodInfo
      .GetCustomAttributes(true)
      .OfType<HttpMethodAttribute>();

    var optionalAttribute = methodAttributes.FirstOrDefault(m => m.Template?.Contains('?') ?? false);
    if (optionalAttribute == null) {
      return;
    }

    var matches = Regex.Matches(optionalAttribute.Template ?? "", pattern);

    foreach (var match in matches.ToList()) {
      var name = match.Groups[captureName].Value;

      var parameter = operation.Parameters.FirstOrDefault(p => p.In == ParameterLocation.Path && p.Name == name);
      if (parameter != null) {
        parameter.AllowEmptyValue = true;
        parameter.Required = false;
        //parameter.Schema.Default = new OpenApiString(string.Empty);
        parameter.Schema.Nullable = true;
      }
    }
  }
}
