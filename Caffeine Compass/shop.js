import { coffeeDatabase } from './database.js';

// Cart elements (should exist everywhere)
const cartButton = document.getElementById('cartButton');
const cartBadge = document.getElementById('cartBadge');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Shop-only elements
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const roastFilter = document.getElementById('roastFilter');
const originFilter = document.getElementById('originFilter');
const priceFilter = document.getElementById('priceFilter');
const clearFiltersBtn = document.getElementById('clearFilters');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const quickViewModal = document.getElementById('quickViewModal');
const closeQuickViewBtn = document.getElementById('closeQuickView');
const quickViewContent = document.getElementById('quickViewContent');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutBtn = document.getElementById('closeCheckout');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutTotal = document.getElementById('checkoutTotal');

// Shop state management
let shopState = {
    products: [],
    filteredProducts: [],
    cart: [],
    currentPage: 1,
    productsPerPage: 9,
    filters: {
        search: '',
        roast: '',
        origin: '',
        price: ''
    }
};

// Initialize shop
function initShop() {
    // Add pricing to products
    shopState.products = coffeeDatabase.map(coffee => ({
        ...coffee,
        price: generatePrice(coffee.rating),
        weight: generateWeight(),
        inStock: Math.random() > 0.1 // 90% chance of being in stock
    }));
    
    shopState.filteredProducts = [...shopState.products];
    
    // Load cart from localStorage
    loadCart();
    
    // Check for URL parameters (only on shop page)
    if (window.location.pathname.includes('shop.html')) {
        handleURLParameters();
    }
    
    // Render products (only on shop page)
    if (productsGrid) {
        renderProducts();
    }
    
    // Add event listeners
    addEventListeners();
}

// Generate realistic pricing based on rating
function generatePrice(rating) {
    const basePrice = 12;
    const ratingMultiplier = rating / 5;
    const randomFactor = 0.8 + Math.random() * 0.4; // ±20% variation
    return Math.round((basePrice + (rating * 3)) * randomFactor * 100) / 100;
}

// Generate random weight options
function generateWeight() {
    const weights = [0.25, 0.5, 1, 2];
    return weights[Math.floor(Math.random() * weights.length)];
}

// Add event listeners
function addEventListeners() {
    // Search and filters (shop-only elements)
    if (searchInput) searchInput.addEventListener('input', handleSearch);
    if (roastFilter) roastFilter.addEventListener('change', handleFilter);
    if (originFilter) originFilter.addEventListener('change', handleFilter);
    if (priceFilter) priceFilter.addEventListener('change', handleFilter);
    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', clearFilters);
    if (loadMoreBtn) loadMoreBtn.addEventListener('click', loadMoreProducts);
    
    // Cart (should exist on all pages)
    if (cartButton) cartButton.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckout);
    
    // Modals (shop-only elements)
    if (closeQuickViewBtn) closeQuickViewBtn.addEventListener('click', closeQuickView);
    if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckout);
    
    // Close modals when clicking outside
    if (cartModal) cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) closeCart();
    });
    if (quickViewModal) quickViewModal.addEventListener('click', (e) => {
        if (e.target === quickViewModal) closeQuickView();
    });
    if (checkoutModal) checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) closeCheckout();
    });
    
    // Checkout form (shop-only element)
    if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckout);
}

// Handle search
function handleSearch() {
    shopState.filters.search = searchInput.value.toLowerCase();
    applyFilters();
}

// Handle filter changes
function handleFilter() {
    shopState.filters.roast = roastFilter.value;
    shopState.filters.origin = originFilter.value;
    shopState.filters.price = priceFilter.value;
    applyFilters();
}

// Apply all filters
function applyFilters() {
    shopState.filteredProducts = shopState.products.filter(product => {
        // Search filter
        if (shopState.filters.search) {
            const searchMatch = product.name.toLowerCase().includes(shopState.filters.search) ||
                               product.origin.toLowerCase().includes(shopState.filters.search) ||
                               product.flavors.some(flavor => flavor.toLowerCase().includes(shopState.filters.search));
            if (!searchMatch) return false;
        }
        
        // Roast filter
        if (shopState.filters.roast && product.roastLevel !== shopState.filters.roast) {
            return false;
        }
        
        // Origin filter
        if (shopState.filters.origin && product.origin !== shopState.filters.origin) {
            return false;
        }
        
        // Price filter
        if (shopState.filters.price) {
            const [min, max] = shopState.filters.price.split('-').map(Number);
            if (max && (product.price < min || product.price > max)) {
                return false;
            } else if (!max && product.price < min) {
                return false;
            }
        }
        
        return true;
    });
    
    shopState.currentPage = 1;
    renderProducts();
}

// Clear all filters
function clearFilters() {
    searchInput.value = '';
    roastFilter.value = '';
    originFilter.value = '';
    priceFilter.value = '';
    
    shopState.filters = {
        search: '',
        roast: '',
        origin: '',
        price: ''
    };
    
    shopState.filteredProducts = [...shopState.products];
    shopState.currentPage = 1;
    renderProducts();
}

// Render products
function renderProducts() {
    const startIndex = 0;
    const endIndex = shopState.currentPage * shopState.productsPerPage;
    const productsToShow = shopState.filteredProducts.slice(startIndex, endIndex);
    
    if (shopState.currentPage === 1) {
        productsGrid.innerHTML = '';
    }
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Show/hide load more button
    loadMoreBtn.style.display = endIndex >= shopState.filteredProducts.length ? 'none' : 'block';
    
    // Show message if no products found
    if (shopState.filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-4xl text-[#8c6f5a] mb-4"></i>
                <p class="text-[#8c6f5a] text-lg">No products found matching your criteria</p>
                <button onclick="clearFilters()" class="mt-4 px-4 py-2 bg-[#5b371b] text-[#fbfaf9] rounded-lg hover:bg-[#4a2e15] transition-colors">
                    Clear Filters
                </button>
            </div>
        `;
    }
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow';
    
    card.innerHTML = `
        <div class="relative">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            ${!product.inStock ? '<div class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">Out of Stock</div>' : ''}
            <div class="absolute top-2 left-2 bg-[#5b371b] text-[#fbfaf9] px-2 py-1 rounded text-sm font-medium">
                $${product.price}
            </div>
        </div>
        
        <div class="p-6">
            <h3 class="text-xl font-bold text-[#191410] mb-2">${product.name}</h3>
            <p class="text-[#8c6f5a] text-sm mb-3">${product.origin}</p>
            <p class="text-[#191410] text-sm mb-4 line-clamp-2">${product.description}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
                ${product.flavors.map(flavor => 
                    `<span class="bg-[#f1ede9] text-[#191410] px-2 py-1 rounded-full text-xs">${flavor}</span>`
                ).join('')}
            </div>
            
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <span class="text-[#f6ad55] font-semibold">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                    <span class="text-[#191410] text-sm">${product.rating}/5</span>
                </div>
                <span class="text-[#8c6f5a] text-sm">${product.weight}lb</span>
            </div>
            
            <div class="flex gap-2">
                <button onclick="quickView('${product.id}')" class="flex-1 py-2 px-4 border border-[#5b371b] text-[#5b371b] rounded-lg hover:bg-[#5b371b] hover:text-[#fbfaf9] transition-colors">
                    Quick View
                </button>
                <button onclick="addToCart('${product.id}')" ${!product.inStock ? 'disabled' : ''} 
                        class="flex-1 py-2 px-4 bg-[#5b371b] text-[#fbfaf9] rounded-lg hover:bg-[#4a2e15] transition-colors ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}">
                    ${!product.inStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Load more products
function loadMoreProducts() {
    shopState.currentPage++;
    renderProducts();
}

// Cart functions
function loadCart() {
    const savedCart = localStorage.getItem('shopCart');
    shopState.cart = savedCart ? JSON.parse(savedCart) : [];
    updateCartBadge();
}

function saveCart() {
    localStorage.setItem('shopCart', JSON.stringify(shopState.cart));
    updateCartBadge();
}

function updateCartBadge() {
    if (!cartBadge) return;
    const itemCount = shopState.cart.reduce((total, item) => total + item.quantity, 0);
    cartBadge.textContent = itemCount;
    cartBadge.style.display = itemCount > 0 ? 'flex' : 'none';
}

function addToCart(productId) {
    const product = (shopState.products || []).find(p => p.id === productId);
    if (!product || !product.inStock) return;
    const existingItem = shopState.cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        shopState.cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    saveCart();
    showToast('Added to cart!');
}

function removeFromCart(productId) {
    shopState.cart = shopState.cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

function updateCartQuantity(productId, quantity) {
    const item = shopState.cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            renderCart();
        }
    }
}

function renderCart() {
    if (!cartItems || !emptyCart || !cartTotal) return;
    if (shopState.cart.length === 0) {
        cartItems.innerHTML = '';
        emptyCart.style.display = 'block';
        cartTotal.textContent = '$0.00';
        return;
    }
    emptyCart.style.display = 'none';
    cartItems.innerHTML = shopState.cart.map(item => {
        const product = shopState.products.find(p => p.id === item.id) || {};
        const total = (item.price * item.quantity).toFixed(2);
        return `
            <div class="flex items-center gap-4 py-4 border-b border-[#f1ede9]">
                <img src="${item.image || ''}" alt="${item.name || ''}" class="w-16 h-16 object-cover rounded-lg">
                <div class="flex-1">
                    <h4 class="font-semibold text-[#191410]">${item.name || ''}</h4>
                    <p class="text-[#8c6f5a] text-sm">$${item.price}</p>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})" class="w-8 h-8 bg-[#f1ede9] rounded-full flex items-center justify-center hover:bg-[#e8e0d8] transition-colors">-</button>
                    <span class="w-8 text-center">${item.quantity}</span>
                    <button onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})" class="w-8 h-8 bg-[#f1ede9] rounded-full flex items-center justify-center hover:bg-[#e8e0d8] transition-colors">+</button>
                </div>
                <div class="text-right">
                    <p class="font-semibold text-[#191410]">$${total}</p>
                    <button onclick="removeFromCart('${item.id}')" class="text-red-500 text-sm hover:text-red-700">Remove</button>
                </div>
            </div>
        `;
    }).join('');
    const total = shopState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
    if (checkoutTotal) checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

// Modal functions
function openCart() {
    renderCart();
    if (cartModal) {
        cartModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeCart() {
    if (cartModal) {
        cartModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function openCheckout() {
    if (shopState.cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    closeCart();
    if (checkoutModal) {
        checkoutModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        // If not on shop page, redirect to shop
        window.location.href = 'shop.html';
    }
}

function closeCheckout() {
    if (checkoutModal) {
        checkoutModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function quickView(productId) {
    const product = shopState.products.find(p => p.id === productId);
    if (!product) return;
    
    quickViewContent.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <img src="${product.image}" alt="${product.name}" class="w-full rounded-lg">
            </div>
            <div>
                <h2 class="text-3xl font-bold text-[#191410] mb-2">${product.name}</h2>
                <p class="text-[#8c6f5a] text-lg mb-4">${product.origin}</p>
                <p class="text-[#191410] mb-6">${product.detailedDescription || product.description}</p>
                
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="bg-[#fbfaf9] p-4 rounded-lg">
                        <h3 class="font-semibold text-[#191410] mb-1">Acidity</h3>
                        <p class="text-[#8c6f5a] capitalize">${product.acidity}</p>
                    </div>
                    <div class="bg-[#fbfaf9] p-4 rounded-lg">
                        <h3 class="font-semibold text-[#191410] mb-1">Body</h3>
                        <p class="text-[#8c6f5a] capitalize">${product.body}</p>
                    </div>
                    <div class="bg-[#fbfaf9] p-4 rounded-lg">
                        <h3 class="font-semibold text-[#191410] mb-1">Roast Level</h3>
                        <p class="text-[#8c6f5a] capitalize">${product.roastLevel}</p>
                    </div>
                    <div class="bg-[#fbfaf9] p-4 rounded-lg">
                        <h3 class="font-semibold text-[#191410] mb-1">Rating</h3>
                        <p class="text-[#f6ad55] font-semibold">${product.rating}/5</p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-2 mb-6">
                    ${product.flavors.map(flavor => 
                        `<span class="bg-[#5b371b] text-[#fbfaf9] px-3 py-1 rounded-full text-sm font-medium">${flavor}</span>`
                    ).join('')}
                </div>
                
                <div class="flex items-center justify-between mb-6">
                    <div class="text-3xl font-bold text-[#5b371b]">$${product.price}</div>
                    <div class="text-[#8c6f5a]">${product.weight}lb bag</div>
                </div>
                
                <button onclick="addToCart('${product.id}'); closeQuickView();" ${!product.inStock ? 'disabled' : ''} 
                        class="w-full py-3 bg-[#5b371b] text-[#fbfaf9] rounded-lg hover:bg-[#4a2e15] transition-colors font-medium ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}">
                    ${!product.inStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `;
    
    quickViewModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    quickViewModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Handle checkout
function handleCheckout(e) {
    e.preventDefault();
    
    // Simulate order processing
    showToast('Processing your order...');
    
    setTimeout(() => {
        showToast('Order placed successfully! Thank you for your purchase.');
        shopState.cart = [];
        saveCart();
        closeCheckout();
    }, 2000);
}

// Utility functions
function showToast(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-[#5b371b] text-[#fbfaf9] px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Make functions globally available
window.quickView = quickView;
window.addToCart = addToCart;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;

// Handle URL parameters for direct linking
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    const roastParam = urlParams.get('roast');
    const originParam = urlParams.get('origin');
    
    if (searchParam && searchInput) {
        searchInput.value = searchParam;
        shopState.filters.search = searchParam.toLowerCase();
    }
    
    if (roastParam && roastFilter) {
        roastFilter.value = roastParam;
        shopState.filters.roast = roastParam;
    }
    
    if (originParam && originFilter) {
        originFilter.value = originParam;
        shopState.filters.origin = originParam;
    }
    
    // Apply filters if any parameters were found
    if ((searchParam || roastParam || originParam) && productsGrid) {
        applyFilters();
    }
}

// Initialize shop when DOM is loaded
document.addEventListener('DOMContentLoaded', initShop); 