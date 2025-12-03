window.tahoSolutions = window.tahoSolutions || {
    easy: `
class Person {
    String name;
    int age;
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
public class Main {
    public static void main(String[] args) {
        Person p = new Person("Axle", 18);
        System.out.println(p.name + ", " + p.age);
    }
}`
};

