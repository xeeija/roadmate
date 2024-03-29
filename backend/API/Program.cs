using System.Text.Json.Serialization;
using API.OpenApi;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Services;
using Services.Authentication;
using Utils;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddScoped<GlobalService>();
builder.Services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddControllers();

builder.Services.AddControllersWithViews().AddNewtonsoftJson().AddJsonOptions(
  options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter())
);

builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
  options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore
);

builder.Services.AddControllers().AddNewtonsoftJson(options =>
  options.SerializerSettings.Converters.Add(new StringEnumConverter())
);

builder.Services.AddCors(options =>
  options.AddPolicy("Cors", policy => policy.WithOrigins("*").AllowAnyMethod().AllowAnyHeader())
);
// options.AddPolicy("Cors", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

builder.Services.AddHealthChecks();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerGenOptions>();
// builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(options => {
  options.OperationFilter<SwaggerDefaultValues>();
  options.IncludeXmlComments(Path.Combine(Constants.CurrentFolder ?? "", "API.xml"));
});

// authentication
builder.Services.AddAuthentication(x => {
  x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => { options.TokenValidationParameters = Authentication.ValidationParams; });

// Add authentication to Swagger
builder.Services.AddSwaggerGen(options => {
  options.SwaggerDoc("v1", new OpenApiInfo {
    Version = "v1",
    Title = "Roadmate API"
    // Description = "Roadmate backend description"
  });

  options.OperationFilter<OptionalRouteParamOperationFilter>();

  options.AddSecurityDefinition("Bearer",
    new OpenApiSecurityScheme {
      Type = SecuritySchemeType.ApiKey,
      Name = "Authorization",
      In = ParameterLocation.Header,
      Scheme = "Bearer",
      BearerFormat = "JWT",
      Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer ey12345abcdef'"
    });

  options.AddSecurityRequirement(new OpenApiSecurityRequirement {
    {
      new OpenApiSecurityScheme {
        Reference = new OpenApiReference {
          Type = ReferenceType.SecurityScheme,
          Id = "Bearer"
        }
      },
      Array.Empty<string>()
    }
  });
});

var app = builder.Build();

app.UseCors("Cors");

app.MapHealthChecks("health");

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment()) {
app.UseSwagger();
app.UseSwaggerUI();
// }

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program {
}
