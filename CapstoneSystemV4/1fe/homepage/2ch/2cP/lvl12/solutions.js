// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>
#include <string>

int main() {
    // Store 3 consecutive days and their attendance status
    std::string days[3] = {"December 16", "December 17", "December 18"};
    bool attended[3] = {true, false, true};
    
    std::cout << "Simbang Gabi Attendance Tracker" << std::endl;
    std::cout << "===============================" << std::endl;
    
    // Print each day's attendance status using a loop
    for (int i = 0; i < 3; i++) {
        std::string status = attended[i] ? "✅ Attended" : "❌ Missed";
        std::cout << "Day " << (i + 1) << ": " << days[i] << " - " << status << std::endl;
    }
    
    std::cout << "===============================" << std::endl;
    
    return 0;
}`,

    average: `
#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // Attendance data
    std::string days[3] = {"December 16", "December 17", "December 18"};
    bool attended[3] = {true, false, true};
    
    std::cout << "Simbang Gabi Attendance Tracker" << std::endl;
    std::cout << "===============================" << std::endl;
    
    // Display attendance data
    for (int i = 0; i < 3; i++) {
        std::string status = attended[i] ? "✅ Attended" : "❌ Missed";
        std::cout << "Day " << (i + 1) << ": " << days[i] << " - " << status << std::endl;
    }
    
    std::cout << "===============================" << std::endl;
    
    // Count total attended days and calculate completion percentage
    int attendedCount = 0;
    for (int i = 0; i < 3; i++) {
        if (attended[i]) {
            attendedCount++;
        }
    }
    
    int totalDays = 3;
    int missedCount = totalDays - attendedCount;
    double completionPercentage = (double) attendedCount / totalDays * 100;
    
    std::cout << std::endl;
    std::cout << "Attendance Summary:" << std::endl;
    std::cout << "Total Days: " << totalDays << std::endl;
    std::cout << "Attended: " << attendedCount << std::endl;
    std::cout << "Missed: " << missedCount << std::endl;
    std::cout << "Completion: " << std::fixed << std::setprecision(1) << completionPercentage << "%" << std::endl;
    std::cout << "===============================" << std::endl;
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // Extended attendance data
    std::string days[5] = {"December 16", "December 17", "December 18", "December 19", "December 20"};
    bool attended[5] = {true, false, true, true, false};
    
    std::cout << "Simbang Gabi Attendance Tracker" << std::endl;
    std::cout << "===============================" << std::endl;
    
    // Display attendance data
    for (int i = 0; i < 5; i++) {
        std::string status = attended[i] ? "✅ Attended" : "❌ Missed";
        std::cout << "Day " << (i + 1) << ": " << days[i] << " - " << status << std::endl;
    }
    
    std::cout << "===============================" << std::endl;
    
    // Count attendance statistics
    int attendedCount = 0;
    for (int i = 0; i < 5; i++) {
        if (attended[i]) {
            attendedCount++;
        }
    }
    
    int totalDays = 5;
    int missedCount = totalDays - attendedCount;
    double completionPercentage = (double) attendedCount / totalDays * 100;
    
    // Track consecutive attendance streaks
    int currentStreak = 0;
    int longestStreak = 0;
    int tempStreak = 0;
    
    for (int i = 0; i < 5; i++) {
        if (attended[i]) {
            tempStreak++;
            if (i == 4) { // Last day
                currentStreak = tempStreak;
            }
        } else {
            if (tempStreak > longestStreak) {
                longestStreak = tempStreak;
            }
            tempStreak = 0;
            if (i == 4) { // Last day
                currentStreak = 0;
            }
        }
    }
    
    if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
    }
    
    // Provide encouragement message
    std::string encouragement;
    if (completionPercentage >= 80) {
        encouragement = "Excellent! You're almost there!";
    } else if (completionPercentage >= 60) {
        encouragement = "Good progress! Keep going!";
    } else if (completionPercentage >= 40) {
        encouragement = "Keep going! You're doing great!";
    } else {
        encouragement = "Don't give up! Every day counts!";
    }
    
    std::cout << std::endl;
    std::cout << "Detailed Analysis:" << std::endl;
    std::cout << "Total Days: " << totalDays << std::endl;
    std::cout << "Attended: " << attendedCount << std::endl;
    std::cout << "Missed: " << missedCount << std::endl;
    std::cout << "Completion: " << std::fixed << std::setprecision(1) << completionPercentage << "%" << std::endl;
    std::cout << std::endl;
    std::cout << "Streak Analysis:" << std::endl;
    std::cout << "Current Streak: " << currentStreak << " days" << std::endl;
    std::cout << "Longest Streak: " << longestStreak << " days" << std::endl;
    std::cout << "Encouragement: " << encouragement << std::endl;
    std::cout << "===============================" << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;
