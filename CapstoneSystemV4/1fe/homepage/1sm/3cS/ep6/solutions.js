window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main(string[] args) {
        // Declare arrays to store examinee names and scores
        string[] names = { "Anna", "Ben", "Carlo", "Diana" };
        int[] scores = { 85, 92, 74, 60 };
        
        Console.WriteLine("LTO Exam Results");
        Console.WriteLine("================");
        
        // Display all examinees and results using a loop
        for (int i = 0; i < names.Length; i++) {
            string result = (scores[i] >= 75) ? "PASSED" : "FAILED";
            Console.WriteLine(names[i] + " - " + result);
        }
    }
}`
};

