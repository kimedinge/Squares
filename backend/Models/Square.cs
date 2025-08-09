namespace Backend.Models;

public class Square
{
    public int Id { get; set; }
    public int Index { get; set; } // 0-based position index
    public string Color { get; set; } = string.Empty;
}
