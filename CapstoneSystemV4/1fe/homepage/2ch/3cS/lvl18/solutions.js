// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        // Store 3 contestants and their scores in arrays
        string[] contestants = {"Maria Santos", "Ana Garcia", "Sofia Rodriguez"};
        double[] scores = {85.5, 92.0, 88.5};
        
        Console.WriteLine("Miss Barangay Scoring System");
        Console.WriteLine("===========================");
        
        // Print each contestant's name and score using a loop
        for (int i = 0; i < contestants.Length; i++) {
            Console.WriteLine($"Contestant {i + 1}: {contestants[i]} - {scores[i]:F1} points");
        }
        
        Console.WriteLine("===========================");
    }
}`,

    average: `
using System;

class Program {
    static void Main() {
        // Contestant data
        string[] contestants = {"Maria Santos", "Ana Garcia", "Sofia Rodriguez"};
        double[] scores = {85.5, 92.0, 88.5};
        
        Console.WriteLine("Miss Barangay Scoring System");
        Console.WriteLine("===========================");
        
        // Display contestant data
        for (int i = 0; i < contestants.Length; i++) {
            Console.WriteLine($"Contestant {i + 1}: {contestants[i]} - {scores[i]:F1} points");
        }
        
        Console.WriteLine("===========================");
        
        // Calculate average scores and determine the winner
        double maxScore = 0;
        int winnerIndex = 0;
        
        for (int i = 0; i < scores.Length; i++) {
            if (scores[i] > maxScore) {
                maxScore = scores[i];
                winnerIndex = i;
            }
        }
        
        Console.WriteLine();
        Console.WriteLine("Scoring Results:");
        
        // Sort contestants by score (simple bubble sort)
        for (int i = 0; i < contestants.Length - 1; i++) {
            for (int j = 0; j < contestants.Length - 1 - i; j++) {
                if (scores[j] < scores[j + 1]) {
                    // Swap scores
                    double tempScore = scores[j];
                    scores[j] = scores[j + 1];
                    scores[j + 1] = tempScore;
                    
                    // Swap contestants
                    string tempContestant = contestants[j];
                    contestants[j] = contestants[j + 1];
                    contestants[j + 1] = tempContestant;
                }
            }
        }
        
        // Display rankings
        string[] positions = {"1st Place", "2nd Place", "3rd Place"};
        for (int i = 0; i < contestants.Length; i++) {
            Console.WriteLine($"{positions[i]}: {contestants[i]} ({scores[i]:F1} points)");
        }
        
        Console.WriteLine();
        Console.WriteLine($"Winner: {contestants[0]} - Miss Barangay 2024!");
        Console.WriteLine("===========================");
    }
}`,

    difficult: `
using System;

class Program {
    static void Main() {
        // Contestant data
        string[] contestants = {"Maria Santos", "Ana Garcia", "Sofia Rodriguez"};
        double[] totalScores = {85.5, 92.0, 88.5};
        
        Console.WriteLine("Miss Barangay Scoring System");
        Console.WriteLine("===========================");
        
        // Display contestant data
        for (int i = 0; i < contestants.Length; i++) {
            Console.WriteLine($"Contestant {i + 1}: {contestants[i]} - {totalScores[i]:F1} points");
        }
        
        Console.WriteLine("===========================");
        
        // Implement weighted scoring and generate detailed rankings
        double[] talentScores = {90.0, 95.0, 85.0};
        double[] beautyScores = {80.0, 90.0, 95.0};
        double[] intelligenceScores = {85.0, 90.0, 87.0};
        
        // Calculate weighted scores (talent=40%, beauty=30%, intelligence=30%)
        double[] calculatedScores = new double[contestants.Length];
        for (int i = 0; i < contestants.Length; i++) {
            calculatedScores[i] = talentScores[i] * 0.40 + beautyScores[i] * 0.30 + intelligenceScores[i] * 0.30;
        }
        
        Console.WriteLine();
        Console.WriteLine("Detailed Scoring Analysis:");
        
        for (int i = 0; i < contestants.Length; i++) {
            Console.WriteLine($"{contestants[i]}:");
            Console.WriteLine($"  Talent: {talentScores[i]:F1} (40%) = {talentScores[i] * 0.40:F1}");
            Console.WriteLine($"  Beauty: {beautyScores[i]:F1} (30%) = {beautyScores[i] * 0.30:F1}");
            Console.WriteLine($"  Intelligence: {intelligenceScores[i]:F1} (30%) = {intelligenceScores[i] * 0.30:F1}");
            Console.WriteLine($"  Total: {calculatedScores[i]:F1}");
            Console.WriteLine();
        }
        
        // Sort contestants by calculated score
        for (int i = 0; i < contestants.Length - 1; i++) {
            for (int j = 0; j < contestants.Length - 1 - i; j++) {
                if (calculatedScores[j] < calculatedScores[j + 1]) {
                    // Swap calculated scores
                    double tempScore = calculatedScores[j];
                    calculatedScores[j] = calculatedScores[j + 1];
                    calculatedScores[j + 1] = tempScore;
                    
                    // Swap contestants
                    string tempContestant = contestants[j];
                    contestants[j] = contestants[j + 1];
                    contestants[j + 1] = tempContestant;
                    
                    // Swap category scores
                    double tempTalent = talentScores[j];
                    talentScores[j] = talentScores[j + 1];
                    talentScores[j + 1] = tempTalent;
                    
                    double tempBeauty = beautyScores[j];
                    beautyScores[j] = beautyScores[j + 1];
                    beautyScores[j + 1] = tempBeauty;
                    
                    double tempIntelligence = intelligenceScores[j];
                    intelligenceScores[j] = intelligenceScores[j + 1];
                    intelligenceScores[j + 1] = tempIntelligence;
                }
            }
        }
        
        Console.WriteLine("Final Rankings:");
        string[] positions = {"1st Place", "2nd Place", "3rd Place"};
        for (int i = 0; i < contestants.Length; i++) {
            Console.WriteLine($"{positions[i]}: {contestants[i]} ({calculatedScores[i]:F1} points)");
        }
        
        Console.WriteLine();
        Console.WriteLine($"Winner: {contestants[0]} - Miss Barangay 2024!");
        Console.WriteLine("===========================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
