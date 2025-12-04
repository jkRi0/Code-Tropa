window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Check score and assign medal using if-else
    int score = 85;
    cout << "Score: " << score << endl;
    
    if (score >= 90) {
        cout << "Gold Medalist!" << endl;
    } else if (score >= 75) {
        cout << "Silver Medalist!" << endl;
    } else {
        cout << "Needs Improvement." << endl;
    }
    
    // Check category and display criteria using if-else
    string category = "Sabayang Pagbigkas";
    cout << "Category: " << category << endl;
    
    if (category == "Quiz Bee") {
        cout << "Judging criteria: Accuracy and Speed." << endl;
    } else if (category == "Sabayang Pagbigkas") {
        cout << "Judging criteria: Unity and Delivery." << endl;
    } else {
        cout << "Unknown category." << endl;
    }
    
    return 0;
}`
};

