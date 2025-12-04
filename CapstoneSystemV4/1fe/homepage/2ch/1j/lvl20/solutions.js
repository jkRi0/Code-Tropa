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
public class JeepneyFareMatrix {
    public static void main(String[] args) {
        String[] routes = {"Quiapo to Cubao", "Cubao to Makati", "Makati to Alabang"};
        double[] baseFares = {12.00, 15.00, 18.00};
        double[] distances = {8.5, 10.2, 12.8};
        double[] totalFares = new double[routes.length];
        
        System.out.println("Jeepney Fare Matrix Calculator");
        System.out.println("=============================");
        
        for (int i = 0; i < routes.length; i++) {
            System.out.println("Route " + (i + 1) + ": " + routes[i] + " - Base Fare: ₱" + String.format("%.2f", baseFares[i]));
        }
        
        System.out.println("=============================");
        System.out.println();
        
        // Calculate total fares for each route
        for (int i = 0; i < routes.length; i++) {
            double distanceFare = distances[i] * 1.0; // ₱1.00 per km
            double subtotal = baseFares[i] + distanceFare;
            double discount = subtotal * 0.20; // 20% student discount
            totalFares[i] = subtotal - discount;
        }
        
        // Sort by total fare using bubble sort (cheapest first)
        for (int i = 0; i < totalFares.length - 1; i++) {
            for (int j = 0; j < totalFares.length - 1 - i; j++) {
                if (totalFares[j] > totalFares[j + 1]) {
                    // Swap total fares
                    double tempFare = totalFares[j];
                    totalFares[j] = totalFares[j + 1];
                    totalFares[j + 1] = tempFare;
                    
                    // Swap base fares
                    double tempBase = baseFares[j];
                    baseFares[j] = baseFares[j + 1];
                    baseFares[j + 1] = tempBase;
                    
                    // Swap distances
                    double tempDist = distances[j];
                    distances[j] = distances[j + 1];
                    distances[j + 1] = tempDist;
                    
                    // Swap routes
                    String tempRoute = routes[j];
                    routes[j] = routes[j + 1];
                    routes[j + 1] = tempRoute;
                }
            }
        }
        
        System.out.println("Fare Optimization Analysis:");
        System.out.println("Cheapest Route: " + routes[0] + " (₱" + String.format("%.2f", totalFares[0]) + ")");
        System.out.println("Most Expensive Route: " + routes[routes.length - 1] + " (₱" + String.format("%.2f", totalFares[routes.length - 1]) + ")");
        
        // Calculate average fare
        double total = 0;
        for (int i = 0; i < totalFares.length; i++) {
            total += totalFares[i];
        }
        double averageFare = total / totalFares.length;
        System.out.println("Average Fare: ₱" + String.format("%.2f", averageFare));
        
        System.out.println();
        System.out.println("Route Recommendations:");
        System.out.println("- For Budget Travel: " + routes[0]);
        System.out.println("- For Speed: " + routes[1]);
        System.out.println("- For Comfort: " + routes[2]);
        
        System.out.println();
        System.out.println("Fare History:");
        System.out.println("- Lowest recorded fare: ₱" + String.format("%.2f", totalFares[0]));
        System.out.println("- Highest recorded fare: ₱" + String.format("%.2f", totalFares[routes.length - 1]));
        System.out.println("- Average fare: ₱" + String.format("%.2f", averageFare));
        System.out.println("=============================");
    }
}`
};

// Use namespace to avoid conflicts
window.tahoSolutions = tahoSolutions;