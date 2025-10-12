// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class FilipinoMenuGenerator {
    public static void main(String[] args) {
        // Store 3 Filipino dishes and their prices in arrays
        String[] dishes = {"Adobo", "Sinigang", "Kare-Kare"};
        double[] prices = {150.00, 180.00, 220.00};
        
        System.out.println("Filipino Family Menu Generator");
        System.out.println("============================");
        
        // Print each dish and its price using a loop
        for (int i = 0; i < dishes.length; i++) {
            System.out.println("Dish " + (i + 1) + ": " + dishes[i] + " - ₱" + String.format("%.2f", prices[i]));
        }
        
        System.out.println("============================");
    }
}`,

    average: `
public class FilipinoMenuGenerator {
    public static void main(String[] args) {
        // Menu data
        String[] dishes = {"Adobo", "Sinigang", "Kare-Kare"};
        double[] prices = {150.00, 180.00, 220.00};
        
        System.out.println("Filipino Family Menu Generator");
        System.out.println("============================");
        
        // Display menu items
        for (int i = 0; i < dishes.length; i++) {
            System.out.println("Dish " + (i + 1) + ": " + dishes[i] + " - ₱" + String.format("%.2f", prices[i]));
        }
        
        System.out.println("============================");
        
        // Calculate total cost and apply family discount
        double originalTotal = 0;
        for (double price : prices) {
            originalTotal += price;
        }
        
        double familyDiscount = originalTotal * 0.10; // 10% family discount
        double finalTotal = originalTotal - familyDiscount;
        
        System.out.println();
        System.out.println("Menu Summary:");
        System.out.println("Original Total: ₱" + String.format("%.2f", originalTotal));
        System.out.println("Family Discount (10%): ₱" + String.format("%.2f", familyDiscount));
        System.out.println("Final Total: ₱" + String.format("%.2f", finalTotal));
        System.out.println("============================");
    }
}`,

    difficult: `
public class FilipinoMenuGenerator {
    public static void main(String[] args) {
        // Menu data
        String[] dishes = {"Adobo", "Sinigang", "Kare-Kare"};
        double[] prices = {150.00, 180.00, 220.00};
        
        System.out.println("Filipino Family Menu Generator");
        System.out.println("============================");
        
        // Display menu items
        for (int i = 0; i < dishes.length; i++) {
            System.out.println("Dish " + (i + 1) + ": " + dishes[i] + " - ₱" + String.format("%.2f", prices[i]));
        }
        
        System.out.println("============================");
        
        // Calculate original total
        double originalTotal = 0;
        for (double price : prices) {
            originalTotal += price;
        }
        
        // Generate personalized menu recommendations
        String[] recommendedDishes = {"Lechon Kawali", "Pancit Canton"};
        double[] recommendedPrices = {200.00, 120.00};
        
        System.out.println();
        System.out.println("Personalized Recommendations:");
        for (int i = 0; i < recommendedDishes.length; i++) {
            System.out.println("- Suggested: " + recommendedDishes[i] + " (₱" + String.format("%.2f", recommendedPrices[i]) + ")");
        }
        
        // Calculate total with recommendations
        double recommendedTotal = originalTotal;
        for (double price : recommendedPrices) {
            recommendedTotal += price;
        }
        
        // Apply family discount
        double familyDiscount = recommendedTotal * 0.10;
        double finalTotal = recommendedTotal - familyDiscount;
        
        // Calculate per-person cost (assuming 4 people)
        int familySize = 4;
        double costPerPerson = finalTotal / familySize;
        
        System.out.println();
        System.out.println("Menu Analysis:");
        System.out.println("Original Total: ₱" + String.format("%.2f", originalTotal));
        System.out.println("With Recommendations: ₱" + String.format("%.2f", recommendedTotal));
        System.out.println("Family Discount (10%): ₱" + String.format("%.2f", familyDiscount));
        System.out.println("Final Total: ₱" + String.format("%.2f", finalTotal));
        System.out.println("Cost per Person (" + familySize + " people): ₱" + String.format("%.2f", costPerPerson));
        System.out.println("============================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;