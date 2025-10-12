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
    // Print header
    std::cout << "================" << std::endl;
    std::cout << "   TAHO MENU" << std::endl;
    std::cout << "================" << std::endl;
    
    // Print menu items with proper formatting
    std::cout << "Taho:\\t\\t₱15" << std::endl;
    std::cout << "Syrup:\\t\\t₱5" << std::endl;
    
    // Print footer
    std::cout << "================" << std::endl;
    
    return 0;
}`,

    difficult: `
/**
 * TahoVendor program simulates a traditional Filipino taho vendor
 * This program demonstrates proper string formatting and debugging
 */
#include <iostream>

int main() {
    // Fixed: Added quotes around string literal
    std::cout << "Tahooo!" << std::endl;
    std::cout << "Taho: ₱15" << std::endl;
    std::cout << "Syrup: ₱5" << std::endl;
    // Fixed: Proper arithmetic operation
    std::cout << "Total: " << (15 + 5) << "₱" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;