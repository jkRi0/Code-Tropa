// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main() {
        // Store 3 consecutive days and their attendance status
        string[] days = {"December 16", "December 17", "December 18"};
        bool[] attended = {true, false, true};
        
        Console.WriteLine("Simbang Gabi Attendance Tracker");
        Console.WriteLine("===============================");
        
        // Print each day's attendance status using a loop
        for (int i = 0; i < days.Length; i++) {
            string status = attended[i] ? "✅ Attended" : "❌ Missed";
            Console.WriteLine($"Day {i + 1}: {days[i]} - {status}");
        }
        
        Console.WriteLine("===============================");
    }
}`,

    average: `
using System;

class Program {
    static void Main() {
        // Attendance data
        string[] days = {"December 16", "December 17", "December 18"};
        bool[] attended = {true, false, true};
        
        Console.WriteLine("Simbang Gabi Attendance Tracker");
        Console.WriteLine("===============================");
        
        // Display attendance data
        for (int i = 0; i < days.Length; i++) {
            string status = attended[i] ? "✅ Attended" : "❌ Missed";
            Console.WriteLine($"Day {i + 1}: {days[i]} - {status}");
        }
        
        Console.WriteLine("===============================");
        
        // Count total attended days and calculate completion percentage
        int attendedCount = 0;
        foreach (bool attendance in attended) {
            if (attendance) {
                attendedCount++;
            }
        }
        
        int totalDays = attended.Length;
        int missedCount = totalDays - attendedCount;
        double completionPercentage = (double) attendedCount / totalDays * 100;
        
        Console.WriteLine();
        Console.WriteLine("Attendance Summary:");
        Console.WriteLine($"Total Days: {totalDays}");
        Console.WriteLine($"Attended: {attendedCount}");
        Console.WriteLine($"Missed: {missedCount}");
        Console.WriteLine($"Completion: {completionPercentage:F1}%");
        Console.WriteLine("===============================");
    }
}`,

    difficult: `
using System;

class Program {
    static void Main() {
        // Extended attendance data
        string[] days = {"December 16", "December 17", "December 18", "December 19", "December 20"};
        bool[] attended = {true, false, true, true, false};
        
        Console.WriteLine("Simbang Gabi Attendance Tracker");
        Console.WriteLine("===============================");
        
        // Display attendance data
        for (int i = 0; i < days.Length; i++) {
            string status = attended[i] ? "✅ Attended" : "❌ Missed";
            Console.WriteLine($"Day {i + 1}: {days[i]} - {status}");
        }
        
        Console.WriteLine("===============================");
        
        // Count attendance statistics
        int attendedCount = 0;
        foreach (bool attendance in attended) {
            if (attendance) {
                attendedCount++;
            }
        }
        
        int totalDays = attended.Length;
        int missedCount = totalDays - attendedCount;
        double completionPercentage = (double) attendedCount / totalDays * 100;
        
        // Track consecutive attendance streaks
        int currentStreak = 0;
        int longestStreak = 0;
        int tempStreak = 0;
        
        for (int i = 0; i < attended.Length; i++) {
            if (attended[i]) {
                tempStreak++;
                if (i == attended.Length - 1) {
                    currentStreak = tempStreak;
                }
            } else {
                if (tempStreak > longestStreak) {
                    longestStreak = tempStreak;
                }
                tempStreak = 0;
                if (i == attended.Length - 1) {
                    currentStreak = 0;
                }
            }
        }
        
        if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
        }
        
        // Provide encouragement message
        string encouragement;
        if (completionPercentage >= 80) {
            encouragement = "Excellent! You're almost there!";
        } else if (completionPercentage >= 60) {
            encouragement = "Good progress! Keep going!";
        } else if (completionPercentage >= 40) {
            encouragement = "Keep going! You're doing great!";
        } else {
            encouragement = "Don't give up! Every day counts!";
        }
        
        Console.WriteLine();
        Console.WriteLine("Detailed Analysis:");
        Console.WriteLine($"Total Days: {totalDays}");
        Console.WriteLine($"Attended: {attendedCount}");
        Console.WriteLine($"Missed: {missedCount}");
        Console.WriteLine($"Completion: {completionPercentage:F1}%");
        Console.WriteLine();
        Console.WriteLine("Streak Analysis:");
        Console.WriteLine($"Current Streak: {currentStreak} days");
        Console.WriteLine($"Longest Streak: {longestStreak} days");
        Console.WriteLine($"Encouragement: {encouragement}");
        Console.WriteLine("===============================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
