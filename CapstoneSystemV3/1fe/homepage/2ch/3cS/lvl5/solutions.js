// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    // Function that greets each helper by name
    static void GreetHelper(string name) {
        Console.WriteLine($"Hello, {name}! Thank you for helping with the move.");
    }
    
    static void Main() {
        Console.WriteLine("Bayanihan Helper Greetings");
        Console.WriteLine("=========================");
        
        // Call greeting function for each helper
        GreetHelper("Juan");
        GreetHelper("Maria");
        GreetHelper("Pedro");
    }
}`,

    average: `
using System;

class Program {
    // Helper function to determine role based on age
    static string DetermineRole(int age) {
        if (age >= 18 && age <= 40) {
            return "Lifter";
        } else if (age >= 25 && age <= 60) {
            return "Cook";
        } else if (age >= 21 && age <= 65) {
            return "Driver";
        } else {
            return "Assistant";
        }
    }
    
    // Function that assigns roles based on age
    static void AssignRole(string name, int age) {
        string role = DetermineRole(age);
        
        Console.WriteLine($"Helper: {name} ({age})");
        Console.WriteLine($"Assigned Role: {role}");
        Console.WriteLine("Status: ✅ Role assigned successfully");
        Console.WriteLine();
    }
    
    static void Main() {
        Console.WriteLine("Bayanihan Role Assignment");
        Console.WriteLine("=========================");
        
        // Assign roles for multiple helpers
        AssignRole("Juan", 25);
        AssignRole("Maria", 45);
        AssignRole("Pedro", 30);
    }
}`,

    difficult: `
using System;
using System.Collections.Generic;

class Program {
    // Helper function to check if age is eligible for role
    static bool IsEligibleForRole(int age, string role) {
        switch (role) {
            case "Lifter": return age >= 18 && age <= 40;
            case "Cook": return age >= 25 && age <= 60;
            case "Driver": return age >= 21 && age <= 65;
            case "Assistant": return age >= 16 && age <= 70;
            case "Coordinator": return age >= 30 && age <= 65;
            default: return false;
        }
    }
    
    // Function to assign an available role to a helper
    static string AssignAvailableRole(string name, int age, 
                                     string[] roles, bool[] filled) {
        for (int i = 0; i < roles.Length; i++) {
            if (!filled[i] && IsEligibleForRole(age, roles[i])) {
                filled[i] = true;
                return roles[i];
            }
        }
        return null; // No available role
    }
    
    static void Main() {
        // Available helpers with their ages
        string[] helpers = {"Juan", "Maria", "Pedro", "Ana", "Carlos"};
        int[] ages = {25, 45, 30, 35, 50};
        
        // Required roles
        string[] requiredRoles = {"Lifter", "Cook", "Driver", "Assistant", "Coordinator"};
        bool[] roleFilled = new bool[requiredRoles.Length];
        
        Console.WriteLine("Bayanihan Complete Scheduler");
        Console.WriteLine("===========================");
        
        // Display available helpers
        Console.Write("Available Helpers: ");
        for (int i = 0; i < helpers.Length; i++) {
            Console.Write($"{helpers[i]}({ages[i]})");
            if (i < helpers.Length - 1) Console.Write(", ");
        }
        Console.WriteLine();
        Console.WriteLine();
        
        // Assign roles ensuring no duplicates
        Console.WriteLine("Role Assignments:");
        for (int i = 0; i < helpers.Length; i++) {
            string role = AssignAvailableRole(helpers[i], ages[i], requiredRoles, roleFilled);
            if (role != null) {
                Console.WriteLine($"✅ {role}: {helpers[i]} ({ages[i]})");
            }
        }
        
        Console.WriteLine();
        Console.WriteLine("All roles filled successfully!");
        Console.WriteLine("===========================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
