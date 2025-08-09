using System.Text.Json;
using Backend.Models;

public class SquareService
{
    private readonly string _filePath = Path.Combine("data", "squares.json");
    private readonly SemaphoreSlim _lock = new SemaphoreSlim(1,1);

    public SquareService()
    {
        var dir = Path.GetDirectoryName(_filePath)!;
        if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
        if (!File.Exists(_filePath)) File.WriteAllText(_filePath, "[]");
    }

    public async Task<List<Square>> GetAllAsync()
    {
        await _lock.WaitAsync();
        try
        {
            var txt = await File.ReadAllTextAsync(_filePath);
            return JsonSerializer.Deserialize<List<Square>>(txt) ?? new List<Square>();
        }
        finally { _lock.Release(); }
    }

    public async Task<Square> AddAsync(Square sq)
    {
        await _lock.WaitAsync();
        try
        {
            var listTxt = await File.ReadAllTextAsync(_filePath);
            var list = JsonSerializer.Deserialize<List<Square>>(listTxt) ?? new List<Square>();

            var nextId = list.Any() ? list.Max(s => s.Id) + 1 : 1;
            sq.Id = nextId;
            sq.Index = list.Count; // append position
            list.Add(sq);

            var tmp = _filePath + ".tmp";
            var json = JsonSerializer.Serialize(list, new JsonSerializerOptions { WriteIndented = true });
            await File.WriteAllTextAsync(tmp, json);
            File.Move(tmp, _filePath, true);
            return sq;
        }
        finally { _lock.Release(); }
    }
}
