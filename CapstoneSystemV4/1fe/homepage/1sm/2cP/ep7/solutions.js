window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>
using namespace std;

// Function without return value (void)
void collectIngredient(string item) {
    cout << "Kumukuha ng " << item << "..." << endl;
}

// Function with return value (bool)
bool dasalRitwal(string dasal) {
    cout << "Isinasagawa ang ritwal para sa: " << dasal << "..." << endl;
    
    // Simple condition example
    if (dasal.length() > 5) {
        return true; // successful
    } else {
        return false; // failed
    }
}

int main() {
    // Call void function multiple times
    collectIngredient("bawang");
    collectIngredient("dahon ng lagundi");
    
    // Call function with return value
    bool result = dasalRitwal("Protection");
    
    if (result) {
        cout << "Ritwal successful!" << endl;
    } else {
        cout << "Ritwal failed." << endl;
    }
    
    return 0;
}`
};

