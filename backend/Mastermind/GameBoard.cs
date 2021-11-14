using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

namespace Mastermind
{
    public class GameBoard
    {
        public static readonly string[] AvailableColors = new[] {"green", "yellow", "blue", "red", "orange", "black"};
        
        public string Id { get; }
        public string Name { get; }
        public int TriesLeft { get; private set; }
        public int CorrectColors { get; private set; }
        public int Correct { get; private set; }

        public List<string[]> History { get; } = new();
        
        private readonly string[] solution;
        public GameBoard(string id, string name, int triesLeft)
        {
            Id = id;
            Name = name;
            TriesLeft = triesLeft;

            var random = new Random();
            solution = new string[4];
            for (var x = 0; x < solution.Length; x++)
            {
                solution[x] = AvailableColors[random.Next(AvailableColors.Length)];
            }

            Console.WriteLine(string.Join(", ", solution));
        }

        public void Guess(string[] guess)
        {
            if (TriesLeft == 0 || guess.Length != 4) return;
            TriesLeft--;

            CorrectColors = 0;
            Correct = 0;

            for (var x = 0; x < 4; x++)
            {
                if (guess[x].Equals(solution[x]))
                {
                    Correct++;
                    continue;
                }
                
                if (solution.Contains(guess[x]))
                {
                    CorrectColors++;
                }
            }
            
            History.Add(guess);
        }
    }
}
