// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>
using namespace std;

int main() {
    string locations[] = {"Barangay San Jose", "Barangay Santa Maria", "Barangay San Pedro"};
    int threatLevels[] = {2, 5, 3};
    
    cout << "Aswang Alert Tracker" << endl;
    cout << "===================" << endl;
    
    for (int i = 0; i < 3; i++) {
        cout << "Alert " << (i + 1) << ": " << locations[i] 
             << " - Threat Level: " << threatLevels[i] << endl;
    }
    
    cout << "===================" << endl;
    return 0;
}`,

    average: `
#include <iostream>
#include <string>
using namespace std;

int main() {
    string locations[] = {"Barangay San Jose", "Barangay Santa Maria", "Barangay San Pedro"};
    int threatLevels[] = {2, 5, 3};
    
    cout << "Aswang Alert Tracker" << endl;
    cout << "===================" << endl;
    
    for (int i = 0; i < 3; i++) {
        cout << "Alert " << (i + 1) << ": " << locations[i] 
             << " - Threat Level: " << threatLevels[i] << endl;
    }
    
    cout << "===================" << endl;
    cout << endl;
    cout << "Alert Analysis:" << endl;
    
    int highCount = 0, mediumCount = 0, lowCount = 0;
    
    for (int i = 0; i < 3; i++) {
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
        
        cout << locations[i] << ": " << threatCategory 
             << " - " << recommendation << endl;
    }
    
    cout << endl;
    cout << "Safety Status: " << highCount << " High, " << mediumCount 
         << " Medium, " << lowCount << " Low threat alerts" << endl;
    cout << "===================" << endl;
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Alert {
    string location;
    int threatLevel;
    int priority;
    
    Alert(string loc, int threat) : location(loc), threatLevel(threat) {
        priority = (threat >= 4) ? 1 : (threat >= 2) ? 2 : 3;
    }
};

bool compareByPriority(const Alert& a, const Alert& b) {
    return a.priority < b.priority;
}

int main() {
    vector<Alert> alerts = {
        Alert("Barangay San Jose", 2),
        Alert("Barangay Santa Maria", 5),
        Alert("Barangay San Pedro", 3)
    };
    
    cout << "Aswang Alert Tracker" << endl;
    cout << "===================" << endl;
    
    for (int i = 0; i < alerts.size(); i++) {
        cout << "Alert " << (i + 1) << ": " << alerts[i].location 
             << " - Threat Level: " << alerts[i].threatLevel << endl;
    }
    
    cout << "===================" << endl;
    cout << endl;
    
    // Sort by priority
    sort(alerts.begin(), alerts.end(), compareByPriority);
    
    cout << "Alert Prioritization:" << endl;
    for (int i = 0; i < alerts.size(); i++) {
        string priorityText;
        if (alerts[i].priority == 1) {
            priorityText = "High Threat - Priority 1";
        } else if (alerts[i].priority == 2) {
            priorityText = "Medium Threat - Priority 2";
        } else {
            priorityText = "Low Threat - Priority 3";
        }
        cout << (i + 1) << ". " << alerts[i].location 
             << " (" << priorityText << ")" << endl;
    }
    
    cout << endl;
    cout << "Evacuation Plan:" << endl;
    
    vector<string> highRiskAreas, safeZones;
    
    for (const Alert& alert : alerts) {
        if (alert.threatLevel >= 4) {
            highRiskAreas.push_back(alert.location);
        } else if (alert.threatLevel <= 2) {
            safeZones.push_back(alert.location);
        }
    }
    
    if (!highRiskAreas.empty()) {
        cout << "- High Risk Areas: ";
        for (int i = 0; i < highRiskAreas.size(); i++) {
            cout << highRiskAreas[i];
            if (i < highRiskAreas.size() - 1) cout << ", ";
        }
        cout << endl;
    }
    cout << "- Evacuation Route: Use main roads, avoid shortcuts" << endl;
    if (!safeZones.empty()) {
        cout << "- Safe Zones: ";
        for (int i = 0; i < safeZones.size(); i++) {
            cout << safeZones[i];
            if (i < safeZones.size() - 1) cout << ", ";
        }
        cout << " (Low threat area)" << endl;
    }
    
    cout << endl;
    cout << "Safety Recommendations:" << endl;
    
    for (const Alert& alert : alerts) {
        if (alert.threatLevel >= 4) {
            cout << "- Avoid " << alert.location << " completely" << endl;
        } else if (alert.threatLevel >= 2) {
            cout << "- Travel in groups through " << alert.location << endl;
        } else {
            cout << "- Stay indoors in " << alert.location << " after sunset" << endl;
        }
    }
    
    cout << "===================" << endl;
    return 0;
}`
};

// Use namespace to avoid conflicts
window.tahoSolutions = tahoSolutions;
