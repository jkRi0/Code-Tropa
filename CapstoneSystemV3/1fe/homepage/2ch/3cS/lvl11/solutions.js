// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        // Store 3 barangay names and populations in arrays
        string[] barangays = {"San Jose", "Santa Maria", "San Pedro"};
        int[] populations = {15000, 22000, 18500};
        
        Console.WriteLine("Barangay Population Analysis");
        Console.WriteLine("===========================");
        
        // Print each barangay's name and population using a loop
        for (int i = 0; i < barangays.Length; i++) {
            Console.WriteLine($"Barangay {i + 1}: {barangays[i]} - {populations[i]:N0} residents");
        }
        
        Console.WriteLine("===========================");
    }
}`,

    average: `
using System;

class Program {
    static void Main() {
        // Barangay data
        string[] barangays = {"San Jose", "Santa Maria", "San Pedro"};
        int[] populations = {15000, 22000, 18500};
        
        Console.WriteLine("Barangay Population Analysis");
        Console.WriteLine("===========================");
        
        // Display barangay data
        for (int i = 0; i < barangays.Length; i++) {
            Console.WriteLine($"Barangay {i + 1}: {barangays[i]} - {populations[i]:N0} residents");
        }
        
        Console.WriteLine("===========================");
        
        // Calculate total and average population
        int totalPopulation = 0;
        foreach (int population in populations) {
            totalPopulation += population;
        }
        
        double averagePopulation = (double) totalPopulation / populations.Length;
        
        Console.WriteLine();
        Console.WriteLine("Summary Statistics:");
        Console.WriteLine($"Total Population: {totalPopulation:N0}");
        Console.WriteLine($"Average Population: {(int) averagePopulation:N0}");
        Console.WriteLine("===========================");
    }
}`,

    difficult: `
using System;

class Program {
    static void Main() {
        // Barangay data
        string[] barangays = {"San Jose", "Santa Maria", "San Pedro"};
        int[] populations = {15000, 22000, 18500};
        
        Console.WriteLine("Barangay Population Analysis");
        Console.WriteLine("===========================");
        
        // Find highest and lowest population
        int maxIndex = 0;
        int minIndex = 0;
        int totalPopulation = 0;
        
        for (int i = 0; i < populations.Length; i++) {
            if (populations[i] > populations[maxIndex]) {
                maxIndex = i;
            }
            if (populations[i] < populations[minIndex]) {
                minIndex = i;
            }
            totalPopulation += populations[i];
        }
        
        double averagePopulation = (double) totalPopulation / populations.Length;
        
        // Display barangay data with size categories
        int smallCount = 0, mediumCount = 0, largeCount = 0;
        
        for (int i = 0; i < barangays.Length; i++) {
            string sizeCategory;
            if (populations[i] < 16000) {
                sizeCategory = "Small";
                smallCount++;
            } else if (populations[i] <= 20000) {
                sizeCategory = "Medium";
                mediumCount++;
            } else {
                sizeCategory = "Large";
                largeCount++;
            }
            
            Console.WriteLine($"Barangay {i + 1}: {barangays[i]} - {populations[i]:N0} residents ({sizeCategory})");
        }
        
        Console.WriteLine("===========================");
        
        // Display detailed analysis
        Console.WriteLine();
        Console.WriteLine("Detailed Analysis:");
        Console.WriteLine($"Highest Population: {barangays[maxIndex]} ({populations[maxIndex]:N0})");
        Console.WriteLine($"Lowest Population: {barangays[minIndex]} ({populations[minIndex]:N0})");
        Console.WriteLine($"Total Population: {totalPopulation:N0}");
        Console.WriteLine($"Average Population: {(int) averagePopulation:N0}");
        
        Console.WriteLine();
        Console.WriteLine("Size Categories:");
        Console.WriteLine($"Small (< 16,000): {smallCount} barangay{(smallCount != 1 ? "s" : "")}");
        Console.WriteLine($"Medium (16,000-20,000): {mediumCount} barangay{(mediumCount != 1 ? "s" : "")}");
        Console.WriteLine($"Large (> 20,000): {largeCount} barangay{(largeCount != 1 ? "s" : "")}");
        Console.WriteLine("===========================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
