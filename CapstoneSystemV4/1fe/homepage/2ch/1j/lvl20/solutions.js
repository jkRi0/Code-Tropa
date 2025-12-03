// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class JeepneyFareMatrix {
    public static void main(String[] args) {
        String[] routes = {"Quiapo to Cubao", "Cubao to Makati", "Makati to Alabang"};
        double[] baseFares = {12.00, 15.00, 18.00};
        
        System.out.println("Jeepney Fare Matrix Calculator");
        System.out.println("=============================");
        
        for (int i = 0; i < routes.length; i++) {
            System.out.printf("Route %d: %s - Base Fare: ₱%.2f%n", 
                i + 1, routes[i], baseFares[i]);
        }
        
        System.out.println("=============================");
    }
}`,

    average: `
public class JeepneyFareMatrix {
    public static void main(String[] args) {
        String[] routes = {"Quiapo to Cubao", "Cubao to Makati", "Makati to Alabang"};
        double[] baseFares = {12.00, 15.00, 18.00};
        double[] distances = {8.5, 10.2, 12.8};
        
        System.out.println("Jeepney Fare Matrix Calculator");
        System.out.println("=============================");
        
        for (int i = 0; i < routes.length; i++) {
            System.out.printf("Route %d: %s - Base Fare: ₱%.2f%n", 
                i + 1, routes[i], baseFares[i]);
        }
        
        System.out.println("=============================");
        System.out.println();
        System.out.println("Fare Calculation:");
        
        // Calculate fare for first route as example
        String selectedRoute = routes[0];
        double baseFare = baseFares[0];
        double distance = distances[0];
        boolean isStudent = true; // Example: student discount
        
        double distanceFare = distance * 1.0; // ₱1.00 per km
        double subtotal = baseFare + distanceFare;
        double discount = 0;
        
        if (isStudent) {
            discount = subtotal * 0.20; // 20% student discount
        }
        
        double totalFare = subtotal - discount;
        
        System.out.printf("Route: %s%n", selectedRoute);
        System.out.printf("Distance: %.1f km%n", distance);
        System.out.printf("Base Fare: ₱%.2f%n", baseFare);
        System.out.printf("Distance Fare: ₱%.2f%n", distanceFare);
        System.out.printf("Subtotal: ₱%.2f%n", subtotal);
        System.out.printf("Student Discount (20%%): -₱%.2f%n", discount);
        System.out.printf("Total Fare: ₱%.2f%n", totalFare);
        System.out.println("=============================");
    }
}`,

    difficult: `
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class JeepneyFareMatrix {
    static class Route {
        String name;
        double baseFare;
        double distance;
        double totalFare;
        
        public Route(String name, double baseFare, double distance) {
            this.name = name;
            this.baseFare = baseFare;
            this.distance = distance;
            this.totalFare = calculateTotalFare();
        }
        
        private double calculateTotalFare() {
            double distanceFare = distance * 1.0; // ₱1.00 per km
            double subtotal = baseFare + distanceFare;
            double discount = subtotal * 0.20; // 20% student discount
            return subtotal - discount;
        }
    }
    
    public static void main(String[] args) {
        List<Route> routes = Arrays.asList(
            new Route("Quiapo to Cubao", 12.00, 8.5),
            new Route("Cubao to Makati", 15.00, 10.2),
            new Route("Makati to Alabang", 18.00, 12.8)
        );
        
        System.out.println("Jeepney Fare Matrix Calculator");
        System.out.println("=============================");
        
        for (int i = 0; i < routes.size(); i++) {
            Route route = routes.get(i);
            System.out.printf("Route %d: %s - Base Fare: ₱%.2f%n", 
                i + 1, route.name, route.baseFare);
        }
        
        System.out.println("=============================");
        System.out.println();
        
        // Sort by total fare to find cheapest and most expensive
        routes.sort(Comparator.comparingDouble(route -> route.totalFare));
        
        System.out.println("Fare Optimization Analysis:");
        System.out.printf("Cheapest Route: %s (₱%.2f)%n", 
            routes.get(0).name, routes.get(0).totalFare);
        System.out.printf("Most Expensive Route: %s (₱%.2f)%n", 
            routes.get(routes.size() - 1).name, routes.get(routes.size() - 1).totalFare);
        
        double averageFare = routes.stream()
            .mapToDouble(route -> route.totalFare)
            .average()
            .orElse(0.0);
        System.out.printf("Average Fare: ₱%.2f%n", averageFare);
        
        System.out.println();
        System.out.println("Route Recommendations:");
        System.out.println("- For Budget Travel: " + routes.get(0).name);
        System.out.println("- For Speed: " + routes.get(1).name);
        System.out.println("- For Comfort: " + routes.get(2).name);
        
        System.out.println();
        System.out.println("Fare History:");
        System.out.printf("- Lowest recorded fare: ₱%.2f%n", routes.get(0).totalFare);
        System.out.printf("- Highest recorded fare: ₱%.2f%n", routes.get(routes.size() - 1).totalFare);
        System.out.printf("- Average fare: ₱%.2f%n", averageFare);
        System.out.println("=============================");
    }
}`
};

// Use namespace to avoid conflicts
window.tahoSolutions = tahoSolutions;