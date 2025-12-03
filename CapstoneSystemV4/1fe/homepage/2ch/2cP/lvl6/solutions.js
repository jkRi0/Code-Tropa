// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>

int main() {
    // Create an array of 5 destinations
    std::string destinations[5] = {"Quiapo", "Makati", "Cubao", "Ortigas", "BGC"};
    
    std::cout << "Jeepney Destinations" << std::endl;
    std::cout << "===================" << std::endl;
    
    // Print each destination using a loop
    for (int i = 0; i < 5; i++) {
        std::cout << (i + 1) << ". " << destinations[i] << std::endl;
    }
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>

int main() {
    // Parallel arrays for destinations and fares
    std::string destinations[5] = {"Quiapo", "Makati", "Cubao", "Ortigas", "BGC"};
    int fares[5] = {12, 15, 18, 20, 25};
    
    int totalFare = 0;
    
    std::cout << "Jeepney Fare Calculator" << std::endl;
    std::cout << "======================" << std::endl;
    
    // Display destinations with fares and calculate total
    for (int i = 0; i < 5; i++) {
        std::cout << "Destination: " << destinations[i] << " - ₱" << fares[i] << std::endl;
        totalFare += fares[i];
    }
    
    std::cout << "======================" << std::endl;
    std::cout << "Total Fare: ₱" << totalFare << std::endl;
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <algorithm>

int main() {
    // Parallel arrays for destinations and fares
    std::string destinations[5] = {"Quiapo", "Makati", "Cubao", "Ortigas", "BGC"};
    int fares[5] = {12, 15, 18, 20, 25};
    
    std::cout << "Jeepney Fare Calculator" << std::endl;
    std::cout << "======================" << std::endl;
    
    // Get user input
    std::string userDestination;
    std::cout << "Enter destination: ";
    std::getline(std::cin, userDestination);
    
    std::string discountEligible;
    std::cout << "Are you a senior/student? (y/n): ";
    std::getline(std::cin, discountEligible);
    
    // Convert to lowercase for comparison
    std::transform(discountEligible.begin(), discountEligible.end(), 
                   discountEligible.begin(), ::tolower);
    
    // Validate destination and find fare
    int destinationIndex = -1;
    for (int i = 0; i < 5; i++) {
        if (destinations[i] == userDestination) {
            destinationIndex = i;
            break;
        }
    }
    
    if (destinationIndex == -1) {
        std::cout << "❌ Invalid destination! Please choose from:" << std::endl;
        for (int i = 0; i < 5; i++) {
            std::cout << "- " << destinations[i] << std::endl;
        }
    } else {
        int regularFare = fares[destinationIndex];
        double discount = 0.0;
        
        if (discountEligible == "y") {
            discount = regularFare * 0.20; // 20% discount
        }
        
        double finalFare = regularFare - discount;
        
        std::cout << std::endl;
        std::cout << "Destination: " << userDestination << std::endl;
        std::cout << "Regular Fare: ₱" << regularFare << std::endl;
        if (discount > 0) {
            std::cout << "Discount (20%): ₱" << (int)discount << std::endl;
        }
        std::cout << "Final Fare: ₱" << (int)finalFare << std::endl;
    }
    
    std::cout << "======================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
