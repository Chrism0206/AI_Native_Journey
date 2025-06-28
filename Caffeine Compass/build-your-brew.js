import { coffeeDatabase } from './database.js';

// State management
let userSelections = {
    flavor: null,
    feel: null,
    adventure: null,
    region: null,
    roast: null
};

let currentStep = 1;
const totalSteps = 3;

// For cycling through top recommendations
let topRecommendations = [];
let currentRecommendationIndex = 0;

// DOM elements
const progressText = document.getElementById('progressText');
const progressPercent = document.getElementById('progressPercent');
const progressBar = document.getElementById('progressBar');

// Step containers
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const results = document.getElementById('results');

// Navigation buttons
const nextStep1 = document.getElementById('nextStep1');
const prevStep2 = document.getElementById('prevStep2');
const nextStep2 = document.getElementById('nextStep2');
const prevStep3 = document.getElementById('prevStep3');
const findMyBrew = document.getElementById('findMyBrew');
const tryAgain = document.getElementById('tryAgain');
const surpriseMe = document.getElementById('surpriseMe');

// Adventure options
const regionSelection = document.getElementById('regionSelection');
const roastSelection = document.getElementById('roastSelection');
const regionSelect = document.getElementById('regionSelect');
const roastSelect = document.getElementById('roastSelect');

// Update progress bar
function updateProgress() {
    let percent;
    let stepLabel;
    if (currentStep <= totalSteps) {
        percent = (currentStep / totalSteps) * 100;
        stepLabel = `Step ${currentStep} of ${totalSteps}`;
        progressPercent.textContent = `${Math.round(percent)}%`;
    } else {
        percent = 100;
        stepLabel = 'Complete';
        progressPercent.textContent = '100%';
    }
    progressText.textContent = stepLabel;
    progressBar.style.width = `${percent}%`;
}

// Show step
function showStep(stepNumber) {
    // Hide all steps
    step1.classList.add('hidden');
    step2.classList.add('hidden');
    step3.classList.add('hidden');
    results.classList.add('hidden');
    
    // Show current step
    switch(stepNumber) {
        case 1:
            step1.classList.remove('hidden');
            break;
        case 2:
            step2.classList.remove('hidden');
            break;
        case 3:
            step3.classList.remove('hidden');
            break;
        case 4:
            results.classList.remove('hidden');
            break;
    }
    
    updateProgress();
}

// Step 1: Flavor selection
document.querySelectorAll('.flavor-option').forEach(button => {
    button.addEventListener('click', function() {
        // Remove selection from all buttons
        document.querySelectorAll('.flavor-option').forEach(btn => {
            btn.classList.remove('border-[#5b371b]', 'bg-[#fbfaf9]');
            btn.classList.add('border-[#f1ede9]');
        });
        
        // Select clicked button
        this.classList.remove('border-[#f1ede9]');
        this.classList.add('border-[#5b371b]', 'bg-[#fbfaf9]');
        
        userSelections.flavor = this.dataset.flavor;
        nextStep1.disabled = false;
    });
});

// Step 2: Feel selection
document.querySelectorAll('.feel-option').forEach(button => {
    button.addEventListener('click', function() {
        // Remove selection from all buttons
        document.querySelectorAll('.feel-option').forEach(btn => {
            btn.classList.remove('border-[#5b371b]', 'bg-[#fbfaf9]');
            btn.classList.add('border-[#f1ede9]');
        });
        
        // Select clicked button
        this.classList.remove('border-[#f1ede9]');
        this.classList.add('border-[#5b371b]', 'bg-[#fbfaf9]');
        
        userSelections.feel = this.dataset.feel;
        nextStep2.disabled = false;
    });
});

// Step 3: Adventure selection
document.querySelectorAll('.adventure-option').forEach(button => {
    button.addEventListener('click', function() {
        // Remove selection from all buttons
        document.querySelectorAll('.adventure-option').forEach(btn => {
            btn.classList.remove('border-[#5b371b]', 'bg-[#fbfaf9]');
            btn.classList.add('border-[#f1ede9]');
        });
        
        // Select clicked button
        this.classList.remove('border-[#f1ede9]');
        this.classList.add('border-[#5b371b]', 'bg-[#fbfaf9]');
        
        userSelections.adventure = this.dataset.adventure;
        
        // Show/hide additional selections
        regionSelection.classList.add('hidden');
        roastSelection.classList.add('hidden');
        
        if (userSelections.adventure === 'region') {
            regionSelection.classList.remove('hidden');
        } else if (userSelections.adventure === 'roast') {
            roastSelection.classList.remove('hidden');
        }
        
        findMyBrew.disabled = false;
    });
});

// Region selection change
regionSelect.addEventListener('change', function() {
    userSelections.region = this.value;
    // Check if the selected region exists in the coffee database
    const regionExists = coffeeDatabase.some(coffee => coffee.origin === this.value);
    findMyBrew.disabled = !this.value || !regionExists;
    // Optionally, show a message if region is not available
    const regionMsg = document.getElementById('regionErrorMsg');
    if (regionMsg) regionMsg.remove();
    if (this.value && !regionExists) {
        const msg = document.createElement('div');
        msg.id = 'regionErrorMsg';
        msg.className = 'text-red-600 text-sm mt-2';
        msg.textContent = 'Sorry, we don\'t have coffees from this region yet.';
        this.parentNode.appendChild(msg);
    }
});

// Roast selection change
roastSelect.addEventListener('change', function() {
    userSelections.roast = this.value;
    findMyBrew.disabled = !this.value;
});

// Navigation
nextStep1.addEventListener('click', () => {
    currentStep = 2;
    showStep(2);
});

prevStep2.addEventListener('click', () => {
    currentStep = 1;
    showStep(1);
});

nextStep2.addEventListener('click', () => {
    currentStep = 3;
    showStep(3);
});

prevStep3.addEventListener('click', () => {
    currentStep = 2;
    showStep(2);
});

// Find My Brew
findMyBrew.addEventListener('click', () => {
    topRecommendations = getTopRecommendations();
    currentRecommendationIndex = 0;
    displayResult(topRecommendations[currentRecommendationIndex]);
    currentStep = 4;
    showStep(4);
});

// Try Again
tryAgain.addEventListener('click', () => {
    resetSelections();
    currentStep = 1;
    showStep(1);
});

// Surprise Me Again
surpriseMe.addEventListener('click', () => {
    if (!topRecommendations.length) return;
    currentRecommendationIndex = (currentRecommendationIndex + 1) % topRecommendations.length;
    displayResult(topRecommendations[currentRecommendationIndex]);
});

// Reset selections
function resetSelections() {
    userSelections = {
        flavor: null,
        feel: null,
        adventure: null,
        region: null,
        roast: null
    };
    
    // Reset UI
    document.querySelectorAll('.flavor-option, .feel-option, .adventure-option').forEach(btn => {
        btn.classList.remove('border-[#5b371b]', 'bg-[#fbfaf9]');
        btn.classList.add('border-[#f1ede9]');
    });
    
    nextStep1.disabled = true;
    nextStep2.disabled = true;
    findMyBrew.disabled = true;
    
    regionSelection.classList.add('hidden');
    roastSelection.classList.add('hidden');
    regionSelect.value = '';
    roastSelect.value = '';
    topRecommendations = [];
    currentRecommendationIndex = 0;
}

// Get top recommendations based on user selections
function getTopRecommendations() {
    let coffees = coffeeDatabase;
    // Strict region filter if adventure is region
    if (userSelections.adventure === 'region' && userSelections.region) {
        coffees = coffees.filter(coffee => coffee.origin === userSelections.region);
    }
    let scoredCoffees = coffees.map(coffee => {
        let score = 0;
        // Flavor matching (highest weight)
        if (coffee.flavors.includes(userSelections.flavor)) {
            score += 40;
        }
        // Feel matching (body + acidity)
        if (userSelections.feel === 'light') {
            if (coffee.body === 'light' && coffee.acidity === 'high') score += 30;
            else if (coffee.body === 'light' || coffee.acidity === 'high') score += 15;
        } else if (userSelections.feel === 'medium') {
            if (coffee.body === 'medium' && coffee.acidity === 'medium') score += 30;
            else if (coffee.body === 'medium' || coffee.acidity === 'medium') score += 15;
        } else if (userSelections.feel === 'full') {
            if (coffee.body === 'full' && coffee.acidity === 'low') score += 30;
            else if (coffee.body === 'full' || coffee.acidity === 'low') score += 15;
        }
        // Adventure matching
        if (userSelections.adventure === 'roast' && userSelections.roast) {
            if (coffee.roastLevel === userSelections.roast) score += 20;
        }
        // For 'surprise', no additional points - let rating and other factors decide
        // Add base rating
        score += coffee.rating * 2;
        return { ...coffee, score };
    });
    // Sort by score and return top 3
    return scoredCoffees.sort((a, b) => b.score - a.score).slice(0, 3);
}

// Display result
function displayResult(coffee) {
    const resultContainer = document.getElementById('brewResult');
    resultContainer.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="flex flex-col md:flex-row gap-8">
                <div class="flex-1">
                    <h2 class="text-3xl font-bold text-[#191410] mb-2">${coffee.name}</h2>
                    <p class="text-lg text-[#8c6f5a] mb-4">${coffee.origin}</p>
                    <p class="text-[#191410] text-base mb-6">${coffee.description}</p>
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="bg-[#fbfaf9] p-4 rounded-lg">
                            <h3 class="font-semibold text-[#191410] mb-1">Acidity</h3>
                            <p class="text-[#8c6f5a] capitalize">${coffee.acidity}</p>
                        </div>
                        <div class="bg-[#fbfaf9] p-4 rounded-lg">
                            <h3 class="font-semibold text-[#191410] mb-1">Body</h3>
                            <p class="text-[#8c6f5a] capitalize">${coffee.body}</p>
                        </div>
                        <div class="bg-[#fbfaf9] p-4 rounded-lg">
                            <h3 class="font-semibold text-[#191410] mb-1">Roast Level</h3>
                            <p class="text-[#8c6f5a] capitalize">${coffee.roastLevel}</p>
                        </div>
                        <div class="bg-[#fbfaf9] p-4 rounded-lg">
                            <h3 class="font-semibold text-[#191410] mb-1">Rating</h3>
                            <p class="text-[#f6ad55] font-semibold">${coffee.rating}/5</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${coffee.flavors.map(flavor => 
                            `<span class="bg-[#5b371b] text-[#fbfaf9] px-3 py-1 rounded-full text-sm font-medium">${flavor}</span>`
                        ).join('')}
                    </div>
                    <a href="details.html?id=${coffee.id}" class="inline-block px-6 py-3 rounded-full bg-[#5b371b] text-[#fbfaf9] font-medium hover:bg-[#4a2e15] transition-colors">
                        View Full Details
                    </a>
                </div>
                <div class="flex-1">
                    <img src="${coffee.image}" alt="${coffee.name}" class="w-full rounded-xl shadow-md">
                </div>
            </div>
        </div>
    `;
}

// Initialize
updateProgress(); 