// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class PalarongBarangay {
    public static void main(String[] args) {
        // Store 3 barangay teams and their medal counts in arrays
        String[] teams = {"Barangay San Jose", "Barangay Santa Maria", "Barangay San Pedro"};
        int[] medals = {5, 7, 4};
        
        System.out.println("Palarong Barangay Medal Tally");
        System.out.println("============================");
        
        // Print each team's name and medal count using a loop
        for (int i = 0; i < teams.length; i++) {
            System.out.println("Team " + (i + 1) + ": " + teams[i] + " - " + medals[i] + " medals");
        }
        
        System.out.println("============================");
    }
}`,

    average: `
public class PalarongBarangay {
    public static void main(String[] args) {
        // Team data
        String[] teams = {"Barangay San Jose", "Barangay Santa Maria", "Barangay San Pedro"};
        int[] medals = {5, 7, 4};
        
        System.out.println("Palarong Barangay Medal Tally");
        System.out.println("============================");
        
        // Display team data
        for (int i = 0; i < teams.length; i++) {
            System.out.println("Team " + (i + 1) + ": " + teams[i] + " - " + medals[i] + " medals");
        }
        
        System.out.println("============================");
        
        // Calculate total medals and determine the winning team
        int maxMedals = 0;
        int winningTeamIndex = 0;
        
        for (int i = 0; i < medals.length; i++) {
            if (medals[i] > maxMedals) {
                maxMedals = medals[i];
                winningTeamIndex = i;
            }
        }
        
        System.out.println();
        System.out.println("Medal Standings:");
        
        // Sort teams by medal count (simple bubble sort)
        for (int i = 0; i < teams.length - 1; i++) {
            for (int j = 0; j < teams.length - 1 - i; j++) {
                if (medals[j] < medals[j + 1]) {
                    // Swap medals
                    int tempMedals = medals[j];
                    medals[j] = medals[j + 1];
                    medals[j + 1] = tempMedals;
                    
                    // Swap teams
                    String tempTeam = teams[j];
                    teams[j] = teams[j + 1];
                    teams[j + 1] = tempTeam;
                }
            }
        }
        
        // Display standings
        String[] positions = {"1st Place", "2nd Place", "3rd Place"};
        for (int i = 0; i < teams.length; i++) {
            System.out.println(positions[i] + ": " + teams[i] + " (" + medals[i] + " medals)");
        }
        
        System.out.println("============================");
    }
}`,

    difficult: `
public class PalarongBarangay {
    public static void main(String[] args) {
        // Team data
        String[] teams = {"Barangay San Jose", "Barangay Santa Maria", "Barangay San Pedro"};
        int[] totalMedals = {5, 7, 4};
        
        System.out.println("Palarong Barangay Medal Tally");
        System.out.println("============================");
        
        // Display team data
        for (int i = 0; i < teams.length; i++) {
            System.out.println("Team " + (i + 1) + ": " + teams[i] + " - " + totalMedals[i] + " medals");
        }
        
        System.out.println("============================");
        
        // Track different medal types and generate detailed standings
        int[] goldMedals = {2, 3, 1};
        int[] silverMedals = {2, 1, 3};
        int[] bronzeMedals = {1, 3, 0};
        
        // Calculate weighted scores (gold=3, silver=2, bronze=1)
        int[] scores = new int[teams.length];
        for (int i = 0; i < teams.length; i++) {
            scores[i] = goldMedals[i] * 3 + silverMedals[i] * 2 + bronzeMedals[i] * 1;
        }
        
        System.out.println();
        System.out.println("Detailed Medal Analysis:");
        
        for (int i = 0; i < teams.length; i++) {
            System.out.println(teams[i] + ": " + goldMedals[i] + " Gold, " + 
                             silverMedals[i] + " Silver, " + bronzeMedals[i] + 
                             " Bronze (Score: " + scores[i] + ")");
        }
        
        // Sort teams by weighted score
        for (int i = 0; i < teams.length - 1; i++) {
            for (int j = 0; j < teams.length - 1 - i; j++) {
                if (scores[j] < scores[j + 1]) {
                    // Swap scores
                    int tempScore = scores[j];
                    scores[j] = scores[j + 1];
                    scores[j + 1] = tempScore;
                    
                    // Swap teams
                    String tempTeam = teams[j];
                    teams[j] = teams[j + 1];
                    teams[j + 1] = tempTeam;
                    
                    // Swap medal counts
                    int tempGold = goldMedals[j];
                    goldMedals[j] = goldMedals[j + 1];
                    goldMedals[j + 1] = tempGold;
                    
                    int tempSilver = silverMedals[j];
                    silverMedals[j] = silverMedals[j + 1];
                    silverMedals[j + 1] = tempSilver;
                    
                    int tempBronze = bronzeMedals[j];
                    bronzeMedals[j] = bronzeMedals[j + 1];
                    bronzeMedals[j + 1] = tempBronze;
                }
            }
        }
        
        System.out.println();
        System.out.println("Final Standings:");
        String[] positions = {"1st Place", "2nd Place", "3rd Place"};
        for (int i = 0; i < teams.length; i++) {
            System.out.println(positions[i] + ": " + teams[i] + " (Score: " + scores[i] + ")");
        }
        
        System.out.println("============================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;