// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        // Create an array of 5 destinations
        string[] destinations = {"Quiapo", "Makati", "Cubao", "Ortigas", "BGC"};
        
        Console.WriteLine("Jeepney Destinations");
        Console.WriteLine("===================");
        
        // Print each destination using a loop
        for (int i = 0; i < destinations.Length; i++) {
            Console.WriteLine($"{i + 1}. {destinations[i]}");
        }
    }
}`,

    average: `
using System;

class Program {
    static void Main() {
        // Parallel arrays for destinations and fares
        string[] destinations = {"Quiapo", "Makati", "Cubao", "Ortigas", "BGC"};
        int[] fares = {12, 15, 18, 20, 25};
        
        int totalFare = 0;
        
        Console.WriteLine("Jeepney Fare Calculator");
        Console.WriteLine("======================");
        
        // Display destinations with fares and calculate total
        for (int i = 0; i < destinations.Length; i++) {
            Console.WriteLine($"Destination: {destinations[i]} - ₱{fares[i]}");
            totalFare += fares[i];
        }
        
        Console.WriteLine("======================");
        Console.WriteLine($"Total Fare: ₱{totalFare}");
    }
}`,

    difficult: `
using System;

class Program {
    static void Main() {
        // Parallel arrays for destinations and fares
        string[] destinations = {"Quiapo", "Makati", "Cubao", "Ortigas", "BGC"};
        int[] fares = {12, 15, 18, 20, 25};
        
        Console.WriteLine("Jeepney Fare Calculator");
        Console.WriteLine("======================");
        
        // Get user input
        Console.Write("Enter destination: ");
        string userDestination = Console.ReadLine();
        
        Console.Write("Are you a senior/student? (y/n): ");
        string discountEligible = Console.ReadLine().ToLower();
        
        // Validate destination and find fare
        int destinationIndex = -1;
        for (int i = 0; i < destinations.Length; i++) {
            if (destinations[i].Equals(userDestination, StringComparison.OrdinalIgnoreCase)) {
                destinationIndex = i;
                break;
            }
        }
        
        if (destinationIndex == -1) {
            Console.WriteLine("❌ Invalid destination! Please choose from:");
            foreach (string dest in destinations) {
                Console.WriteLine($"- {dest}");
            }
        } else {
            int regularFare = fares[destinationIndex];
            double discount = 0.0;
            
            if (discountEligible == "y") {
                discount = regularFare * 0.20; // 20% discount
            }
            
            double finalFare = regularFare - discount;
            
            Console.WriteLine();
            Console.WriteLine($"Destination: {userDestination}");
            Console.WriteLine($"Regular Fare: ₱{regularFare}");
            if (discount > 0) {
                Console.WriteLine($"Discount (20%): ₱{(int)discount}");
            }
            Console.WriteLine($"Final Fare: ₱{(int)finalFare}");
        }
        
        Console.WriteLine("======================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
