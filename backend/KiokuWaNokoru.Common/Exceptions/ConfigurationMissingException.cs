namespace KiokuWaNokoru.Common.Exceptions
{
    public class ConfigurationMissingException(string? message = null) : Exception("Configuration is missing" + (string.IsNullOrEmpty(message) ? "" : $"for {message}"))
    {
    }
}
