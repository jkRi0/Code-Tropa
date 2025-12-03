// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        // Store 3 tricycle drivers and their availability status
        string[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};
        bool[] available = {true, false, true};
        
        Console.WriteLine("Tricycle Dispatch System");
        Console.WriteLine("=======================");
        
        // Print each driver's name and availability status using a loop
        for (int i = 0; i < drivers.Length; i++) {
            string status = available[i] ? "Available" : "Busy";
            Console.WriteLine($"Driver {i + 1}: {drivers[i]} - {status}");
        }
        
        Console.WriteLine("=======================");
    }
}`,

    average: `
using System;

class Program {
    static void Main() {
        // Driver data
        string[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};
        bool[] available = {true, false, true};
        
        Console.WriteLine("Tricycle Dispatch System");
        Console.WriteLine("=======================");
        
        // Display driver status
        for (int i = 0; i < drivers.Length; i++) {
            string status = available[i] ? "Available" : "Busy";
            Console.WriteLine($"Driver {i + 1}: {drivers[i]} - {status}");
        }
        
        Console.WriteLine("=======================");
        
        // Assign passengers to available drivers and calculate fare
        string[] passengers = {"Maria", "Ana"};
        double[] distances = {2.5, 3.0};
        
        Console.WriteLine();
        Console.WriteLine("Dispatch Assignment:");
        
        int passengerIndex = 0;
        for (int i = 0; i < drivers.Length && passengerIndex < passengers.Length; i++) {
            if (available[i]) {
                string passenger = passengers[passengerIndex];
                string driver = drivers[i];
                double distance = distances[passengerIndex];
                double fare = distance * 10; // ₱10 per km
                
                Console.WriteLine($"Passenger: {passenger}");
                Console.WriteLine($"Assigned Driver: {driver}");
                Console.WriteLine($"Distance: {distance} km");
                Console.WriteLine($"Fare: ₱{fare:F2}");
                Console.WriteLine();
                
                passengerIndex++;
            }
        }
        
        Console.WriteLine("=======================");
    }
}`,

    difficult: `
using System;

class Program {
    static void Main() {
        // Driver data
        string[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};
        bool[] available = {true, false, true};
        double[] driverEarnings = {0.0, 0.0, 0.0};
        int[] tripCounts = {0, 0, 0};
        
        Console.WriteLine("Tricycle Dispatch System");
        Console.WriteLine("=======================");
        
        // Display driver status
        for (int i = 0; i < drivers.Length; i++) {
            string status = available[i] ? "Available" : "Busy";
            Console.WriteLine($"Driver {i + 1}: {drivers[i]} - {status}");
        }
        
        Console.WriteLine("=======================");
        
        // Optimize driver assignments and track earnings
        string[] passengers = {"Maria", "Ana"};
        double[] distances = {2.5, 3.0};
        double[] passengerDistances = {2.5, 3.0}; // Distance from dispatch center
        
        Console.WriteLine();
        Console.WriteLine("Optimized Dispatch:");
        
        for (int p = 0; p < passengers.Length; p++) {
            string passenger = passengers[p];
            double distance = distances[p];
            
            // Find closest available driver
            int bestDriverIndex = -1;
            double minDistance = double.MaxValue;
            
            for (int i = 0; i < drivers.Length; i++) {
                if (available[i]) {
                    double driverDistance = passengerDistances[p]; // Simplified distance calculation
                    if (driverDistance < minDistance) {
                        minDistance = driverDistance;
                        bestDriverIndex = i;
                    }
                }
            }
            
            if (bestDriverIndex != -1) {
                string driver = drivers[bestDriverIndex];
                double fare = distance * 10; // ₱10 per km
                
                Console.WriteLine($"Passenger: {passenger}");
                Console.WriteLine($"Assigned Driver: {driver} (closest)");
                Console.WriteLine($"Distance: {distance} km");
                Console.WriteLine($"Fare: ₱{fare:F2}");
                Console.WriteLine();
                
                // Update driver earnings and trip count
                driverEarnings[bestDriverIndex] += fare;
                tripCounts[bestDriverIndex]++;
            }
        }
        
        // Display driver performance
        Console.WriteLine("Driver Performance:");
        for (int i = 0; i < drivers.Length; i++) {
            Console.WriteLine($"{drivers[i]}: {tripCounts[i]} trip{(tripCounts[i] != 1 ? "s" : "")}, ₱{driverEarnings[i]:F2} earned");
        }
        
        Console.WriteLine("=======================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
