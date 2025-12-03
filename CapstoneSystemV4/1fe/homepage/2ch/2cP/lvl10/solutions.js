// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>

int main() {
    // Store 3 player names and scores in arrays
    std::string names[3] = {"Juan", "Maria", "Pedro"};
    int scores[3] = {85, 92, 78};
    
    std::cout << "Larong Kalye Leaderboard" << std::endl;
    std::cout << "=======================" << std::endl;
    
    // Print each player's name and score using a loop
    for (int i = 0; i < 3; i++) {
        std::cout << "Player " << (i + 1) << ": " << names[i] << " - " << scores[i] << " points" << std::endl;
    }
    
    std::cout << "=======================" << std::endl;
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

struct Player {
    std::string name;
    int score;
    
    Player(std::string n, int s) : name(n), score(s) {}
};

int main() {
    // Player data
    std::string names[3] = {"Juan", "Maria", "Pedro"};
    int scores[3] = {85, 92, 78};
    
    // Create vector of Player objects for sorting
    std::vector<Player> players;
    for (int i = 0; i < 3; i++) {
        players.push_back(Player(names[i], scores[i]));
    }
    
    // Sort by score (highest first)
    std::sort(players.begin(), players.end(), [](const Player& a, const Player& b) {
        return a.score > b.score;
    });
    
    std::cout << "Larong Kalye Leaderboard (Sorted)" << std::endl;
    std::cout << "================================" << std::endl;
    
    // Display ranked leaderboard
    std::string positions[3] = {"1st Place", "2nd Place", "3rd Place"};
    for (size_t i = 0; i < players.size(); i++) {
        std::cout << positions[i] << ": " << players[i].name << " - " << players[i].score << " points" << std::endl;
    }
    
    std::cout << "================================" << std::endl;
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <numeric>
#include <iomanip>

struct Player {
    std::string name;
    int score;
    
    Player(std::string n, int s) : name(n), score(s) {}
};

std::string getRankText(int rank) {
    switch (rank) {
        case 1: return "1st";
        case 2: return "2nd";
        case 3: return "3rd";
        default: return std::to_string(rank) + "th";
    }
}

int main() {
    // Extended player data with ties
    std::string names[5] = {"Juan", "Maria", "Pedro", "Ana", "Carlos"};
    int scores[5] = {85, 92, 78, 85, 70};
    
    // Create vector of Player objects
    std::vector<Player> players;
    for (int i = 0; i < 5; i++) {
        players.push_back(Player(names[i], scores[i]));
    }
    
    // Sort by score (highest first)
    std::sort(players.begin(), players.end(), [](const Player& a, const Player& b) {
        return a.score > b.score;
    });
    
    std::cout << "Larong Kalye Leaderboard (Complete)" << std::endl;
    std::cout << "==================================" << std::endl;
    std::cout << "Rank  Name    Score" << std::endl;
    std::cout << "----  ----    -----" << std::endl;
    
    // Display formatted leaderboard with tie handling
    int currentRank = 1;
    for (size_t i = 0; i < players.size(); i++) {
        if (i > 0 && players[i].score != players[i-1].score) {
            currentRank = i + 1;
        }
        
        std::string rankText = getRankText(currentRank);
        std::string tieNote = (i > 0 && players[i].score == players[i-1].score) ? 
                             " (tied with " + players[i-1].name + ")" : "";
        
        std::cout << std::left << std::setw(4) << rankText << "  " 
                  << std::setw(6) << players[i].name << "  " 
                  << players[i].score << tieNote << std::endl;
    }
    
    // Calculate and display statistics
    int highest = *std::max_element(scores, scores + 5);
    int lowest = *std::min_element(scores, scores + 5);
    double average = std::accumulate(scores, scores + 5, 0) / 5.0;
    
    std::cout << std::endl;
    std::cout << "Statistics:" << std::endl;
    std::cout << "Highest Score: " << highest << std::endl;
    std::cout << "Lowest Score: " << lowest << std::endl;
    std::cout << "Average Score: " << average << std::endl;
    std::cout << "==================================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
