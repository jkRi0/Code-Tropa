// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class LarongKalyeLeaderboard {
    public static void main(String[] args) {
        // Store 3 player names and scores in arrays
        String[] names = {"Juan", "Maria", "Pedro"};
        int[] scores = {85, 92, 78};
        
        System.out.println("Larong Kalye Leaderboard");
        System.out.println("=======================");
        
        // Print each player's name and score using a loop
        for (int i = 0; i < names.length; i++) {
            System.out.println("Player " + (i + 1) + ": " + names[i] + " - " + scores[i] + " points");
        }
        
        System.out.println("=======================");
    }
}`,

    average: `
public class LarongKalyeLeaderboard {
    public static void main(String[] args) {
        // Player data
        String[] names = {"Juan", "Maria", "Pedro"};
        int[] scores = {85, 92, 78};
        
        System.out.println("Larong Kalye Leaderboard (Sorted)");
        System.out.println("================================");
        
        // Sort by score using bubble sort (highest first)
        for (int i = 0; i < scores.length - 1; i++) {
            for (int j = 0; j < scores.length - 1 - i; j++) {
                if (scores[j] < scores[j + 1]) {
                    // Swap scores
                    int tempScore = scores[j];
                    scores[j] = scores[j + 1];
                    scores[j + 1] = tempScore;
                    
                    // Swap names
                    String tempName = names[j];
                    names[j] = names[j + 1];
                    names[j + 1] = tempName;
                }
            }
        }
        
        // Display ranked leaderboard
        String[] positions = {"1st Place", "2nd Place", "3rd Place"};
        for (int i = 0; i < names.length; i++) {
            System.out.println(positions[i] + ": " + names[i] + " - " + scores[i] + " points");
        }
        
        System.out.println("================================");
    }
}`,

    difficult: `
public class LarongKalyeLeaderboard {
    public static void main(String[] args) {
        // Extended player data with ties
        String[] names = {"Juan", "Maria", "Pedro", "Ana", "Carlos"};
        int[] scores = {85, 92, 78, 85, 70};
        
        System.out.println("Larong Kalye Leaderboard (Complete)");
        System.out.println("==================================");
        
        // Sort by score using bubble sort (highest first)
        for (int i = 0; i < scores.length - 1; i++) {
            for (int j = 0; j < scores.length - 1 - i; j++) {
                if (scores[j] < scores[j + 1]) {
                    // Swap scores
                    int tempScore = scores[j];
                    scores[j] = scores[j + 1];
                    scores[j + 1] = tempScore;
                    
                    // Swap names
                    String tempName = names[j];
                    names[j] = names[j + 1];
                    names[j + 1] = tempName;
                }
            }
        }
        
        System.out.println("Rank  Name    Score");
        System.out.println("----  ----    -----");
        
        // Display formatted leaderboard with tie handling
        int currentRank = 1;
        for (int i = 0; i < names.length; i++) {
            if (i > 0 && scores[i] != scores[i-1]) {
                currentRank = i + 1;
            }
            
            String rankText = getRankText(currentRank);
            String tieNote = (i > 0 && scores[i] == scores[i-1]) ? " (tied with " + names[i-1] + ")" : "";
            
            System.out.println(rankText + "   " + names[i] + "    " + scores[i] + tieNote);
        }
        
        // Calculate and display statistics using loops
        int highest = scores[0];
        int lowest = scores[0];
        int total = 0;
        
        for (int i = 0; i < scores.length; i++) {
            if (scores[i] > highest) {
                highest = scores[i];
            }
            if (scores[i] < lowest) {
                lowest = scores[i];
            }
            total += scores[i];
        }
        
        double average = (double) total / scores.length;
        
        System.out.println();
        System.out.println("Statistics:");
        System.out.println("Highest Score: " + highest);
        System.out.println("Lowest Score: " + lowest);
        System.out.println("Average Score: " + String.format("%.1f", average));
        System.out.println("==================================");
    }
    
    // Method to get rank text
    public static String getRankText(int rank) {
        if (rank == 1) {
            return "1st";
        } else if (rank == 2) {
            return "2nd";
        } else if (rank == 3) {
            return "3rd";
        } else {
            return rank + "th";
        }
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;