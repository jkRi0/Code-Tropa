// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        // Store 3 player names and scores in arrays
        string[] names = {"Juan", "Maria", "Pedro"};
        int[] scores = {85, 92, 78};
        
        Console.WriteLine("Larong Kalye Leaderboard");
        Console.WriteLine("=======================");
        
        // Print each player's name and score using a loop
        for (int i = 0; i < names.Length; i++) {
            Console.WriteLine($"Player {i + 1}: {names[i]} - {scores[i]} points");
        }
        
        Console.WriteLine("=======================");
    }
}`,

    average: `
using System;
using System.Linq;

class Player {
    public string Name { get; set; }
    public int Score { get; set; }
    
    public Player(string name, int score) {
        Name = name;
        Score = score;
    }
}

class Program {
    static void Main() {
        // Player data
        string[] names = {"Juan", "Maria", "Pedro"};
        int[] scores = {85, 92, 78};
        
        // Create array of Player objects for sorting
        Player[] players = new Player[names.Length];
        for (int i = 0; i < names.Length; i++) {
            players[i] = new Player(names[i], scores[i]);
        }
        
        // Sort by score (highest first)
        players = players.OrderByDescending(p => p.Score).ToArray();
        
        Console.WriteLine("Larong Kalye Leaderboard (Sorted)");
        Console.WriteLine("================================");
        
        // Display ranked leaderboard
        string[] positions = {"1st Place", "2nd Place", "3rd Place"};
        for (int i = 0; i < players.Length; i++) {
            Console.WriteLine($"{positions[i]}: {players[i].Name} - {players[i].Score} points");
        }
        
        Console.WriteLine("================================");
    }
}`,

    difficult: `
using System;
using System.Linq;

class Player {
    public string Name { get; set; }
    public int Score { get; set; }
    
    public Player(string name, int score) {
        Name = name;
        Score = score;
    }
}

class Program {
    static string GetRankText(int rank) {
        switch (rank) {
            case 1: return "1st";
            case 2: return "2nd";
            case 3: return "3rd";
            default: return $"{rank}th";
        }
    }
    
    static void Main() {
        // Extended player data with ties
        string[] names = {"Juan", "Maria", "Pedro", "Ana", "Carlos"};
        int[] scores = {85, 92, 78, 85, 70};
        
        // Create array of Player objects
        Player[] players = new Player[names.Length];
        for (int i = 0; i < names.Length; i++) {
            players[i] = new Player(names[i], scores[i]);
        }
        
        // Sort by score (highest first)
        players = players.OrderByDescending(p => p.Score).ToArray();
        
        Console.WriteLine("Larong Kalye Leaderboard (Complete)");
        Console.WriteLine("==================================");
        Console.WriteLine("Rank  Name    Score");
        Console.WriteLine("----  ----    -----");
        
        // Display formatted leaderboard with tie handling
        int currentRank = 1;
        for (int i = 0; i < players.Length; i++) {
            if (i > 0 && players[i].Score != players[i-1].Score) {
                currentRank = i + 1;
            }
            
            string rankText = GetRankText(currentRank);
            string tieNote = (i > 0 && players[i].Score == players[i-1].Score) ? 
                           $" (tied with {players[i-1].Name})" : "";
            
            Console.WriteLine($"{rankText,-4}  {players[i].Name,-6}  {players[i].Score}{tieNote}");
        }
        
        // Calculate and display statistics
        int highest = scores.Max();
        int lowest = scores.Min();
        double average = scores.Average();
        
        Console.WriteLine();
        Console.WriteLine("Statistics:");
        Console.WriteLine($"Highest Score: {highest}");
        Console.WriteLine($"Lowest Score: {lowest}");
        Console.WriteLine($"Average Score: {average:F1}");
        Console.WriteLine("==================================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
