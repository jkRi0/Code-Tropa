// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class TikbalangEscape {
    public static void main(String[] args) {
        // Create an array of 3 predefined moves
        String[] moves = {"straight", "left", "right"};
        
        System.out.println("Tikbalang Escape Route");
        System.out.println("=====================");
        
        // Use a loop to print a sequence of 3 predefined moves
        for (int i = 0; i < moves.length; i++) {
            System.out.println("Move " + (i + 1) + ": " + moves[i]);
        }
        
        System.out.println("=====================");
    }
}`,

    average: `
import java.util.*;

public class TikbalangEscape {
    public static void main(String[] args) {
        Random random = new Random();
        String[] possibleMoves = {"straight", "offer gift", "hide"};
        
        System.out.println("Tikbalang Forest Adventure");
        System.out.println("=========================");
        
        // Add random choices with different outcomes
        for (int i = 1; i <= 3; i++) {
            int randomIndex = random.nextInt(possibleMoves.length);
            String move = possibleMoves[randomIndex];
            
            System.out.println("Move " + i + ": " + move);
            
            // Show different outcomes for each move
            if (move.equals("straight")) {
                System.out.println("Outcome: You find a hidden path!");
            } else if (move.equals("offer gift")) {
                System.out.println("Outcome: Tikbalang accepts gift! Safe passage.");
            } else if (move.equals("hide")) {
                System.out.println("Outcome: You successfully hide from danger!");
            }
            System.out.println();
        }
        
        System.out.println("=========================");
    }
}`,

    difficult: `
import java.util.*;

public class TikbalangEscape {
    public static void main(String[] args) {
        Random random = new Random();
        Scanner scanner = new Scanner(System.in);
        
        // Game state
        int health = 100;
        ArrayList<String> pathHistory = new ArrayList<>();
        String[] possibleMoves = {"straight", "left", "right", "offer gift", "hide"};
        
        System.out.println("Tikbalang Escape Game");
        System.out.println("===================");
        
        // Game loop - continue until health reaches 0 or escape
        while (health > 0 && pathHistory.size() < 5) {
            System.out.println("Health: " + health);
            System.out.println("Path History: " + pathHistory);
            System.out.println();
            
            // Generate random move
            int randomIndex = random.nextInt(possibleMoves.length);
            String move = possibleMoves[randomIndex];
            
            System.out.println("Move " + (pathHistory.size() + 1) + ": " + move);
            
            // Apply move consequences
            if (move.equals("straight")) {
                System.out.println("Outcome: Safe path! Health: " + health);
            } else if (move.equals("left") || move.equals("right")) {
                health -= 20;
                System.out.println("Outcome: Wrong turn! Health: " + health);
            } else if (move.equals("offer gift")) {
                System.out.println("Outcome: Tikbalang accepts! You escape!");
                System.out.println("Final Health: " + health);
                break;
            } else if (move.equals("hide")) {
                System.out.println("Outcome: Successfully hidden! Health: " + health);
            }
            
            // Add to path history
            pathHistory.add(move);
            System.out.println();
            
            // Check for game end conditions
            if (health <= 0) {
                System.out.println("Game Over! You were caught by the Tikbalang!");
                break;
            }
        }
        
        System.out.println("===================");
        scanner.close();
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;