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
// Taho vendor's traditional call
#include <iostream>

int main() {
    /* 
     * Taho is a beloved Filipino street food tradition
     * Vendors walk through neighborhoods calling "Tahooo!"
     * to announce their presence and attract customers
     */
    
    // Print formatted menu
    std::cout << "================" << std::endl;
    std::cout << "   TAHO MENU" << std::endl;
    std::cout << "================" << std::endl;
    std::cout << "Regular Taho\\t₱20" << std::endl;
    std::cout << "Large Taho\\t₱25" << std::endl;
    std::cout << "Extra Syrup\\t₱5" << std::endl;
    std::cout << "================" << std::endl;
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>

int main() {
    // Store name and header
    std::string storeName = "MANILA TAHO STORE";
    std::cout << storeName << std::endl;
    std::cout << "=====================" << std::endl;
    
    // Price list
    std::cout << "Menu:" << std::endl;
    std::cout << "1. Regular Taho    ₱20" << std::endl;
    std::cout << "2. Large Taho      ₱25" << std::endl;
    std::cout << "3. Extra Syrup     ₱5" << std::endl;
    
    // Footer
    std::cout << "=====================" << std::endl;
    std::cout << "Salamat po!" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
