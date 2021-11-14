using System;
using System.Collections.Generic;

using Mastermind.Dtos;

namespace Mastermind.Services
{
    public class MastermindService
    {
        private Dictionary<string, GameBoard> games = new();

        private string GenerateId()
        {
            var random = new Random();
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

            var result = new char[6];

            for (var x = 0; x < result.Length; x++)
            {
                result[x] = chars[random.Next(chars.Length)];
            }

            return new string(result);
        }

        public string StartGame(string name, int tries)
        {
            string id = GenerateId();
            var game = new GameBoard(id, name, tries);
            games[id] = game;
            return id;
        }

        public SubmitResponseDto Submit(string id, string[] colors)
        {
            if (!games.TryGetValue(id, out GameBoard board)) return null;

            board.Guess(colors);
            return new SubmitResponseDto
            {
                Correct = board.Correct,
                CorrectColor = board.CorrectColors
            };

        }
    }
}
