// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>

int main() {
    // Declare three product variables with correct data types
    std::string suka = "Vinegar";
    std::string itlog = "Eggs";
    std::string tinapay = "Bread";
    
    // Print each product name
    std::cout << suka << std::endl;
    std::cout << itlog << std::endl;
    std::cout << tinapay << std::endl;
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // Product names
    std::string suka = "Vinegar";
    std::string itlog = "Eggs";
    std::string tinapay = "Bread";
    
    // Prices (double data type for decimal values)
    double sukaPrice = 25.50;
    double itlogPrice = 8.00;
    double tinapayPrice = 35.00;
    
    // Stock quantities (int data type for whole numbers)
    int sukaStock = 50;
    int itlogStock = 100;
    int tinapayStock = 30;
    
    // Calculate total inventory value
    double sukaValue = sukaPrice * sukaStock;
    double itlogValue = itlogPrice * itlogStock;
    double tinapayValue = tinapayPrice * tinapayStock;
    double totalValue = sukaValue + itlogValue + tinapayValue;
    
    // Print inventory report
    std::cout << "Sari-Sari Store Inventory" << std::endl;
    std::cout << "========================" << std::endl;
    std::cout << std::fixed << std::setprecision(2);
    std::cout << suka << ": " << sukaStock << " units @ ₱" << sukaPrice << " = ₱" << sukaValue << std::endl;
    std::cout << itlog << ": " << itlogStock << " units @ ₱" << itlogPrice << " = ₱" << itlogValue << std::endl;
    std::cout << tinapay << ": " << tinapayStock << " units @ ₱" << tinapayPrice << " = ₱" << tinapayValue << std::endl;
    std::cout << "========================" << std::endl;
    std::cout << "Total Inventory Value: ₱" << totalValue << std::endl;
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // Use arrays to store product data
    std::string products[3] = {"Vinegar", "Eggs", "Bread"};
    double prices[3] = {25.50, 8.00, 35.00};
    int stock[3] = {15, 25, 10};
    
    int threshold = 20;
    double totalValue = 0;
    int restockCount = 0;
    
    // Display inventory report using loops
    std::cout << "Sari-Sari Store Inventory Report" << std::endl;
    std::cout << "================================" << std::endl;
    
    for (int i = 0; i < 3; i++) {
        double itemValue = prices[i] * stock[i];
        totalValue += itemValue;
        
        std::cout << std::fixed << std::setprecision(2);
        std::cout << products[i] << ": " << stock[i] << " units @ ₱" << prices[i] << " = ₱" << itemValue << std::endl;
        
        // Check if stock is below threshold using conditional statements
        if (stock[i] < threshold) {
            std::cout << "RESTOCK ALERT: Below threshold (" << stock[i] << " < " << threshold << ")" << std::endl;
            restockCount++;
        } else {
            std::cout << "Stock OK" << std::endl;
        }
        std::cout << std::endl;
    }
    
    std::cout << "Total Inventory Value: ₱" << std::fixed << std::setprecision(2) << totalValue << std::endl;
    std::cout << "Items Needing Restock: " << restockCount << std::endl;
    std::cout << "================================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
