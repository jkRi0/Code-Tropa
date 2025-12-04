window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    // Method without return value (void)
    static void HilotTreatment(string symptom) {
        if (symptom == "headache") {
            Console.WriteLine("Applying coconut oil on temples...");
        } else if (symptom == "back pain") {
            Console.WriteLine("Massaging back with warm oil...");
        } else {
            Console.WriteLine("General relaxation massage applied.");
        }
    }
    
    // Method with return value (bool)
    static bool CheckTreatmentSuccess(string symptom) {
        if (symptom == "headache" || symptom == "back pain") {
            return true; // successful
        } else {
            return false; // general treatment
        }
    }
    
    static void Main(string[] args) {
        // Call void method with parameter
        HilotTreatment("headache");
        
        // Call method with return value
        bool success = CheckTreatmentSuccess("headache");
        if (success) {
            Console.WriteLine("Treatment completed successfully!");
        }
    }
}`
};

