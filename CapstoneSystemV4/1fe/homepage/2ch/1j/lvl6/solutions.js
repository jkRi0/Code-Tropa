// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class JeepneyFare {
    public static void main(String[] args) {
        // Create an array of 5 destinations
        String[] destinations = {"Quiapo", "Makati", "Cubao", "Ortigas", "BGC"};
        
        System.out.println("Jeepney Destinations");
        System.out.println("===================");
        
        // Print each destination using a loop
        for (int i = 0; i < destinations.length; i++) {
            System.out.println((i + 1) + ". " + destinations[i]);
        }
    }
}`,

    average: `
public class JeepneyFare {
    public static void main(String[] args) {
        // Parallel arrays for destinations and fares
        String[] destinations = {"Quiapo", "Makati", "Cubao", "Ortigas", "BGC"};
        int[] fares = {12, 15, 18, 20, 25};
        
        int totalFare = 0;
        
        System.out.println("Jeepney Fare Calculator");
        System.out.println("======================");
        
        // Display destinations with fares and calculate total
        for (int i = 0; i < destinations.length; i++) {
            System.out.println("Destination: " + destinations[i] + " - ₱" + fares[i]);
            totalFare += fares[i];
        }
        
        System.out.println("======================");
        System.out.println("Total Fare: ₱" + totalFare);
    }
}`,

    difficult: `
public class JeepneyFare {
    public static void main(String[] args) {
        // Parallel arrays for destinations and fares
        String[] destinations = {"Quiapo", "Makati", "Cubao", "Ortigas", "BGC"};
        int[] fares = {12, 15, 18, 20, 25};
        
        // Passenger data arrays
        String[] passengerDestinations = {"Makati", "Cubao", "Ortigas", "BGC"};
        String[] passengerTypes = {"Regular", "Student", "Senior", "Regular"};
        
        int totalFare = 0;
        int totalDiscount = 0;
        
        System.out.println("Jeepney Fare Calculator");
        System.out.println("======================");
        
        // Loop through passengers and calculate fares
        for (int i = 0; i < passengerDestinations.length; i++) {
            // Find destination index
            int destIndex = -1;
            for (int j = 0; j < destinations.length; j++) {
                if (destinations[j].equals(passengerDestinations[i])) {
                    destIndex = j;
                    break;
                }
            }
            
            if (destIndex != -1) {
                int regularFare = fares[destIndex];
                int discount = 0;
                
                // Apply discount using conditional
                if (passengerTypes[i].equals("Student") || passengerTypes[i].equals("Senior")) {
                    discount = (int)(regularFare * 0.20); // 20% discount
                }
                
                int finalFare = regularFare - discount;
                totalFare += finalFare;
                totalDiscount += discount;
                
                System.out.print("Passenger " + (i + 1) + ": " + passengerDestinations[i] + 
                    " - " + passengerTypes[i] + " - ₱" + finalFare);
                if (discount > 0) {
                    System.out.println(" (20% discount)");
                } else {
                    System.out.println();
                }
            }
        }
        
        System.out.println("======================");
        System.out.println("Total Fare: ₱" + totalFare);
        System.out.println("Total Discount: ₱" + totalDiscount);
        System.out.println("Final Total: ₱" + totalFare);
        System.out.println("======================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;