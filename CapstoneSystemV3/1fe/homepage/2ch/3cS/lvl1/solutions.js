// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        Console.WriteLine("Tahooo!");
        Console.WriteLine("Regular Taho: ₱20");
        Console.WriteLine("Large Taho: ₱25");
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
        Console.WriteLine("Regular Taho\\t₱20");
        Console.WriteLine("Large Taho\\t₱25");
        Console.WriteLine("Extra Syrup\\t₱5");
        
        // Print footer
        Console.WriteLine("================");
    }
}`,

    difficult: `
/**
 * TahoVendor program simulates a traditional Filipino taho vendor's receipt
 * This program demonstrates proper string formatting and error handling
 */
using System;

class Program {
    static void Main() {
        try {
            // Store header with emojis
            Console.WriteLine(" MANILA TAHO STORE ");
            Console.WriteLine("=====================");
            
            // Menu section
            Console.WriteLine("Menu:");
            Console.WriteLine("1. Regular Taho    ₱20");
            Console.WriteLine("2. Large Taho      ₱25");
            Console.WriteLine("3. Extra Syrup     ₱5");
            
            // Footer
            Console.WriteLine("=====================");
            Console.WriteLine("Salamat po!");
        } catch (Exception e) {
            Console.WriteLine("Error printing menu: " + e.Message);
        }
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;