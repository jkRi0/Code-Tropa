// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        // Fixed items for the fiesta
        int banderitas = 500;
        int lechon = 3000;
        int soundSystem = 2000;
        
        // Calculate total cost
        int totalCost = banderitas + lechon + soundSystem;
        
        // Display budget breakdown
        Console.WriteLine("Fiesta Budget Calculator");
        Console.WriteLine("=======================");
        Console.WriteLine($"Banderitas: ₱{banderitas}");
        Console.WriteLine($"Lechon: ₱{lechon}");
        Console.WriteLine($"Sound System: ₱{soundSystem}");
        Console.WriteLine("=======================");
        Console.WriteLine($"Total Cost: ₱{totalCost}");
    }
}`,

    average: `
using System;

class Program {
    static void Main() {
        // Fixed items
        int banderitas = 500;
        int lechon = 3000;
        int soundSystem = 2000;
        
        // Optional items
        int balloons = 300;
        int candles = 200;
        
        // Calculate subtotal
        int subtotal = banderitas + lechon + soundSystem + balloons + candles;
        
        // Apply discount (10% for 5+ items)
        double discount = subtotal * 0.10;
        double finalTotal = subtotal - discount;
        
        // Display detailed budget
        Console.WriteLine("Fiesta Budget Calculator");
        Console.WriteLine("=======================");
        Console.WriteLine($"Banderitas: ₱{banderitas}");
        Console.WriteLine($"Lechon: ₱{lechon}");
        Console.WriteLine($"Sound System: ₱{soundSystem}");
        Console.WriteLine($"Balloons: ₱{balloons}");
        Console.WriteLine($"Candles: ₱{candles}");
        Console.WriteLine($"Subtotal: ₱{subtotal}");
        Console.WriteLine($"Discount (10%): ₱{discount:F0}");
        Console.WriteLine("=======================");
        Console.WriteLine($"Final Total: ₱{finalTotal:F0}");
    }
}`,

    difficult: `
using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        // Budget constraint
        int budget = 5000;
        
        // Available items
        var items = new List<(string name, int price)> {
            ("Banderitas", 500),
            ("Lechon", 3000),
            ("Sound System", 2000),
            ("Balloons", 300),
            ("Candles", 200)
        };
        
        // Sort by price (ascending) for greedy approach
        items = items.OrderBy(x => x.price).ToList();
        
        // Greedy selection
        var selectedItems = new List<(string name, int price)>();
        int totalCost = 0;
        
        Console.WriteLine($"Fiesta Budget Optimizer (₱{budget} Budget)");
        Console.WriteLine("=====================================");
        Console.WriteLine("Available Items:");
        
        for (int i = 0; i < items.Count; i++) {
            Console.WriteLine($"{i + 1}. {items[i].name} - ₱{items[i].price}");
        }
        
        Console.WriteLine();
        Console.WriteLine("Selected Items:");
        
        foreach (var item in items) {
            if (totalCost + item.price <= budget) {
                selectedItems.Add(item);
                totalCost += item.price;
                Console.WriteLine($"- {item.name}: ₱{item.price}");
            }
        }
        
        Console.WriteLine($"Total Selected: ₱{totalCost}");
        Console.WriteLine($"Remaining Budget: ₱{budget - totalCost}");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;