const tahoSolutions = {
    easy: `
public class TahoVendor {
    public static void main(String[] args) {
        System.out.println("Tahooo!");
        System.out.println("Regular Taho: ₱20");
        System.out.println("Large Taho: ₱25");
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
        System.out.println("Regular Taho\t₱20");
        System.out.println("Large Taho\t₱25");
        System.out.println("Extra Syrup\t₱5");
        
        // Print footer
        System.out.println("================");
    }
}`,

    difficult: `
/**
 * TahoVendor class simulates a traditional Filipino taho vendor's receipt
 * This program demonstrates proper string formatting and error handling
 */
public class TahoVendor {
    public static void main(String[] args) {
        try {
            // Store header with emojis
            System.out.println(" MANILA TAHO STORE ");
            System.out.println("=====================");
            
            // Menu section
            System.out.println("Menu:");
            System.out.printf("%d. Regular Taho    ₱%d%n", 1, 20);
            System.out.printf("%d. Large Taho      ₱%d%n", 2, 25);
            System.out.printf("%d. Extra Syrup     ₱%d%n", 3, 5);
            
            // Footer
            System.out.println("=====================");
            System.out.println("Salamat po!");
        } catch (Exception e) {
            System.out.println("Error printing menu: " + e.getMessage());
        }
    }
}`
};

// Export solutions
// window.tahoSolutions = tahoSolutions;
window.tahoSolutions = tahoSolutions;