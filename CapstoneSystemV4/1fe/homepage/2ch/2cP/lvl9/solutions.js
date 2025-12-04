// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>
#include <algorithm>

int main() {
    // Original slogan
    std::string slogan = "Mabuhay ang Fiesta!";
    
    std::cout << "Fiesta Poster Maker" << std::endl;
    std::cout << "==================" << std::endl;
    std::cout << "Original: \\"" << slogan << "\\"" << std::endl;
    
    // Convert to uppercase and add decorative characters
    std::string upperSlogan = slogan;
    std::transform(upperSlogan.begin(), upperSlogan.end(), upperSlogan.begin(), ::toupper);
    std::string formattedSlogan = "*** " + upperSlogan + " ***";
    
    std::cout << "Formatted: " << std::endl;
    std::cout << "==================" << std::endl;
    std::cout << formattedSlogan << std::endl;
    std::cout << "==================" << std::endl;
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>
#include <algorithm>
#include <sstream>

int main() {
    // Use a string variable to store slogan
    std::string slogan = "Mabuhay ang Fiesta ng Bayan";
    
    std::cout << "Fiesta Poster Maker" << std::endl;
    std::cout << "==================" << std::endl;
    
    // Count characters using length() method
    int characterCount = slogan.length();
    
    // Count words by splitting on spaces
    std::istringstream iss(slogan);
    std::string word;
    int wordCount = 0;
    while (iss >> word) {
        wordCount++;
    }
    
    // Convert to uppercase using string operations
    std::string upperSlogan = slogan;
    std::transform(upperSlogan.begin(), upperSlogan.end(), upperSlogan.begin(), ::toupper);
    
    std::cout << "Slogan Analysis:" << std::endl;
    std::cout << "================" << std::endl;
    std::cout << "Original: " << slogan << std::endl;
    std::cout << "Uppercase: " << upperSlogan << std::endl;
    std::cout << "Characters: " << characterCount << std::endl;
    std::cout << "Words: " << wordCount << std::endl;
    std::cout << "================" << std::endl;
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <algorithm>
#include <sstream>

int main() {
    // Use arrays to store multiple slogans
    std::string slogans[3] = {
        "Mabuhay ang Fiesta ng Bayan",
        "Mabuhay ang Masayang Fiesta!",
        "Fiesta ng Bayan, Pagkakaisa!"
    };
    
    std::cout << "Fiesta Poster Maker" << std::endl;
    std::cout << "==================" << std::endl;
    
    // Loop through slogans and format each
    for (int i = 0; i < 3; i++) {
        std::string slogan = slogans[i];
        
        // Count characters and words using String methods
        int characterCount = slogan.length();
        
        std::istringstream iss(slogan);
        std::string word;
        int wordCount = 0;
        while (iss >> word) {
            wordCount++;
        }
        
        // Format poster using string methods (toUpperCase, substr)
        std::string upperSlogan = slogan;
        std::transform(upperSlogan.begin(), upperSlogan.end(), upperSlogan.begin(), ::toupper);
        std::string formattedSlogan = "*** " + upperSlogan + " ***";
        
        std::cout << "Slogan " << (i + 1) << ":" << std::endl;
        std::cout << "==================" << std::endl;
        std::cout << formattedSlogan << std::endl;
        std::cout << "Characters: " << characterCount << " | Words: " << wordCount << std::endl;
        std::cout << "==================" << std::endl;
        std::cout << std::endl;
    }
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
