// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class FilipinoNamesAnalyzer {
    public static void main(String[] args) {
        // Store 3 Filipino names and their lengths in arrays
        String[] names = {"Maria", "Jose", "Ana"};
        int[] lengths = {5, 4, 3};
        
        System.out.println("Filipino Names Analyzer");
        System.out.println("======================");
        
        // Print each name and its length using a loop
        for (int i = 0; i < names.length; i++) {
            System.out.println("Name " + (i + 1) + ": " + names[i] + " - " + lengths[i] + " characters");
        }
        
        System.out.println("======================");
    }
}`,

    average: `
public class FilipinoNamesAnalyzer {
    public static void main(String[] args) {
        // Names data
        String[] names = {"Maria", "Jose", "Ana"};
        
        System.out.println("Filipino Names Analyzer");
        System.out.println("======================");
        
        // Analyze each name
        for (int i = 0; i < names.length; i++) {
            String name = names[i];
            int length = name.length();
            
            System.out.println("Name " + (i + 1) + ": " + name + " - " + length + " characters");
            
            // Count vowels and consonants
            int vowelCount = 0;
            int consonantCount = 0;
            String vowels = "";
            String consonants = "";
            
            for (char c : name.toLowerCase().toCharArray()) {
                if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                    vowelCount++;
                    vowels += c + ", ";
                } else if (Character.isLetter(c)) {
                    consonantCount++;
                    consonants += Character.toUpperCase(c) + ", ";
                }
            }
            
            // Remove trailing comma and space
            if (vowels.length() > 0) {
                vowels = vowels.substring(0, vowels.length() - 2);
            }
            if (consonants.length() > 0) {
                consonants = consonants.substring(0, consonants.length() - 2);
            }
            
            System.out.println("  Vowels: " + vowelCount + " (" + vowels + ")");
            System.out.println("  Consonants: " + consonantCount + " (" + consonants + ")");
        }
        
        System.out.println("======================");
    }
}`,

    difficult: `
public class FilipinoNamesAnalyzer {
    public static void main(String[] args) {
        // Names data
        String[] names = {"Maria", "Jose", "Ana"};
        
        System.out.println("Filipino Names Analyzer");
        System.out.println("======================");
        
        // Analyze each name
        for (int i = 0; i < names.length; i++) {
            String name = names[i];
            int length = name.length();
            
            System.out.println("Name " + (i + 1) + ": " + name + " - " + length + " characters");
            
            // Count vowels and consonants
            int vowelCount = 0;
            int consonantCount = 0;
            String vowels = "";
            String consonants = "";
            
            for (char c : name.toLowerCase().toCharArray()) {
                if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                    vowelCount++;
                    vowels += c + ", ";
                } else if (Character.isLetter(c)) {
                    consonantCount++;
                    consonants += Character.toUpperCase(c) + ", ";
                }
            }
            
            // Remove trailing comma and space
            if (vowels.length() > 0) {
                vowels = vowels.substring(0, vowels.length() - 2);
            }
            if (consonants.length() > 0) {
                consonants = consonants.substring(0, consonants.length() - 2);
            }
            
            System.out.println("  Vowels: " + vowelCount + " (" + vowels + ")");
            System.out.println("  Consonants: " + consonantCount + " (" + consonants + ")");
            
            // Identify common Filipino name patterns
            String pattern = identifyPattern(name);
            String culturalSignificance = getCulturalSignificance(name);
            
            System.out.println("  Pattern: " + pattern);
            System.out.println("  Cultural Significance: " + culturalSignificance);
        }
        
        System.out.println("======================");
        
        // Generate name suggestions
        System.out.println();
        System.out.println("Name Suggestions:");
        generateNameSuggestions(names);
        System.out.println("======================");
    }
    
    // Method to identify common Filipino name patterns
    public static String identifyPattern(String name) {
        String lowerName = name.toLowerCase();
        
        if (lowerName.equals("maria") || lowerName.equals("jose")) {
            return "Common Filipino name";
        } else if (name.length() <= 3) {
            return "Short Filipino name";
        } else if (name.length() >= 6) {
            return "Long Filipino name";
        } else {
            return "Standard Filipino name";
        }
    }
    
    // Method to get cultural significance
    public static String getCulturalSignificance(String name) {
        String lowerName = name.toLowerCase();
        
        if (lowerName.equals("maria") || lowerName.equals("jose")) {
            return "High";
        } else if (lowerName.equals("ana") || lowerName.equals("pedro")) {
            return "Medium";
        } else {
            return "Standard";
        }
    }
    
    // Method to generate name suggestions
    public static void generateNameSuggestions(String[] names) {
        String[] suggestions = {"Maria Clara", "Jose Rizal", "Ana Luna"};
        
        for (String suggestion : suggestions) {
            System.out.println("- " + suggestion);
        }
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;