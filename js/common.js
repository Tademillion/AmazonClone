// Common utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search functionality
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
        // Implement search functionality here
        console.log('Searching for:', e.target.value);
    }, 300));
}

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
}

// Add to cart functionality
function addToCart(productId, quantity = 1) {
    // Implement add to cart functionality here
    console.log(`Adding ${quantity} of product ${productId} to cart`);
}

// Remove from cart functionality
function removeFromCart(productId) {
    // Implement remove from cart functionality here
    console.log(`Removing product ${productId} from cart`);
}

// Update cart quantity
function updateCartQuantity(productId, quantity) {
    // Implement update cart quantity functionality here
    console.log(`Updating product ${productId} quantity to ${quantity}`);
} 