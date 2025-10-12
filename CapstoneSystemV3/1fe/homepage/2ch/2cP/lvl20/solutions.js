// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

int main() {
    string routes[] = {"Quiapo to Cubao", "Cubao to Makati", "Makati to Alabang"};
    double baseFares[] = {12.00, 15.00, 18.00};
    
    cout << "Jeepney Fare Matrix Calculator" << endl;
    cout << "=============================" << endl;
    
    for (int i = 0; i < 3; i++) {
        cout << "Route " << (i + 1) << ": " << routes[i] 
             << " - Base Fare: ₱" << fixed << setprecision(2) << baseFares[i] << endl;
    }
    
    cout << "=============================" << endl;
    return 0;
}`,

    average: `
#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

int main() {
    string routes[] = {"Quiapo to Cubao", "Cubao to Makati", "Makati to Alabang"};
    double baseFares[] = {12.00, 15.00, 18.00};
    double distances[] = {8.5, 10.2, 12.8};
    
    cout << "Jeepney Fare Matrix Calculator" << endl;
    cout << "=============================" << endl;
    
    for (int i = 0; i < 3; i++) {
        cout << "Route " << (i + 1) << ": " << routes[i] 
             << " - Base Fare: ₱" << fixed << setprecision(2) << baseFares[i] << endl;
    }
    
    cout << "=============================" << endl;
    cout << endl;
    cout << "Fare Calculation:" << endl;
    
    // Calculate fare for first route as example
    string selectedRoute = routes[0];
    double baseFare = baseFares[0];
    double distance = distances[0];
    bool isStudent = true; // Example: student discount
    
    double distanceFare = distance * 1.0; // ₱1.00 per km
    double subtotal = baseFare + distanceFare;
    double discount = 0;
    
    if (isStudent) {
        discount = subtotal * 0.20; // 20% student discount
    }
    
    double totalFare = subtotal - discount;
    
    cout << "Route: " << selectedRoute << endl;
    cout << "Distance: " << distance << " km" << endl;
    cout << "Base Fare: ₱" << fixed << setprecision(2) << baseFare << endl;
    cout << "Distance Fare: ₱" << fixed << setprecision(2) << distanceFare << endl;
    cout << "Subtotal: ₱" << fixed << setprecision(2) << subtotal << endl;
    cout << "Student Discount (20%): -₱" << fixed << setprecision(2) << discount << endl;
    cout << "Total Fare: ₱" << fixed << setprecision(2) << totalFare << endl;
    cout << "=============================" << endl;
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;

struct Route {
    string name;
    double baseFare;
    double distance;
    double totalFare;
    
    Route(string n, double bf, double d) : name(n), baseFare(bf), distance(d) {
        double distanceFare = distance * 1.0; // ₱1.00 per km
        double subtotal = baseFare + distanceFare;
        double discount = subtotal * 0.20; // 20% student discount
        totalFare = subtotal - discount;
    }
};

bool compareByFare(const Route& a, const Route& b) {
    return a.totalFare < b.totalFare;
}

int main() {
    vector<Route> routes = {
        Route("Quiapo to Cubao", 12.00, 8.5),
        Route("Cubao to Makati", 15.00, 10.2),
        Route("Makati to Alabang", 18.00, 12.8)
    };
    
    cout << "Jeepney Fare Matrix Calculator" << endl;
    cout << "=============================" << endl;
    
    for (int i = 0; i < routes.size(); i++) {
        cout << "Route " << (i + 1) << ": " << routes[i].name 
             << " - Base Fare: ₱" << fixed << setprecision(2) << routes[i].baseFare << endl;
    }
    
    cout << "=============================" << endl;
    cout << endl;
    
    // Sort by total fare to find cheapest and most expensive
    sort(routes.begin(), routes.end(), compareByFare);
    
    cout << "Fare Optimization Analysis:" << endl;
    cout << "Cheapest Route: " << routes[0].name 
         << " (₱" << fixed << setprecision(2) << routes[0].totalFare << ")" << endl;
    cout << "Most Expensive Route: " << routes[routes.size() - 1].name 
         << " (₱" << fixed << setprecision(2) << routes[routes.size() - 1].totalFare << ")" << endl;
    
    double averageFare = 0;
    for (const Route& route : routes) {
        averageFare += route.totalFare;
    }
    averageFare /= routes.size();
    cout << "Average Fare: ₱" << fixed << setprecision(2) << averageFare << endl;
    
    cout << endl;
    cout << "Route Recommendations:" << endl;
    cout << "- For Budget Travel: " << routes[0].name << endl;
    cout << "- For Speed: " << routes[1].name << endl;
    cout << "- For Comfort: " << routes[2].name << endl;
    
    cout << endl;
    cout << "Fare History:" << endl;
    cout << "- Lowest recorded fare: ₱" << fixed << setprecision(2) << routes[0].totalFare << endl;
    cout << "- Highest recorded fare: ₱" << fixed << setprecision(2) << routes[routes.size() - 1].totalFare << endl;
    cout << "- Average fare: ₱" << fixed << setprecision(2) << averageFare << endl;
    cout << "=============================" << endl;
    return 0;
}`
};

// Use namespace to avoid conflicts
window.tahoSolutions = tahoSolutions;
