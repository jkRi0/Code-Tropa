// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>

// Function that returns a welcome message for visitors
void displayWelcome(const std::string& familyName) {
    std::cout << "Welcome, " << familyName << "! We're honored by your visit." << std::endl;
}

int main() {
    std::cout << "Pamamanhikan Welcome Messages" << std::endl;
    std::cout << "============================" << std::endl;
    
    // Call welcome function for different families
    displayWelcome("Santos Family");
    displayWelcome("Garcia Family");
    displayWelcome("Rodriguez Family");
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>

// Function to assign specific gift tasks to participants
void assignGiftTask(const std::string& participantName, const std::string& giftType) {
    std::cout << "Participant: " << participantName << std::endl;
    std::cout << "Assigned Gift: " << giftType << std::endl;
    std::cout << "Status: ✅ Task assigned successfully" << std::endl;
    std::cout << std::endl;
}

// Helper function to determine appropriate gift
std::string determineGift(const std::string& participantName) {
    if (participantName == "Juan") return "Flowers";
    if (participantName == "Maria") return "Food";
    if (participantName == "Pedro") return "Jewelry";
    return "Traditional Items";
}

int main() {
    std::cout << "Pamamanhikan Gift Assignment" << std::endl;
    std::cout << "===========================" << std::endl;
    
    // Assign gift tasks to participants
    assignGiftTask("Juan", "Flowers");
    assignGiftTask("Maria", "Food");
    assignGiftTask("Pedro", "Jewelry");
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <vector>

// Function to validate all expected gifts are present
bool validateGifts(const std::vector<std::string>& requiredGifts, 
                   const std::vector<std::string>& participants) {
    std::cout << "Required Gifts Checklist:" << std::endl;
    
    bool allPresent = true;
    for (size_t i = 0; i < requiredGifts.size(); i++) {
        const std::string& gift = requiredGifts[i];
        const std::string& participant = participants[i];
        
        if (!participant.empty()) {
            std::cout << "✅ " << gift << " - Assigned to: " << participant << std::endl;
        } else {
            std::cout << "❌ " << gift << " - NOT ASSIGNED" << std::endl;
            allPresent = false;
        }
    }
    
    return allPresent;
}

// Function to handle missing gifts
void handleMissingGifts(const std::vector<std::string>& requiredGifts, 
                       const std::vector<std::string>& participants) {
    std::cout << "Missing Gift Report:" << std::endl;
    for (size_t i = 0; i < requiredGifts.size(); i++) {
        if (participants[i].empty()) {
            std::cout << "⚠️ " << requiredGifts[i] << " needs to be assigned" << std::endl;
        }
    }
}

int main() {
    // Required gifts for pamamanhikan
    std::vector<std::string> requiredGifts = {"Flowers", "Food", "Jewelry", "Traditional Items"};
    std::vector<std::string> assignedParticipants = {"Juan", "Maria", "Pedro", "Ana"};
    
    std::cout << "Pamamanhikan Gift Validation" << std::endl;
    std::cout << "===========================" << std::endl;
    
    // Validate all gifts are present
    bool allGiftsPresent = validateGifts(requiredGifts, assignedParticipants);
    
    if (allGiftsPresent) {
        std::cout << std::endl;
        std::cout << "All gifts accounted for!" << std::endl;
        std::cout << "Pamamanhikan is ready to proceed." << std::endl;
    } else {
        std::cout << std::endl;
        std::cout << "⚠️ Some gifts are missing. Please check assignments." << std::endl;
        handleMissingGifts(requiredGifts, assignedParticipants);
    }
    
    std::cout << "===========================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
