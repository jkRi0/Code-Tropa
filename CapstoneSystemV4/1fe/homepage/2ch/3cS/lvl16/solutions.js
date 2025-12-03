// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        // Store 3 potion names and their effects in arrays
        string[] potions = {"Sampaguita Tea", "Ginger Root", "Turmeric Mix"};
        string[] effects = {"Calming effect", "Digestive aid", "Anti-inflammatory"};
        
        Console.WriteLine("Albularyo Potion Log");
        Console.WriteLine("===================");
        
        // Print each potion and its effect using a loop
        for (int i = 0; i < potions.Length; i++) {
            Console.WriteLine($"Potion {i + 1}: {potions[i]} - {effects[i]}");
        }
        
        Console.WriteLine("===================");
    }
}`,

    average: `
using System;

class Program {
    static void Main() {
        // Potion data
        string[] potions = {"Sampaguita Tea", "Ginger Root", "Turmeric Mix"};
        string[] effects = {"Calming effect", "Digestive aid", "Anti-inflammatory"};
        
        Console.WriteLine("Albularyo Potion Log");
        Console.WriteLine("===================");
        
        // Display potion information
        for (int i = 0; i < potions.Length; i++) {
            Console.WriteLine($"Potion {i + 1}: {potions[i]} - {effects[i]}");
        }
        
        Console.WriteLine("===================");
        
        // Track potion usage and calculate success rates
        int[] usageCount = {5, 3, 4};
        int[] successCount = {4, 3, 3};
        
        Console.WriteLine();
        Console.WriteLine("Usage Statistics:");
        
        for (int i = 0; i < potions.Length; i++) {
            double successRate = (double) successCount[i] / usageCount[i] * 100;
            Console.WriteLine($"{potions[i]}: {usageCount[i]} uses, {successRate:F0}% success rate");
        }
        
        Console.WriteLine("===================");
    }
}`,

    difficult: `
using System;

class Program {
    static void Main() {
        // Potion data
        string[] potions = {"Sampaguita Tea", "Ginger Root", "Turmeric Mix"};
        string[] effects = {"Calming effect", "Digestive aid", "Anti-inflammatory"};
        
        Console.WriteLine("Albularyo Potion Log");
        Console.WriteLine("===================");
        
        // Display potion information
        for (int i = 0; i < potions.Length; i++) {
            Console.WriteLine($"Potion {i + 1}: {potions[i]} - {effects[i]}");
        }
        
        Console.WriteLine("===================");
        
        // Analyze potion effectiveness and generate recommendations
        int[] usageCount = {5, 3, 4};
        int[] successCount = {4, 3, 3};
        string[] bestFor = {"Anxiety, Insomnia", "Nausea, Indigestion", "Joint Pain, Inflammation"};
        string[] dosages = {"2 cups daily", "1 tablespoon", "1 teaspoon"};
        
        Console.WriteLine();
        Console.WriteLine("Detailed Analysis:");
        
        for (int i = 0; i < potions.Length; i++) {
            double successRate = (double) successCount[i] / usageCount[i] * 100;
            Console.WriteLine($"{potions[i]}: {usageCount[i]} uses, {successRate:F0}% success rate");
            Console.WriteLine($"  Most Effective For: {bestFor[i]}");
            Console.WriteLine($"  Recommended Dosage: {dosages[i]}");
        }
        
        Console.WriteLine();
        Console.WriteLine("Recommendations:");
        Console.WriteLine("- For digestive issues: Combine Ginger Root + Turmeric Mix");
        Console.WriteLine("- For sleep problems: Use Sampaguita Tea before bedtime");
        Console.WriteLine("- For inflammation: Apply Turmeric Mix externally");
        Console.WriteLine("===================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
