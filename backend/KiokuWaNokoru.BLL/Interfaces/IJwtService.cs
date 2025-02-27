namespace KiokuWaNokoru.BLL.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(Guid userId);
    }
}
