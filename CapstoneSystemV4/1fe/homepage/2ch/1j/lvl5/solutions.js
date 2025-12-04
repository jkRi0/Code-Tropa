// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class BayanihanScheduler {
    public static void main(String[] args) {
        System.out.println("Bayanihan Helper Greetings");
        System.out.println("=========================");
        
        // Call greeting function for each helper
        greetHelper("Juan");
        greetHelper("Maria");
        greetHelper("Pedro");
    }
    
    // Function that greets each helper by name
    public static void greetHelper(String name) {
        System.out.println("Hello, " + name + "! Thank you for helping with the move.");
    }
}`,

    average: `
public class BayanihanScheduler {
    public static void main(String[] args) {
        System.out.println("Bayanihan Role Assignment");
        System.out.println("=========================");
        
        // Assign roles for multiple helpers using function with parameters
        assignRole("Juan", 25);
        assignRole("Maria", 45);
        assignRole("Pedro", 30);
    }
    
    // Function that assigns roles based on age using parameters
    public static void assignRole(String name, int age) {
        // Use conditional logic to determine role
        String role = determineRole(age);
        
        System.out.println("Helper: " + name + " (" + age + ")");
        System.out.println("Assigned Role: " + role);
        System.out.println("Status: Role assigned successfully");
        System.out.println();
    }
    
    // Helper function to determine role based on age (returns String)
    public static String determineRole(int age) {
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
}`,

    difficult: `
public class BayanihanScheduler {
    public static void main(String[] args) {
        // Available helpers with their ages stored in arrays
        String[] helpers = {"Juan", "Maria", "Pedro", "Ana", "Carlos"};
        int[] ages = {25, 45, 30, 35, 50};
        
        // Required roles
        String[] requiredRoles = {"Lifter", "Cook", "Driver", "Assistant", "Coordinator"};
        boolean[] roleFilled = new boolean[requiredRoles.length];
        String[] assignedHelpers = new String[requiredRoles.length];
        
        System.out.println("Bayanihan Complete Scheduler");
        System.out.println("===========================");
        
        // Display available helpers using loop
        System.out.print("Available Helpers: ");
        for (int i = 0; i < helpers.length; i++) {
            System.out.print(helpers[i] + "(" + ages[i] + ")");
            if (i < helpers.length - 1) System.out.print(", ");
        }
        System.out.println();
        System.out.println();
        
        // Assign roles using loops and functions
        System.out.println("Role Assignments:");
        for (int i = 0; i < helpers.length; i++) {
            String role = assignAvailableRole(helpers[i], ages[i], requiredRoles, roleFilled, assignedHelpers);
            if (role != null) {
                System.out.println(role + ": " + helpers[i] + " (" + ages[i] + ")");
            }
        }
        
        System.out.println();
        System.out.println("All roles filled successfully!");
        System.out.println("===========================");
    }
    
    // Function to assign an available role to a helper (returns String)
    public static String assignAvailableRole(String name, int age, String[] roles, boolean[] filled, String[] assigned) {
        for (int i = 0; i < roles.length; i++) {
            if (!filled[i] && isEligibleForRole(age, roles[i])) {
                filled[i] = true;
                assigned[i] = name;
                return roles[i];
            }
        }
        return null; // No available role
    }
    
    // Helper function to check if age is eligible for role (returns boolean)
    public static boolean isEligibleForRole(int age, String role) {
        if (role.equals("Lifter")) {
            return age >= 18 && age <= 40;
        } else if (role.equals("Cook")) {
            return age >= 25 && age <= 60;
        } else if (role.equals("Driver")) {
            return age >= 21 && age <= 65;
        } else if (role.equals("Assistant")) {
            return age >= 16 && age <= 70;
        } else if (role.equals("Coordinator")) {
            return age >= 30 && age <= 65;
        } else {
            return false;
        }
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;