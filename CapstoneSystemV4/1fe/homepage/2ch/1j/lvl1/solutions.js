// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class TahoVendor {
    public static void main(String[] args) {
        System.out.println("Tahooo!");
        System.out.println("Taho: ₱15");
        System.out.println("Syrup: ₱5");
    }
}`,

    average: `
/* 
 * Taho is a beloved Filipino street food made of silken tofu,
 * brown sugar syrup, and sago pearls. Vendors traditionally
 * announce their presence by calling out "Tahooo!"
 */
public class TahoVendor {
    public static void main(String[] args) {
        // Declare price variables
        int tahoPrice = 15;
        int syrupPrice = 5;
        
        // Calculate total price
        int total = tahoPrice + syrupPrice;
        
        // Print vendor's call
        System.out.println("Tahooo!");
        
        // Print formatted menu
        System.out.println("================");
        System.out.println("   TAHO MENU");
        System.out.println("================");
        System.out.println("Taho:     ₱" + tahoPrice);
        System.out.println("Syrup:    ₱" + syrupPrice);
        System.out.println("================");
        System.out.println("Total:    ₱" + total);
        System.out.println("================");
    }
}`,

    difficult: `
/**
 * TahoVendor class simulates a complete taho ordering system
 * This program demonstrates variables, calculations, and formatted output
 */
public class TahoVendor {
    public static void main(String[] args) {
        // Declare price variables for menu items
        int tahoPrice = 15;
        int syrupPrice = 5;
        int extraTahoPrice = 10;
        
        // Declare quantity variables
        int tahoQty = 2;
        int syrupQty = 1;
        int extraTahoQty = 1;
        
        // Calculate subtotals for each item
        int tahoSubtotal = tahoPrice * tahoQty;
        int syrupSubtotal = syrupPrice * syrupQty;
        int extraTahoSubtotal = extraTahoPrice * extraTahoQty;
        
        // Calculate grand total
        int grandTotal = tahoSubtotal + syrupSubtotal + extraTahoSubtotal;
        
        // Print vendor's call
        System.out.println("Tahooo!");
        
        // Print formatted receipt
        System.out.println("====================");
        System.out.println("   TAHO ORDER");
        System.out.println("====================");
        System.out.println("Taho (x" + tahoQty + "):      ₱" + tahoSubtotal);
        System.out.println("Syrup (x" + syrupQty + "):     ₱" + syrupSubtotal);
        System.out.println("Extra Taho (x" + extraTahoQty + "): ₱" + extraTahoSubtotal);
        System.out.println("====================");
        System.out.println("Grand Total:    ₱" + grandTotal);
        System.out.println("====================");
    }
}`
};

// Export solutions
// window.tahoSolutions = tahoSolutions;
window.tahoSolutions = tahoSolutions;