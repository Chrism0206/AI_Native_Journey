import json

# Load coffee database
with open('coffee_database.json', 'r', encoding='utf-8') as f:
    coffee_db = json.load(f)

def get_user_input():
    print("Welcome to the Caffeine Compass CLI Recommender!")
    flavor = input("What flavor do you crave? (e.g. chocolate, fruity, nutty, etc.): ").strip().lower()
    feel = input("How do you like your coffee to feel? (light, medium, full): ").strip().lower()
    adventure = input("Pick your adventure (surprise, region, roast): ").strip().lower()
    region = roast = None
    if adventure == "region":
        region = input("Which region? (e.g. Colombia, Ethiopia, Brazil, etc.): ").strip()
    elif adventure == "roast":
        roast = input("Which roast? (light, medium, medium-dark, dark): ").strip().lower()
    return {
        "flavor": flavor,
        "feel": feel,
        "adventure": adventure,
        "region": region,
        "roast": roast
    }

def score_coffee(coffee, prefs):
    score = 0
    # Flavor matching (highest weight)
    if prefs["flavor"] in [f.lower() for f in coffee["flavors"]]:
        score += 40
    # Feel matching (body + acidity)
    if prefs["feel"] == "light":
        if coffee["body"] == "light" and coffee["acidity"] == "high":
            score += 30
        elif coffee["body"] == "light" or coffee["acidity"] == "high":
            score += 15
    elif prefs["feel"] == "medium":
        if coffee["body"] == "medium" and coffee["acidity"] == "medium":
            score += 30
        elif coffee["body"] == "medium" or coffee["acidity"] == "medium":
            score += 15
    elif prefs["feel"] == "full":
        if coffee["body"] == "full" and coffee["acidity"] == "low":
            score += 30
        elif coffee["body"] == "full" or coffee["acidity"] == "low":
            score += 15
    # Adventure matching
    if prefs["adventure"] == "region" and prefs["region"]:
        if coffee["origin"].lower() == prefs["region"].lower():
            score += 20
        else:
            return -1  # Exclude non-matching regions
    elif prefs["adventure"] == "roast" and prefs["roast"]:
        if coffee["roastLevel"].lower() == prefs["roast"]:
            score += 20
    # Add base rating
    score += coffee["rating"] * 2
    return score

def recommend_beans(prefs):
    scored = []
    for coffee in coffee_db:
        s = score_coffee(coffee, prefs)
        if s >= 0:
            scored.append((s, coffee))
    scored.sort(reverse=True, key=lambda x: x[0])
    return [c for _, c in scored[:3]]

if __name__ == "__main__":
    prefs = get_user_input()
    recs = recommend_beans(prefs)
    print("\nTop Recommendations:")
    for i, bean in enumerate(recs, 1):
        print(f"{i}. {bean['name']} ({bean['origin']}) - {bean['description']} [Rating: {bean['rating']}/5]") 