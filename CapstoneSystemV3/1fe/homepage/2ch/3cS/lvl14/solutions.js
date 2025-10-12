// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        // Store 3 Filipino names and their lengths in arrays
        string[] names = {"Maria", "Jose", "Ana"};
        int[] lengths = {5, 4, 3};
        
        Console.WriteLine("Filipino Names Analyzer");
        Console.WriteLine("======================");
        
        // Print each name and its length using a loop
        for (int i = 0; i < names.Length; i++) {
            Console.WriteLine($"Name {i + 1}: {names[i]} - {lengths[i]} characters");
        }
        
        Console.WriteLine("======================");
    }
}`,

    average: `
using System;

class Program {
    static void Main() {
        // Names data
        string[] names = {"Maria", "Jose", "Ana"};
        
        Console.WriteLine("Filipino Names Analyzer");
        Console.WriteLine("======================");
        
        // Analyze each name
        for (int i = 0; i < names.Length; i++) {
            string name = names[i];
            int length = name.Length;
            
            Console.WriteLine($"Name {i + 1}: {name} - {length} characters");
            
            // Count vowels and consonants
            int vowelCount = 0;
            int consonantCount = 0;
            string vowels = "";
            string consonants = "";
            
            foreach (char c in name.ToLower()) {
                if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                    vowelCount++;
                    vowels += c + ", ";
                } else if (char.IsLetter(c)) {
                    consonantCount++;
                    consonants += char.ToUpper(c) + ", ";
                }
            }
            
            // Remove trailing comma and space
            if (vowels.Length > 0) {
                vowels = vowels.Substring(0, vowels.Length - 2);
            }
            if (consonants.Length > 0) {
                consonants = consonants.Substring(0, consonants.Length - 2);
            }
            
            Console.WriteLine($"  Vowels: {vowelCount} ({vowels})");
            Console.WriteLine($"  Consonants: {consonantCount} ({consonants})");
        }
        
        Console.WriteLine("======================");
    }
}`,

    difficult: `
using System;

class Program {
    static string IdentifyPattern(string name) {
        string lowerName = name.ToLower();
        
        if (lowerName == "maria" || lowerName == "jose") {
            return "Common Filipino name";
        } else if (name.Length <= 3) {
            return "Short Filipino name";
        } else if (name.Length >= 6) {
            return "Long Filipino name";
        } else {
            return "Standard Filipino name";
        }
    }
    
    static string GetCulturalSignificance(string name) {
        string lowerName = name.ToLower();
        
        if (lowerName == "maria" || lowerName == "jose") {
            return "High";
        } else if (lowerName == "ana" || lowerName == "pedro") {
            return "Medium";
        } else {
            return "Standard";
        }
    }
    
    static void GenerateNameSuggestions() {
        string[] suggestions = {"Maria Clara", "Jose Rizal", "Ana Luna"};
        
        foreach (string suggestion in suggestions) {
            Console.WriteLine($"- {suggestion}");
        }
    }
    
    static void Main() {
        // Names data
        string[] names = {"Maria", "Jose", "Ana"};
        
        Console.WriteLine("Filipino Names Analyzer");
        Console.WriteLine("======================");
        
        // Analyze each name
        for (int i = 0; i < names.Length; i++) {
            string name = names[i];
            int length = name.Length;
            
            Console.WriteLine($"Name {i + 1}: {name} - {length} characters");
            
            // Count vowels and consonants
            int vowelCount = 0;
            int consonantCount = 0;
            string vowels = "";
            string consonants = "";
            
            foreach (char c in name.ToLower()) {
                if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                    vowelCount++;
                    vowels += c + ", ";
                } else if (char.IsLetter(c)) {
                    consonantCount++;
                    consonants += char.ToUpper(c) + ", ";
                }
            }
            
            // Remove trailing comma and space
            if (vowels.Length > 0) {
                vowels = vowels.Substring(0, vowels.Length - 2);
            }
            if (consonants.Length > 0) {
                consonants = consonants.Substring(0, consonants.Length - 2);
            }
            
            Console.WriteLine($"  Vowels: {vowelCount} ({vowels})");
            Console.WriteLine($"  Consonants: {consonantCount} ({consonants})");
            
            // Identify common Filipino name patterns
            string pattern = IdentifyPattern(name);
            string culturalSignificance = GetCulturalSignificance(name);
            
            Console.WriteLine($"  Pattern: {pattern}");
            Console.WriteLine($"  Cultural Significance: {culturalSignificance}");
        }
        
        Console.WriteLine("======================");
        
        // Generate name suggestions
        Console.WriteLine();
        Console.WriteLine("Name Suggestions:");
        GenerateNameSuggestions();
        Console.WriteLine("======================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
