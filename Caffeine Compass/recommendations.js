import { coffeeDatabase } from './database.js';

// Utility: Get user preferences from localStorage
function getUserPreferences() {
    return JSON.parse(localStorage.getItem('userPreferences') || '{}');
}

// Recommendation algorithm (same as script.js)
function getRecommendations(preferences) {
    let scoredCoffees = coffeeDatabase.map(coffee => {
        let score = 0;
        if (coffee.roastLevel === preferences.roastLevel) score += 30;
        else if (isRoastLevelCompatible(coffee.roastLevel, preferences.roastLevel)) score += 15;
        const flavorMatches = (preferences.flavors || []).filter(flavor => coffee.flavors.includes(flavor)).length;
        score += flavorMatches * 20;
        if (coffee.acidity === preferences.acidity) score += 25;
        else if (isAcidityCompatible(coffee.acidity, preferences.acidity)) score += 10;
        if (coffee.body === preferences.body) score += 20;
        else if (isBodyCompatible(coffee.body, preferences.body)) score += 8;
        if (preferences.origin && coffee.origin.toLowerCase() === preferences.origin.toLowerCase()) score += 15;
        score += coffee.rating * 2;
        return { ...coffee, score };
    });
    return scoredCoffees.sort((a, b) => b.score - a.score).slice(0, 3);
}

function isRoastLevelCompatible(coffeeRoast, preferredRoast) {
    const roastLevels = ['light', 'medium', 'medium-dark', 'dark'];
    const coffeeIndex = roastLevels.indexOf(coffeeRoast);
    const preferredIndex = roastLevels.indexOf(preferredRoast);
    return Math.abs(coffeeIndex - preferredIndex) === 1;
}
function isAcidityCompatible(coffeeAcidity, preferredAcidity) {
    const acidityLevels = ['low', 'medium', 'high'];
    const coffeeIndex = acidityLevels.indexOf(coffeeAcidity);
    const preferredIndex = acidityLevels.indexOf(preferredAcidity);
    return Math.abs(coffeeIndex - preferredIndex) === 1;
}
function isBodyCompatible(coffeeBody, preferredBody) {
    const bodyLevels = ['light', 'medium', 'full'];
    const coffeeIndex = bodyLevels.indexOf(coffeeBody);
    const preferredIndex = bodyLevels.indexOf(preferredBody);
    return Math.abs(coffeeIndex - preferredIndex) === 1;
}

// Render recommendations with modern card style
function renderRecommendations(recommendations) {
    const container = document.getElementById('recommendationsContainer');
    container.innerHTML = '';
    if (!recommendations.length) {
        container.innerHTML = '<p class="text-[#8c6f5a]">No recommendations found. Try adjusting your preferences!</p>';
        return;
    }
    recommendations.forEach((coffee, index) => {
        const card = document.createElement('div');
        card.className = 'flex items-stretch justify-between gap-4 rounded-xl bg-[#fbfaf9] p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)] hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] transition-shadow coffee-card';
        card.innerHTML = `
            <div class="flex flex-[2_2_0px] flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <div class="flex items-center gap-2">
                        <span class="bg-[#5b371b] text-[#fbfaf9] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">${index + 1}</span>
                        <p class="text-[#191410] text-base font-bold leading-tight">${coffee.name}</p>
                    </div>
                    <p class="text-[#8c6f5a] text-sm font-normal leading-normal">${coffee.description}</p>
                    <div class="flex flex-wrap gap-2 mt-2">
                        ${coffee.flavors.map(flavor => `<span class="bg-[#5b371b] text-[#fbfaf9] px-2 py-1 rounded-full text-xs font-medium">${flavor}</span>`).join(' ')}
                    </div>
                    <div class="flex items-center gap-2 text-[#f6ad55] font-semibold text-sm">
                        <span>${'★'.repeat(Math.floor(coffee.rating))}${'☆'.repeat(5 - Math.floor(coffee.rating))}</span>
                        <span class="text-[#191410]">${coffee.rating}/5</span>
                    </div>
                </div>
                <a href="details.html?id=${coffee.id}" class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse bg-[#f1ede9] text-[#191410] text-sm font-medium leading-normal w-fit hover:bg-[#e8e0d8] transition-colors">
                    <span class="truncate">View Details</span>
                </a>
            </div>
            <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1" style='background-image: url("${coffee.image}");'></div>
        `;
        container.appendChild(card);
    });
}

// On page load
const preferences = getUserPreferences();
const recommendations = getRecommendations(preferences);
renderRecommendations(recommendations); 