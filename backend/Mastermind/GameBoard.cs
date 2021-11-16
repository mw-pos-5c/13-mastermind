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

        public int MaxTries { get; }
        public int Tries { get; set; }

        public int TriesLeft => MaxTries - Tries;
        
        public List<GuessAttempt> History { get; } = new();

        private readonly string[] solution;

        public GameBoard(string id, string name, int maxTries)
        {
            Id = id;
            Name = name;
            MaxTries = maxTries;
            Tries = 0;

            var random = new Random();
            solution = new string[4];
            for (var x = 0; x < solution.Length; x++)
            {
                solution[x] = AvailableColors[random.Next(AvailableColors.Length)];
            }

            Console.WriteLine(string.Join(", ", solution));
        }

        public GuessAttempt Guess(string[] guess)
        {
            if (TriesLeft <= 0 || guess.Length != 4) return null;
            Tries++;

            var correctColors = 0;
            var correct = 0;

            for (var x = 0; x < 4; x++)
            {
                if (guess[x].Equals(solution[x]))
                {
                    correct++;
                    continue;
                }

                if (solution.Contains(guess[x]))
                {
                    correctColors++;
                }
            }

            var attempt = new GuessAttempt
            {
                Colors = guess,
                Correct = correct,
                CorrectColor = correctColors
            };
            
            History.Add(attempt);
            return attempt;
        }
    }
}
