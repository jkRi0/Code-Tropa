// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class AswangAlertTracker {
    public static void main(String[] args) {
        String[] locations = {"Barangay San Jose", "Barangay Santa Maria", "Barangay San Pedro"};
        int[] threatLevels = {2, 5, 3};
        
        System.out.println("Aswang Alert Tracker");
        System.out.println("===================");
        
        for (int i = 0; i < locations.length; i++) {
            System.out.printf("Alert %d: %s - Threat Level: %d%n", 
                i + 1, locations[i], threatLevels[i]);
        }
        
        System.out.println("===================");
    }
}`,

    average: `
public class AswangAlertTracker {
    public static void main(String[] args) {
        String[] locations = {"Barangay San Jose", "Barangay Santa Maria", "Barangay San Pedro"};
        int[] threatLevels = {2, 5, 3};
        
        System.out.println("Aswang Alert Tracker");
        System.out.println("===================");
        
        for (int i = 0; i < locations.length; i++) {
            System.out.printf("Alert %d: %s - Threat Level: %d%n", 
                i + 1, locations[i], threatLevels[i]);
        }
        
        System.out.println("===================");
        System.out.println();
        System.out.println("Alert Analysis:");
        
        int highCount = 0, mediumCount = 0, lowCount = 0;
        
        for (int i = 0; i < locations.length; i++) {
            String threatCategory;
            String recommendation;
            
            if (threatLevels[i] >= 4) {
                threatCategory = "High Threat";
                recommendation = "Avoid area, seek shelter";
                highCount++;
            } else if (threatLevels[i] >= 2) {
                threatCategory = "Medium Threat";
                recommendation = "Travel with caution";
                mediumCount++;
            } else {
                threatCategory = "Low Threat";
                recommendation = "Stay indoors after dark";
                lowCount++;
            }
            
            System.out.printf("%s: %s - %s%n", 
                locations[i], threatCategory, recommendation);
        }
        
        System.out.println();
        System.out.printf("Safety Status: %d High, %d Medium, %d Low threat alerts%n", 
            highCount, mediumCount, lowCount);
        System.out.println("===================");
    }
}`,

    difficult: `
public class AswangAlertTracker {
    public static void main(String[] args) {
        String[] locations = {"Barangay San Jose", "Barangay Santa Maria", "Barangay San Pedro"};
        int[] threatLevels = {2, 5, 3};
        int[] priorities = new int[locations.length];
        
        System.out.println("Aswang Alert Tracker");
        System.out.println("===================");
        
        for (int i = 0; i < locations.length; i++) {
            System.out.println("Alert " + (i + 1) + ": " + locations[i] + " - Threat Level: " + threatLevels[i]);
        }
        
        System.out.println("===================");
        System.out.println();
        
        // Calculate priorities
        for (int i = 0; i < threatLevels.length; i++) {
            if (threatLevels[i] >= 4) {
                priorities[i] = 1; // High priority
            } else if (threatLevels[i] >= 2) {
                priorities[i] = 2; // Medium priority
            } else {
                priorities[i] = 3; // Low priority
            }
        }
        
        // Sort by priority using bubble sort
        for (int i = 0; i < priorities.length - 1; i++) {
            for (int j = 0; j < priorities.length - 1 - i; j++) {
                if (priorities[j] > priorities[j + 1]) {
                    // Swap priorities
                    int tempPriority = priorities[j];
                    priorities[j] = priorities[j + 1];
                    priorities[j + 1] = tempPriority;
                    
                    // Swap threat levels
                    int tempThreat = threatLevels[j];
                    threatLevels[j] = threatLevels[j + 1];
                    threatLevels[j + 1] = tempThreat;
                    
                    // Swap locations
                    String tempLocation = locations[j];
                    locations[j] = locations[j + 1];
                    locations[j + 1] = tempLocation;
                }
            }
        }
        
        System.out.println("Alert Prioritization:");
        for (int i = 0; i < locations.length; i++) {
            String priorityText;
            if (priorities[i] == 1) {
                priorityText = "High Threat - Priority 1";
            } else if (priorities[i] == 2) {
                priorityText = "Medium Threat - Priority 2";
            } else {
                priorityText = "Low Threat - Priority 3";
            }
            System.out.println((i + 1) + ". " + locations[i] + " (" + priorityText + ")");
        }
        
        System.out.println();
        System.out.println("Evacuation Plan:");
        
        // Find high risk areas and safe zones
        String highRiskAreas = "";
        String safeZones = "";
        
        for (int i = 0; i < locations.length; i++) {
            if (threatLevels[i] >= 4) {
                if (!highRiskAreas.isEmpty()) highRiskAreas += ", ";
                highRiskAreas += locations[i];
            } else if (threatLevels[i] <= 2) {
                if (!safeZones.isEmpty()) safeZones += ", ";
                safeZones += locations[i];
            }
        }
        
        if (!highRiskAreas.isEmpty()) {
            System.out.println("- High Risk Areas: " + highRiskAreas);
        }
        System.out.println("- Evacuation Route: Use main roads, avoid shortcuts");
        if (!safeZones.isEmpty()) {
            System.out.println("- Safe Zones: " + safeZones + " (Low threat area)");
        }
        
        System.out.println();
        System.out.println("Safety Recommendations:");
        
        for (int i = 0; i < locations.length; i++) {
            if (threatLevels[i] >= 4) {
                System.out.println("- Avoid " + locations[i] + " completely");
            } else if (threatLevels[i] >= 2) {
                System.out.println("- Travel in groups through " + locations[i]);
            } else {
                System.out.println("- Stay indoors in " + locations[i] + " after sunset");
            }
        }
        
        System.out.println("===================");
    }
}`
};

// Use namespace to avoid conflicts
window.tahoSolutions = tahoSolutions;