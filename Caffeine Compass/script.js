// Import the comprehensive coffee database
import { coffeeDatabase } from './database.js';

// Enhanced Coffee Database Utilities
class CoffeeDatabaseManager {
    constructor(database) {
        this.database = database;
        this.origins = this.getUniqueOrigins();
        this.flavors = this.getUniqueFlavors();
        this.roastLevels = this.getUniqueRoastLevels();
    }

    // Get all unique origins from the database
    getUniqueOrigins() {
        return [...new Set(this.database.map(coffee => coffee.origin))].sort();
    }

    // Get all unique flavors from the database
    getUniqueFlavors() {
        const allFlavors = this.database.flatMap(coffee => coffee.flavors);
        return [...new Set(allFlavors)].sort();
    }

    // Get all unique roast levels from the database
    getUniqueRoastLevels() {
        return [...new Set(this.database.map(coffee => coffee.roastLevel))].sort();
    }

    // Search coffees by multiple criteria
    searchCoffees(criteria = {}) {
        return this.database.filter(coffee => {
            // Origin filter
            if (criteria.origin && coffee.origin !== criteria.origin) {
                return false;
            }
            
            // Roast level filter
            if (criteria.roastLevel && coffee.roastLevel !== criteria.roastLevel) {
                return false;
            }
            
            // Flavor filter
            if (criteria.flavors && criteria.flavors.length > 0) {
                const hasMatchingFlavor = criteria.flavors.some(flavor => 
                    coffee.flavors.includes(flavor)
                );
                if (!hasMatchingFlavor) return false;
            }
            
            // Acidity filter
            if (criteria.acidity && coffee.acidity !== criteria.acidity) {
                return false;
            }
            
            // Body filter
            if (criteria.body && coffee.body !== criteria.body) {
                return false;
            }
            
            // Rating filter
            if (criteria.minRating && coffee.rating < criteria.minRating) {
                return false;
            }
            
            return true;
        });
    }

    // Get coffee by ID
    getCoffeeById(id) {
        return this.database.find(coffee => coffee.id === id);
    }

    // Get coffees by origin
    getCoffeesByOrigin(origin) {
        return this.database.filter(coffee => coffee.origin === origin);
    }

    // Get top rated coffees
    getTopRatedCoffees(limit = 5) {
        return this.database
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }

    // Get coffees with specific flavor profile
    getCoffeesByFlavorProfile(flavorProfile) {
        return this.database.filter(coffee => 
            flavorProfile.every(flavor => coffee.flavors.includes(flavor))
        );
    }
}

// Initialize the database manager
const coffeeManager = new CoffeeDatabaseManager(coffeeDatabase);

// DOM Elements
const heroSection = document.getElementById('heroSection');
const questionnaireSection = document.getElementById('questionnaireSection');
const loadingSection = document.getElementById('loadingSection');
const startQuestionnaireBtn = document.getElementById('startQuestionnaireBtn');
const coffeeForm = document.getElementById('coffeeForm');
const resetBtn = document.getElementById('resetBtn');

// Modal Elements
const recommendationsModal = document.getElementById('recommendationsModal');
const modalResultsContainer = document.getElementById('modalResultsContainer');
const recommendationsLink = document.getElementById('recommendationsLink');
const closeModalBtn = document.getElementById('closeModalBtn');
const homeLink = document.getElementById('homeLink');

// Event Listeners
startQuestionnaireBtn.addEventListener('click', showQuestionnaire);
coffeeForm.addEventListener('submit', handleFormSubmit);
resetBtn.addEventListener('click', resetToHero);

// Modal Event Listeners
recommendationsLink.addEventListener('click', showRecommendationsModal);
closeModalBtn.addEventListener('click', closeModal);
homeLink.addEventListener('click', goToHome);

// Close modal when clicking outside
recommendationsModal.addEventListener('click', function(e) {
    if (e.target === recommendationsModal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !recommendationsModal.classList.contains('hidden')) {
        closeModal();
    }
});

// Show questionnaire section
function showQuestionnaire() {
    heroSection.classList.add('hidden');
    questionnaireSection.classList.remove('hidden');
    questionnaireSection.scrollIntoView({ behavior: 'smooth' });
}

// Go to home section
function goToHome() {
    heroSection.classList.remove('hidden');
    questionnaireSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show recommendations modal
function showRecommendationsModal() {
    // Generate sample recommendations for the modal
    const sampleRecommendations = getSampleRecommendations();
    displayModalResults(sampleRecommendations);
    recommendationsModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close modal
function closeModal() {
    recommendationsModal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Get sample recommendations for modal
function getSampleRecommendations() {
    return coffeeManager.getTopRatedCoffees(3);
}

// Favorites management
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function setFavorites(favs) {
    localStorage.setItem('favorites', JSON.stringify(favs));
}

function isFavorite(id) {
    return getFavorites().includes(id);
}

function toggleFavorite(id) {
    const favorites = getFavorites();
    const index = favorites.indexOf(id);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Removed from favorites');
    } else {
        favorites.push(id);
        showToast('Added to favorites');
    }
    
    setFavorites(favorites);
    
    // Update all favorite buttons
    document.querySelectorAll(`[data-id="${id}"]`).forEach(btn => {
        btn.textContent = isFavorite(id) ? '❤️' : '🤍';
    });
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-[#5b371b] text-[#fbfaf9] px-4 py-2 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

// Display modal results
function displayModalResults(recommendations) {
    modalResultsContainer.innerHTML = '';
    
    if (recommendations.length === 0) {
        modalResultsContainer.innerHTML = `
            <div class="text-center py-8">
                <p class="text-[#8c6f5a] text-lg">No recommendations found. Try adjusting your preferences!</p>
            </div>
        `;
        return;
    }
    
    recommendations.forEach((coffee, index) => {
        const card = createModalCoffeeCard(coffee, index + 1);
        modalResultsContainer.appendChild(card);
    });
    
    // Add event listeners for favorite buttons
    modalResultsContainer.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            toggleFavorite(this.dataset.id);
        });
    });
    
    // Add event listeners for flavor tag buttons
    modalResultsContainer.querySelectorAll('.flavor-tag-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                filterModalByFlavor(btn.dataset.flavor);
            }, 900);
        });
    });
}

function createModalCoffeeCard(coffee, rank) {
    const fav = isFavorite(coffee.id);
    const flavorTags = coffee.flavors.map(flavor => 
        `<button class="bg-[#5b371b] text-[#fbfaf9] px-2 py-1 rounded-full text-xs font-medium flavor-tag-btn" data-flavor="${flavor}">${flavor}</button>`
    ).join(' ');
    return (() => {
        const div = document.createElement('div');
        div.className = 'flex items-stretch justify-between gap-4 rounded-xl bg-[#fbfaf9] p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)] hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] transition-shadow';
        div.innerHTML = `
        <div class="flex flex-[2_2_0px] flex-col gap-4">
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                    <span class="bg-[#5b371b] text-[#fbfaf9] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">${rank}</span>
                    <p class="text-[#191410] text-base font-bold leading-tight">${coffee.name}</p>
                    <button class="favorite-btn ml-2 text-xl" data-id="${coffee.id}" title="Favorite">${fav ? '❤️' : '🤍'}</button>
                </div>
                <p class="text-[#8c6f5a] text-sm font-normal leading-normal">${coffee.description}</p>
                <div class="flex flex-wrap gap-2 mt-2">
                    ${flavorTags}
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
        <div
            class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
            style='background-image: url("${coffee.image}");'
        ></div>
        `;
        return div;
    })();
}

function filterModalByFlavor(flavor) {
    const filtered = coffeeManager.searchCoffees({ flavors: [flavor] });
    displayModalResults(filtered);
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    // Get form data
    const formData = new FormData(coffeeForm);
    const preferences = {
        roastLevel: formData.get('roastLevel'),
        flavors: formData.getAll('flavors'),
        acidity: formData.get('acidity'),
        body: formData.get('body'),
        origin: formData.get('origin')
    };
    // Save preferences to localStorage
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    // Redirect to recommendations page
    window.location.href = 'recommendations.html';
}

// Recommendation algorithm
function getRecommendations(preferences) {
    let scoredCoffees = coffeeDatabase.map(coffee => {
        let score = 0;
        
        // Roast level matching (highest weight)
        if (coffee.roastLevel === preferences.roastLevel) {
            score += 30;
        } else if (isRoastLevelCompatible(coffee.roastLevel, preferences.roastLevel)) {
            score += 15;
        }
        
        // Flavor matching
        const flavorMatches = preferences.flavors.filter(flavor => 
            coffee.flavors.includes(flavor)
        ).length;
        score += flavorMatches * 20;
        
        // Acidity matching
        if (coffee.acidity === preferences.acidity) {
            score += 25;
        } else if (isAcidityCompatible(coffee.acidity, preferences.acidity)) {
            score += 10;
        }
        
        // Body matching
        if (coffee.body === preferences.body) {
            score += 20;
        } else if (isBodyCompatible(coffee.body, preferences.body)) {
            score += 8;
        }
        
        // Origin preference (bonus)
        if (preferences.origin && coffee.origin.toLowerCase() === preferences.origin.toLowerCase()) {
            score += 15;
        }
        
        // Add base rating
        score += coffee.rating * 2;
        
        return { ...coffee, score };
    });
    
    // Sort by score and return top 3
    return scoredCoffees
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
}

// Compatibility functions
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

// Show loading state
function showLoading() {
    questionnaireSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');
    loadingSection.scrollIntoView({ behavior: 'smooth' });
}

// Hide loading state
function hideLoading() {
    loadingSection.classList.add('hidden');
}

// Reset to hero section
function resetToHero() {
    coffeeForm.reset();
    goToHome();
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to flavor options
    const flavorOptions = document.querySelectorAll('.flavor-option');
    flavorOptions.forEach(option => {
        option.addEventListener('change', function() {
            const checkbox = this.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                this.classList.add('bg-[#fbfaf9]', 'border-[#5b371b]');
            } else {
                this.classList.remove('bg-[#fbfaf9]', 'border-[#5b371b]');
            }
        });
    });
    
    // Add smooth scrolling for better UX
    const smoothScrollElements = document.querySelectorAll('a[href^="#"]');
    smoothScrollElements.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Show Recommendations link if user has completed questionnaire before
if (localStorage.getItem('showRecommendationsLink') === 'true') {
    document.getElementById('recommendationsLink').classList.remove('hidden');
} 