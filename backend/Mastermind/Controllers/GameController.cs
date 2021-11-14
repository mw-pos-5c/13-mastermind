using Mastermind.Dtos;
using Mastermind.Services;

using Microsoft.AspNetCore.Mvc;

namespace Mastermind.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {
        private readonly MastermindService service;

        public GameController(MastermindService service)
        {
            this.service = service;
        }

        [HttpPost("Start")]
        public IActionResult Start([FromBody] NewGameDto dto)
        {

            if (dto.Name.Length == 0 || dto.Tries is < 6 or > 12)
            {
                return BadRequest();
            }
            
            return Ok(new NewGameResponseDto
            {
                GameId = service.StartGame(dto.Name, dto.Tries)
            });
        }
        
        [HttpPost("Submit")]
        public IActionResult Submit([FromBody] SubmitDto dto)
        {
           return Ok(service.Submit(dto.GameId, dto.Colors));
        }

        [HttpGet("GetAvailableColors")]
        public IActionResult GetAvailableColors()
        {
            return Ok(GameBoard.AvailableColors);
        }
    }
}
