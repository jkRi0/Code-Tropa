// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class PamamanhikanPlanner {
    public static void main(String[] args) {
        System.out.println("Pamamanhikan Welcome Messages");
        System.out.println("============================");
        
        // Call welcome function for different families
        displayWelcome("Santos Family");
        displayWelcome("Garcia Family");
        displayWelcome("Rodriguez Family");
    }
    
    // Function that returns a welcome message for visitors
    public static void displayWelcome(String familyName) {
        System.out.println("Welcome, " + familyName + "! We're honored by your visit.");
    }
}`,

    average: `
public class PamamanhikanPlanner {
    public static void main(String[] args) {
        System.out.println("Pamamanhikan Gift Assignment");
        System.out.println("===========================");
        
        // Assign gift tasks to participants
        assignGiftTask("Juan", "Flowers");
        assignGiftTask("Maria", "Food");
        assignGiftTask("Pedro", "Jewelry");
    }
    
    // Function to assign specific gift tasks to participants
    public static void assignGiftTask(String participantName, String giftType) {
        System.out.println("Participant: " + participantName);
        System.out.println("Assigned Gift: " + giftType);
        System.out.println("Status: Task assigned successfully");
        System.out.println();
    }
    
    // Helper function to determine appropriate gift
    public static String determineGift(String participantName) {
        switch (participantName.toLowerCase()) {
            case "juan": return "Flowers";
            case "maria": return "Food";
            case "pedro": return "Jewelry";
            default: return "Traditional Items";
        }
    }
}`,

    difficult: `
public class PamamanhikanPlanner {
    public static void main(String[] args) {
        // Required gifts for pamamanhikan stored in arrays
        String[] requiredGifts = {"Flowers", "Food", "Jewelry", "Traditional Items"};
        String[] assignedParticipants = {"Juan", "Maria", "Pedro", "Ana"};
        
        System.out.println("Pamamanhikan Gift Validation");
        System.out.println("===========================");
        
        // Validate all gifts are present using function with return value
        boolean allGiftsPresent = validateGifts(requiredGifts, assignedParticipants);
        
        System.out.println();
        if (allGiftsPresent) {
            System.out.println("All gifts accounted for!");
            System.out.println("Pamamanhikan is ready to proceed.");
        } else {
            System.out.println("ALERT: Some gifts are missing. Please check assignments.");
        }
        
        System.out.println("===========================");
    }
    
    // Function to validate all expected gifts are present (returns boolean)
    public static boolean validateGifts(String[] requiredGifts, String[] participants) {
        System.out.println("Required Gifts Checklist:");
        
        boolean allPresent = true;
        // Loop through gifts to check assignments
        for (int i = 0; i < requiredGifts.length; i++) {
            String gift = requiredGifts[i];
            String participant = participants[i];
            
            // Check if participant is assigned using string comparison
            if (participant != null && !participant.isEmpty()) {
                System.out.println(gift + " - Assigned to: " + participant);
            } else {
                System.out.println(gift + " - NOT ASSIGNED");
                allPresent = false;
            }
        }
        
        return allPresent;
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;