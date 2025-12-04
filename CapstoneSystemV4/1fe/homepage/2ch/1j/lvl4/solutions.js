// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class CurfewChecker {
    public static void main(String[] args) {
        // Declare variable for current hour
        int currentHour = 22; // 10 PM
        
        System.out.println("Barangay Curfew Check");
        System.out.println("====================");
        System.out.println("Current Time: " + currentHour + ":00");
        
        // Check if time is after 10 PM (22:00)
        if (currentHour >= 22) {
            System.out.println("CURFEW VIOLATION! It's past 10 PM.");
        } else {
            System.out.println("No curfew violation. You're safe!");
        }
    }
}`,

    average: `
public class CurfewChecker {
    public static void main(String[] args) {
        // Declare variables for age and time
        int age = 16;
        int currentHour = 22; // 10 PM
        
        System.out.println("Barangay Curfew Check");
        System.out.println("====================");
        System.out.println("Age: " + age);
        System.out.println("Current Time: " + currentHour + ":00");
        
        // Check curfew rules with exemptions using nested if-else
        if (currentHour >= 22) {
            // Check for exemptions
            if (age < 18) {
                System.out.println("EXEMPTION: Minors are exempt from curfew.");
            } else if (age >= 65) {
                System.out.println("EXEMPTION: Senior citizens are exempt from curfew.");
            } else {
                System.out.println("CURFEW VIOLATION! It's past 10 PM and you're not exempt.");
            }
        } else {
            System.out.println("No curfew violation. You're safe!");
        }
    }
}`,

    difficult: `
public class CurfewChecker {
    public static void main(String[] args) {
        // Resident data stored in arrays
        String[] names = {"Juan", "Maria", "Pedro", "Ana"};
        int[] ages = {25, 16, 70, 30};
        String[] reasons = {"Work", "School", "Medical", "Emergency"};
        
        int currentHour = 22; // 10 PM
        int violationCount = 0;
        
        System.out.println("Barangay Curfew Check Report");
        System.out.println("============================");
        
        // Loop through each resident and check curfew rules
        for (int i = 0; i < names.length; i++) {
            System.out.println("Resident: " + names[i] + " (" + ages[i] + ") - " + reasons[i]);
            
            // Check curfew rules using conditionals
            String status;
            if (currentHour >= 22) {
                // Check exemptions
                if (ages[i] < 18) {
                    status = "EXEMPT - Minor";
                } else if (ages[i] >= 65) {
                    status = "EXEMPT - Senior citizen";
                } else if (reasons[i].equals("Medical") || reasons[i].equals("Emergency")) {
                    status = "VALID - " + reasons[i] + " reason";
                } else {
                    status = "VIOLATION - No valid reason";
                    violationCount++;
                }
            } else {
                status = "SAFE - Before curfew hours";
            }
            
            System.out.println("Status: " + status);
            System.out.println();
        }
        
        System.out.println("Total Violations: " + violationCount);
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;