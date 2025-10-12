// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>

int main() {
    // Store 3 tricycle drivers and their availability status
    std::string drivers[3] = {"Mang Juan", "Mang Pedro", "Mang Jose"};
    bool available[3] = {true, false, true};
    
    std::cout << "Tricycle Dispatch System" << std::endl;
    std::cout << "=======================" << std::endl;
    
    // Print each driver's name and availability status using a loop
    for (int i = 0; i < 3; i++) {
        std::string status = available[i] ? "Available" : "Busy";
        std::cout << "Driver " << (i + 1) << ": " << drivers[i] << " - " << status << std::endl;
    }
    
    std::cout << "=======================" << std::endl;
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // Driver data
    std::string drivers[3] = {"Mang Juan", "Mang Pedro", "Mang Jose"};
    bool available[3] = {true, false, true};
    
    std::cout << "Tricycle Dispatch System" << std::endl;
    std::cout << "=======================" << std::endl;
    
    // Display driver status
    for (int i = 0; i < 3; i++) {
        std::string status = available[i] ? "Available" : "Busy";
        std::cout << "Driver " << (i + 1) << ": " << drivers[i] << " - " << status << std::endl;
    }
    
    std::cout << "=======================" << std::endl;
    
    // Assign passengers to available drivers and calculate fare
    std::string passengers[2] = {"Maria", "Ana"};
    double distances[2] = {2.5, 3.0};
    
    std::cout << std::endl;
    std::cout << "Dispatch Assignment:" << std::endl;
    
    int passengerIndex = 0;
    for (int i = 0; i < 3 && passengerIndex < 2; i++) {
        if (available[i]) {
            std::string passenger = passengers[passengerIndex];
            std::string driver = drivers[i];
            double distance = distances[passengerIndex];
            double fare = distance * 10; // ₱10 per km
            
            std::cout << "Passenger: " << passenger << std::endl;
            std::cout << "Assigned Driver: " << driver << std::endl;
            std::cout << "Distance: " << distance << " km" << std::endl;
            std::cout << "Fare: ₱" << std::fixed << std::setprecision(2) << fare << std::endl;
            std::cout << std::endl;
            
            passengerIndex++;
        }
    }
    
    std::cout << "=======================" << std::endl;
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // Driver data
    std::string drivers[3] = {"Mang Juan", "Mang Pedro", "Mang Jose"};
    bool available[3] = {true, false, true};
    double driverEarnings[3] = {0.0, 0.0, 0.0};
    int tripCounts[3] = {0, 0, 0};
    
    std::cout << "Tricycle Dispatch System" << std::endl;
    std::cout << "=======================" << std::endl;
    
    // Display driver status
    for (int i = 0; i < 3; i++) {
        std::string status = available[i] ? "Available" : "Busy";
        std::cout << "Driver " << (i + 1) << ": " << drivers[i] << " - " << status << std::endl;
    }
    
    std::cout << "=======================" << std::endl;
    
    // Optimize driver assignments and track earnings
    std::string passengers[2] = {"Maria", "Ana"};
    double distances[2] = {2.5, 3.0};
    double passengerDistances[2] = {2.5, 3.0}; // Distance from dispatch center
    
    std::cout << std::endl;
    std::cout << "Optimized Dispatch:" << std::endl;
    
    for (int p = 0; p < 2; p++) {
        std::string passenger = passengers[p];
        double distance = distances[p];
        
        // Find closest available driver
        int bestDriverIndex = -1;
        double minDistance = 999999.0;
        
        for (int i = 0; i < 3; i++) {
            if (available[i]) {
                double driverDistance = passengerDistances[p]; // Simplified distance calculation
                if (driverDistance < minDistance) {
                    minDistance = driverDistance;
                    bestDriverIndex = i;
                }
            }
        }
        
        if (bestDriverIndex != -1) {
            std::string driver = drivers[bestDriverIndex];
            double fare = distance * 10; // ₱10 per km
            
            std::cout << "Passenger: " << passenger << std::endl;
            std::cout << "Assigned Driver: " << driver << " (closest)" << std::endl;
            std::cout << "Distance: " << distance << " km" << std::endl;
            std::cout << "Fare: ₱" << std::fixed << std::setprecision(2) << fare << std::endl;
            std::cout << std::endl;
            
            // Update driver earnings and trip count
            driverEarnings[bestDriverIndex] += fare;
            tripCounts[bestDriverIndex]++;
        }
    }
    
    // Display driver performance
    std::cout << "Driver Performance:" << std::endl;
    for (int i = 0; i < 3; i++) {
        std::cout << drivers[i] << ": " << tripCounts[i] << " trip" 
                  << (tripCounts[i] != 1 ? "s" : "") << ", ₱" 
                  << std::fixed << std::setprecision(2) << driverEarnings[i] << " earned" << std::endl;
    }
    
    std::cout << "=======================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
