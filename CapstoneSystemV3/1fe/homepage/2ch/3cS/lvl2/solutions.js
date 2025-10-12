const tahoSolutions = {
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
// Taho vendor's traditional call
using System;

class Program {
    static void Main() {
        /* 
         * Taho is a beloved Filipino street food tradition
         * Vendors walk through neighborhoods calling "Tahooo!"
         * to announce their presence and attract customers
         */
        
        // Print formatted menu
        Console.WriteLine("================");
        Console.WriteLine("   TAHO MENU");
        Console.WriteLine("================");
        Console.WriteLine("Regular Taho\\t₱20");
        Console.WriteLine("Large Taho\\t₱25");
        Console.WriteLine("Extra Syrup\\t₱5");
        Console.WriteLine("================");
    }
}`,

    difficult: `
using System;

class Program {
    static void Main() {
        // Store name and header
        string storeName = "MANILA TAHO STORE";
        Console.WriteLine(storeName);
        Console.WriteLine("=====================");
        
        // Price list
        Console.WriteLine("Menu:");
        Console.WriteLine("1. Regular Taho    ₱20");
        Console.WriteLine("2. Large Taho      ₱25");
        Console.WriteLine("3. Extra Syrup     ₱5");
        
        // Footer
        Console.WriteLine("=====================");
        Console.WriteLine("Salamat po!");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
