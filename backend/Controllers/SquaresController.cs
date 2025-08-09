using Microsoft.AspNetCore.Mvc;
using Backend.Models;

[ApiController]
[Route("api/[controller]")]
public class SquaresController : ControllerBase
{
    private readonly SquareService _svc;
    public SquaresController(SquareService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var list = await _svc.GetAllAsync();
        return Ok(list.OrderBy(s => s.Index));
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] SquareCreateDto dto)
    {
        if (dto is null || string.IsNullOrWhiteSpace(dto.Color))
            return BadRequest("Color required");

        var sq = new Square { Color = dto.Color };
        var saved = await _svc.AddAsync(sq);
        return Ok(saved);
    }
}

public class SquareCreateDto { public string Color { get; set; } = string.Empty; }
