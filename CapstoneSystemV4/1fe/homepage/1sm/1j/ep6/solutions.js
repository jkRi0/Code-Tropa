window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class FiestaGame {
    public static void main(String[] args) {
        // Declare arrays to store player names and scores
        String[] players = {"Liza", "Marco", "Jenny"};
        int[] scores = {3, 5, 2};
        
        System.out.println("Fiesta Game Scores");
        System.out.println("==================");
        
        // Access array elements using index
        System.out.println("Turn ni: " + players[1]); // Index 1 = "Marco"
        System.out.println("Score ni Jenny: " + scores[2]); // Index 2 = 2
        
        // Display all players and scores using a loop
        System.out.println("All Players:");
        for (int i = 0; i < players.length; i++) {
            System.out.println(players[i] + ": " + scores[i]);
        }
    }
}`
};

