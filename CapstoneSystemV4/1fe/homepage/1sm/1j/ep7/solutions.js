window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class Main {
    public static void main(String[] args) {
        // Call the method multiple times with different parameters
        String enemy1 = transformToAswang("Aling Rosa");
        System.out.println(enemy1);
        
        String enemy2 = transformToAswang("Pedro");
        System.out.println(enemy2);
        
        String enemy3 = transformToAswang("Maria");
        System.out.println(enemy3);
    }
    
    // Method that takes a String parameter and returns a String
    public static String transformToAswang(String name) {
        return name + " the Aswang";
    }
}`
};

