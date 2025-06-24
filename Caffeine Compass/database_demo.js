// Database Demo - Demonstrating the List of Dictionaries Structure
// This file shows how the coffee database uses a list of dictionaries for optimal data organization

import { coffeeDatabase } from './database.js';

// ============================================================================
// DEMONSTRATION: Why List of Dictionaries is Perfect for Coffee Data
// ============================================================================

console.log("🌍 CAFFEINE COMPASS - Database Structure Demo");
console.log("=============================================");

// 1. BASIC STRUCTURE EXAMINATION
console.log("\n📊 1. DATABASE STRUCTURE OVERVIEW");
console.log("----------------------------------");

console.log(`Total coffee types in database: ${coffeeDatabase.length}`);
console.log(`Database type: ${Array.isArray(coffeeDatabase) ? 'List/Array' : 'Other'}`);
console.log(`First coffee type: ${typeof coffeeDatabase[0] === 'object' ? 'Dictionary/Object' : 'Other'}`);

// 2. ACCESSING INDIVIDUAL COFFEE PROPERTIES
console.log("\n☕ 2. ACCESSING COFFEE PROPERTIES");
console.log("---------------------------------");

const firstCoffee = coffeeDatabase[0];
console.log(`Coffee Name: ${firstCoffee.name}`);
console.log(`Origin: ${firstCoffee.origin}`);
console.log(`Roast Level: ${firstCoffee.roastLevel}`);
console.log(`Flavors: ${firstCoffee.flavors.join(', ')}`);
console.log(`Rating: ${firstCoffee.rating}/5`);

// 3. ITERATING THROUGH ALL COFFEES
console.log("\n🔄 3. ITERATING THROUGH ALL COFFEES");
console.log("-----------------------------------");

coffeeDatabase.forEach((coffee, index) => {
    console.log(`${index + 1}. ${coffee.name} (${coffee.origin}) - ${coffee.rating}★`);
});

// 4. FILTERING BY CRITERIA
console.log("\n🔍 4. FILTERING EXAMPLES");
console.log("------------------------");

// Filter by origin
const ethiopianCoffees = coffeeDatabase.filter(coffee => coffee.origin === "Ethiopia");
console.log(`Ethiopian coffees: ${ethiopianCoffees.length} found`);
ethiopianCoffees.forEach(coffee => console.log(`  - ${coffee.name}`));

// Filter by roast level
const lightRoastCoffees = coffeeDatabase.filter(coffee => coffee.roastLevel === "light");
console.log(`\nLight roast coffees: ${lightRoastCoffees.length} found`);
lightRoastCoffees.forEach(coffee => console.log(`  - ${coffee.name} (${coffee.origin})`));

// Filter by flavor
const fruityCoffees = coffeeDatabase.filter(coffee => coffee.flavors.includes("fruity"));
console.log(`\nFruity coffees: ${fruityCoffees.length} found`);
fruityCoffees.forEach(coffee => console.log(`  - ${coffee.name} (${coffee.flavors.join(', ')})`));

// 5. SORTING EXAMPLES
console.log("\n📈 5. SORTING EXAMPLES");
console.log("----------------------");

// Sort by rating (highest first)
const topRatedCoffees = [...coffeeDatabase].sort((a, b) => b.rating - a.rating);
console.log("Top 5 rated coffees:");
topRatedCoffees.slice(0, 5).forEach((coffee, index) => {
    console.log(`  ${index + 1}. ${coffee.name} - ${coffee.rating}★`);
});

// Sort by name alphabetically
const alphabeticalCoffees = [...coffeeDatabase].sort((a, b) => a.name.localeCompare(b.name));
console.log("\nFirst 5 coffees alphabetically:");
alphabeticalCoffees.slice(0, 5).forEach(coffee => {
    console.log(`  - ${coffee.name}`);
});

// 6. SEARCHING AND FINDING
console.log("\n🔎 6. SEARCHING EXAMPLES");
console.log("------------------------");

// Find coffee by ID
const findCoffeeById = (id) => coffeeDatabase.find(coffee => coffee.id === id);
const jamaicanCoffee = findCoffeeById("jamaican-blue-mountain");
console.log(`Found by ID: ${jamaicanCoffee ? jamaicanCoffee.name : 'Not found'}`);

// Find coffees with multiple criteria
const complexSearch = coffeeDatabase.filter(coffee => 
    coffee.acidity === "high" && 
    coffee.body === "medium" && 
    coffee.flavors.includes("fruity")
);
console.log(`\nHigh acidity, medium body, fruity coffees: ${complexSearch.length} found`);
complexSearch.forEach(coffee => console.log(`  - ${coffee.name} (${coffee.origin})`));

// 7. DATA AGGREGATION
console.log("\n📊 7. DATA AGGREGATION");
console.log("----------------------");

// Count by origin
const originCounts = {};
coffeeDatabase.forEach(coffee => {
    originCounts[coffee.origin] = (originCounts[coffee.origin] || 0) + 1;
});
console.log("Coffees by origin:");
Object.entries(originCounts).forEach(([origin, count]) => {
    console.log(`  ${origin}: ${count} coffees`);
});

// Average rating by roast level
const roastLevelRatings = {};
coffeeDatabase.forEach(coffee => {
    if (!roastLevelRatings[coffee.roastLevel]) {
        roastLevelRatings[coffee.roastLevel] = { total: 0, count: 0 };
    }
    roastLevelRatings[coffee.roastLevel].total += coffee.rating;
    roastLevelRatings[coffee.roastLevel].count += 1;
});

console.log("\nAverage rating by roast level:");
Object.entries(roastLevelRatings).forEach(([roast, data]) => {
    const average = (data.total / data.count).toFixed(2);
    console.log(`  ${roast}: ${average}★ (${data.count} coffees)`);
});

// 8. RECOMMENDATION ENGINE DEMO
console.log("\n🎯 8. RECOMMENDATION ENGINE DEMO");
console.log("--------------------------------");

// Simulate user preferences
const userPreferences = {
    roastLevel: "medium",
    flavors: ["chocolate", "fruity"],
    acidity: "medium",
    body: "medium",
    origin: "Kenya"
};

// Simple scoring algorithm
const getRecommendations = (preferences) => {
    return coffeeDatabase.map(coffee => {
        let score = 0;
        
        // Roast level matching
        if (coffee.roastLevel === preferences.roastLevel) score += 30;
        else if (Math.abs(['light', 'medium', 'medium-dark', 'dark'].indexOf(coffee.roastLevel) - 
                          ['light', 'medium', 'medium-dark', 'dark'].indexOf(preferences.roastLevel)) === 1) {
            score += 15;
        }
        
        // Flavor matching
        const flavorMatches = preferences.flavors.filter(flavor => coffee.flavors.includes(flavor)).length;
        score += flavorMatches * 20;
        
        // Acidity matching
        if (coffee.acidity === preferences.acidity) score += 25;
        
        // Body matching
        if (coffee.body === preferences.body) score += 20;
        
        // Origin bonus
        if (coffee.origin === preferences.origin) score += 15;
        
        // Base rating
        score += coffee.rating * 2;
        
        return { ...coffee, score };
    }).sort((a, b) => b.score - a.score).slice(0, 3);
};

const recommendations = getRecommendations(userPreferences);
console.log("Top 3 recommendations for user preferences:");
recommendations.forEach((coffee, index) => {
    console.log(`  ${index + 1}. ${coffee.name} (Score: ${coffee.score})`);
    console.log(`     Origin: ${coffee.origin}, Roast: ${coffee.roastLevel}`);
    console.log(`     Flavors: ${coffee.flavors.join(', ')}`);
});

// 9. SCALABILITY DEMONSTRATION
console.log("\n📈 9. SCALABILITY DEMONSTRATION");
console.log("--------------------------------");

// Show how easy it is to add new coffees
const newCoffee = {
    id: "demo-new-coffee",
    name: "Demo New Coffee",
    origin: "Demo Country",
    roastLevel: "medium",
    flavors: ["chocolate", "caramel"],
    acidity: "medium",
    body: "medium",
    description: "A demonstration coffee showing how easy it is to add new entries.",
    detailedDescription: "This coffee demonstrates the scalability of the list of dictionaries structure.",
    rating: 4.0,
    image: "demo-image-url"
};

console.log("Adding new coffee to database:");
console.log(`  New coffee: ${newCoffee.name}`);
console.log(`  Total coffees after addition: ${coffeeDatabase.length + 1}`);

// 10. ADVANTAGES SUMMARY
console.log("\n✅ 10. WHY LIST OF DICTIONARIES IS PERFECT");
console.log("------------------------------------------");

const advantages = [
    "✅ Structured Data: Each coffee is a complete object with all its properties",
    "✅ Easy Access: Access any property with coffee.propertyName",
    "✅ Flexible Filtering: Filter by any criteria using .filter()",
    "✅ Simple Sorting: Sort by any property using .sort()",
    "✅ Easy Iteration: Loop through all coffees with .forEach()",
    "✅ Scalable: Add new coffees by simply adding objects to the array",
    "✅ Searchable: Find specific coffees using .find() or .filter()",
    "✅ JSON Compatible: Easy to serialize/deserialize for storage",
    "✅ Memory Efficient: Only stores the data you need",
    "✅ Developer Friendly: Intuitive structure that's easy to work with"
];

advantages.forEach(advantage => console.log(advantage));

console.log("\n🎉 Demo completed! The list of dictionaries structure is perfect for coffee data!");
console.log("This structure makes it easy to build features like:");
console.log("  - Smart recommendation engines");
console.log("  - Advanced filtering and search");
console.log("  - Data analysis and insights");
console.log("  - User favorites and preferences");
console.log("  - Coffee comparison tools");

// Export utility functions for use in other parts of the app
export const DatabaseUtils = {
    findCoffeeById: (id) => coffeeDatabase.find(coffee => coffee.id === id),
    getCoffeesByOrigin: (origin) => coffeeDatabase.filter(coffee => coffee.origin === origin),
    getCoffeesByFlavor: (flavor) => coffeeDatabase.filter(coffee => coffee.flavors.includes(flavor)),
    getTopRatedCoffees: (limit = 5) => [...coffeeDatabase].sort((a, b) => b.rating - a.rating).slice(0, limit),
    getCoffeesByRoastLevel: (roastLevel) => coffeeDatabase.filter(coffee => coffee.roastLevel === roastLevel),
    getAllOrigins: () => [...new Set(coffeeDatabase.map(coffee => coffee.origin))].sort(),
    getAllFlavors: () => [...new Set(coffeeDatabase.flatMap(coffee => coffee.flavors))].sort(),
    getAllRoastLevels: () => [...new Set(coffeeDatabase.map(coffee => coffee.roastLevel))].sort()
}; 