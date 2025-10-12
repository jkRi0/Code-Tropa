const tahoSolutions = {
    easy: `
#include <iostream>

int main() {
    std::cout << "Tahooo!" << std::endl;
    std::cout << "Regular Taho: ₱20" << std::endl;
    std::cout << "Large Taho: ₱25" << std::endl;
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
    std::cout << "Regular Taho\\t₱20" << std::endl;
    std::cout << "Large Taho\\t₱25" << std::endl;
    std::cout << "Extra Syrup\\t₱5" << std::endl;
    
    // Print footer
    std::cout << "================" << std::endl;
    
    return 0;
}`,

    difficult: `
/**
 * TahoVendor program simulates a traditional Filipino taho vendor's receipt
 * This program demonstrates proper string formatting and error handling
 */
#include <iostream>
#include <string>

int main() {
    try {
        // Store header with emojis
        std::cout << " MANILA TAHO STORE " << std::endl;
        std::cout << "=====================" << std::endl;
        
        // Menu section
        std::cout << "Menu:" << std::endl;
        std::cout << "1. Regular Taho    ₱20" << std::endl;
        std::cout << "2. Large Taho      ₱25" << std::endl;
        std::cout << "3. Extra Syrup     ₱5" << std::endl;
        
        // Footer
        std::cout << "=====================" << std::endl;
        std::cout << "Salamat po!" << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Error printing menu: " << e.what() << std::endl;
    }
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;