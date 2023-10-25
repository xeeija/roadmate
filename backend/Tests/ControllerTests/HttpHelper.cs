using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Tests.ControllerTests;

/// <summary>
///     General helper class for HTTP
/// </summary>
public static class HttpHelper
{
    /// <summary>
    ///     Get serialized HTTP Content
    /// </summary>
    /// <param name="obj">Any dynamic object that should be serialized</param>
    public static StringContent GetContent(dynamic obj)
    {
        var json = JsonSerializer.Serialize(obj);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        return content;
    }

    /// <summary>
    ///     Extension method for HTTP content to read the data to a generic class
    /// </summary>
    /// <param name="obj">Extended object</param>
    public static async Task<T> ReadAsClass<T>(this HttpContent obj)
    {
        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            PropertyNameCaseInsensitive = true,
            Converters = { new JsonStringEnumConverter() }
        };

        var json = await obj.ReadAsStringAsync();

        return JsonSerializer.Deserialize<T>(json, options) ?? throw new InvalidOperationException();
    }
}