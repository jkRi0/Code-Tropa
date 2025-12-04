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
public class FiestaPoster {
    public static void main(String[] args) {
        // Store slogan in variable
        String slogan = "Mabuhay ang Fiesta ng Bayan";
        
        System.out.println("Fiesta Poster Maker");
        System.out.println("==================");
        
        // Count characters using length() method
        int characterCount = slogan.length();
        
        // Count words by splitting string
        String[] words = slogan.split("\\s+");
        int wordCount = words.length;
        
        System.out.println("Slogan Analysis:");
        System.out.println("================");
        System.out.println("Original: " + slogan);
        System.out.println("Uppercase: " + slogan.toUpperCase());
        System.out.println("Characters: " + characterCount);
        System.out.println("Words: " + wordCount);
        System.out.println("================");
    }
}`,

    difficult: `
public class FiestaPoster {
    public static void main(String[] args) {
        // Array of slogans to process
        String[] slogans = {
            "Mabuhay ang Fiesta ng Bayan",
            "Mabuhay ang Masayang Fiesta!",
            "Fiesta ng Bayan, Pagkakaisa!"
        };
        
        System.out.println("Fiesta Poster Maker");
        System.out.println("==================");
        
        // Loop through slogans and format each
        for (int i = 0; i < slogans.length; i++) {
            String slogan = slogans[i];
            
            // Count characters and words using String methods
            int characterCount = slogan.length();
            String[] words = slogan.split("\\s+");
            int wordCount = words.length;
            
            // Format poster using String methods
            String formattedSlogan = "*** " + slogan.toUpperCase() + " ***";
            
            System.out.println("Slogan " + (i + 1) + ":");
            System.out.println("==================");
            System.out.println(formattedSlogan);
            System.out.println("Characters: " + characterCount + " | Words: " + wordCount);
            System.out.println("==================");
            System.out.println();
        }
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;