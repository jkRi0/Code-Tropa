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
// Taho vendor's traditional call
public class TahoVendor {
    public static void main(String[] args) {
        /* 
         * Taho is a beloved Filipino street food tradition
         * Vendors walk through neighborhoods calling "Tahooo!"
         * to announce their presence and attract customers
         */
        
        // Print formatted menu
        System.out.println("================\n   TAHO MENU\n================");
        System.out.println("Regular Taho\t₱20");
        System.out.println("Large Taho\t₱25");
        System.out.println("Extra Syrup\t₱5");
        System.out.println("================");
    }
}`,

    difficult: `
public class TahoVendor {
    public static void main(String[] args) {
        // Store name and header
        System.out.println("MANILA TAHO STORE");
        System.out.println("=====================");
        
        // Price list
        System.out.println("Menu:");
        System.out.println("1. Regular Taho    ₱20");
        System.out.println("2. Large Taho      ₱25");
        System.out.println("3. Extra Syrup     ₱5");
        
        // Footer
        System.out.println("=====================");
        System.out.println("Salamat po!");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;