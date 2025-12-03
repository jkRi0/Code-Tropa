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
    std::cout << "Fiesta Poster Maker" << std::endl;
    std::cout << "==================" << std::endl;
    
    // Accept user-input slogan
    std::string slogan;
    std::cout << "Enter slogan: ";
    std::getline(std::cin, slogan);
    
    // Count characters and words
    int characterCount = slogan.length();
    
    // Count words by splitting on spaces
    std::istringstream iss(slogan);
    std::string word;
    int wordCount = 0;
    while (iss >> word) {
        wordCount++;
    }
    
    // Convert to uppercase
    std::string upperSlogan = slogan;
    std::transform(upperSlogan.begin(), upperSlogan.end(), upperSlogan.begin(), ::toupper);
    
    std::cout << std::endl;
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
#include <vector>

// Function to sanitize slogans by removing offensive words
std::string sanitizeSlogan(const std::string& slogan) {
    std::vector<std::string> offensiveWords = {"bad", "ugly", "hate"};
    std::string sanitized = slogan;
    
    for (const std::string& word : offensiveWords) {
        size_t pos = 0;
        while ((pos = sanitized.find(word, pos)) != std::string::npos) {
            sanitized.replace(pos, word.length(), "[FILTERED]");
            pos += 9; // Length of "[FILTERED]"
        }
    }
    
    return sanitized;
}

// Function to generate slogan suggestions
void generateSuggestions() {
    std::vector<std::string> suggestions = {
        "Mabuhay ang Masayang Fiesta!",
        "Fiesta ng Bayan, Pagkakaisa!",
        "Masayang Fiesta, Masayang Bayan!"
    };
    
    for (const std::string& suggestion : suggestions) {
        std::cout << "- Consider: \\"" << suggestion << "\\"" << std::endl;
    }
}

int main() {
    std::cout << "Fiesta Poster Maker" << std::endl;
    std::cout << "==================" << std::endl;
    
    // Accept user-input slogan
    std::string slogan;
    std::cout << "Enter slogan: ";
    std::getline(std::cin, slogan);
    
    // Sanitize slogan
    std::string sanitizedSlogan = sanitizeSlogan(slogan);
    
    // Count characters and words
    int characterCount = sanitizedSlogan.length();
    
    std::istringstream iss(sanitizedSlogan);
    std::string word;
    int wordCount = 0;
    while (iss >> word) {
        wordCount++;
    }
    
    std::cout << std::endl;
    std::cout << "Slogan Analysis:" << std::endl;
    std::cout << "================" << std::endl;
    std::cout << "Original: " << slogan << std::endl;
    std::cout << "Sanitized: " << sanitizedSlogan << std::endl;
    std::cout << "Characters: " << characterCount << " | Words: " << wordCount << std::endl;
    
    // Create formatted poster
    std::cout << std::endl;
    std::cout << "Formatted Poster:" << std::endl;
    std::cout << "==================" << std::endl;
    std::string upperSlogan = sanitizedSlogan;
    std::transform(upperSlogan.begin(), upperSlogan.end(), upperSlogan.begin(), ::toupper);
    std::string formattedSlogan = "*** " + upperSlogan + " ***";
    std::cout << formattedSlogan << std::endl;
    std::cout << "==================" << std::endl;
    
    // Auto-suggest better slogans
    std::cout << std::endl;
    std::cout << "Suggestions:" << std::endl;
    generateSuggestions();
    std::cout << "==================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
