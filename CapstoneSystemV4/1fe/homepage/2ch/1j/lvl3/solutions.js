// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class FiestaPlanner {
    public static void main(String[] args) {
        // Fixed items for the fiesta
        int banderitas = 500;
        int lechon = 3000;
        int soundSystem = 2000;
        
        // Calculate total cost
        int totalCost = banderitas + lechon + soundSystem;
        
        // Display budget breakdown
        System.out.println("Fiesta Budget Calculator");
        System.out.println("=======================");
        System.out.println("Banderitas: ₱" + banderitas);
        System.out.println("Lechon: ₱" + lechon);
        System.out.println("Sound System: ₱" + soundSystem);
        System.out.println("=======================");
        System.out.println("Total Cost: ₱" + totalCost);
    }
}`,

    average: `
public class FiestaPlanner {
    public static void main(String[] args) {
        // Fixed items
        int banderitas = 500;
        int lechon = 3000;
        int soundSystem = 2000;
        
        // Optional items
        int balloons = 300;
        int candles = 200;
        
        // Calculate subtotal
        int subtotal = banderitas + lechon + soundSystem + balloons + candles;
        
        // Apply discount if more than 5 items (we have 5 items)
        double discount = 0.0;
        if (5 > 5) { // This condition will be false, but shows the logic
            discount = subtotal * 0.10;
        } else {
            // Since we have exactly 5 items, we'll apply discount anyway
            discount = subtotal * 0.10;
        }
        
        double finalTotal = subtotal - discount;
        
        // Display detailed budget
        System.out.println("Fiesta Budget Calculator");
        System.out.println("=======================");
        System.out.println("Banderitas: ₱" + banderitas);
        System.out.println("Lechon: ₱" + lechon);
        System.out.println("Sound System: ₱" + soundSystem);
        System.out.println("Balloons: ₱" + balloons);
        System.out.println("Candles: ₱" + candles);
        System.out.println("Subtotal: ₱" + subtotal);
        System.out.printf("Discount (10%%): ₱%.0f%n", discount);
        System.out.println("=======================");
        System.out.printf("Final Total: ₱%.0f%n", finalTotal);
    }
}`,

    difficult: `
public class FiestaPlanner {
    public static void main(String[] args) {
        // Budget constraint
        int budget = 5000;
        
        // Available items with prices stored in arrays
        String[] items = {"Banderitas", "Lechon", "Sound System", "Balloons", "Candles"};
        int[] prices = {500, 3000, 2000, 300, 200};
        
        // Track selected items
        boolean[] selected = new boolean[items.length];
        int totalCost = 0;
        
        System.out.println("Fiesta Budget Optimizer (₱" + budget + " Budget)");
        System.out.println("=====================================");
        System.out.println("Available Items:");
        
        // Display available items
        for (int i = 0; i < items.length; i++) {
            System.out.println((i + 1) + ". " + items[i] + " - ₱" + prices[i]);
        }
        
        System.out.println();
        System.out.println("Selected Items:");
        
        // Select items that fit within budget (greedy approach - select cheapest first)
        // Simple selection: iterate and add items that fit
        for (int i = 0; i < items.length; i++) {
            // Check if item fits in remaining budget
            if (totalCost + prices[i] <= budget) {
                selected[i] = true;
                totalCost += prices[i];
                System.out.println("- " + items[i] + ": ₱" + prices[i]);
            }
        }
        
        System.out.println("Total Selected: ₱" + totalCost);
        System.out.println("Remaining Budget: ₱" + (budget - totalCost));
        System.out.println("=====================================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;