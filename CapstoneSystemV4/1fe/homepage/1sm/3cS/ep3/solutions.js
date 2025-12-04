window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main(string[] args) {
        // Arithmetic operators for fare calculation
        int baseFare = 15;
        double distance = 2.5; // kilometers
        double fare = baseFare + (distance * 5);
        Console.WriteLine("Total Pamasahe: ₱" + fare);
        
        // Comparison operator to check if payment is sufficient
        double bayad = 30;
        Console.WriteLine(bayad >= fare); // comparison operator
        
        // Logical operators to check availability and affordability
        bool trikeAvailable = true;
        bool affordable = fare < 50;
        
        if (trikeAvailable && affordable) {
            Console.WriteLine("Sakay na!");
        } else {
            Console.WriteLine("Hintay muna, mahal pa o walang trike.");
        }
    }
}`
};

