window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class Main {
    public static void main(String[] args) {
        // Check if student is on time using if-else
        String arrivalTime = "7:05 AM";
        if (arrivalTime.equals("7:05 AM") || arrivalTime.compareTo("7:00 AM") >= 0) {
            System.out.println("Student arrived at " + arrivalTime + " — On time!");
        } else {
            System.out.println("Student arrived at " + arrivalTime + " — Late!");
        }
        
        // Assign to group using switch based on row number
        int rowNumber = 1;
        String group = "";
        switch(rowNumber) {
            case 1:
                group = "A";
                break;
            case 2:
                group = "B";
                break;
            case 3:
                group = "C";
                break;
            default:
                group = "Unknown";
        }
        System.out.println("Assigned to Group " + group);
        
        // Use for loop to seat 12 students in 3 rows, 4 students per row
        for (int row = 1; row <= 3; row++) {
            String currentGroup = "";
            switch(row) {
                case 1:
                    currentGroup = "A";
                    break;
                case 2:
                    currentGroup = "B";
                    break;
                case 3:
                    currentGroup = "C";
                    break;
            }
            if (row > 1) {
                System.out.println();
            }
            System.out.println("Row " + row + " – Group " + currentGroup);
            for (int student = 1; student <= 4; student++) {
                System.out.println("Student " + student + " seated.");
            }
        }
        
        // Use while loop to distribute activity cards
        System.out.println();
        System.out.println("Distributing activity cards...");
        int cardsGiven = 0;
        int totalCards = 5;
        while (cardsGiven < totalCards) {
            cardsGiven++;
            System.out.println("Card " + cardsGiven + " given.");
        }
        System.out.println("All tasks complete. Class is ready!");
    }
}`
};
