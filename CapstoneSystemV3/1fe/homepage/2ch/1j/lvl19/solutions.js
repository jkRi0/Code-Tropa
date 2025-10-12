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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class AswangAlertTracker {
    static class Alert {
        String location;
        int threatLevel;
        int priority;
        
        public Alert(String location, int threatLevel) {
            this.location = location;
            this.threatLevel = threatLevel;
            this.priority = calculatePriority(threatLevel);
        }
        
        private int calculatePriority(int threatLevel) {
            if (threatLevel >= 4) return 1; // High priority
            if (threatLevel >= 2) return 2; // Medium priority
            return 3; // Low priority
        }
    }
    
    public static void main(String[] args) {
        List<Alert> alerts = Arrays.asList(
            new Alert("Barangay San Jose", 2),
            new Alert("Barangay Santa Maria", 5),
            new Alert("Barangay San Pedro", 3)
        );
        
        System.out.println("Aswang Alert Tracker");
        System.out.println("===================");
        
        for (int i = 0; i < alerts.size(); i++) {
            Alert alert = alerts.get(i);
            System.out.printf("Alert %d: %s - Threat Level: %d%n", 
                i + 1, alert.location, alert.threatLevel);
        }
        
        System.out.println("===================");
        System.out.println();
        
        // Sort by priority (ascending order)
        alerts.sort(Comparator.comparingInt(alert -> alert.priority));
        
        System.out.println("Alert Prioritization:");
        for (int i = 0; i < alerts.size(); i++) {
            Alert alert = alerts.get(i);
            String priorityText = alert.priority == 1 ? "High Threat - Priority 1" :
                                 alert.priority == 2 ? "Medium Threat - Priority 2" :
                                 "Low Threat - Priority 3";
            System.out.printf("%d. %s (%s)%n", i + 1, alert.location, priorityText);
        }
        
        System.out.println();
        System.out.println("Evacuation Plan:");
        
        List<String> highRiskAreas = new ArrayList<>();
        List<String> safeZones = new ArrayList<>();
        
        for (Alert alert : alerts) {
            if (alert.threatLevel >= 4) {
                highRiskAreas.add(alert.location);
            } else if (alert.threatLevel <= 2) {
                safeZones.add(alert.location);
            }
        }
        
        if (!highRiskAreas.isEmpty()) {
            System.out.println("- High Risk Areas: " + String.join(", ", highRiskAreas));
        }
        System.out.println("- Evacuation Route: Use main roads, avoid shortcuts");
        if (!safeZones.isEmpty()) {
            System.out.println("- Safe Zones: " + String.join(", ", safeZones) + " (Low threat area)");
        }
        
        System.out.println();
        System.out.println("Safety Recommendations:");
        
        for (Alert alert : alerts) {
            if (alert.threatLevel >= 4) {
                System.out.printf("- Avoid %s completely%n", alert.location);
            } else if (alert.threatLevel >= 2) {
                System.out.printf("- Travel in groups through %s%n", alert.location);
            } else {
                System.out.printf("- Stay indoors in %s after sunset%n", alert.location);
            }
        }
        
        System.out.println("===================");
    }
}`
};

// Use namespace to avoid conflicts
window.tahoSolutions = tahoSolutions;