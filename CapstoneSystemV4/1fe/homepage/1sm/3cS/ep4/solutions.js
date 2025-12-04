window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main(string[] args) {
        // Check curfew using if-else with logical operators
        int age = 16;
        int time = 22;
        
        Console.WriteLine("Age: " + age);
        Console.WriteLine("Time: " + time);
        
        if (time >= 22 && age < 18) {
            Console.WriteLine("Curfew! Pauwiin agad.");
        } else if (age >= 18 && time >= 22) {
            Console.WriteLine("Check ID muna.");
        } else {
            Console.WriteLine("Safe sa daan.");
        }
    }
}`
};

