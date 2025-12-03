// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>

int main() {
    // Store 3 barangay teams and their medal counts in arrays
    std::string teams[3] = {"Barangay San Jose", "Barangay Santa Maria", "Barangay San Pedro"};
    int medals[3] = {5, 7, 4};
    
    std::cout << "Palarong Barangay Medal Tally" << std::endl;
    std::cout << "============================" << std::endl;
    
    // Print each team's name and medal count using a loop
    for (int i = 0; i < 3; i++) {
        std::cout << "Team " << (i + 1) << ": " << teams[i] << " - " << medals[i] << " medals" << std::endl;
    }
    
    std::cout << "============================" << std::endl;
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>

int main() {
    // Team data
    std::string teams[3] = {"Barangay San Jose", "Barangay Santa Maria", "Barangay San Pedro"};
    int medals[3] = {5, 7, 4};
    
    std::cout << "Palarong Barangay Medal Tally" << std::endl;
    std::cout << "============================" << std::endl;
    
    // Display team data
    for (int i = 0; i < 3; i++) {
        std::cout << "Team " << (i + 1) << ": " << teams[i] << " - " << medals[i] << " medals" << std::endl;
    }
    
    std::cout << "============================" << std::endl;
    
    // Calculate total medals and determine the winning team
    int maxMedals = 0;
    int winningTeamIndex = 0;
    
    for (int i = 0; i < 3; i++) {
        if (medals[i] > maxMedals) {
            maxMedals = medals[i];
            winningTeamIndex = i;
        }
    }
    
    std::cout << std::endl;
    std::cout << "Medal Standings:" << std::endl;
    
    // Sort teams by medal count (simple bubble sort)
    for (int i = 0; i < 3 - 1; i++) {
        for (int j = 0; j < 3 - 1 - i; j++) {
            if (medals[j] < medals[j + 1]) {
                // Swap medals
                int tempMedals = medals[j];
                medals[j] = medals[j + 1];
                medals[j + 1] = tempMedals;
                
                // Swap teams
                std::string tempTeam = teams[j];
                teams[j] = teams[j + 1];
                teams[j + 1] = tempTeam;
            }
        }
    }
    
    // Display standings
    std::string positions[3] = {"1st Place", "2nd Place", "3rd Place"};
    for (int i = 0; i < 3; i++) {
        std::cout << positions[i] << ": " << teams[i] << " (" << medals[i] << " medals)" << std::endl;
    }
    
    std::cout << "============================" << std::endl;
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>

int main() {
    // Team data
    std::string teams[3] = {"Barangay San Jose", "Barangay Santa Maria", "Barangay San Pedro"};
    int totalMedals[3] = {5, 7, 4};
    
    std::cout << "Palarong Barangay Medal Tally" << std::endl;
    std::cout << "============================" << std::endl;
    
    // Display team data
    for (int i = 0; i < 3; i++) {
        std::cout << "Team " << (i + 1) << ": " << teams[i] << " - " << totalMedals[i] << " medals" << std::endl;
    }
    
    std::cout << "============================" << std::endl;
    
    // Track different medal types and generate detailed standings
    int goldMedals[3] = {2, 3, 1};
    int silverMedals[3] = {2, 1, 3};
    int bronzeMedals[3] = {1, 3, 0};
    
    // Calculate weighted scores (gold=3, silver=2, bronze=1)
    int scores[3];
    for (int i = 0; i < 3; i++) {
        scores[i] = goldMedals[i] * 3 + silverMedals[i] * 2 + bronzeMedals[i] * 1;
    }
    
    std::cout << std::endl;
    std::cout << "Detailed Medal Analysis:" << std::endl;
    
    for (int i = 0; i < 3; i++) {
        std::cout << teams[i] << ": " << goldMedals[i] << " Gold, " 
                  << silverMedals[i] << " Silver, " << bronzeMedals[i] 
                  << " Bronze (Score: " << scores[i] << ")" << std::endl;
    }
    
    // Sort teams by weighted score
    for (int i = 0; i < 3 - 1; i++) {
        for (int j = 0; j < 3 - 1 - i; j++) {
            if (scores[j] < scores[j + 1]) {
                // Swap scores
                int tempScore = scores[j];
                scores[j] = scores[j + 1];
                scores[j + 1] = tempScore;
                
                // Swap teams
                std::string tempTeam = teams[j];
                teams[j] = teams[j + 1];
                teams[j + 1] = tempTeam;
                
                // Swap medal counts
                int tempGold = goldMedals[j];
                goldMedals[j] = goldMedals[j + 1];
                goldMedals[j + 1] = tempGold;
                
                int tempSilver = silverMedals[j];
                silverMedals[j] = silverMedals[j + 1];
                silverMedals[j + 1] = tempSilver;
                
                int tempBronze = bronzeMedals[j];
                bronzeMedals[j] = bronzeMedals[j + 1];
                bronzeMedals[j + 1] = tempBronze;
            }
        }
    }
    
    std::cout << std::endl;
    std::cout << "Final Standings:" << std::endl;
    std::string positions[3] = {"1st Place", "2nd Place", "3rd Place"};
    for (int i = 0; i < 3; i++) {
        std::cout << positions[i] << ": " << teams[i] << " (Score: " << scores[i] << ")" << std::endl;
    }
    
    std::cout << "============================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
