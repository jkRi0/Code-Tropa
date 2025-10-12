// C# Level 3 Solutions - Template
const tahoSolutions = {
    easy: `
using System;

class Program {
    static void Main() {
        Console.WriteLine("C# Level 3 Easy Solution");
    }
}`,

    average: `
using System;

class Program {
    static void Main() {
        string message = "C# Level 3 Average Solution";
        Console.WriteLine(message);
    }
}`,

    difficult: `
using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        List<int> numbers = new List<int> {1, 2, 3, 4, 5};
        Console.WriteLine("C# Level 3 Difficult Solution");
    }
}`
};

window.tahoSolutions = tahoSolutions;
