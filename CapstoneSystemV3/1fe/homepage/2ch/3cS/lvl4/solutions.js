// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        Console.WriteLine("Barangay Curfew Check");
        Console.WriteLine("====================");
        Console.Write("Enter current hour (0-23): ");
        int currentHour = int.Parse(Console.ReadLine());
        
        // Check if time is after 10 PM (22:00)
        if (currentHour >= 22) {
            Console.WriteLine("⚠️ CURFEW VIOLATION! It's past 10 PM.");
        } else {
            Console.WriteLine("✅ No curfew violation. You're safe!");
        }
    }
}`,

    average: `
using System;

class Program {
    static void Main() {
        Console.WriteLine("Barangay Curfew Check");
        Console.WriteLine("====================");
        
        // Get age and time
        Console.Write("Enter your age: ");
        int age = int.Parse(Console.ReadLine());
        
        Console.Write("Enter current hour (0-23): ");
        int currentHour = int.Parse(Console.ReadLine());
        
        // Check curfew rules with exemptions
        if (currentHour >= 22) {
            // Check for exemptions
            if (age < 18) {
                Console.WriteLine("✅ EXEMPTION: Minors are exempt from curfew.");
            } else if (age >= 65) {
                Console.WriteLine("✅ EXEMPTION: Senior citizens are exempt from curfew.");
            } else {
                Console.WriteLine("⚠️ CURFEW VIOLATION! It's past 10 PM and you're not exempt.");
            }
        } else {
            Console.WriteLine("✅ No curfew violation. You're safe!");
        }
    }
}`,

    difficult: `
using System;

class Program {
    static string CheckCurfewViolation(int age, string reason, int currentHour) {
        if (currentHour >= 22) {
            // Check exemptions
            if (age < 18) {
                return "✅ EXEMPT - Minor";
            } else if (age >= 65) {
                return "✅ EXEMPT - Senior citizen";
            } else if (reason == "Medical" || reason == "Emergency") {
                return "✅ VALID - " + reason + " reason";
            } else {
                return "⚠️ VIOLATION - No valid reason";
            }
        } else {
            return "✅ SAFE - Before curfew hours";
        }
    }
    
    static void Main() {
        // Resident data arrays
        string[] names = {"Juan", "Maria", "Pedro", "Ana"};
        int[] ages = {25, 16, 70, 30};
        string[] reasons = {"Work", "School", "Medical", "Emergency"};
        
        int currentHour = 22; // 10 PM
        int violationCount = 0;
        
        Console.WriteLine("Barangay Curfew Check Report");
        Console.WriteLine("============================");
        
        // Check each resident
        for (int i = 0; i < names.Length; i++) {
            string status = CheckCurfewViolation(ages[i], reasons[i], currentHour);
            Console.WriteLine($"Resident: {names[i]} ({ages[i]}) - {reasons[i]}");
            Console.WriteLine($"Status: {status}");
            Console.WriteLine();
            
            if (status.Contains("VIOLATION")) {
                violationCount++;
            }
        }
        
        Console.WriteLine($"Total Violations: {violationCount}");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
