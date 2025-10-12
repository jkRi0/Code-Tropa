// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    // Function that returns a welcome message for visitors
    static void DisplayWelcome(string familyName) {
        Console.WriteLine($"Welcome, {familyName}! We're honored by your visit.");
    }
    
    static void Main() {
        Console.WriteLine("Pamamanhikan Welcome Messages");
        Console.WriteLine("============================");
        
        // Call welcome function for different families
        DisplayWelcome("Santos Family");
        DisplayWelcome("Garcia Family");
        DisplayWelcome("Rodriguez Family");
    }
}`,

    average: `
using System;

class Program {
    // Function to assign specific gift tasks to participants
    static void AssignGiftTask(string participantName, string giftType) {
        Console.WriteLine($"Participant: {participantName}");
        Console.WriteLine($"Assigned Gift: {giftType}");
        Console.WriteLine("Status: ✅ Task assigned successfully");
        Console.WriteLine();
    }
    
    // Helper function to determine appropriate gift
    static string DetermineGift(string participantName) {
        switch (participantName.ToLower()) {
            case "juan": return "Flowers";
            case "maria": return "Food";
            case "pedro": return "Jewelry";
            default: return "Traditional Items";
        }
    }
    
    static void Main() {
        Console.WriteLine("Pamamanhikan Gift Assignment");
        Console.WriteLine("===========================");
        
        // Assign gift tasks to participants
        AssignGiftTask("Juan", "Flowers");
        AssignGiftTask("Maria", "Food");
        AssignGiftTask("Pedro", "Jewelry");
    }
}`,

    difficult: `
using System;

class Program {
    // Function to validate all expected gifts are present
    static bool ValidateGifts(string[] requiredGifts, string[] participants) {
        Console.WriteLine("Required Gifts Checklist:");
        
        bool allPresent = true;
        for (int i = 0; i < requiredGifts.Length; i++) {
            string gift = requiredGifts[i];
            string participant = participants[i];
            
            if (!string.IsNullOrEmpty(participant)) {
                Console.WriteLine($"✅ {gift} - Assigned to: {participant}");
            } else {
                Console.WriteLine($"❌ {gift} - NOT ASSIGNED");
                allPresent = false;
            }
        }
        
        return allPresent;
    }
    
    // Function to handle missing gifts
    static void HandleMissingGifts(string[] requiredGifts, string[] participants) {
        Console.WriteLine("Missing Gift Report:");
        for (int i = 0; i < requiredGifts.Length; i++) {
            if (string.IsNullOrEmpty(participants[i])) {
                Console.WriteLine($"⚠️ {requiredGifts[i]} needs to be assigned");
            }
        }
    }
    
    static void Main() {
        // Required gifts for pamamanhikan
        string[] requiredGifts = {"Flowers", "Food", "Jewelry", "Traditional Items"};
        string[] assignedParticipants = {"Juan", "Maria", "Pedro", "Ana"};
        
        Console.WriteLine("Pamamanhikan Gift Validation");
        Console.WriteLine("===========================");
        
        // Validate all gifts are present
        bool allGiftsPresent = ValidateGifts(requiredGifts, assignedParticipants);
        
        if (allGiftsPresent) {
            Console.WriteLine();
            Console.WriteLine("All gifts accounted for!");
            Console.WriteLine("Pamamanhikan is ready to proceed.");
        } else {
            Console.WriteLine();
            Console.WriteLine("⚠️ Some gifts are missing. Please check assignments.");
            HandleMissingGifts(requiredGifts, assignedParticipants);
        }
        
        Console.WriteLine("===========================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
