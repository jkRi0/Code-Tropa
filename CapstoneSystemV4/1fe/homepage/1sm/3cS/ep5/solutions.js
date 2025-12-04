window.tahoSolutions = window.tahoSolutions || {
    easy: `
using System;

class Program {
    static void Main(string[] args) {
        // String ToUpper() example
        string name = "mArIa";
        Console.WriteLine(name.ToUpper());
        
        // String Length and Substring() example
        string message = "happy birthday maria!";
        if (message.Length > 20) {
            Console.WriteLine("Message too long! Truncating...");
            Console.WriteLine(message.Substring(0, 20) + "...");
        }
        
        // String Replace() example
        string modifiedMessage = message.Replace("birthday", "anniversary");
        Console.WriteLine(modifiedMessage);
        
        // String Contains() example
        if (message.Contains("maria")) {
            Console.WriteLine("Message ready for air!");
        } else {
            Console.WriteLine("Missing recipient name!");
        }
    }
}`
};

