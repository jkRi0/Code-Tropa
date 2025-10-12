// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class AlbularyoPotionLog {
    public static void main(String[] args) {
        // Store 3 potion names and their effects in arrays
        String[] potions = {"Sampaguita Tea", "Ginger Root", "Turmeric Mix"};
        String[] effects = {"Calming effect", "Digestive aid", "Anti-inflammatory"};
        
        System.out.println("Albularyo Potion Log");
        System.out.println("===================");
        
        // Print each potion and its effect using a loop
        for (int i = 0; i < potions.length; i++) {
            System.out.println("Potion " + (i + 1) + ": " + potions[i] + " - " + effects[i]);
        }
        
        System.out.println("===================");
    }
}`,

    average: `
public class AlbularyoPotionLog {
    public static void main(String[] args) {
        // Potion data
        String[] potions = {"Sampaguita Tea", "Ginger Root", "Turmeric Mix"};
        String[] effects = {"Calming effect", "Digestive aid", "Anti-inflammatory"};
        
        System.out.println("Albularyo Potion Log");
        System.out.println("===================");
        
        // Display potion information
        for (int i = 0; i < potions.length; i++) {
            System.out.println("Potion " + (i + 1) + ": " + potions[i] + " - " + effects[i]);
        }
        
        System.out.println("===================");
        
        // Track potion usage and calculate success rates
        int[] usageCount = {5, 3, 4};
        int[] successCount = {4, 3, 3};
        
        System.out.println();
        System.out.println("Usage Statistics:");
        
        for (int i = 0; i < potions.length; i++) {
            double successRate = (double) successCount[i] / usageCount[i] * 100;
            System.out.println(potions[i] + ": " + usageCount[i] + " uses, " + 
                             String.format("%.0f", successRate) + "% success rate");
        }
        
        System.out.println("===================");
    }
}`,

    difficult: `
public class AlbularyoPotionLog {
    public static void main(String[] args) {
        // Potion data
        String[] potions = {"Sampaguita Tea", "Ginger Root", "Turmeric Mix"};
        String[] effects = {"Calming effect", "Digestive aid", "Anti-inflammatory"};
        
        System.out.println("Albularyo Potion Log");
        System.out.println("===================");
        
        // Display potion information
        for (int i = 0; i < potions.length; i++) {
            System.out.println("Potion " + (i + 1) + ": " + potions[i] + " - " + effects[i]);
        }
        
        System.out.println("===================");
        
        // Analyze potion effectiveness and generate recommendations
        int[] usageCount = {5, 3, 4};
        int[] successCount = {4, 3, 3};
        String[] bestFor = {"Anxiety, Insomnia", "Nausea, Indigestion", "Joint Pain, Inflammation"};
        String[] dosages = {"2 cups daily", "1 tablespoon", "1 teaspoon"};
        
        System.out.println();
        System.out.println("Detailed Analysis:");
        
        for (int i = 0; i < potions.length; i++) {
            double successRate = (double) successCount[i] / usageCount[i] * 100;
            System.out.println(potions[i] + ": " + usageCount[i] + " uses, " + 
                             String.format("%.0f", successRate) + "% success rate");
            System.out.println("  Most Effective For: " + bestFor[i]);
            System.out.println("  Recommended Dosage: " + dosages[i]);
        }
        
        System.out.println();
        System.out.println("Recommendations:");
        System.out.println("- For digestive issues: Combine Ginger Root + Turmeric Mix");
        System.out.println("- For sleep problems: Use Sampaguita Tea before bedtime");
        System.out.println("- For inflammation: Apply Turmeric Mix externally");
        System.out.println("===================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;