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
        // Print header
        System.out.println("================");
        System.out.println("   TAHO MENU");
        System.out.println("================");
        
        // Print menu items with proper formatting
        System.out.println("Taho:\t\t₱15");
        System.out.println("Syrup:\t\t₱5");
        
        // Print footer
        System.out.println("================");
    }
}`,

    difficult: `
/**
 * TahoVendor class simulates a traditional Filipino taho vendor
 * This program demonstrates proper string formatting and debugging
 */
public class TahoVendor {
    public static void main(String[] args) {
        // Fixed: Added quotes around string literal
        System.out.println("Tahooo!");
        System.out.println("Taho: ₱15");
        System.out.println("Syrup: ₱5");
        // Fixed: Proper string concatenation with parentheses
        System.out.println("Total: " + (15 + 5) + "₱");
    }
}`
};

// Export solutions
// window.tahoSolutions = tahoSolutions;
window.tahoSolutions = tahoSolutions;