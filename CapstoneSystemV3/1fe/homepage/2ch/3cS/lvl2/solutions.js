// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        // Declare three product variables with correct data types
        string suka = "Vinegar";
        string itlog = "Eggs";
        string tinapay = "Bread";
        
        // Print each product name
        Console.WriteLine(suka);
        Console.WriteLine(itlog);
        Console.WriteLine(tinapay);
    }
}`,

    average: `
using System;

class Program {
    static void Main() {
        // Product names
        string suka = "Vinegar";
        string itlog = "Eggs";
        string tinapay = "Bread";
        
        // Prices (double data type for decimal values)
        double sukaPrice = 25.50;
        double itlogPrice = 8.00;
        double tinapayPrice = 35.00;
        
        // Stock quantities (int data type for whole numbers)
        int sukaStock = 50;
        int itlogStock = 100;
        int tinapayStock = 30;
        
        // Calculate total inventory value
        double sukaValue = sukaPrice * sukaStock;
        double itlogValue = itlogPrice * itlogStock;
        double tinapayValue = tinapayPrice * tinapayStock;
        double totalValue = sukaValue + itlogValue + tinapayValue;
        
        // Print inventory report
        Console.WriteLine("Sari-Sari Store Inventory");
        Console.WriteLine("========================");
        Console.WriteLine($"{suka}: {sukaStock} units @ ₱{sukaPrice:F2} = ₱{sukaValue:F2}");
        Console.WriteLine($"{itlog}: {itlogStock} units @ ₱{itlogPrice:F2} = ₱{itlogValue:F2}");
        Console.WriteLine($"{tinapay}: {tinapayStock} units @ ₱{tinapayPrice:F2} = ₱{tinapayValue:F2}");
        Console.WriteLine("========================");
        Console.WriteLine($"Total Inventory Value: ₱{totalValue:F2}");
    }
}`,

    difficult: `
using System;

class Program {
    static void Main() {
        // Product names
        string suka = "Vinegar";
        string itlog = "Eggs";
        string tinapay = "Bread";
        
        // Prices
        double sukaPrice = 25.50;
        double itlogPrice = 8.00;
        double tinapayPrice = 35.00;
        
        // Get new stock levels from user
        Console.Write($"Enter new stock for {suka}: ");
        int sukaStock = int.Parse(Console.ReadLine());
        
        Console.Write($"Enter new stock for {itlog}: ");
        int itlogStock = int.Parse(Console.ReadLine());
        
        Console.Write($"Enter new stock for {tinapay}: ");
        int tinapayStock = int.Parse(Console.ReadLine());
        
        // Calculate values
        double sukaValue = sukaPrice * sukaStock;
        double itlogValue = itlogPrice * itlogStock;
        double tinapayValue = tinapayPrice * tinapayStock;
        
        // Display updated inventory
        Console.WriteLine("\nUpdated Inventory:");
        Console.WriteLine($"{suka}: {sukaStock} units @ ₱{sukaPrice:F2} = ₱{sukaValue:F2}");
        Console.WriteLine($"{itlog}: {itlogStock} units @ ₱{itlogPrice:F2} = ₱{itlogValue:F2}");
        Console.WriteLine($"{tinapay}: {tinapayStock} units @ ₱{tinapayPrice:F2} = ₱{tinapayValue:F2}");
        
        // Check for restock alerts (threshold = 20)
        int threshold = 20;
        Console.WriteLine();
        
        if (sukaStock < threshold) {
            Console.WriteLine($"⚠️ RESTOCK ALERT: {suka} is below threshold ({sukaStock} < {threshold})");
        }
        if (itlogStock < threshold) {
            Console.WriteLine($"⚠️ RESTOCK ALERT: {itlog} is below threshold ({itlogStock} < {threshold})");
        }
        if (tinapayStock < threshold) {
            Console.WriteLine($"⚠️ RESTOCK ALERT: {tinapay} is below threshold ({tinapayStock} < {threshold})");
        }
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
