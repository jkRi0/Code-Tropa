// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>

int main() {
    // Create an array of 3 predefined moves
    std::string moves[3] = {"straight", "left", "right"};
    
    std::cout << "Tikbalang Escape Route" << std::endl;
    std::cout << "=====================" << std::endl;
    
    // Use a loop to print a sequence of 3 predefined moves
    for (int i = 0; i < 3; i++) {
        std::cout << "Move " << (i + 1) << ": " << moves[i] << std::endl;
    }
    
    std::cout << "=====================" << std::endl;
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>

int main() {
    srand(time(0)); // Seed random number generator
    
    std::string possibleMoves[3] = {"straight", "offer gift", "hide"};
    
    std::cout << "Tikbalang Forest Adventure" << std::endl;
    std::cout << "=========================" << std::endl;
    
    // Add random choices with different outcomes
    for (int i = 1; i <= 3; i++) {
        int randomIndex = rand() % 3;
        std::string move = possibleMoves[randomIndex];
        
        std::cout << "Move " << i << ": " << move << std::endl;
        
        // Show different outcomes for each move
        if (move == "straight") {
            std::cout << "Outcome: You find a hidden path!" << std::endl;
        } else if (move == "offer gift") {
            std::cout << "Outcome: Tikbalang accepts gift! Safe passage." << std::endl;
        } else if (move == "hide") {
            std::cout << "Outcome: You successfully hide from danger!" << std::endl;
        }
        std::cout << std::endl;
    }
    
    std::cout << "=========================" << std::endl;
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <vector>
#include <cstdlib>
#include <ctime>

int main() {
    srand(time(0)); // Seed random number generator
    
    // Game state
    int health = 100;
    std::vector<std::string> pathHistory;
    std::string possibleMoves[5] = {"straight", "left", "right", "offer gift", "hide"};
    
    std::cout << "Tikbalang Escape Game" << std::endl;
    std::cout << "===================" << std::endl;
    
    // Game loop - continue until health reaches 0 or escape
    while (health > 0 && pathHistory.size() < 5) {
        std::cout << "Health: " << health << std::endl;
        std::cout << "Path History: [";
        for (size_t i = 0; i < pathHistory.size(); i++) {
            std::cout << pathHistory[i];
            if (i < pathHistory.size() - 1) std::cout << ", ";
        }
        std::cout << "]" << std::endl;
        std::cout << std::endl;
        
        // Generate random move
        int randomIndex = rand() % 5;
        std::string move = possibleMoves[randomIndex];
        
        std::cout << "Move " << (pathHistory.size() + 1) << ": " << move << std::endl;
        
        // Apply move consequences
        if (move == "straight") {
            std::cout << "Outcome: Safe path! Health: " << health << std::endl;
        } else if (move == "left" || move == "right") {
            health -= 20;
            std::cout << "Outcome: Wrong turn! Health: " << health << std::endl;
        } else if (move == "offer gift") {
            std::cout << "Outcome: Tikbalang accepts! You escape!" << std::endl;
            std::cout << "Final Health: " << health << std::endl;
            break;
        } else if (move == "hide") {
            std::cout << "Outcome: Successfully hidden! Health: " << health << std::endl;
        }
        
        // Add to path history
        pathHistory.push_back(move);
        std::cout << std::endl;
        
        // Check for game end conditions
        if (health <= 0) {
            std::cout << "Game Over! You were caught by the Tikbalang!" << std::endl;
            break;
        }
    }
    
    std::cout << "===================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
