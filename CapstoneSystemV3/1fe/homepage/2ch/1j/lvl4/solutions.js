// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
import java.util.Scanner;

public class CurfewChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Get current time (simulated)
        System.out.println("Barangay Curfew Check");
        System.out.println("====================");
        System.out.print("Enter current hour (0-23): ");
        int currentHour = scanner.nextInt();
        
        // Check if time is after 10 PM (22:00)
        if (currentHour >= 22) {
            System.out.println("⚠️ CURFEW VIOLATION! It's past 10 PM.");
        } else {
            System.out.println("✅ No curfew violation. You're safe!");
        }
        
        scanner.close();
    }
}`,

    average: `
import java.util.Scanner;

public class CurfewChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Barangay Curfew Check");
        System.out.println("====================");
        
        // Get age and time
        System.out.print("Enter your age: ");
        int age = scanner.nextInt();
        
        System.out.print("Enter current hour (0-23): ");
        int currentHour = scanner.nextInt();
        
        // Check curfew rules with exemptions
        if (currentHour >= 22) {
            // Check for exemptions
            if (age < 18) {
                System.out.println("✅ EXEMPTION: Minors are exempt from curfew.");
            } else if (age >= 65) {
                System.out.println("✅ EXEMPTION: Senior citizens are exempt from curfew.");
            } else {
                System.out.println("⚠️ CURFEW VIOLATION! It's past 10 PM and you're not exempt.");
            }
        } else {
            System.out.println("✅ No curfew violation. You're safe!");
        }
        
        scanner.close();
    }
}`,

    difficult: `
import java.util.Scanner;

public class CurfewChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Resident data arrays
        String[] names = {"Juan", "Maria", "Pedro", "Ana"};
        int[] ages = {25, 16, 70, 30};
        String[] reasons = {"Work", "School", "Medical", "Emergency"};
        
        int currentHour = 22; // 10 PM
        int violationCount = 0;
        
        System.out.println("Barangay Curfew Check Report");
        System.out.println("============================");
        
        // Check each resident
        for (int i = 0; i < names.length; i++) {
            String status = checkCurfewViolation(ages[i], reasons[i], currentHour);
            System.out.printf("Resident: %s (%d) - %s%n", names[i], ages[i], reasons[i]);
            System.out.println("Status: " + status);
            System.out.println();
            
            if (status.contains("VIOLATION")) {
                violationCount++;
            }
        }
        
        System.out.println("Total Violations: " + violationCount);
        scanner.close();
    }
    
    public static String checkCurfewViolation(int age, String reason, int currentHour) {
        if (currentHour >= 22) {
            // Check exemptions
            if (age < 18) {
                return "✅ EXEMPT - Minor";
            } else if (age >= 65) {
                return "✅ EXEMPT - Senior citizen";
            } else if (reason.equals("Medical") || reason.equals("Emergency")) {
                return "✅ VALID - " + reason + " reason";
            } else {
                return "⚠️ VIOLATION - No valid reason";
            }
        } else {
            return "✅ SAFE - Before curfew hours";
        }
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;