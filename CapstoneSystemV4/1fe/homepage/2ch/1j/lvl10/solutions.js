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
import java.util.*;

public class LarongKalyeLeaderboard {
    public static void main(String[] args) {
        // Player data
        String[] names = {"Juan", "Maria", "Pedro"};
        int[] scores = {85, 92, 78};
        
        // Create array of Player objects for sorting
        Player[] players = new Player[names.length];
        for (int i = 0; i < names.length; i++) {
            players[i] = new Player(names[i], scores[i]);
        }
        
        // Sort by score (highest first)
        Arrays.sort(players, (a, b) -> Integer.compare(b.score, a.score));
        
        System.out.println("Larong Kalye Leaderboard (Sorted)");
        System.out.println("================================");
        
        // Display ranked leaderboard
        String[] positions = {"1st Place", "2nd Place", "3rd Place"};
        for (int i = 0; i < players.length; i++) {
            System.out.println(positions[i] + ": " + players[i].name + " - " + players[i].score + " points");
        }
        
        System.out.println("================================");
    }
    
    static class Player {
        String name;
        int score;
        
        Player(String name, int score) {
            this.name = name;
            this.score = score;
        }
    }
}`,

    difficult: `
import java.util.*;

public class LarongKalyeLeaderboard {
    public static void main(String[] args) {
        // Extended player data with ties
        String[] names = {"Juan", "Maria", "Pedro", "Ana", "Carlos"};
        int[] scores = {85, 92, 78, 85, 70};
        
        // Create array of Player objects
        Player[] players = new Player[names.length];
        for (int i = 0; i < names.length; i++) {
            players[i] = new Player(names[i], scores[i]);
        }
        
        // Sort by score (highest first)
        Arrays.sort(players, (a, b) -> Integer.compare(b.score, a.score));
        
        System.out.println("Larong Kalye Leaderboard (Complete)");
        System.out.println("==================================");
        System.out.println("Rank  Name    Score");
        System.out.println("----  ----    -----");
        
        // Display formatted leaderboard with tie handling
        int currentRank = 1;
        for (int i = 0; i < players.length; i++) {
            if (i > 0 && players[i].score != players[i-1].score) {
                currentRank = i + 1;
            }
            
            String rankText = getRankText(currentRank);
            String tieNote = (i > 0 && players[i].score == players[i-1].score) ? " (tied with " + players[i-1].name + ")" : "";
            
            System.out.printf("%-4s  %-6s  %d%s%n", rankText, players[i].name, players[i].score, tieNote);
        }
        
        // Calculate and display statistics
        int highest = Arrays.stream(scores).max().orElse(0);
        int lowest = Arrays.stream(scores).min().orElse(0);
        double average = Arrays.stream(scores).average().orElse(0.0);
        
        System.out.println();
        System.out.println("Statistics:");
        System.out.println("Highest Score: " + highest);
        System.out.println("Lowest Score: " + lowest);
        System.out.println("Average Score: " + average);
        System.out.println("==================================");
    }
    
    static String getRankText(int rank) {
        switch (rank) {
            case 1: return "1st";
            case 2: return "2nd";
            case 3: return "3rd";
            default: return rank + "th";
        }
    }
    
    static class Player {
        String name;
        int score;
        
        Player(String name, int score) {
            this.name = name;
            this.score = score;
        }
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;