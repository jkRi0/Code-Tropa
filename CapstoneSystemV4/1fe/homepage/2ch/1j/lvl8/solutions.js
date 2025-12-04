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
public class TikbalangEscape {
    public static void main(String[] args) {
        // Array of moves and their outcomes
        String[] moves = {"offer gift", "straight", "hide"};
        String[] outcomes = {
            "Tikbalang accepts gift! Safe passage.",
            "You find a hidden path!",
            "You successfully hide from danger!"
        };
        
        System.out.println("Tikbalang Forest Adventure");
        System.out.println("=========================");
        
        // Loop through moves and show outcomes using conditionals
        for (int i = 0; i < moves.length; i++) {
            String move = moves[i];
            System.out.println("Move " + (i + 1) + ": " + move);
            
            // Use conditional to determine outcome
            if (move.equals("straight")) {
                System.out.println("Outcome: " + outcomes[1]);
            } else if (move.equals("offer gift")) {
                System.out.println("Outcome: " + outcomes[0]);
            } else if (move.equals("hide")) {
                System.out.println("Outcome: " + outcomes[2]);
            }
            System.out.println();
        }
        
        System.out.println("=========================");
    }
}`,

    difficult: `
public class TikbalangEscape {
    public static void main(String[] args) {
        // Game state
        int health = 100;
        String[] moves = {"straight", "left", "offer gift"};
        String[] pathHistory = new String[5];
        int moveCount = 0;
        
        System.out.println("Tikbalang Escape Game");
        System.out.println("===================");
        
        // Game loop - process moves using arrays
        for (int i = 0; i < moves.length && health > 0; i++) {
            String move = moves[i];
            pathHistory[moveCount] = move;
            moveCount++;
            
            System.out.println("Health: " + health);
            System.out.print("Path History: [");
            for (int j = 0; j < moveCount; j++) {
                System.out.print(pathHistory[j]);
                if (j < moveCount - 1) System.out.print(", ");
            }
            System.out.println("]");
            System.out.println();
            
            System.out.println("Move " + moveCount + ": " + move);
            
            // Apply move consequences using conditionals
            if (move.equals("straight")) {
                System.out.println("Outcome: Safe path! Health: " + health);
            } else if (move.equals("left") || move.equals("right")) {
                health -= 20;
                System.out.println("Outcome: Wrong turn! Health: " + health);
            } else if (move.equals("offer gift")) {
                System.out.println("Outcome: Tikbalang accepts! You escape!");
                System.out.println("Final Health: " + health);
                break;
            }
            System.out.println();
            
            // Check for game end conditions
            if (health <= 0) {
                System.out.println("Game Over! You were caught by the Tikbalang!");
                break;
            }
        }
        
        System.out.println("===================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;