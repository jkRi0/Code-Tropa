window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Declare variables for Aling Nena's tindahan inventory
    int itlog = 12;              // presyo ng itlog
    float suka = 15.50;          // presyo ng suka
    float toyo = 8.75;           // presyo ng toyo
    string chichirya = "Piattos"; // pangalan ng chichirya
    bool available = true;       // kung meron pang stock
    
    // Display the inventory information
    cout << "Tindahan Inventory:" << endl;
    cout << "Itlog: " << itlog << endl;
    cout << "Suka: " << suka << endl;
    cout << "Toyo: " << toyo << endl;
    cout << "Chichirya: " << chichirya << endl;
    cout << "Available? " << available << endl;
    
    return 0;
}`
};

