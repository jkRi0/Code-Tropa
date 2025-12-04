// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>

// Function that greets each helper by name
void greetHelper(const std::string& name) {
    std::cout << "Hello, " << name << "! Thank you for helping with the move." << std::endl;
}

int main() {
    std::cout << "Bayanihan Helper Greetings" << std::endl;
    std::cout << "=========================" << std::endl;
    
    // Call greeting function for each helper
    greetHelper("Juan");
    greetHelper("Maria");
    greetHelper("Pedro");
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>

// Helper function to determine role based on age
std::string determineRole(int age) {
    if (age >= 18 && age <= 40) {
        return "Lifter";
    } else if (age >= 25 && age <= 60) {
        return "Cook";
    } else if (age >= 21 && age <= 65) {
        return "Driver";
    } else {
        return "Assistant";
    }
}

// Function that assigns roles based on age
void assignRole(const std::string& name, int age) {
    std::string role = determineRole(age);
    
    std::cout << "Helper: " << name << " (" << age << ")" << std::endl;
    std::cout << "Assigned Role: " << role << std::endl;
    std::cout << "Status: Role assigned successfully" << std::endl;
    std::cout << std::endl;
}

int main() {
    std::cout << "Bayanihan Role Assignment" << std::endl;
    std::cout << "=========================" << std::endl;
    
    // Assign roles for multiple helpers
    assignRole("Juan", 25);
    assignRole("Maria", 45);
    assignRole("Pedro", 30);
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <vector>

// Helper function to check if age is eligible for role
bool isEligibleForRole(int age, const std::string& role) {
    if (role == "Lifter") return age >= 18 && age <= 40;
    if (role == "Cook") return age >= 25 && age <= 60;
    if (role == "Driver") return age >= 21 && age <= 65;
    if (role == "Assistant") return age >= 16 && age <= 70;
    if (role == "Coordinator") return age >= 30 && age <= 65;
    return false;
}

// Function to assign an available role to a helper
std::string assignAvailableRole(const std::string& name, int age, 
                               const std::vector<std::string>& roles, 
                               std::vector<bool>& filled) {
    for (size_t i = 0; i < roles.size(); i++) {
        if (!filled[i] && isEligibleForRole(age, roles[i])) {
            filled[i] = true;
            return roles[i];
        }
    }
    return ""; // No available role
}

int main() {
    // Available helpers with their ages
    std::vector<std::string> helpers = {"Juan", "Maria", "Pedro", "Ana", "Carlos"};
    std::vector<int> ages = {25, 45, 30, 35, 50};
    
    // Required roles
    std::vector<std::string> requiredRoles = {"Lifter", "Cook", "Driver", "Assistant", "Coordinator"};
    std::vector<bool> roleFilled(requiredRoles.size(), false);
    
    std::cout << "Bayanihan Complete Scheduler" << std::endl;
    std::cout << "===========================" << std::endl;
    
    // Display available helpers
    std::cout << "Available Helpers: ";
    for (size_t i = 0; i < helpers.size(); i++) {
        std::cout << helpers[i] << "(" << ages[i] << ")";
        if (i < helpers.size() - 1) std::cout << ", ";
    }
    std::cout << std::endl << std::endl;
    
    // Assign roles ensuring no duplicates
    std::cout << "Role Assignments:" << std::endl;
    for (size_t i = 0; i < helpers.size(); i++) {
        std::string role = assignAvailableRole(helpers[i], ages[i], requiredRoles, roleFilled);
        if (!role.empty()) {
            std::cout << role << ": " << helpers[i] << " (" << ages[i] << ")" << std::endl;
        }
    }
    
    std::cout << std::endl;
    std::cout << "All roles filled successfully!" << std::endl;
    std::cout << "===========================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
