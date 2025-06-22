// Coffee Database - Comprehensive list of coffee beans with their characteristics
const coffeeDatabase = [
    {
        name: "Ethiopian Yirgacheffe",
        origin: "Ethiopia",
        roastLevel: "light",
        flavors: ["fruity", "floral", "citrus"],
        acidity: "high",
        body: "light",
        description: "A bright, complex coffee with distinctive floral and citrus notes. Known for its wine-like acidity and tea-like body.",
        rating: 4.8,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATb2XZqaCzBdZYzddT0Wn9qvJzyScjrmamX4AhUbtnPpd3lq9pYhxEtBwwdC98QAKC3SvGErncbYN8ukk16ilwv3YSlTxC5QO2zi4W4W2u8NXAwIZP7vjHnBBvShYo-zffLpHPfsmWiEXf1F6Odp6bArjW5UZZJWgqql4v_e3MlCJKqdxAz30pFsI3KsaEceh1yIjeY8EoF9TJuGx_BrU_aSaXkfQjuQRzfK6B-i4YVSpiAZdjSW9BKe0I5Wx9NzYaSGbTKyYuGaM"
    },
    {
        name: "Colombian Supremo",
        origin: "Colombia",
        roastLevel: "medium",
        flavors: ["chocolate", "nutty", "caramel"],
        acidity: "medium",
        body: "medium",
        description: "A well-balanced coffee with smooth chocolate notes, subtle nuttiness, and a hint of caramel sweetness.",
        rating: 4.6,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-MGGI9tENcxedPjSbrZwfxS4hnODLieEn42JJxV9dcVZry1HAFvZpl6Z-bn9bAFIp9I2mNDw1trpf3gJfZzUl_ICZSXeN4ghKCHJ8Q1kMc-NZ7xz98UXHrcooNfKlJtHgPv7A68kVaHbmnsu1NmzK0Xa2ePnMfPHeF-WiYSEd8BafBuRUIh23ZcBM4UAPA8WDSclOSoSLP8PE4AxGk7_dw8WKdKpO-UmFfIy-S0W989YP0a8Row8y8cM1MN_62EY4mlF_E3LTnxA"
    },
    {
        name: "Brazilian Santos",
        origin: "Brazil",
        roastLevel: "medium-dark",
        flavors: ["nutty", "chocolate", "earthy"],
        acidity: "low",
        body: "full",
        description: "A smooth, low-acid coffee with rich nutty flavors and a full body. Perfect for those who prefer milder acidity.",
        rating: 4.4,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwMn5B2Iqf65mRknqg9JXtn5Nb-dDP5nqQOsPuJSlnTdBNUijzVJb8gVLNR1TXnnuoFiTN-kW22VGK88W9onRAjm5vtYvt7ukK6-7UDgrGVArCCcrMZSHOK4uFaa-jx129e1vk2d6P0FUmNBsNmvxkuZUH3azLKHweP1eLmx0QkSzEy1rw2LzxTQ3IAZCJrAHUYFEMCF5JoIixeOtNOp8ZAkPn8ZlvFlZLKz8RuOC6r2uTyJ_bDKal7d4_6cVDX4uJihIUa3gQMow"
    },
    {
        name: "Guatemalan Antigua",
        origin: "Guatemala",
        roastLevel: "medium",
        flavors: ["chocolate", "spicy", "earthy"],
        acidity: "medium",
        body: "full",
        description: "A full-bodied coffee with rich chocolate notes, subtle spice, and a smooth finish with medium acidity.",
        rating: 4.7,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATb2XZqaCzBdZYzddT0Wn9qvJzyScjrmamX4AhUbtnPpd3lq9pYhxEtBwwdC98QAKC3SvGErncbYN8ukk16ilwv3YSlTxC5QO2zi4W4W2u8NXAwIZP7vjHnBBvShYo-zffLpHPfsmWiEXf1F6Odp6bArjW5UZZJWgqql4v_e3MlCJKqdxAz30pFsI3KsaEceh1yIjeY8EoF9TJuGx_BrU_aSaXkfQjuQRzfK6B-i4YVSpiAZdjSW9BKe0I5Wx9NzYaSGbTKyYuGaM"
    },
    {
        name: "Costa Rican Tarrazu",
        origin: "Costa Rica",
        roastLevel: "medium",
        flavors: ["fruity", "chocolate", "citrus"],
        acidity: "high",
        body: "medium",
        description: "A bright, clean coffee with vibrant fruit notes, balanced chocolate undertones, and crisp citrus acidity.",
        rating: 4.5,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-MGGI9tENcxedPjSbrZwfxS4hnODLieEn42JJxV9dcVZry1HAFvZpl6Z-bn9bAFIp9I2mNDw1trpf3gJfZzUl_ICZSXeN4ghKCHJ8Q1kMc-NZ7xz98UXHrcooNfKlJtHgPv7A68kVaHbmnsu1NmzK0Xa2ePnMfPHeF-WiYSEd8BafBuRUIh23ZcBM4UAPA8WDSclOSoSLP8PE4AxGk7_dw8WKdKpO-UmFfIy-S0W989YP0a8Row8y8cM1MN_62EY4mlF_E3LTnxA"
    },
    {
        name: "Kenyan AA",
        origin: "Kenya",
        roastLevel: "medium",
        flavors: ["fruity", "citrus", "spicy"],
        acidity: "high",
        body: "medium",
        description: "A bold, bright coffee with intense berry flavors, zesty citrus notes, and a distinctive spicy finish.",
        rating: 4.8,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwMn5B2Iqf65mRknqg9JXtn5Nb-dDP5nqQOsPuJSlnTdBNUijzVJb8gVLNR1TXnnuoFiTN-kW22VGK88W9onRAjm5vtYvt7ukK6-7UDgrGVArCCcrMZSHOK4uFaa-jx129e1vk2d6P0FUmNBsNmvxkuZUH3azLKHweP1eLmx0QkSzEy1rw2LzxTQ3IAZCJrAHUYFEMCF5JoIixeOtNOp8ZAkPn8ZlvFlZLKz8RuOC6r2uTyJ_bDKal7d4_6cVDX4uJihIUa3gQMow"
    },
    {
        name: "Sumatra Mandheling",
        origin: "Sumatra",
        roastLevel: "dark",
        flavors: ["earthy", "spicy", "chocolate"],
        acidity: "low",
        body: "full",
        description: "A full-bodied, low-acid coffee with deep earthy notes, rich chocolate undertones, and a spicy complexity.",
        rating: 4.3,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATb2XZqaCzBdZYzddT0Wn9qvJzyScjrmamX4AhUbtnPpd3lq9pYhxEtBwwdC98QAKC3SvGErncbYN8ukk16ilwv3YSlTxC5QO2zi4W4W2u8NXAwIZP7vjHnBBvShYo-zffLpHPfsmWiEXf1F6Odp6bArjW5UZZJWgqql4v_e3MlCJKqdxAz30pFsI3KsaEceh1yIjeY8EoF9TJuGx_BrU_aSaXkfQjuQRzfK6B-i4YVSpiAZdjSW9BKe0I5Wx9NzYaSGbTKyYuGaM"
    },
    {
        name: "Jamaican Blue Mountain",
        origin: "Jamaica",
        roastLevel: "medium",
        flavors: ["chocolate", "nutty", "floral"],
        acidity: "medium",
        body: "medium",
        description: "A smooth, mild coffee with balanced chocolate and nutty flavors, subtle floral notes, and a clean finish.",
        rating: 4.9,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-MGGI9tENcxedPjSbrZwfxS4hnODLieEn42JJxV9dcVZry1HAFvZpl6Z-bn9bAFIp9I2mNDw1trpf3gJfZzUl_ICZSXeN4ghKCHJ8Q1kMc-NZ7xz98UXHrcooNfKlJtHgPv7A68kVaHbmnsu1NmzK0Xa2ePnMfPHeF-WiYSEd8BafBuRUIh23ZcBM4UAPA8WDSclOSoSLP8PE4AxGk7_dw8WKdKpO-UmFfIy-S0W989YP0a8Row8y8cM1MN_62EY4mlF_E3LTnxA"
    },
    {
        name: "Peruvian Organic",
        origin: "Peru",
        roastLevel: "medium",
        flavors: ["nutty", "chocolate", "caramel"],
        acidity: "medium",
        body: "medium",
        description: "A well-rounded organic coffee with smooth nutty flavors, rich chocolate notes, and a hint of caramel sweetness.",
        rating: 4.4,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwMn5B2Iqf65mRknqg9JXtn5Nb-dDP5nqQOsPuJSlnTdBNUijzVJb8gVLNR1TXnnuoFiTN-kW22VGK88W9onRAjm5vtYvt7ukK6-7UDgrGVArCCcrMZSHOK4uFaa-jx129e1vk2d6P0FUmNBsNmvxkuZUH3azLKHweP1eLmx0QkSzEy1rw2LzxTQ3IAZCJrAHUYFEMCF5JoIixeOtNOp8ZAkPn8ZlvFlZLKz8RuOC6r2uTyJ_bDKal7d4_6cVDX4uJihIUa3gQMow"
    },
    {
        name: "Honduran Marcala",
        origin: "Honduras",
        roastLevel: "medium-dark",
        flavors: ["chocolate", "caramel", "nutty"],
        acidity: "low",
        body: "full",
        description: "A full-bodied coffee with rich chocolate and caramel notes, smooth nuttiness, and a low-acid profile.",
        rating: 4.2,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATb2XZqaCzBdZYzddT0Wn9qvJzyScjrmamX4AhUbtnPpd3lq9pYhxEtBwwdC98QAKC3SvGErncbYN8ukk16ilwv3YSlTxC5QO2zi4W4W2u8NXAwIZP7vjHnBBvShYo-zffLpHPfsmWiEXf1F6Odp6bArjW5UZZJWgqql4v_e3MlCJKqdxAz30pFsI3KsaEceh1yIjeY8EoF9TJuGx_BrU_aSaXkfQjuQRzfK6B-i4YVSpiAZdjSW9BKe0I5Wx9NzYaSGbTKyYuGaM"
    },
    {
        name: "Nicaraguan Jinotega",
        origin: "Nicaragua",
        roastLevel: "medium",
        flavors: ["chocolate", "fruity", "caramel"],
        acidity: "medium",
        body: "medium",
        description: "A balanced coffee with smooth chocolate notes, subtle fruit undertones, and a hint of caramel sweetness.",
        rating: 4.3,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-MGGI9tENcxedPjSbrZwfxS4hnODLieEn42JJxV9dcVZry1HAFvZpl6Z-bn9bAFIp9I2mNDw1trpf3gJfZzUl_ICZSXeN4ghKCHJ8Q1kMc-NZ7xz98UXHrcooNfKlJtHgPv7A68kVaHbmnsu1NmzK0Xa2ePnMfPHeF-WiYSEd8BafBuRUIh23ZcBM4UAPA8WDSclOSoSLP8PE4AxGk7_dw8WKdKpO-UmFfIy-S0W989YP0a8Row8y8cM1MN_62EY4mlF_E3LTnxA"
    },
    {
        name: "Mexican Chiapas",
        origin: "Mexico",
        roastLevel: "medium-dark",
        flavors: ["chocolate", "nutty", "earthy"],
        acidity: "low",
        body: "full",
        description: "A full-bodied coffee with rich chocolate notes, smooth nuttiness, and earthy undertones with low acidity.",
        rating: 4.1,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwMn5B2Iqf65mRknqg9JXtn5Nb-dDP5nqQOsPuJSlnTdBNUijzVJb8gVLNR1TXnnuoFiTN-kW22VGK88W9onRAjm5vtYvt7ukK6-7UDgrGVArCCcrMZSHOK4uFaa-jx129e1vk2d6P0FUmNBsNmvxkuZUH3azLKHweP1eLmx0QkSzEy1rw2LzxTQ3IAZCJrAHUYFEMCF5JoIixeOtNOp8ZAkPn8ZlvFlZLKz8RuOC6r2uTyJ_bDKal7d4_6cVDX4uJihIUa3gQMow"
    }
];

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
    // Return 3 sample recommendations
    return [
        coffeeDatabase[0], // Ethiopian Yirgacheffe
        coffeeDatabase[1], // Colombian Supremo
        coffeeDatabase[2]  // Brazilian Santos
    ];
}

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
    let favs = getFavorites();
    if (favs.includes(id)) {
        favs = favs.filter(f => f !== id);
        showToast('Removed from favorites');
    } else {
        favs.push(id);
        showToast('Added to favorites!');
    }
    setFavorites(favs);
    // Re-render modal results to update favorite status
    if (window.currentModalRecommendations) {
        displayModalResults(window.currentModalRecommendations);
    }
}

function showToast(message) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastNotification';
        toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#5b371b] text-[#fbfaf9] px-6 py-3 rounded-full shadow-lg z-50 text-base font-semibold opacity-0 pointer-events-none transition-all';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');
    setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0');
    }, 1800);
}

function displayModalResults(recommendations) {
    window.currentModalRecommendations = recommendations;
    modalResultsContainer.innerHTML = '';
    if (recommendations.length === 0) {
        modalResultsContainer.innerHTML = `<div class='text-center text-[#8c6f5a]'>No coffees match your filter.</div>`;
        return;
    }
    recommendations.forEach((coffee, index) => {
        const card = createModalCoffeeCard(coffee, index + 1);
        modalResultsContainer.appendChild(card);
    });
    // Add event listeners for favorite buttons and flavor tags
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.onclick = () => toggleFavorite(btn.dataset.id);
    });
    document.querySelectorAll('.flavor-tag-btn').forEach(btn => {
        btn.onclick = () => {
            showToast(`Filtering by flavor: ${btn.dataset.flavor}`);
            setTimeout(() => {
                filterModalByFlavor(btn.dataset.flavor);
            }, 900);
        };
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
    const filtered = coffeeDatabase.filter(c => c.flavors.includes(flavor));
    displayModalResults(filtered);
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Show loading state
    showLoading();
    
    // Get form data
    const formData = new FormData(coffeeForm);
    const preferences = {
        roastLevel: formData.get('roastLevel'),
        flavors: formData.getAll('flavors'),
        acidity: formData.get('acidity'),
        body: formData.get('body'),
        origin: formData.get('origin')
    };
    
    // Show Recommendations link after first questionnaire
    localStorage.setItem('showRecommendationsLink', 'true');
    document.getElementById('recommendationsLink').classList.remove('hidden');
    
    // Simulate API delay for better UX
    setTimeout(() => {
        const recommendations = getRecommendations(preferences);
        displayModalResults(recommendations);
        showRecommendationsModal();
        hideLoading();
    }, 2000);
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