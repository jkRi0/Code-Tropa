// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>

int main() {
    // Declare variable for current hour
    int currentHour = 22; // 10 PM
    
    std::cout << "Barangay Curfew Check" << std::endl;
    std::cout << "====================" << std::endl;
    std::cout << "Current Time: " << currentHour << ":00" << std::endl;
    
    // Check if time is after 10 PM (22:00) using if statement
    if (currentHour >= 22) {
        std::cout << "CURFEW VIOLATION! It's past 10 PM." << std::endl;
    } else {
        std::cout << "No curfew violation. You're safe!" << std::endl;
    }
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>

int main() {
    // Declare variables for age and current hour
    int age = 16;
    int currentHour = 22; // 10 PM
    
    std::cout << "Barangay Curfew Check" << std::endl;
    std::cout << "====================" << std::endl;
    std::cout << "Age: " << age << std::endl;
    std::cout << "Current Time: " << currentHour << ":00" << std::endl;
    
    // Check curfew rules with exemptions using nested if-else
    if (currentHour >= 22) {
        // Check for exemptions
        if (age < 18) {
            std::cout << "EXEMPTION: Minors are exempt from curfew." << std::endl;
        } else if (age >= 65) {
            std::cout << "EXEMPTION: Senior citizens are exempt from curfew." << std::endl;
        } else {
            std::cout << "CURFEW VIOLATION! It's past 10 PM and you're not exempt." << std::endl;
        }
    } else {
        std::cout << "No curfew violation. You're safe!" << std::endl;
    }
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>

int main() {
    // Resident data stored in arrays
    std::string names[4] = {"Juan", "Maria", "Pedro", "Ana"};
    int ages[4] = {25, 16, 70, 30};
    std::string reasons[4] = {"Work", "School", "Medical", "Emergency"};
    
    int currentHour = 22; // 10 PM
    int violationCount = 0;
    
    std::cout << "Barangay Curfew Check Report" << std::endl;
    std::cout << "============================" << std::endl;
    
    // Loop through each resident and check curfew rules
    for (int i = 0; i < 4; i++) {
        std::cout << "Resident: " << names[i] << " (" << ages[i] << ") - " << reasons[i] << std::endl;
        
        // Check curfew rules using conditionals
        std::string status;
        if (currentHour >= 22) {
            // Check exemptions
            if (ages[i] < 18) {
                status = "EXEMPT - Minor";
            } else if (ages[i] >= 65) {
                status = "EXEMPT - Senior citizen";
            } else if (reasons[i] == "Medical" || reasons[i] == "Emergency") {
                status = "VALID - " + reasons[i] + " reason";
            } else {
                status = "VIOLATION - No valid reason";
                violationCount++;
            }
        } else {
            status = "SAFE - Before curfew hours";
        }
        
        std::cout << "Status: " << status << std::endl;
        std::cout << std::endl;
    }
    
    std::cout << "Total Violations: " << violationCount << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
