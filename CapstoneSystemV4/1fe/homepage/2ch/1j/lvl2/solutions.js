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
public class SariSariStore {
    public static void main(String[] args) {
        // Use arrays to store product data
        String[] products = {"Vinegar", "Eggs", "Bread"};
        double[] prices = {25.50, 8.00, 35.00};
        int[] stock = {15, 25, 10};
        
        int threshold = 20;
        double totalValue = 0;
        int restockCount = 0;
        
        // Display inventory report using loops
        System.out.println("Sari-Sari Store Inventory Report");
        System.out.println("================================");
        
        for (int i = 0; i < products.length; i++) {
            double itemValue = prices[i] * stock[i];
            totalValue += itemValue;
            
            System.out.printf("%s: %d units @ ₱%.2f = ₱%.2f%n", 
                products[i], stock[i], prices[i], itemValue);
            
            // Check if stock is below threshold
            if (stock[i] < threshold) {
                System.out.println("RESTOCK ALERT: Below threshold (" + stock[i] + " < " + threshold + ")");
                restockCount++;
            } else {
                System.out.println("Stock OK");
            }
            System.out.println();
        }
        
        System.out.println("Total Inventory Value: ₱" + String.format("%.2f", totalValue));
        System.out.println("Items Needing Restock: " + restockCount);
        System.out.println("================================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;