// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        // Store 3 Filipino dishes and their prices in arrays
        string[] dishes = {"Adobo", "Sinigang", "Kare-Kare"};
        double[] prices = {150.00, 180.00, 220.00};
        
        Console.WriteLine("Filipino Family Menu Generator");
        Console.WriteLine("============================");
        
        // Print each dish and its price using a loop
        for (int i = 0; i < dishes.Length; i++) {
            Console.WriteLine($"Dish {i + 1}: {dishes[i]} - ₱{prices[i]:F2}");
        }
        
        Console.WriteLine("============================");
    }
}`,

    average: `
using System;

class Program {
    static void Main() {
        // Menu data
        string[] dishes = {"Adobo", "Sinigang", "Kare-Kare"};
        double[] prices = {150.00, 180.00, 220.00};
        
        Console.WriteLine("Filipino Family Menu Generator");
        Console.WriteLine("============================");
        
        // Display menu items
        for (int i = 0; i < dishes.Length; i++) {
            Console.WriteLine($"Dish {i + 1}: {dishes[i]} - ₱{prices[i]:F2}");
        }
        
        Console.WriteLine("============================");
        
        // Calculate total cost and apply family discount
        double originalTotal = 0;
        foreach (double price in prices) {
            originalTotal += price;
        }
        
        double familyDiscount = originalTotal * 0.10; // 10% family discount
        double finalTotal = originalTotal - familyDiscount;
        
        Console.WriteLine();
        Console.WriteLine("Menu Summary:");
        Console.WriteLine($"Original Total: ₱{originalTotal:F2}");
        Console.WriteLine($"Family Discount (10%): ₱{familyDiscount:F2}");
        Console.WriteLine($"Final Total: ₱{finalTotal:F2}");
        Console.WriteLine("============================");
    }
}`,

    difficult: `
using System;

class Program {
    static void Main() {
        // Menu data
        string[] dishes = {"Adobo", "Sinigang", "Kare-Kare"};
        double[] prices = {150.00, 180.00, 220.00};
        
        Console.WriteLine("Filipino Family Menu Generator");
        Console.WriteLine("============================");
        
        // Display menu items
        for (int i = 0; i < dishes.Length; i++) {
            Console.WriteLine($"Dish {i + 1}: {dishes[i]} - ₱{prices[i]:F2}");
        }
        
        Console.WriteLine("============================");
        
        // Calculate original total
        double originalTotal = 0;
        foreach (double price in prices) {
            originalTotal += price;
        }
        
        // Generate personalized menu recommendations
        string[] recommendedDishes = {"Lechon Kawali", "Pancit Canton"};
        double[] recommendedPrices = {200.00, 120.00};
        
        Console.WriteLine();
        Console.WriteLine("Personalized Recommendations:");
        for (int i = 0; i < recommendedDishes.Length; i++) {
            Console.WriteLine($"- Suggested: {recommendedDishes[i]} (₱{recommendedPrices[i]:F2})");
        }
        
        // Calculate total with recommendations
        double recommendedTotal = originalTotal;
        foreach (double price in recommendedPrices) {
            recommendedTotal += price;
        }
        
        // Apply family discount
        double familyDiscount = recommendedTotal * 0.10;
        double finalTotal = recommendedTotal - familyDiscount;
        
        // Calculate per-person cost (assuming 4 people)
        int familySize = 4;
        double costPerPerson = finalTotal / familySize;
        
        Console.WriteLine();
        Console.WriteLine("Menu Analysis:");
        Console.WriteLine($"Original Total: ₱{originalTotal:F2}");
        Console.WriteLine($"With Recommendations: ₱{recommendedTotal:F2}");
        Console.WriteLine($"Family Discount (10%): ₱{familyDiscount:F2}");
        Console.WriteLine($"Final Total: ₱{finalTotal:F2}");
        Console.WriteLine($"Cost per Person ({familySize} people): ₱{costPerPerson:F2}");
        Console.WriteLine("============================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
