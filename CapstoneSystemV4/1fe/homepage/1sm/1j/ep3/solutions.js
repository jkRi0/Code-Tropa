window.tahoSolutions = window.tahoSolutions || {
    easy: `
public class Main {
    public static void main(String[] args) {
        int peanutButter = 85 * 3;
        int vegetables = 40 * 2;
        int totalCost = peanutButter + vegetables;
        int budget = 400;
        boolean withinBudget = totalCost <= budget;
        boolean readyToCook = (withinBudget && totalCost > 0);

        System.out.println("Total Cost: " + totalCost);
        System.out.println("Within Budget: " + withinBudget);
        System.out.println("Ready to Cook: " + readyToCook);
    }
}`
};

