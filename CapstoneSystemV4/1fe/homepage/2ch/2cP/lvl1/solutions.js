// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>

int main() {
    std::cout << "Tahooo!" << std::endl;
    std::cout << "Taho: ₱15" << std::endl;
    std::cout << "Syrup: ₱5" << std::endl;
    return 0;
}`,

    average: `
/* 
 * Taho is a beloved Filipino street food made of silken tofu,
 * brown sugar syrup, and sago pearls. Vendors traditionally
 * announce their presence by calling out "Tahooo!"
 */
#include <iostream>

int main() {
    // Declare variables for prices
    int tahoPrice = 15;
    int syrupPrice = 5;
    
    // Calculate total
    int total = tahoPrice + syrupPrice;
    
    // Print header
    std::cout << "================" << std::endl;
    std::cout << "   TAHO MENU" << std::endl;
    std::cout << "================" << std::endl;
    
    // Print menu items with prices
    std::cout << "Taho:     ₱" << tahoPrice << std::endl;
    std::cout << "Syrup:    ₱" << syrupPrice << std::endl;
    std::cout << "================" << std::endl;
    std::cout << "Total:    ₱" << total << std::endl;
    std::cout << "================" << std::endl;
    
    return 0;
}`,

    difficult: `
/**
 * TahoVendor program simulates a traditional Filipino taho vendor
 * This program demonstrates variables, calculations, and formatted output
 */
#include <iostream>
#include <string>

int main() {
    // Declare variables for menu items and prices
    int tahoPrice = 15;
    int syrupPrice = 5;
    int extraTahoPrice = 10;
    
    // Declare quantity variables
    int tahoQty = 2;
    int syrupQty = 1;
    int extraTahoQty = 1;
    
    // Calculate subtotals
    int tahoSubtotal = tahoPrice * tahoQty;
    int syrupSubtotal = syrupPrice * syrupQty;
    int extraTahoSubtotal = extraTahoPrice * extraTahoQty;
    
    // Calculate grand total
    int grandTotal = tahoSubtotal + syrupSubtotal + extraTahoSubtotal;
    
    // Display formatted receipt
    std::cout << "Tahooo!" << std::endl;
    std::cout << "====================" << std::endl;
    std::cout << "   TAHO ORDER" << std::endl;
    std::cout << "====================" << std::endl;
    std::cout << "Taho (x" << tahoQty << "):      ₱" << tahoSubtotal << std::endl;
    std::cout << "Syrup (x" << syrupQty << "):     ₱" << syrupSubtotal << std::endl;
    std::cout << "Extra Taho (x" << extraTahoQty << "): ₱" << extraTahoSubtotal << std::endl;
    std::cout << "====================" << std::endl;
    std::cout << "Grand Total:    ₱" << grandTotal << std::endl;
    std::cout << "====================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;