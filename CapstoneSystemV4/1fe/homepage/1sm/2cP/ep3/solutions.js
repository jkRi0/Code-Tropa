window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
using namespace std;

int main() {
    // Ingredient prices
    int kareKareMeat = 500;   // presyo ng karne
    int gulay = 200;           // presyo ng gulay
    int haloHalo = 150;        // presyo ng halo-halo ingredients
    
    // Calculate total budget using arithmetic operators
    int total = kareKareMeat + gulay + haloHalo;
    cout << "Total budget: " << total << endl;
    
    // Check if within budget using comparison operator
    int budget = 1000;
    if (total > budget) {
        cout << "Lagpas na sa budget!" << endl;
    } else {
        cout << "Pasok pa sa budget." << endl;
    }
    
    // Check if handa is complete using logical operators
    bool hasKareKare = true;
    bool hasHaloHalo = true;
    
    if (hasKareKare && hasHaloHalo) {
        cout << "Complete ang handa!" << endl;
    } else {
        cout << "May kulang pa sa handa." << endl;
    }
    
    return 0;
}`
};

