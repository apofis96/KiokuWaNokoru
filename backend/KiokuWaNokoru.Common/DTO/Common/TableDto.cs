namespace KiokuWaNokoru.Common.DTO.Common
{
    public class TableDto<T> where T : class
    {
        public IEnumerable<T> Items { get; set; } = null!;
        public int Total { get; set; }
    }
}
