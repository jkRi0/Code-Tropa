window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>
using namespace std;

int main() {
    // String length() example
    string fullName = "Gng. Maria Santos";
    cout << "Characters: " << fullName.length() << endl;
    
    // String substr() example - extract first name
    string firstName = fullName.substr(5, 5); // "Maria"
    cout << "First name: " << firstName << endl;
    
    // String concatenation example
    string certificate = "Congratulations, " + fullName + "!";
    cout << certificate << endl;
    
    // String comparison example
    string name1 = "Mang Jose Dela Cruz";
    string name2 = "Mang Jose Dela Cruz";
    
    if (name1 == name2) {
        cout << "Parehong-pareho ang pangalan." << endl;
    }
    
    return 0;
}`
};

