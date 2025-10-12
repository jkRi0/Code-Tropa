// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class SimbangGabiChecker {
    public static void main(String[] args) {
        // Store 3 consecutive days and their attendance status
        String[] days = {"December 16", "December 17", "December 18"};
        boolean[] attended = {true, false, true};
        
        System.out.println("Simbang Gabi Attendance Tracker");
        System.out.println("===============================");
        
        // Print each day's attendance status using a loop
        for (int i = 0; i < days.length; i++) {
            String status = attended[i] ? "✅ Attended" : "❌ Missed";
            System.out.println("Day " + (i + 1) + ": " + days[i] + " - " + status);
        }
        
        System.out.println("===============================");
    }
}`,

    average: `
public class SimbangGabiChecker {
    public static void main(String[] args) {
        // Attendance data
        String[] days = {"December 16", "December 17", "December 18"};
        boolean[] attended = {true, false, true};
        
        System.out.println("Simbang Gabi Attendance Tracker");
        System.out.println("===============================");
        
        // Display attendance data
        for (int i = 0; i < days.length; i++) {
            String status = attended[i] ? "✅ Attended" : "❌ Missed";
            System.out.println("Day " + (i + 1) + ": " + days[i] + " - " + status);
        }
        
        System.out.println("===============================");
        
        // Count total attended days and calculate completion percentage
        int attendedCount = 0;
        for (boolean attendance : attended) {
            if (attendance) {
                attendedCount++;
            }
        }
        
        int totalDays = attended.length;
        int missedCount = totalDays - attendedCount;
        double completionPercentage = (double) attendedCount / totalDays * 100;
        
        System.out.println();
        System.out.println("Attendance Summary:");
        System.out.println("Total Days: " + totalDays);
        System.out.println("Attended: " + attendedCount);
        System.out.println("Missed: " + missedCount);
        System.out.println("Completion: " + String.format("%.1f", completionPercentage) + "%");
        System.out.println("===============================");
    }
}`,

    difficult: `
public class SimbangGabiChecker {
    public static void main(String[] args) {
        // Extended attendance data
        String[] days = {"December 16", "December 17", "December 18", "December 19", "December 20"};
        boolean[] attended = {true, false, true, true, false};
        
        System.out.println("Simbang Gabi Attendance Tracker");
        System.out.println("===============================");
        
        // Display attendance data
        for (int i = 0; i < days.length; i++) {
            String status = attended[i] ? "✅ Attended" : "❌ Missed";
            System.out.println("Day " + (i + 1) + ": " + days[i] + " - " + status);
        }
        
        System.out.println("===============================");
        
        // Count attendance statistics
        int attendedCount = 0;
        for (boolean attendance : attended) {
            if (attendance) {
                attendedCount++;
            }
        }
        
        int totalDays = attended.length;
        int missedCount = totalDays - attendedCount;
        double completionPercentage = (double) attendedCount / totalDays * 100;
        
        // Track consecutive attendance streaks
        int currentStreak = 0;
        int longestStreak = 0;
        int tempStreak = 0;
        
        for (int i = 0; i < attended.length; i++) {
            if (attended[i]) {
                tempStreak++;
                if (i == attended.length - 1) {
                    currentStreak = tempStreak;
                }
            } else {
                if (tempStreak > longestStreak) {
                    longestStreak = tempStreak;
                }
                tempStreak = 0;
                if (i == attended.length - 1) {
                    currentStreak = 0;
                }
            }
        }
        
        if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
        }
        
        // Provide encouragement message
        String encouragement;
        if (completionPercentage >= 80) {
            encouragement = "Excellent! You're almost there!";
        } else if (completionPercentage >= 60) {
            encouragement = "Good progress! Keep going!";
        } else if (completionPercentage >= 40) {
            encouragement = "Keep going! You're doing great!";
        } else {
            encouragement = "Don't give up! Every day counts!";
        }
        
        System.out.println();
        System.out.println("Detailed Analysis:");
        System.out.println("Total Days: " + totalDays);
        System.out.println("Attended: " + attendedCount);
        System.out.println("Missed: " + missedCount);
        System.out.println("Completion: " + String.format("%.1f", completionPercentage) + "%");
        System.out.println();
        System.out.println("Streak Analysis:");
        System.out.println("Current Streak: " + currentStreak + " days");
        System.out.println("Longest Streak: " + longestStreak + " days");
        System.out.println("Encouragement: " + encouragement);
        System.out.println("===============================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;