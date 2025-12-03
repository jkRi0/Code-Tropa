// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class TricycleDispatch {
    public static void main(String[] args) {
        // Store 3 tricycle drivers and their availability status
        String[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};
        boolean[] available = {true, false, true};
        
        System.out.println("Tricycle Dispatch System");
        System.out.println("=======================");
        
        // Print each driver's name and availability status using a loop
        for (int i = 0; i < drivers.length; i++) {
            String status = available[i] ? "Available" : "Busy";
            System.out.println("Driver " + (i + 1) + ": " + drivers[i] + " - " + status);
        }
        
        System.out.println("=======================");
    }
}`,

    average: `
public class TricycleDispatch {
    public static void main(String[] args) {
        // Driver data
        String[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};
        boolean[] available = {true, false, true};
        
        System.out.println("Tricycle Dispatch System");
        System.out.println("=======================");
        
        // Display driver status
        for (int i = 0; i < drivers.length; i++) {
            String status = available[i] ? "Available" : "Busy";
            System.out.println("Driver " + (i + 1) + ": " + drivers[i] + " - " + status);
        }
        
        System.out.println("=======================");
        
        // Assign passengers to available drivers and calculate fare
        String[] passengers = {"Maria", "Ana"};
        double[] distances = {2.5, 3.0};
        
        System.out.println();
        System.out.println("Dispatch Assignment:");
        
        int passengerIndex = 0;
        for (int i = 0; i < drivers.length && passengerIndex < passengers.length; i++) {
            if (available[i]) {
                String passenger = passengers[passengerIndex];
                String driver = drivers[i];
                double distance = distances[passengerIndex];
                double fare = distance * 10; // ₱10 per km
                
                System.out.println("Passenger: " + passenger);
                System.out.println("Assigned Driver: " + driver);
                System.out.println("Distance: " + distance + " km");
                System.out.println("Fare: ₱" + String.format("%.2f", fare));
                System.out.println();
                
                passengerIndex++;
            }
        }
        
        System.out.println("=======================");
    }
}`,

    difficult: `
public class TricycleDispatch {
    public static void main(String[] args) {
        // Driver data
        String[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};
        boolean[] available = {true, false, true};
        double[] driverEarnings = {0.0, 0.0, 0.0};
        int[] tripCounts = {0, 0, 0};
        
        System.out.println("Tricycle Dispatch System");
        System.out.println("=======================");
        
        // Display driver status
        for (int i = 0; i < drivers.length; i++) {
            String status = available[i] ? "Available" : "Busy";
            System.out.println("Driver " + (i + 1) + ": " + drivers[i] + " - " + status);
        }
        
        System.out.println("=======================");
        
        // Optimize driver assignments and track earnings
        String[] passengers = {"Maria", "Ana"};
        double[] distances = {2.5, 3.0};
        double[] passengerDistances = {2.5, 3.0}; // Distance from dispatch center
        
        System.out.println();
        System.out.println("Optimized Dispatch:");
        
        for (int p = 0; p < passengers.length; p++) {
            String passenger = passengers[p];
            double distance = distances[p];
            
            // Find closest available driver
            int bestDriverIndex = -1;
            double minDistance = Double.MAX_VALUE;
            
            for (int i = 0; i < drivers.length; i++) {
                if (available[i]) {
                    double driverDistance = passengerDistances[p]; // Simplified distance calculation
                    if (driverDistance < minDistance) {
                        minDistance = driverDistance;
                        bestDriverIndex = i;
                    }
                }
            }
            
            if (bestDriverIndex != -1) {
                String driver = drivers[bestDriverIndex];
                double fare = distance * 10; // ₱10 per km
                
                System.out.println("Passenger: " + passenger);
                System.out.println("Assigned Driver: " + driver + " (closest)");
                System.out.println("Distance: " + distance + " km");
                System.out.println("Fare: ₱" + String.format("%.2f", fare));
                System.out.println();
                
                // Update driver earnings and trip count
                driverEarnings[bestDriverIndex] += fare;
                tripCounts[bestDriverIndex]++;
            }
        }
        
        // Display driver performance
        System.out.println("Driver Performance:");
        for (int i = 0; i < drivers.length; i++) {
            System.out.println(drivers[i] + ": " + tripCounts[i] + " trip" + 
                             (tripCounts[i] != 1 ? "s" : "") + ", ₱" + 
                             String.format("%.2f", driverEarnings[i]) + " earned");
        }
        
        System.out.println("=======================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;