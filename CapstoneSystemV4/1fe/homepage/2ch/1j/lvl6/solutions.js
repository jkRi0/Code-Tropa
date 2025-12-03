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
import java.util.Scanner;

public class JeepneyFare {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Parallel arrays for destinations and fares
        String[] destinations = {"Quiapo", "Makati", "Cubao", "Ortigas", "BGC"};
        int[] fares = {12, 15, 18, 20, 25};
        
        System.out.println("Jeepney Fare Calculator");
        System.out.println("======================");
        
        // Get user input
        System.out.print("Enter destination: ");
        String userDestination = scanner.nextLine();
        
        System.out.print("Are you a senior/student? (y/n): ");
        String discountEligible = scanner.nextLine().toLowerCase();
        
        // Validate destination and find fare
        int destinationIndex = -1;
        for (int i = 0; i < destinations.length; i++) {
            if (destinations[i].equalsIgnoreCase(userDestination)) {
                destinationIndex = i;
                break;
            }
        }
        
        if (destinationIndex == -1) {
            System.out.println("❌ Invalid destination! Please choose from:");
            for (String dest : destinations) {
                System.out.println("- " + dest);
            }
        } else {
            int regularFare = fares[destinationIndex];
            double discount = 0.0;
            
            if (discountEligible.equals("y")) {
                discount = regularFare * 0.20; // 20% discount
            }
            
            double finalFare = regularFare - discount;
            
            System.out.println();
            System.out.println("Destination: " + userDestination);
            System.out.println("Regular Fare: ₱" + regularFare);
            if (discount > 0) {
                System.out.println("Discount (20%): ₱" + (int)discount);
            }
            System.out.println("Final Fare: ₱" + (int)finalFare);
        }
        
        System.out.println("======================");
        scanner.close();
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;