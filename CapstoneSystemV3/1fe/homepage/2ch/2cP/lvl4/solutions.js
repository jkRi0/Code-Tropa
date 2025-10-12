// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>

int main() {
    int currentHour;
    
    std::cout << "Barangay Curfew Check" << std::endl;
    std::cout << "====================" << std::endl;
    std::cout << "Enter current hour (0-23): ";
    std::cin >> currentHour;
    
    // Check if time is after 10 PM (22:00)
    if (currentHour >= 22) {
        std::cout << "⚠️ CURFEW VIOLATION! It's past 10 PM." << std::endl;
    } else {
        std::cout << "✅ No curfew violation. You're safe!" << std::endl;
    }
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>

int main() {
    int age, currentHour;
    
    std::cout << "Barangay Curfew Check" << std::endl;
    std::cout << "====================" << std::endl;
    
    // Get age and time
    std::cout << "Enter your age: ";
    std::cin >> age;
    
    std::cout << "Enter current hour (0-23): ";
    std::cin >> currentHour;
    
    // Check curfew rules with exemptions
    if (currentHour >= 22) {
        // Check for exemptions
        if (age < 18) {
            std::cout << "✅ EXEMPTION: Minors are exempt from curfew." << std::endl;
        } else if (age >= 65) {
            std::cout << "✅ EXEMPTION: Senior citizens are exempt from curfew." << std::endl;
        } else {
            std::cout << "⚠️ CURFEW VIOLATION! It's past 10 PM and you're not exempt." << std::endl;
        }
    } else {
        std::cout << "✅ No curfew violation. You're safe!" << std::endl;
    }
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <vector>

std::string checkCurfewViolation(int age, const std::string& reason, int currentHour) {
    if (currentHour >= 22) {
        // Check exemptions
        if (age < 18) {
            return "✅ EXEMPT - Minor";
        } else if (age >= 65) {
            return "✅ EXEMPT - Senior citizen";
        } else if (reason == "Medical" || reason == "Emergency") {
            return "✅ VALID - " + reason + " reason";
        } else {
            return "⚠️ VIOLATION - No valid reason";
        }
    } else {
        return "✅ SAFE - Before curfew hours";
    }
}

int main() {
    // Resident data
    std::vector<std::string> names = {"Juan", "Maria", "Pedro", "Ana"};
    std::vector<int> ages = {25, 16, 70, 30};
    std::vector<std::string> reasons = {"Work", "School", "Medical", "Emergency"};
    
    int currentHour = 22; // 10 PM
    int violationCount = 0;
    
    std::cout << "Barangay Curfew Check Report" << std::endl;
    std::cout << "============================" << std::endl;
    
    // Check each resident
    for (size_t i = 0; i < names.size(); i++) {
        std::string status = checkCurfewViolation(ages[i], reasons[i], currentHour);
        std::cout << "Resident: " << names[i] << " (" << ages[i] << ") - " << reasons[i] << std::endl;
        std::cout << "Status: " << status << std::endl;
        std::cout << std::endl;
        
        if (status.find("VIOLATION") != std::string::npos) {
            violationCount++;
        }
    }
    
    std::cout << "Total Violations: " << violationCount << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
