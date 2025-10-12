// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        Console.WriteLine("Tahooo!");
        Console.WriteLine("Taho: ₱15");
        Console.WriteLine("Syrup: ₱5");
    }
}`,

    average: `
/* 
 * Taho is a beloved Filipino street food made of silken tofu,
 * brown sugar syrup, and sago pearls. Vendors traditionally
 * announce their presence by calling out "Tahooo!"
 */
using System;

class Program {
    static void Main() {
        // Print header
        Console.WriteLine("================");
        Console.WriteLine("   TAHO MENU");
        Console.WriteLine("================");
        
        // Print menu items with proper formatting
        Console.WriteLine("Taho:\\t\\t₱15");
        Console.WriteLine("Syrup:\\t\\t₱5");
        
        // Print footer
        Console.WriteLine("================");
    }
}`,

    difficult: `
/**
 * TahoVendor program simulates a traditional Filipino taho vendor
 * This program demonstrates proper string formatting and debugging
 */
using System;

class Program {
    static void Main() {
        // Fixed: Added quotes around string literal
        Console.WriteLine("Tahooo!");
        Console.WriteLine("Taho: ₱15");
        Console.WriteLine("Syrup: ₱5");
        // Fixed: Proper arithmetic operation
        Console.WriteLine("Total: " + (15 + 5) + "₱");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;