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
    
    // Passenger data arrays
    std::string passengerDestinations[4] = {"Makati", "Cubao", "Ortigas", "BGC"};
    std::string passengerTypes[4] = {"Regular", "Student", "Senior", "Regular"};
    
    int totalFare = 0;
    int totalDiscount = 0;
    
    std::cout << "Jeepney Fare Calculator" << std::endl;
    std::cout << "======================" << std::endl;
    
    // Loop through passengers and calculate fares
    for (int i = 0; i < 4; i++) {
        // Find destination index
        int destIndex = -1;
        for (int j = 0; j < 5; j++) {
            if (destinations[j] == passengerDestinations[i]) {
                destIndex = j;
                break;
            }
        }
        
        if (destIndex != -1) {
            int regularFare = fares[destIndex];
            int discount = 0;
            
            // Apply discount using conditional statements
            if (passengerTypes[i] == "Student" || passengerTypes[i] == "Senior") {
                discount = (int)(regularFare * 0.20); // 20% discount
            }
            
            int finalFare = regularFare - discount;
            totalFare += finalFare;
            totalDiscount += discount;
            
            std::cout << "Passenger " << (i + 1) << ": " << passengerDestinations[i] 
                      << " - " << passengerTypes[i] << " - ₱" << finalFare;
            if (discount > 0) {
                std::cout << " (20% discount)";
            }
            std::cout << std::endl;
        }
    }
    
    std::cout << "======================" << std::endl;
    std::cout << "Total Fare: ₱" << totalFare << std::endl;
    std::cout << "Total Discount: ₱" << totalDiscount << std::endl;
    std::cout << "Final Total: ₱" << totalFare << std::endl;
    std::cout << "======================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
