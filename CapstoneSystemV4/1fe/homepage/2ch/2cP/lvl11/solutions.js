// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>

int main() {
    // Store 3 barangay names and populations in arrays
    std::string barangays[3] = {"San Jose", "Santa Maria", "San Pedro"};
    int populations[3] = {15000, 22000, 18500};
    
    std::cout << "Barangay Population Analysis" << std::endl;
    std::cout << "===========================" << std::endl;
    
    // Print each barangay's name and population using a loop
    for (int i = 0; i < 3; i++) {
        std::cout << "Barangay " << (i + 1) << ": " << barangays[i] << " - " << populations[i] << " residents" << std::endl;
    }
    
    std::cout << "===========================" << std::endl;
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>

int main() {
    // Barangay data
    std::string barangays[3] = {"San Jose", "Santa Maria", "San Pedro"};
    int populations[3] = {15000, 22000, 18500};
    
    std::cout << "Barangay Population Analysis" << std::endl;
    std::cout << "===========================" << std::endl;
    
    // Display barangay data
    for (int i = 0; i < 3; i++) {
        std::cout << "Barangay " << (i + 1) << ": " << barangays[i] << " - " << populations[i] << " residents" << std::endl;
    }
    
    std::cout << "===========================" << std::endl;
    
    // Calculate total and average population
    int totalPopulation = 0;
    for (int i = 0; i < 3; i++) {
        totalPopulation += populations[i];
    }
    
    double averagePopulation = (double) totalPopulation / 3;
    
    std::cout << std::endl;
    std::cout << "Summary Statistics:" << std::endl;
    std::cout << "Total Population: " << totalPopulation << std::endl;
    std::cout << "Average Population: " << (int) averagePopulation << std::endl;
    std::cout << "===========================" << std::endl;
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>

int main() {
    // Barangay data
    std::string barangays[3] = {"San Jose", "Santa Maria", "San Pedro"};
    int populations[3] = {15000, 22000, 18500};
    
    std::cout << "Barangay Population Analysis" << std::endl;
    std::cout << "===========================" << std::endl;
    
    // Find highest and lowest population
    int maxIndex = 0;
    int minIndex = 0;
    int totalPopulation = 0;
    
    for (int i = 0; i < 3; i++) {
        if (populations[i] > populations[maxIndex]) {
            maxIndex = i;
        }
        if (populations[i] < populations[minIndex]) {
            minIndex = i;
        }
        totalPopulation += populations[i];
    }
    
    double averagePopulation = (double) totalPopulation / 3;
    
    // Display barangay data with size categories
    int smallCount = 0, mediumCount = 0, largeCount = 0;
    
    for (int i = 0; i < 3; i++) {
        std::string sizeCategory;
        if (populations[i] < 16000) {
            sizeCategory = "Small";
            smallCount++;
        } else if (populations[i] <= 20000) {
            sizeCategory = "Medium";
            mediumCount++;
        } else {
            sizeCategory = "Large";
            largeCount++;
        }
        
        std::cout << "Barangay " << (i + 1) << ": " << barangays[i] << " - " << populations[i] << " residents (" << sizeCategory << ")" << std::endl;
    }
    
    std::cout << "===========================" << std::endl;
    
    // Display detailed analysis
    std::cout << std::endl;
    std::cout << "Detailed Analysis:" << std::endl;
    std::cout << "Highest Population: " << barangays[maxIndex] << " (" << populations[maxIndex] << ")" << std::endl;
    std::cout << "Lowest Population: " << barangays[minIndex] << " (" << populations[minIndex] << ")" << std::endl;
    std::cout << "Total Population: " << totalPopulation << std::endl;
    std::cout << "Average Population: " << (int) averagePopulation << std::endl;
    
    std::cout << std::endl;
    std::cout << "Size Categories:" << std::endl;
    std::cout << "Small (< 16,000): " << smallCount << " barangay" << (smallCount != 1 ? "s" : "") << std::endl;
    std::cout << "Medium (16,000-20,000): " << mediumCount << " barangay" << (mediumCount != 1 ? "s" : "") << std::endl;
    std::cout << "Large (> 20,000): " << largeCount << " barangay" << (largeCount != 1 ? "s" : "") << std::endl;
    std::cout << "===========================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
