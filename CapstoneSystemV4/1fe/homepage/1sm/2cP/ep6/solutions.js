window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Declare arrays to store player names and scores
    string players[] = {"Juan", "Ana", "Pedro", "Liza", "Kiko"};
    int scores[] = {5, 3, 7, 2, 4};
    
    cout << "Fiesta Game Scores" << endl;
    cout << "==================" << endl;
    
    // Display all players and scores using a loop
    for (int i = 0; i < 5; i++) {
        cout << players[i] << " - " << scores[i] << " points" << endl;
    }
    
    // Find top player
    int topScore = scores[0];
    string topPlayer = players[0];
    
    for (int i = 1; i < 5; i++) {
        if (scores[i] > topScore) {
            topScore = scores[i];
            topPlayer = players[i];
        }
    }
    
    cout << "Top Player: " << topPlayer << " with " << topScore << " points!" << endl;
    
    return 0;
}`
};

