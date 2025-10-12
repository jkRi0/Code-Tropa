// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class JeepneyFareMatrix {
    static void Main() {
        string[] routes = {"Quiapo to Cubao", "Cubao to Makati", "Makati to Alabang"};
        double[] baseFares = {12.00, 15.00, 18.00};
        
        Console.WriteLine("Jeepney Fare Matrix Calculator");
        Console.WriteLine("=============================");
        
        for (int i = 0; i < routes.Length; i++) {
            Console.WriteLine($"Route {i + 1}: {routes[i]} - Base Fare: ₱{baseFares[i]:F2}");
        }
        
        Console.WriteLine("=============================");
    }
}`,

    average: `
using System;

class JeepneyFareMatrix {
    static void Main() {
        string[] routes = {"Quiapo to Cubao", "Cubao to Makati", "Makati to Alabang"};
        double[] baseFares = {12.00, 15.00, 18.00};
        double[] distances = {8.5, 10.2, 12.8};
        
        Console.WriteLine("Jeepney Fare Matrix Calculator");
        Console.WriteLine("=============================");
        
        for (int i = 0; i < routes.Length; i++) {
            Console.WriteLine($"Route {i + 1}: {routes[i]} - Base Fare: ₱{baseFares[i]:F2}");
        }
        
        Console.WriteLine("=============================");
        Console.WriteLine();
        Console.WriteLine("Fare Calculation:");
        
        // Calculate fare for first route as example
        string selectedRoute = routes[0];
        double baseFare = baseFares[0];
        double distance = distances[0];
        bool isStudent = true; // Example: student discount
        
        double distanceFare = distance * 1.0; // ₱1.00 per km
        double subtotal = baseFare + distanceFare;
        double discount = 0;
        
        if (isStudent) {
            discount = subtotal * 0.20; // 20% student discount
        }
        
        double totalFare = subtotal - discount;
        
        Console.WriteLine($"Route: {selectedRoute}");
        Console.WriteLine($"Distance: {distance} km");
        Console.WriteLine($"Base Fare: ₱{baseFare:F2}");
        Console.WriteLine($"Distance Fare: ₱{distanceFare:F2}");
        Console.WriteLine($"Subtotal: ₱{subtotal:F2}");
        Console.WriteLine($"Student Discount (20%): -₱{discount:F2}");
        Console.WriteLine($"Total Fare: ₱{totalFare:F2}");
        Console.WriteLine("=============================");
    }
}`,

    difficult: `
using System;
using System.Collections.Generic;
using System.Linq;

class Route {
    public string Name { get; set; }
    public double BaseFare { get; set; }
    public double Distance { get; set; }
    public double TotalFare { get; set; }
    
    public Route(string name, double baseFare, double distance) {
        Name = name;
        BaseFare = baseFare;
        Distance = distance;
        TotalFare = CalculateTotalFare();
    }
    
    private double CalculateTotalFare() {
        double distanceFare = Distance * 1.0; // ₱1.00 per km
        double subtotal = BaseFare + distanceFare;
        double discount = subtotal * 0.20; // 20% student discount
        return subtotal - discount;
    }
}

class JeepneyFareMatrix {
    static void Main() {
        List<Route> routes = new List<Route> {
            new Route("Quiapo to Cubao", 12.00, 8.5),
            new Route("Cubao to Makati", 15.00, 10.2),
            new Route("Makati to Alabang", 18.00, 12.8)
        };
        
        Console.WriteLine("Jeepney Fare Matrix Calculator");
        Console.WriteLine("=============================");
        
        for (int i = 0; i < routes.Count; i++) {
            Console.WriteLine($"Route {i + 1}: {routes[i].Name} - Base Fare: ₱{routes[i].BaseFare:F2}");
        }
        
        Console.WriteLine("=============================");
        Console.WriteLine();
        
        // Sort by total fare to find cheapest and most expensive
        routes = routes.OrderBy(r => r.TotalFare).ToList();
        
        Console.WriteLine("Fare Optimization Analysis:");
        Console.WriteLine($"Cheapest Route: {routes[0].Name} (₱{routes[0].TotalFare:F2})");
        Console.WriteLine($"Most Expensive Route: {routes[routes.Count - 1].Name} (₱{routes[routes.Count - 1].TotalFare:F2})");
        
        double averageFare = routes.Average(r => r.TotalFare);
        Console.WriteLine($"Average Fare: ₱{averageFare:F2}");
        
        Console.WriteLine();
        Console.WriteLine("Route Recommendations:");
        Console.WriteLine("- For Budget Travel: " + routes[0].Name);
        Console.WriteLine("- For Speed: " + routes[1].Name);
        Console.WriteLine("- For Comfort: " + routes[2].Name);
        
        Console.WriteLine();
        Console.WriteLine("Fare History:");
        Console.WriteLine($"- Lowest recorded fare: ₱{routes[0].TotalFare:F2}");
        Console.WriteLine($"- Highest recorded fare: ₱{routes[routes.Count - 1].TotalFare:F2}");
        Console.WriteLine($"- Average fare: ₱{averageFare:F2}");
        Console.WriteLine("=============================");
    }
}`
};

// Use namespace to avoid conflicts
window.tahoSolutions = tahoSolutions;
