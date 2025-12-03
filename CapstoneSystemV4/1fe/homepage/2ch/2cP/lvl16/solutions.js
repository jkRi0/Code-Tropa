// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>

int main() {
    // Store 3 potion names and their effects in arrays
    std::string potions[3] = {"Sampaguita Tea", "Ginger Root", "Turmeric Mix"};
    std::string effects[3] = {"Calming effect", "Digestive aid", "Anti-inflammatory"};
    
    std::cout << "Albularyo Potion Log" << std::endl;
    std::cout << "===================" << std::endl;
    
    // Print each potion and its effect using a loop
    for (int i = 0; i < 3; i++) {
        std::cout << "Potion " << (i + 1) << ": " << potions[i] << " - " << effects[i] << std::endl;
    }
    
    std::cout << "===================" << std::endl;
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // Potion data
    std::string potions[3] = {"Sampaguita Tea", "Ginger Root", "Turmeric Mix"};
    std::string effects[3] = {"Calming effect", "Digestive aid", "Anti-inflammatory"};
    
    std::cout << "Albularyo Potion Log" << std::endl;
    std::cout << "===================" << std::endl;
    
    // Display potion information
    for (int i = 0; i < 3; i++) {
        std::cout << "Potion " << (i + 1) << ": " << potions[i] << " - " << effects[i] << std::endl;
    }
    
    std::cout << "===================" << std::endl;
    
    // Track potion usage and calculate success rates
    int usageCount[3] = {5, 3, 4};
    int successCount[3] = {4, 3, 3};
    
    std::cout << std::endl;
    std::cout << "Usage Statistics:" << std::endl;
    
    for (int i = 0; i < 3; i++) {
        double successRate = (double) successCount[i] / usageCount[i] * 100;
        std::cout << potions[i] << ": " << usageCount[i] << " uses, " 
                  << std::fixed << std::setprecision(0) << successRate << "% success rate" << std::endl;
    }
    
    std::cout << "===================" << std::endl;
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // Potion data
    std::string potions[3] = {"Sampaguita Tea", "Ginger Root", "Turmeric Mix"};
    std::string effects[3] = {"Calming effect", "Digestive aid", "Anti-inflammatory"};
    
    std::cout << "Albularyo Potion Log" << std::endl;
    std::cout << "===================" << std::endl;
    
    // Display potion information
    for (int i = 0; i < 3; i++) {
        std::cout << "Potion " << (i + 1) << ": " << potions[i] << " - " << effects[i] << std::endl;
    }
    
    std::cout << "===================" << std::endl;
    
    // Analyze potion effectiveness and generate recommendations
    int usageCount[3] = {5, 3, 4};
    int successCount[3] = {4, 3, 3};
    std::string bestFor[3] = {"Anxiety, Insomnia", "Nausea, Indigestion", "Joint Pain, Inflammation"};
    std::string dosages[3] = {"2 cups daily", "1 tablespoon", "1 teaspoon"};
    
    std::cout << std::endl;
    std::cout << "Detailed Analysis:" << std::endl;
    
    for (int i = 0; i < 3; i++) {
        double successRate = (double) successCount[i] / usageCount[i] * 100;
        std::cout << potions[i] << ": " << usageCount[i] << " uses, " 
                  << std::fixed << std::setprecision(0) << successRate << "% success rate" << std::endl;
        std::cout << "  Most Effective For: " << bestFor[i] << std::endl;
        std::cout << "  Recommended Dosage: " << dosages[i] << std::endl;
    }
    
    std::cout << std::endl;
    std::cout << "Recommendations:" << std::endl;
    std::cout << "- For digestive issues: Combine Ginger Root + Turmeric Mix" << std::endl;
    std::cout << "- For sleep problems: Use Sampaguita Tea before bedtime" << std::endl;
    std::cout << "- For inflammation: Apply Turmeric Mix externally" << std::endl;
    std::cout << "===================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
