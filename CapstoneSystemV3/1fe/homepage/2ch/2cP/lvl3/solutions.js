// Use namespace to avoid conflicts
window.tahoSolutions = window.tahoSolutions || {
    easy: `
#include <iostream>

int main() {
    // Fixed items for the fiesta
    int banderitas = 500;
    int lechon = 3000;
    int soundSystem = 2000;
    
    // Calculate total cost
    int totalCost = banderitas + lechon + soundSystem;
    
    // Display budget breakdown
    std::cout << "Fiesta Budget Calculator" << std::endl;
    std::cout << "=======================" << std::endl;
    std::cout << "Banderitas: ₱" << banderitas << std::endl;
    std::cout << "Lechon: ₱" << lechon << std::endl;
    std::cout << "Sound System: ₱" << soundSystem << std::endl;
    std::cout << "=======================" << std::endl;
    std::cout << "Total Cost: ₱" << totalCost << std::endl;
    
    return 0;
}`,

    average: `
#include <iostream>
#include <iomanip>

int main() {
    // Fixed items
    int banderitas = 500;
    int lechon = 3000;
    int soundSystem = 2000;
    
    // Optional items
    int balloons = 300;
    int candles = 200;
    
    // Calculate subtotal
    int subtotal = banderitas + lechon + soundSystem + balloons + candles;
    
    // Apply discount (10% for 5+ items)
    double discount = subtotal * 0.10;
    double finalTotal = subtotal - discount;
    
    // Display detailed budget
    std::cout << "Fiesta Budget Calculator" << std::endl;
    std::cout << "=======================" << std::endl;
    std::cout << "Banderitas: ₱" << banderitas << std::endl;
    std::cout << "Lechon: ₱" << lechon << std::endl;
    std::cout << "Sound System: ₱" << soundSystem << std::endl;
    std::cout << "Balloons: ₱" << balloons << std::endl;
    std::cout << "Candles: ₱" << candles << std::endl;
    std::cout << "Subtotal: ₱" << subtotal << std::endl;
    std::cout << std::fixed << std::setprecision(0);
    std::cout << "Discount (10%): ₱" << discount << std::endl;
    std::cout << "=======================" << std::endl;
    std::cout << "Final Total: ₱" << finalTotal << std::endl;
    
    return 0;
}`,

    difficult: `
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

struct Item {
    std::string name;
    int price;
    
    Item(std::string n, int p) : name(n), price(p) {}
};

int main() {
    // Budget constraint
    int budget = 5000;
    
    // Available items
    std::vector<Item> items = {
        Item("Banderitas", 500),
        Item("Lechon", 3000),
        Item("Sound System", 2000),
        Item("Balloons", 300),
        Item("Candles", 200)
    };
    
    // Sort by price (ascending) for greedy approach
    std::sort(items.begin(), items.end(), [](const Item& a, const Item& b) {
        return a.price < b.price;
    });
    
    // Greedy selection
    std::vector<Item> selectedItems;
    int totalCost = 0;
    
    std::cout << "Fiesta Budget Optimizer (₱" << budget << " Budget)" << std::endl;
    std::cout << "=====================================" << std::endl;
    std::cout << "Available Items:" << std::endl;
    
    for (size_t i = 0; i < items.size(); i++) {
        std::cout << (i + 1) << ". " << items[i].name << " - ₱" << items[i].price << std::endl;
    }
    
    std::cout << std::endl;
    std::cout << "Selected Items:" << std::endl;
    
    for (const Item& item : items) {
        if (totalCost + item.price <= budget) {
            selectedItems.push_back(item);
            totalCost += item.price;
            std::cout << "- " << item.name << ": ₱" << item.price << std::endl;
        }
    }
    
    std::cout << "Total Selected: ₱" << totalCost << std::endl;
    std::cout << "Remaining Budget: ₱" << (budget - totalCost) << std::endl;
    
    return 0;
}`
};

// Export solutions
window.tahoSolutions = tahoSolutions;