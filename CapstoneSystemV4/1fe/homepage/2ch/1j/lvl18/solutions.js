// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class MissBarangayScoring {
    public static void main(String[] args) {
        // Store 3 contestants and their scores in arrays
        String[] contestants = {"Maria Santos", "Ana Garcia", "Sofia Rodriguez"};
        double[] scores = {85.5, 92.0, 88.5};
        
        System.out.println("Miss Barangay Scoring System");
        System.out.println("===========================");
        
        // Print each contestant's name and score using a loop
        for (int i = 0; i < contestants.length; i++) {
            System.out.println("Contestant " + (i + 1) + ": " + contestants[i] + " - " + scores[i] + " points");
        }
        
        System.out.println("===========================");
    }
}`,

    average: `
public class MissBarangayScoring {
    public static void main(String[] args) {
        // Contestant data
        String[] contestants = {"Maria Santos", "Ana Garcia", "Sofia Rodriguez"};
        double[] scores = {85.5, 92.0, 88.5};
        
        System.out.println("Miss Barangay Scoring System");
        System.out.println("===========================");
        
        // Display contestant data
        for (int i = 0; i < contestants.length; i++) {
            System.out.println("Contestant " + (i + 1) + ": " + contestants[i] + " - " + scores[i] + " points");
        }
        
        System.out.println("===========================");
        
        // Calculate average scores and determine the winner
        double maxScore = 0;
        int winnerIndex = 0;
        
        for (int i = 0; i < scores.length; i++) {
            if (scores[i] > maxScore) {
                maxScore = scores[i];
                winnerIndex = i;
            }
        }
        
        System.out.println();
        System.out.println("Scoring Results:");
        
        // Sort contestants by score (simple bubble sort)
        for (int i = 0; i < contestants.length - 1; i++) {
            for (int j = 0; j < contestants.length - 1 - i; j++) {
                if (scores[j] < scores[j + 1]) {
                    // Swap scores
                    double tempScore = scores[j];
                    scores[j] = scores[j + 1];
                    scores[j + 1] = tempScore;
                    
                    // Swap contestants
                    String tempContestant = contestants[j];
                    contestants[j] = contestants[j + 1];
                    contestants[j + 1] = tempContestant;
                }
            }
        }
        
        // Display rankings
        String[] positions = {"1st Place", "2nd Place", "3rd Place"};
        for (int i = 0; i < contestants.length; i++) {
            System.out.println(positions[i] + ": " + contestants[i] + " (" + scores[i] + " points)");
        }
        
        System.out.println();
        System.out.println("Winner: " + contestants[0] + " - Miss Barangay 2024!");
        System.out.println("===========================");
    }
}`,

    difficult: `
public class MissBarangayScoring {
    public static void main(String[] args) {
        // Contestant data
        String[] contestants = {"Maria Santos", "Ana Garcia", "Sofia Rodriguez"};
        double[] totalScores = {85.5, 92.0, 88.5};
        
        System.out.println("Miss Barangay Scoring System");
        System.out.println("===========================");
        
        // Display contestant data
        for (int i = 0; i < contestants.length; i++) {
            System.out.println("Contestant " + (i + 1) + ": " + contestants[i] + " - " + totalScores[i] + " points");
        }
        
        System.out.println("===========================");
        
        // Implement weighted scoring and generate detailed rankings
        double[] talentScores = {90.0, 95.0, 85.0};
        double[] beautyScores = {80.0, 90.0, 95.0};
        double[] intelligenceScores = {85.0, 90.0, 87.0};
        
        // Calculate weighted scores (talent=40%, beauty=30%, intelligence=30%)
        double[] calculatedScores = new double[contestants.length];
        for (int i = 0; i < contestants.length; i++) {
            calculatedScores[i] = talentScores[i] * 0.40 + beautyScores[i] * 0.30 + intelligenceScores[i] * 0.30;
        }
        
        System.out.println();
        System.out.println("Detailed Scoring Analysis:");
        
        for (int i = 0; i < contestants.length; i++) {
            System.out.println(contestants[i] + ":");
            System.out.println("  Talent: " + talentScores[i] + " (40%) = " + String.format("%.1f", talentScores[i] * 0.40));
            System.out.println("  Beauty: " + beautyScores[i] + " (30%) = " + String.format("%.1f", beautyScores[i] * 0.30));
            System.out.println("  Intelligence: " + intelligenceScores[i] + " (30%) = " + String.format("%.1f", intelligenceScores[i] * 0.30));
            System.out.println("  Total: " + String.format("%.1f", calculatedScores[i]));
            System.out.println();
        }
        
        // Sort contestants by calculated score
        for (int i = 0; i < contestants.length - 1; i++) {
            for (int j = 0; j < contestants.length - 1 - i; j++) {
                if (calculatedScores[j] < calculatedScores[j + 1]) {
                    // Swap calculated scores
                    double tempScore = calculatedScores[j];
                    calculatedScores[j] = calculatedScores[j + 1];
                    calculatedScores[j + 1] = tempScore;
                    
                    // Swap contestants
                    String tempContestant = contestants[j];
                    contestants[j] = contestants[j + 1];
                    contestants[j + 1] = tempContestant;
                    
                    // Swap category scores
                    double tempTalent = talentScores[j];
                    talentScores[j] = talentScores[j + 1];
                    talentScores[j + 1] = tempTalent;
                    
                    double tempBeauty = beautyScores[j];
                    beautyScores[j] = beautyScores[j + 1];
                    beautyScores[j + 1] = tempBeauty;
                    
                    double tempIntelligence = intelligenceScores[j];
                    intelligenceScores[j] = intelligenceScores[j + 1];
                    intelligenceScores[j + 1] = tempIntelligence;
                }
            }
        }
        
        System.out.println("Final Rankings:");
        String[] positions = {"1st Place", "2nd Place", "3rd Place"};
        for (int i = 0; i < contestants.length; i++) {
            System.out.println(positions[i] + ": " + contestants[i] + " (" + String.format("%.1f", calculatedScores[i]) + " points)");
        }
        
        System.out.println();
        System.out.println("Winner: " + contestants[0] + " - Miss Barangay 2024!");
        System.out.println("===========================");
    }
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;