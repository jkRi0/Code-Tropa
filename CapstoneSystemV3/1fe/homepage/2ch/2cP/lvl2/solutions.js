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
    // Product names
    std::string suka = "Vinegar";
    std::string itlog = "Eggs";
    std::string tinapay = "Bread";
    
    // Prices
    double sukaPrice = 25.50;
    double itlogPrice = 8.00;
    double tinapayPrice = 35.00;
    
    // Get new stock levels from user
    int sukaStock, itlogStock, tinapayStock;
    
    std::cout << "Enter new stock for " << suka << ": ";
    std::cin >> sukaStock;
    
    std::cout << "Enter new stock for " << itlog << ": ";
    std::cin >> itlogStock;
    
    std::cout << "Enter new stock for " << tinapay << ": ";
    std::cin >> tinapayStock;
    
    // Calculate values
    double sukaValue = sukaPrice * sukaStock;
    double itlogValue = itlogPrice * itlogStock;
    double tinapayValue = tinapayPrice * tinapayStock;
    
    // Display updated inventory
    std::cout << std::endl << "Updated Inventory:" << std::endl;
    std::cout << std::fixed << std::setprecision(2);
    std::cout << suka << ": " << sukaStock << " units @ ₱" << sukaPrice << " = ₱" << sukaValue << std::endl;
    std::cout << itlog << ": " << itlogStock << " units @ ₱" << itlogPrice << " = ₱" << itlogValue << std::endl;
    std::cout << tinapay << ": " << tinapayStock << " units @ ₱" << tinapayPrice << " = ₱" << tinapayValue << std::endl;
    
    // Check for restock alerts (threshold = 20)
    int threshold = 20;
    std::cout << std::endl;
    
    if (sukaStock < threshold) {
        std::cout << "⚠️ RESTOCK ALERT: " << suka << " is below threshold (" << sukaStock << " < " << threshold << ")" << std::endl;
    }
    if (itlogStock < threshold) {
        std::cout << "⚠️ RESTOCK ALERT: " << itlog << " is below threshold (" << itlogStock << " < " << threshold << ")" << std::endl;
    }
    if (tinapayStock < threshold) {
        std::cout << "⚠️ RESTOCK ALERT: " << tinapay << " is below threshold (" << tinapayStock << " < " << threshold << ")" << std::endl;
    }
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
