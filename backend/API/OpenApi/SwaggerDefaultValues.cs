using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace API.OpenApi;

/// <summary>
///   Configures the Swagger default values to support API versioning in the generated Swagger documents.
///   @see https://markgossa.com/2022/05/asp-net-6-api-versioning-swagger.html
/// </summary>
public class SwaggerDefaultValues : IOperationFilter {
  public void Apply(OpenApiOperation operation, OperationFilterContext context) {
    var apiDescription = context.ApiDescription;

    // operation.Deprecated |= apiDescription.IsDeprecated();

    if (operation.Parameters is null) {
      return;
    }

    foreach (var parameter in operation.Parameters) {
      var description = apiDescription.ParameterDescriptions.First(p => p.Name == parameter.Name);

      if (parameter.Description is null) {
        parameter.Description = description.ModelMetadata?.Description;
      }

      if (parameter.Schema.Default is null && description.DefaultValue is not null) {
        parameter.Schema.Default = new OpenApiString(description.DefaultValue.ToString());
      }

      parameter.Required |= description.IsRequired;
    }
  }
}
