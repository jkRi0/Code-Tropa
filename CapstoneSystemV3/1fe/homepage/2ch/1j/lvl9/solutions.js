// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class FiestaPoster {
    public static void main(String[] args) {
        // Original slogan
        String slogan = "Mabuhay ang Fiesta!";
        
        System.out.println("Fiesta Poster Maker");
        System.out.println("==================");
        System.out.println("Original: \"" + slogan + "\"");
        
        // Convert to uppercase and add decorative characters
        String formattedSlogan = "*** " + slogan.toUpperCase() + " ***";
        
        System.out.println("Formatted: ");
        System.out.println("==================");
        System.out.println(formattedSlogan);
        System.out.println("==================");
    }
}`,

    average: `
import java.util.Scanner;

public class FiestaPoster {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Fiesta Poster Maker");
        System.out.println("==================");
        
        // Accept user-input slogan
        System.out.print("Enter slogan: ");
        String slogan = scanner.nextLine();
        
        // Count characters and words
        int characterCount = slogan.length();
        String[] words = slogan.split("\\s+");
        int wordCount = words.length;
        
        System.out.println();
        System.out.println("Slogan Analysis:");
        System.out.println("================");
        System.out.println("Original: " + slogan);
        System.out.println("Uppercase: " + slogan.toUpperCase());
        System.out.println("Characters: " + characterCount);
        System.out.println("Words: " + wordCount);
        System.out.println("================");
        
        scanner.close();
    }
}`,

    difficult: `
import java.util.Scanner;

public class FiestaPoster {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Fiesta Poster Maker");
        System.out.println("==================");
        
        // Accept user-input slogan
        System.out.print("Enter slogan: ");
        String slogan = scanner.nextLine();
        
        // Sanitize slogan (remove offensive words)
        String sanitizedSlogan = sanitizeSlogan(slogan);
        
        // Count characters and words
        int characterCount = sanitizedSlogan.length();
        String[] words = sanitizedSlogan.split("\\s+");
        int wordCount = words.length;
        
        System.out.println();
        System.out.println("Slogan Analysis:");
        System.out.println("================");
        System.out.println("Original: " + slogan);
        System.out.println("Sanitized: " + sanitizedSlogan);
        System.out.println("Characters: " + characterCount + " | Words: " + wordCount);
        
        // Create formatted poster
        System.out.println();
        System.out.println("Formatted Poster:");
        System.out.println("==================");
        String formattedSlogan = "*** " + sanitizedSlogan.toUpperCase() + " ***";
        System.out.println(formattedSlogan);
        System.out.println("==================");
        
        // Auto-suggest better slogans
        System.out.println();
        System.out.println("Suggestions:");
        generateSuggestions(sanitizedSlogan);
        System.out.println("==================");
        
        scanner.close();
    }
    
    // Function to sanitize slogans by removing offensive words
    public static String sanitizeSlogan(String slogan) {
        String[] offensiveWords = {"bad", "ugly", "hate"};
        String sanitized = slogan;
        
        for (String word : offensiveWords) {
            sanitized = sanitized.replaceAll("(?i)" + word, "[FILTERED]");
        }
        
        return sanitized;
    }
    
    // Function to generate slogan suggestions
    public static void generateSuggestions(String slogan) {
        String[] suggestions = {
            "Mabuhay ang Masayang Fiesta!",
            "Fiesta ng Bayan, Pagkakaisa!",
            "Masayang Fiesta, Masayang Bayan!"
        };
        
        for (String suggestion : suggestions) {
            System.out.println("- Consider: \"" + suggestion + "\"");
        }
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;