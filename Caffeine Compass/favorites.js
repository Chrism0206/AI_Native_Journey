import { coffeeDatabase } from './database.js';

function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function setFavorites(favs) {
    localStorage.setItem('favorites', JSON.stringify(favs));
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

function renderFavorites(filterFlavor = null) {
    const container = document.getElementById('favoritesContainer');
    const favIds = getFavorites();
    let favCoffees = coffeeDatabase.filter(c => favIds.includes(c.id));
    if (filterFlavor) {
        favCoffees = favCoffees.filter(c => c.flavors.includes(filterFlavor));
    }
    container.innerHTML = '';
    if (favCoffees.length === 0) {
        container.innerHTML = `<div class='text-center text-[#8c6f5a]'>${filterFlavor ? 'No favorites with this flavor.' : 'No favorites yet. Add some from the recommendations!'}</div>`;
        return;
    }
    favCoffees.forEach((coffee, idx) => {
        const card = document.createElement('div');
        card.className = 'flex items-stretch justify-between gap-4 rounded-xl bg-[#fbfaf9] p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)] hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] transition-shadow';
        card.innerHTML = `
            <div class="flex flex-[2_2_0px] flex-col gap-4 cursor-pointer" onclick="window.location='details.html?id=${coffee.id}'">
                <div class="flex flex-col gap-1">
                    <div class="flex items-center gap-2">
                        <span class="bg-[#5b371b] text-[#fbfaf9] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">${idx + 1}</span>
                        <p class="text-[#191410] text-base font-bold leading-tight">${coffee.name}</p>
                        <button class="favorite-btn ml-2 text-xl" data-id="${coffee.id}" title="Remove from favorites">❤️</button>
                    </div>
                    <p class="text-[#8c6f5a] text-sm font-normal leading-normal">${coffee.description}</p>
                    <div class="flex flex-wrap gap-2 mt-2">
                        ${coffee.flavors.map(flavor => `<button class='bg-[#5b371b] text-[#fbfaf9] px-2 py-1 rounded-full text-xs font-medium flavor-tag-btn' data-flavor="${flavor}">${flavor}</button>`).join(' ')}
                    </div>
                    <div class="flex items-center gap-2 text-[#f6ad55] font-semibold text-sm">
                        <span>${'★'.repeat(Math.floor(coffee.rating))}${'☆'.repeat(5 - Math.floor(coffee.rating))}</span>
                        <span class="text-[#191410]">${coffee.rating}/5</span>
                    </div>
                </div>
            </div>
            <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1" style='background-image: url("${coffee.image}");'></div>
        `;
        // Remove favorite event
        card.querySelector('.favorite-btn').onclick = (e) => {
            e.stopPropagation();
            const id = coffee.id;
            const favs = getFavorites().filter(f => f !== id);
            setFavorites(favs);
            showToast('Removed from favorites');
            renderFavorites(filterFlavor);
        };
        // Flavor tag filter event
        card.querySelectorAll('.flavor-tag-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                showToast(`Filtering by flavor: ${btn.dataset.flavor}`);
                setTimeout(() => renderFavorites(btn.dataset.flavor), 900);
            };
        });
        container.appendChild(card);
    });
}

// Initial render
renderFavorites(); 