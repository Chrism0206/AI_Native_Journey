import { coffeeDatabase } from './database.js';

function getCoffeeIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function getCoffeeIndexById(id) {
    return coffeeDatabase.findIndex(c => c.id === id);
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
    renderCoffeeDetails(coffeeDatabase[getCoffeeIndexById(id)]);
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

function renderCoffeeDetails(coffee) {
    const container = document.getElementById('coffeeDetailsContainer');
    if (!coffee) {
        container.innerHTML = `<div class="text-center"><h2 class="text-2xl font-bold text-[#191410] mb-4">Coffee Not Found</h2><p class="text-[#8c6f5a]">Sorry, we couldn't find the coffee you're looking for.</p></div>`;
        return;
    }
    const idx = getCoffeeIndexById(coffee.id);
    const prev = coffeeDatabase[(idx - 1 + coffeeDatabase.length) % coffeeDatabase.length];
    const next = coffeeDatabase[(idx + 1) % coffeeDatabase.length];
    const fav = isFavorite(coffee.id);
    container.innerHTML = `
        <div class="flex flex-col md:flex-row gap-10 w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
            <div class="flex-1 flex flex-col justify-center items-center">
                <img src="${coffee.image}" alt="${coffee.name}" class="rounded-xl w-full max-w-xs aspect-video object-cover mb-6 shadow-md" />
                <div class="flex flex-wrap gap-2 mb-4">
                    ${coffee.flavors.map(f => `<button class='bg-[#5b371b] text-[#fbfaf9] px-3 py-1 rounded-full text-xs font-medium flavor-tag-btn' data-flavor="${f}">${f}</button>`).join('')}
                </div>
                <div class="flex items-center gap-2 text-[#f6ad55] font-semibold text-base mb-2">
                    <span>${'★'.repeat(Math.floor(coffee.rating))}${'☆'.repeat(5 - Math.floor(coffee.rating))}</span>
                    <span class="text-[#191410]">${coffee.rating}/5</span>
                </div>
                <button id="favoriteBtn" class="mt-2 flex items-center gap-2 px-4 py-2 rounded-full bg-[#f1ede9] text-[#191410] font-medium hover:bg-[#e8e0d8] transition-colors">
                    <span class="text-xl">${fav ? '❤️' : '🤍'}</span> ${fav ? 'Favorited' : 'Add to Favorites'}
                </button>
            </div>
            <div class="flex-1 flex flex-col justify-center">
                <h1 class="text-3xl font-black text-[#191410] mb-2">${coffee.name}</h1>
                <h2 class="text-lg text-[#8c6f5a] font-semibold mb-4">${coffee.origin}</h2>
                <p class="text-[#191410] text-base mb-6">${coffee.description}</p>
                <ul class="mb-6 text-[#191410] text-sm">
                    <li><strong>Roast Level:</strong> ${capitalize(coffee.roastLevel)}</li>
                    <li><strong>Acidity:</strong> ${capitalize(coffee.acidity)}</li>
                    <li><strong>Body:</strong> ${capitalize(coffee.body)}</li>
                </ul>
                <div class="flex gap-4 mt-4">
                    <button id="prevBtn" class="px-5 py-2 rounded-full bg-[#f1ede9] text-[#191410] font-medium hover:bg-[#e8e0d8] transition-colors">← Previous</button>
                    <a href="index.html" class="px-5 py-2 rounded-full bg-[#f1ede9] text-[#191410] font-medium text-lg hover:bg-[#e8e0d8] transition-colors">Back to Recommendations</a>
                    <button id="nextBtn" class="px-5 py-2 rounded-full bg-[#f1ede9] text-[#191410] font-medium hover:bg-[#e8e0d8] transition-colors">Next →</button>
                </div>
            </div>
        </div>
    `;
    // Add event listeners for navigation and favorite
    document.getElementById('favoriteBtn').onclick = () => toggleFavorite(coffee.id);
    document.getElementById('prevBtn').onclick = () => {
        window.location.href = `details.html?id=${prev.id}`;
    };
    document.getElementById('nextBtn').onclick = () => {
        window.location.href = `details.html?id=${next.id}`;
    };
    // Add event listeners for flavor tags
    document.querySelectorAll('.flavor-tag-btn').forEach(btn => {
        btn.onclick = () => {
            showToast(`Showing coffees with flavor: ${btn.dataset.flavor}`);
            setTimeout(() => {
                window.location.href = `index.html?flavor=${encodeURIComponent(btn.dataset.flavor)}`;
            }, 900);
        };
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Animate fade in
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1); }
`;
document.head.appendChild(style);

// Main
const coffeeId = getCoffeeIdFromUrl();
const coffee = coffeeDatabase.find(c => c.id === coffeeId);
renderCoffeeDetails(coffee); 