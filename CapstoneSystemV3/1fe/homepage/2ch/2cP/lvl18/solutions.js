// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // Store 3 contestants and their scores in arrays
    std::string contestants[3] = {"Maria Santos", "Ana Garcia", "Sofia Rodriguez"};
    double scores[3] = {85.5, 92.0, 88.5};
    
    std::cout << "Miss Barangay Scoring System" << std::endl;
    std::cout << "===========================" << std::endl;
    
    // Print each contestant's name and score using a loop
    for (int i = 0; i < 3; i++) {
        std::cout << "Contestant " << (i + 1) << ": " << contestants[i] << " - " 
                  << std::fixed << std::setprecision(1) << scores[i] << " points" << std::endl;
    }
    
    std::cout << "===========================" << std::endl;
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // Contestant data
    std::string contestants[3] = {"Maria Santos", "Ana Garcia", "Sofia Rodriguez"};
    double scores[3] = {85.5, 92.0, 88.5};
    
    std::cout << "Miss Barangay Scoring System" << std::endl;
    std::cout << "===========================" << std::endl;
    
    // Display contestant data
    for (int i = 0; i < 3; i++) {
        std::cout << "Contestant " << (i + 1) << ": " << contestants[i] << " - " 
                  << std::fixed << std::setprecision(1) << scores[i] << " points" << std::endl;
    }
    
    std::cout << "===========================" << std::endl;
    
    // Calculate average scores and determine the winner
    double maxScore = 0;
    int winnerIndex = 0;
    
    for (int i = 0; i < 3; i++) {
        if (scores[i] > maxScore) {
            maxScore = scores[i];
            winnerIndex = i;
        }
    }
    
    std::cout << std::endl;
    std::cout << "Scoring Results:" << std::endl;
    
    // Sort contestants by score (simple bubble sort)
    for (int i = 0; i < 3 - 1; i++) {
        for (int j = 0; j < 3 - 1 - i; j++) {
            if (scores[j] < scores[j + 1]) {
                // Swap scores
                double tempScore = scores[j];
                scores[j] = scores[j + 1];
                scores[j + 1] = tempScore;
                
                // Swap contestants
                std::string tempContestant = contestants[j];
                contestants[j] = contestants[j + 1];
                contestants[j + 1] = tempContestant;
            }
        }
    }
    
    // Display rankings
    std::string positions[3] = {"1st Place", "2nd Place", "3rd Place"};
    for (int i = 0; i < 3; i++) {
        std::cout << positions[i] << ": " << contestants[i] << " (" 
                  << std::fixed << std::setprecision(1) << scores[i] << " points)" << std::endl;
    }
    
    std::cout << std::endl;
    std::cout << "Winner: " << contestants[0] << " - Miss Barangay 2024!" << std::endl;
    std::cout << "===========================" << std::endl;
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // Contestant data
    std::string contestants[3] = {"Maria Santos", "Ana Garcia", "Sofia Rodriguez"};
    double totalScores[3] = {85.5, 92.0, 88.5};
    
    std::cout << "Miss Barangay Scoring System" << std::endl;
    std::cout << "===========================" << std::endl;
    
    // Display contestant data
    for (int i = 0; i < 3; i++) {
        std::cout << "Contestant " << (i + 1) << ": " << contestants[i] << " - " 
                  << std::fixed << std::setprecision(1) << totalScores[i] << " points" << std::endl;
    }
    
    std::cout << "===========================" << std::endl;
    
    // Implement weighted scoring and generate detailed rankings
    double talentScores[3] = {90.0, 95.0, 85.0};
    double beautyScores[3] = {80.0, 90.0, 95.0};
    double intelligenceScores[3] = {85.0, 90.0, 87.0};
    
    // Calculate weighted scores (talent=40%, beauty=30%, intelligence=30%)
    double calculatedScores[3];
    for (int i = 0; i < 3; i++) {
        calculatedScores[i] = talentScores[i] * 0.40 + beautyScores[i] * 0.30 + intelligenceScores[i] * 0.30;
    }
    
    std::cout << std::endl;
    std::cout << "Detailed Scoring Analysis:" << std::endl;
    
    for (int i = 0; i < 3; i++) {
        std::cout << contestants[i] << ":" << std::endl;
        std::cout << "  Talent: " << talentScores[i] << " (40%) = " 
                  << std::fixed << std::setprecision(1) << talentScores[i] * 0.40 << std::endl;
        std::cout << "  Beauty: " << beautyScores[i] << " (30%) = " 
                  << std::fixed << std::setprecision(1) << beautyScores[i] * 0.30 << std::endl;
        std::cout << "  Intelligence: " << intelligenceScores[i] << " (30%) = " 
                  << std::fixed << std::setprecision(1) << intelligenceScores[i] * 0.30 << std::endl;
        std::cout << "  Total: " << std::fixed << std::setprecision(1) << calculatedScores[i] << std::endl;
        std::cout << std::endl;
    }
    
    // Sort contestants by calculated score
    for (int i = 0; i < 3 - 1; i++) {
        for (int j = 0; j < 3 - 1 - i; j++) {
            if (calculatedScores[j] < calculatedScores[j + 1]) {
                // Swap calculated scores
                double tempScore = calculatedScores[j];
                calculatedScores[j] = calculatedScores[j + 1];
                calculatedScores[j + 1] = tempScore;
                
                // Swap contestants
                std::string tempContestant = contestants[j];
                contestants[j] = contestants[j + 1];
                contestants[j + 1] = tempContestant;
                
                // Swap category scores
                double tempTalent = talentScores[j];
                talentScores[j] = talentScores[j + 1];
                talentScores[j + 1] = tempTalent;
                
                double tempBeauty = beautyScores[j];
                beautyScores[j] = beautyScores[j + 1];
                beautyScores[j + 1] = tempBeauty;
                
                double tempIntelligence = intelligenceScores[j];
                intelligenceScores[j] = intelligenceScores[j + 1];
                intelligenceScores[j + 1] = tempIntelligence;
            }
        }
    }
    
    std::cout << "Final Rankings:" << std::endl;
    std::string positions[3] = {"1st Place", "2nd Place", "3rd Place"};
    for (int i = 0; i < 3; i++) {
        std::cout << positions[i] << ": " << contestants[i] << " (" 
                  << std::fixed << std::setprecision(1) << calculatedScores[i] << " points)" << std::endl;
    }
    
    std::cout << std::endl;
    std::cout << "Winner: " << contestants[0] << " - Miss Barangay 2024!" << std::endl;
    std::cout << "===========================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
