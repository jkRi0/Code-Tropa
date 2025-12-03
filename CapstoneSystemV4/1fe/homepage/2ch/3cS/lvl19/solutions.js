// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class AswangAlertTracker {
    static void Main() {
        string[] locations = {"Barangay San Jose", "Barangay Santa Maria", "Barangay San Pedro"};
        int[] threatLevels = {2, 5, 3};
        
        Console.WriteLine("Aswang Alert Tracker");
        Console.WriteLine("===================");
        
        for (int i = 0; i < locations.Length; i++) {
            Console.WriteLine($"Alert {i + 1}: {locations[i]} - Threat Level: {threatLevels[i]}");
        }
        
        Console.WriteLine("===================");
    }
}`,

    average: `
using System;

class AswangAlertTracker {
    static void Main() {
        string[] locations = {"Barangay San Jose", "Barangay Santa Maria", "Barangay San Pedro"};
        int[] threatLevels = {2, 5, 3};
        
        Console.WriteLine("Aswang Alert Tracker");
        Console.WriteLine("===================");
        
        for (int i = 0; i < locations.Length; i++) {
            Console.WriteLine($"Alert {i + 1}: {locations[i]} - Threat Level: {threatLevels[i]}");
        }
        
        Console.WriteLine("===================");
        Console.WriteLine();
        Console.WriteLine("Alert Analysis:");
        
        int highCount = 0, mediumCount = 0, lowCount = 0;
        
        for (int i = 0; i < locations.Length; i++) {
            string threatCategory;
            string recommendation;
            
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
            
            Console.WriteLine($"{locations[i]}: {threatCategory} - {recommendation}");
        }
        
        Console.WriteLine();
        Console.WriteLine($"Safety Status: {highCount} High, {mediumCount} Medium, {lowCount} Low threat alerts");
        Console.WriteLine("===================");
    }
}`,

    difficult: `
using System;
using System.Collections.Generic;
using System.Linq;

class Alert {
    public string Location { get; set; }
    public int ThreatLevel { get; set; }
    public int Priority { get; set; }
    
    public Alert(string location, int threatLevel) {
        Location = location;
        ThreatLevel = threatLevel;
        Priority = threatLevel >= 4 ? 1 : threatLevel >= 2 ? 2 : 3;
    }
}

class AswangAlertTracker {
    static void Main() {
        List<Alert> alerts = new List<Alert> {
            new Alert("Barangay San Jose", 2),
            new Alert("Barangay Santa Maria", 5),
            new Alert("Barangay San Pedro", 3)
        };
        
        Console.WriteLine("Aswang Alert Tracker");
        Console.WriteLine("===================");
        
        for (int i = 0; i < alerts.Count; i++) {
            Console.WriteLine($"Alert {i + 1}: {alerts[i].Location} - Threat Level: {alerts[i].ThreatLevel}");
        }
        
        Console.WriteLine("===================");
        Console.WriteLine();
        
        // Sort by priority
        alerts = alerts.OrderBy(a => a.Priority).ToList();
        
        Console.WriteLine("Alert Prioritization:");
        for (int i = 0; i < alerts.Count; i++) {
            string priorityText = alerts[i].Priority == 1 ? "High Threat - Priority 1" :
                                 alerts[i].Priority == 2 ? "Medium Threat - Priority 2" :
                                 "Low Threat - Priority 3";
            Console.WriteLine($"{i + 1}. {alerts[i].Location} ({priorityText})");
        }
        
        Console.WriteLine();
        Console.WriteLine("Evacuation Plan:");
        
        var highRiskAreas = alerts.Where(a => a.ThreatLevel >= 4).Select(a => a.Location).ToList();
        var safeZones = alerts.Where(a => a.ThreatLevel <= 2).Select(a => a.Location).ToList();
        
        if (highRiskAreas.Any()) {
            Console.WriteLine($"- High Risk Areas: {string.Join(", ", highRiskAreas)}");
        }
        Console.WriteLine("- Evacuation Route: Use main roads, avoid shortcuts");
        if (safeZones.Any()) {
            Console.WriteLine($"- Safe Zones: {string.Join(", ", safeZones)} (Low threat area)");
        }
        
        Console.WriteLine();
        Console.WriteLine("Safety Recommendations:");
        
        foreach (var alert in alerts) {
            if (alert.ThreatLevel >= 4) {
                Console.WriteLine($"- Avoid {alert.Location} completely");
            } else if (alert.ThreatLevel >= 2) {
                Console.WriteLine($"- Travel in groups through {alert.Location}");
            } else {
                Console.WriteLine($"- Stay indoors in {alert.Location} after sunset");
            }
        }
        
        Console.WriteLine("===================");
    }
}`
};

// Use namespace to avoid conflicts
window.tahoSolutions = tahoSolutions;
