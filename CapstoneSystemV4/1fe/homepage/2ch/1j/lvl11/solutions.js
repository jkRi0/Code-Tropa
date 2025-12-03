// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class BarangayAnalyzer {
    public static void main(String[] args) {
        // Store 3 barangay names and populations in arrays
        String[] barangays = {"San Jose", "Santa Maria", "San Pedro"};
        int[] populations = {15000, 22000, 18500};
        
        System.out.println("Barangay Population Analysis");
        System.out.println("===========================");
        
        // Print each barangay's name and population using a loop
        for (int i = 0; i < barangays.length; i++) {
            System.out.println("Barangay " + (i + 1) + ": " + barangays[i] + " - " + populations[i] + " residents");
        }
        
        System.out.println("===========================");
    }
}`,

    average: `
public class BarangayAnalyzer {
    public static void main(String[] args) {
        // Barangay data
        String[] barangays = {"San Jose", "Santa Maria", "San Pedro"};
        int[] populations = {15000, 22000, 18500};
        
        System.out.println("Barangay Population Analysis");
        System.out.println("===========================");
        
        // Display barangay data
        for (int i = 0; i < barangays.length; i++) {
            System.out.println("Barangay " + (i + 1) + ": " + barangays[i] + " - " + populations[i] + " residents");
        }
        
        System.out.println("===========================");
        
        // Calculate total and average population
        int totalPopulation = 0;
        for (int population : populations) {
            totalPopulation += population;
        }
        
        double averagePopulation = (double) totalPopulation / populations.length;
        
        System.out.println();
        System.out.println("Summary Statistics:");
        System.out.println("Total Population: " + totalPopulation);
        System.out.println("Average Population: " + (int) averagePopulation);
        System.out.println("===========================");
    }
}`,

    difficult: `
public class BarangayAnalyzer {
    public static void main(String[] args) {
        // Barangay data
        String[] barangays = {"San Jose", "Santa Maria", "San Pedro"};
        int[] populations = {15000, 22000, 18500};
        
        System.out.println("Barangay Population Analysis");
        System.out.println("===========================");
        
        // Find highest and lowest population
        int maxIndex = 0;
        int minIndex = 0;
        int totalPopulation = 0;
        
        for (int i = 0; i < populations.length; i++) {
            if (populations[i] > populations[maxIndex]) {
                maxIndex = i;
            }
            if (populations[i] < populations[minIndex]) {
                minIndex = i;
            }
            totalPopulation += populations[i];
        }
        
        double averagePopulation = (double) totalPopulation / populations.length;
        
        // Display barangay data with size categories
        int smallCount = 0, mediumCount = 0, largeCount = 0;
        
        for (int i = 0; i < barangays.length; i++) {
            String sizeCategory;
            if (populations[i] < 16000) {
                sizeCategory = "Small";
                smallCount++;
            } else if (populations[i] <= 20000) {
                sizeCategory = "Medium";
                mediumCount++;
            } else {
                sizeCategory = "Large";
                largeCount++;
            }
            
            System.out.println("Barangay " + (i + 1) + ": " + barangays[i] + " - " + populations[i] + " residents (" + sizeCategory + ")");
        }
        
        System.out.println("===========================");
        
        // Display detailed analysis
        System.out.println();
        System.out.println("Detailed Analysis:");
        System.out.println("Highest Population: " + barangays[maxIndex] + " (" + populations[maxIndex] + ")");
        System.out.println("Lowest Population: " + barangays[minIndex] + " (" + populations[minIndex] + ")");
        System.out.println("Total Population: " + totalPopulation);
        System.out.println("Average Population: " + (int) averagePopulation);
        
        System.out.println();
        System.out.println("Size Categories:");
        System.out.println("Small (< 16,000): " + smallCount + " barangay" + (smallCount != 1 ? "s" : ""));
        System.out.println("Medium (16,000-20,000): " + mediumCount + " barangay" + (mediumCount != 1 ? "s" : ""));
        System.out.println("Large (> 20,000): " + largeCount + " barangay" + (largeCount != 1 ? "s" : ""));
        System.out.println("===========================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;