// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        // Original slogan
        string slogan = "Mabuhay ang Fiesta!";
        
        Console.WriteLine("Fiesta Poster Maker");
        Console.WriteLine("==================");
        Console.WriteLine($"Original: \\"{slogan}\\"");
        
        // Convert to uppercase and add decorative characters
        string formattedSlogan = $"*** {slogan.ToUpper()} ***";
        
        Console.WriteLine("Formatted: ");
        Console.WriteLine("==================");
        Console.WriteLine(formattedSlogan);
        Console.WriteLine("==================");
    }
}`,

    average: `
using System;

class Program {
    static void Main() {
        Console.WriteLine("Fiesta Poster Maker");
        Console.WriteLine("==================");
        
        // Accept user-input slogan
        Console.Write("Enter slogan: ");
        string slogan = Console.ReadLine();
        
        // Count characters and words
        int characterCount = slogan.Length;
        string[] words = slogan.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        int wordCount = words.Length;
        
        Console.WriteLine();
        Console.WriteLine("Slogan Analysis:");
        Console.WriteLine("================");
        Console.WriteLine($"Original: {slogan}");
        Console.WriteLine($"Uppercase: {slogan.ToUpper()}");
        Console.WriteLine($"Characters: {characterCount}");
        Console.WriteLine($"Words: {wordCount}");
        Console.WriteLine("================");
    }
}`,

    difficult: `
using System;

class Program {
    static void Main() {
        Console.WriteLine("Fiesta Poster Maker");
        Console.WriteLine("==================");
        
        // Accept user-input slogan
        Console.Write("Enter slogan: ");
        string slogan = Console.ReadLine();
        
        // Sanitize slogan (remove offensive words)
        string sanitizedSlogan = SanitizeSlogan(slogan);
        
        // Count characters and words
        int characterCount = sanitizedSlogan.Length;
        string[] words = sanitizedSlogan.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        int wordCount = words.Length;
        
        Console.WriteLine();
        Console.WriteLine("Slogan Analysis:");
        Console.WriteLine("================");
        Console.WriteLine($"Original: {slogan}");
        Console.WriteLine($"Sanitized: {sanitizedSlogan}");
        Console.WriteLine($"Characters: {characterCount} | Words: {wordCount}");
        
        // Create formatted poster
        Console.WriteLine();
        Console.WriteLine("Formatted Poster:");
        Console.WriteLine("==================");
        string formattedSlogan = $"*** {sanitizedSlogan.ToUpper()} ***";
        Console.WriteLine(formattedSlogan);
        Console.WriteLine("==================");
        
        // Auto-suggest better slogans
        Console.WriteLine();
        Console.WriteLine("Suggestions:");
        GenerateSuggestions();
        Console.WriteLine("==================");
    }
    
    // Function to sanitize slogans by removing offensive words
    static string SanitizeSlogan(string slogan) {
        string[] offensiveWords = {"bad", "ugly", "hate"};
        string sanitized = slogan;
        
        foreach (string word in offensiveWords) {
            sanitized = sanitized.Replace(word, "[FILTERED]", StringComparison.OrdinalIgnoreCase);
        }
        
        return sanitized;
    }
    
    // Function to generate slogan suggestions
    static void GenerateSuggestions() {
        string[] suggestions = {
            "Mabuhay ang Masayang Fiesta!",
            "Fiesta ng Bayan, Pagkakaisa!",
            "Masayang Fiesta, Masayang Bayan!"
        };
        
        foreach (string suggestion in suggestions) {
            Console.WriteLine($"- Consider: \\"{suggestion}\\"");
        }
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
