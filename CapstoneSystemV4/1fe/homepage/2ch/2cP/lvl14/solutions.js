// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>

int main() {
    // Store 3 Filipino names and their lengths in arrays
    std::string names[3] = {"Maria", "Jose", "Ana"};
    int lengths[3] = {5, 4, 3};
    
    std::cout << "Filipino Names Analyzer" << std::endl;
    std::cout << "======================" << std::endl;
    
    // Print each name and its length using a loop
    for (int i = 0; i < 3; i++) {
        std::cout << "Name " << (i + 1) << ": " << names[i] << " - " << lengths[i] << " characters" << std::endl;
    }
    
    std::cout << "======================" << std::endl;
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>
#include <cctype>

int main() {
    // Names data
    std::string names[3] = {"Maria", "Jose", "Ana"};
    
    std::cout << "Filipino Names Analyzer" << std::endl;
    std::cout << "======================" << std::endl;
    
    // Analyze each name
    for (int i = 0; i < 3; i++) {
        std::string name = names[i];
        int length = name.length();
        
        std::cout << "Name " << (i + 1) << ": " << name << " - " << length << " characters" << std::endl;
        
        // Count vowels and consonants
        int vowelCount = 0;
        int consonantCount = 0;
        std::string vowels = "";
        std::string consonants = "";
        
        for (char c : name) {
            char lowerC = std::tolower(c);
            if (lowerC == 'a' || lowerC == 'e' || lowerC == 'i' || lowerC == 'o' || lowerC == 'u') {
                vowelCount++;
                vowels += lowerC;
                vowels += ", ";
            } else if (std::isalpha(c)) {
                consonantCount++;
                consonants += std::toupper(c);
                consonants += ", ";
            }
        }
        
        // Remove trailing comma and space
        if (vowels.length() > 0) {
            vowels = vowels.substr(0, vowels.length() - 2);
        }
        if (consonants.length() > 0) {
            consonants = consonants.substr(0, consonants.length() - 2);
        }
        
        std::cout << "  Vowels: " << vowelCount << " (" << vowels << ")" << std::endl;
        std::cout << "  Consonants: " << consonantCount << " (" << consonants << ")" << std::endl;
    }
    
    std::cout << "======================" << std::endl;
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <cctype>
#include <algorithm>

std::string identifyPattern(const std::string& name) {
    std::string lowerName = name;
    std::transform(lowerName.begin(), lowerName.end(), lowerName.begin(), ::tolower);
    
    if (lowerName == "maria" || lowerName == "jose") {
        return "Common Filipino name";
    } else if (name.length() <= 3) {
        return "Short Filipino name";
    } else if (name.length() >= 6) {
        return "Long Filipino name";
    } else {
        return "Standard Filipino name";
    }
}

std::string getCulturalSignificance(const std::string& name) {
    std::string lowerName = name;
    std::transform(lowerName.begin(), lowerName.end(), lowerName.begin(), ::tolower);
    
    if (lowerName == "maria" || lowerName == "jose") {
        return "High";
    } else if (lowerName == "ana" || lowerName == "pedro") {
        return "Medium";
    } else {
        return "Standard";
    }
}

void generateNameSuggestions() {
    std::string suggestions[3] = {"Maria Clara", "Jose Rizal", "Ana Luna"};
    
    for (const std::string& suggestion : suggestions) {
        std::cout << "- " << suggestion << std::endl;
    }
}

int main() {
    // Names data
    std::string names[3] = {"Maria", "Jose", "Ana"};
    
    std::cout << "Filipino Names Analyzer" << std::endl;
    std::cout << "======================" << std::endl;
    
    // Analyze each name
    for (int i = 0; i < 3; i++) {
        std::string name = names[i];
        int length = name.length();
        
        std::cout << "Name " << (i + 1) << ": " << name << " - " << length << " characters" << std::endl;
        
        // Count vowels and consonants
        int vowelCount = 0;
        int consonantCount = 0;
        std::string vowels = "";
        std::string consonants = "";
        
        for (char c : name) {
            char lowerC = std::tolower(c);
            if (lowerC == 'a' || lowerC == 'e' || lowerC == 'i' || lowerC == 'o' || lowerC == 'u') {
                vowelCount++;
                vowels += lowerC;
                vowels += ", ";
            } else if (std::isalpha(c)) {
                consonantCount++;
                consonants += std::toupper(c);
                consonants += ", ";
            }
        }
        
        // Remove trailing comma and space
        if (vowels.length() > 0) {
            vowels = vowels.substr(0, vowels.length() - 2);
        }
        if (consonants.length() > 0) {
            consonants = consonants.substr(0, consonants.length() - 2);
        }
        
        std::cout << "  Vowels: " << vowelCount << " (" << vowels << ")" << std::endl;
        std::cout << "  Consonants: " << consonantCount << " (" << consonants << ")" << std::endl;
        
        // Identify common Filipino name patterns
        std::string pattern = identifyPattern(name);
        std::string culturalSignificance = getCulturalSignificance(name);
        
        std::cout << "  Pattern: " << pattern << std::endl;
        std::cout << "  Cultural Significance: " << culturalSignificance << std::endl;
    }
    
    std::cout << "======================" << std::endl;
    
    // Generate name suggestions
    std::cout << std::endl;
    std::cout << "Name Suggestions:" << std::endl;
    generateNameSuggestions();
    std::cout << "======================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
