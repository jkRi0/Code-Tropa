// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class SariSariStore {
    public static void main(String[] args) {
        // Declare three product variables with correct data types
        String suka = "Vinegar";
        String itlog = "Eggs";
        String tinapay = "Bread";
        
        // Print each product name
        System.out.println(suka);
        System.out.println(itlog);
        System.out.println(tinapay);
    }
}`,

    average: `
public class SariSariStore {
    public static void main(String[] args) {
        // Product names
        String suka = "Vinegar";
        String itlog = "Eggs";
        String tinapay = "Bread";
        
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
        System.out.println("Sari-Sari Store Inventory");
        System.out.println("========================");
        System.out.printf("%s: %d units @ ₱%.2f = ₱%.2f%n", suka, sukaStock, sukaPrice, sukaValue);
        System.out.printf("%s: %d units @ ₱%.2f = ₱%.2f%n", itlog, itlogStock, itlogPrice, itlogValue);
        System.out.printf("%s: %d units @ ₱%.2f = ₱%.2f%n", tinapay, tinapayStock, tinapayPrice, tinapayValue);
        System.out.println("========================");
        System.out.printf("Total Inventory Value: ₱%.2f%n", totalValue);
    }
}`,

    difficult: `
import java.util.Scanner;

public class SariSariStore {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Product names
        String suka = "Vinegar";
        String itlog = "Eggs";
        String tinapay = "Bread";
        
        // Prices
        double sukaPrice = 25.50;
        double itlogPrice = 8.00;
        double tinapayPrice = 35.00;
        
        // Get new stock levels from user
        System.out.print("Enter new stock for " + suka + ": ");
        int sukaStock = scanner.nextInt();
        
        System.out.print("Enter new stock for " + itlog + ": ");
        int itlogStock = scanner.nextInt();
        
        System.out.print("Enter new stock for " + tinapay + ": ");
        int tinapayStock = scanner.nextInt();
        
        // Calculate values
        double sukaValue = sukaPrice * sukaStock;
        double itlogValue = itlogPrice * itlogStock;
        double tinapayValue = tinapayPrice * tinapayStock;
        
        // Display updated inventory
        System.out.println("\nUpdated Inventory:");
        System.out.printf("%s: %d units @ ₱%.2f = ₱%.2f%n", suka, sukaStock, sukaPrice, sukaValue);
        System.out.printf("%s: %d units @ ₱%.2f = ₱%.2f%n", itlog, itlogStock, itlogPrice, itlogValue);
        System.out.printf("%s: %d units @ ₱%.2f = ₱%.2f%n", tinapay, tinapayStock, tinapayPrice, tinapayValue);
        
        // Check for restock alerts (threshold = 20)
        int threshold = 20;
        System.out.println();
        
        if (sukaStock < threshold) {
            System.out.println("⚠️ RESTOCK ALERT: " + suka + " is below threshold (" + sukaStock + " < " + threshold + ")");
        }
        if (itlogStock < threshold) {
            System.out.println("⚠️ RESTOCK ALERT: " + itlog + " is below threshold (" + itlogStock + " < " + threshold + ")");
        }
        if (tinapayStock < threshold) {
            System.out.println("⚠️ RESTOCK ALERT: " + tinapay + " is below threshold (" + tinapayStock + " < " + threshold + ")");
        }
        
        scanner.close();
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;