using System.Collections.Generic;

namespace Mastermind.Dtos
{
    public class LoadGameResponseDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Tries { get; set; }
        public List<GuessAttempt> History { get; set; }
    }
}
