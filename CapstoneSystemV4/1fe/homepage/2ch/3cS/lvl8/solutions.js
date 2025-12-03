// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        // Create an array of 3 predefined moves
        string[] moves = {"straight", "left", "right"};
        
        Console.WriteLine("Tikbalang Escape Route");
        Console.WriteLine("=====================");
        
        // Use a loop to print a sequence of 3 predefined moves
        for (int i = 0; i < moves.Length; i++) {
            Console.WriteLine($"Move {i + 1}: {moves[i]}");
        }
        
        Console.WriteLine("=====================");
    }
}`,

    average: `
using System;

class Program {
    static void Main() {
        Random random = new Random();
        string[] possibleMoves = {"straight", "offer gift", "hide"};
        
        Console.WriteLine("Tikbalang Forest Adventure");
        Console.WriteLine("=========================");
        
        // Add random choices with different outcomes
        for (int i = 1; i <= 3; i++) {
            int randomIndex = random.Next(possibleMoves.Length);
            string move = possibleMoves[randomIndex];
            
            Console.WriteLine($"Move {i}: {move}");
            
            // Show different outcomes for each move
            if (move == "straight") {
                Console.WriteLine("Outcome: You find a hidden path!");
            } else if (move == "offer gift") {
                Console.WriteLine("Outcome: Tikbalang accepts gift! Safe passage.");
            } else if (move == "hide") {
                Console.WriteLine("Outcome: You successfully hide from danger!");
            }
            Console.WriteLine();
        }
        
        Console.WriteLine("=========================");
    }
}`,

    difficult: `
using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Random random = new Random();
        
        // Game state
        int health = 100;
        List<string> pathHistory = new List<string>();
        string[] possibleMoves = {"straight", "left", "right", "offer gift", "hide"};
        
        Console.WriteLine("Tikbalang Escape Game");
        Console.WriteLine("===================");
        
        // Game loop - continue until health reaches 0 or escape
        while (health > 0 && pathHistory.Count < 5) {
            Console.WriteLine($"Health: {health}");
            Console.WriteLine($"Path History: [{string.Join(", ", pathHistory)}]");
            Console.WriteLine();
            
            // Generate random move
            int randomIndex = random.Next(possibleMoves.Length);
            string move = possibleMoves[randomIndex];
            
            Console.WriteLine($"Move {pathHistory.Count + 1}: {move}");
            
            // Apply move consequences
            if (move == "straight") {
                Console.WriteLine($"Outcome: Safe path! Health: {health}");
            } else if (move == "left" || move == "right") {
                health -= 20;
                Console.WriteLine($"Outcome: Wrong turn! Health: {health}");
            } else if (move == "offer gift") {
                Console.WriteLine("Outcome: Tikbalang accepts! You escape!");
                Console.WriteLine($"Final Health: {health}");
                break;
            } else if (move == "hide") {
                Console.WriteLine($"Outcome: Successfully hidden! Health: {health}");
            }
            
            // Add to path history
            pathHistory.Add(move);
            Console.WriteLine();
            
            // Check for game end conditions
            if (health <= 0) {
                Console.WriteLine("Game Over! You were caught by the Tikbalang!");
                break;
            }
        }
        
        Console.WriteLine("===================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
