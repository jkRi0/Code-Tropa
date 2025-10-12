// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // Store 3 Filipino dishes and their prices in arrays
    std::string dishes[3] = {"Adobo", "Sinigang", "Kare-Kare"};
    double prices[3] = {150.00, 180.00, 220.00};
    
    std::cout << "Filipino Family Menu Generator" << std::endl;
    std::cout << "============================" << std::endl;
    
    // Print each dish and its price using a loop
    for (int i = 0; i < 3; i++) {
        std::cout << "Dish " << (i + 1) << ": " << dishes[i] << " - ₱" 
                  << std::fixed << std::setprecision(2) << prices[i] << std::endl;
    }
    
    std::cout << "============================" << std::endl;
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // Menu data
    std::string dishes[3] = {"Adobo", "Sinigang", "Kare-Kare"};
    double prices[3] = {150.00, 180.00, 220.00};
    
    std::cout << "Filipino Family Menu Generator" << std::endl;
    std::cout << "============================" << std::endl;
    
    // Display menu items
    for (int i = 0; i < 3; i++) {
        std::cout << "Dish " << (i + 1) << ": " << dishes[i] << " - ₱" 
                  << std::fixed << std::setprecision(2) << prices[i] << std::endl;
    }
    
    std::cout << "============================" << std::endl;
    
    // Calculate total cost and apply family discount
    double originalTotal = 0;
    for (int i = 0; i < 3; i++) {
        originalTotal += prices[i];
    }
    
    double familyDiscount = originalTotal * 0.10; // 10% family discount
    double finalTotal = originalTotal - familyDiscount;
    
    std::cout << std::endl;
    std::cout << "Menu Summary:" << std::endl;
    std::cout << "Original Total: ₱" << std::fixed << std::setprecision(2) << originalTotal << std::endl;
    std::cout << "Family Discount (10%): ₱" << std::fixed << std::setprecision(2) << familyDiscount << std::endl;
    std::cout << "Final Total: ₱" << std::fixed << std::setprecision(2) << finalTotal << std::endl;
    std::cout << "============================" << std::endl;
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // Menu data
    std::string dishes[3] = {"Adobo", "Sinigang", "Kare-Kare"};
    double prices[3] = {150.00, 180.00, 220.00};
    
    std::cout << "Filipino Family Menu Generator" << std::endl;
    std::cout << "============================" << std::endl;
    
    // Display menu items
    for (int i = 0; i < 3; i++) {
        std::cout << "Dish " << (i + 1) << ": " << dishes[i] << " - ₱" 
                  << std::fixed << std::setprecision(2) << prices[i] << std::endl;
    }
    
    std::cout << "============================" << std::endl;
    
    // Calculate original total
    double originalTotal = 0;
    for (int i = 0; i < 3; i++) {
        originalTotal += prices[i];
    }
    
    // Generate personalized menu recommendations
    std::string recommendedDishes[2] = {"Lechon Kawali", "Pancit Canton"};
    double recommendedPrices[2] = {200.00, 120.00};
    
    std::cout << std::endl;
    std::cout << "Personalized Recommendations:" << std::endl;
    for (int i = 0; i < 2; i++) {
        std::cout << "- Suggested: " << recommendedDishes[i] << " (₱" 
                  << std::fixed << std::setprecision(2) << recommendedPrices[i] << ")" << std::endl;
    }
    
    // Calculate total with recommendations
    double recommendedTotal = originalTotal;
    for (int i = 0; i < 2; i++) {
        recommendedTotal += recommendedPrices[i];
    }
    
    // Apply family discount
    double familyDiscount = recommendedTotal * 0.10;
    double finalTotal = recommendedTotal - familyDiscount;
    
    // Calculate per-person cost (assuming 4 people)
    int familySize = 4;
    double costPerPerson = finalTotal / familySize;
    
    std::cout << std::endl;
    std::cout << "Menu Analysis:" << std::endl;
    std::cout << "Original Total: ₱" << std::fixed << std::setprecision(2) << originalTotal << std::endl;
    std::cout << "With Recommendations: ₱" << std::fixed << std::setprecision(2) << recommendedTotal << std::endl;
    std::cout << "Family Discount (10%): ₱" << std::fixed << std::setprecision(2) << familyDiscount << std::endl;
    std::cout << "Final Total: ₱" << std::fixed << std::setprecision(2) << finalTotal << std::endl;
    std::cout << "Cost per Person (" << familySize << " people): ₱" 
              << std::fixed << std::setprecision(2) << costPerPerson << std::endl;
    std::cout << "============================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
