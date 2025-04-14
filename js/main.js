// DOM Elements
const featuredProductsContainer = document.getElementById('featuredProducts');
const searchForm = document.querySelector('.search-bar form');
const cartButton = document.querySelector('.main-nav a[href="/cart"]');

// Fetch Featured Products
async function fetchFeaturedProducts() {
    try {
        const response = await fetch('/api/products/featured');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching featured products:', error);
        featuredProductsContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
}

// Display Products
function displayProducts(products) {
    featuredProductsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn add-to-cart" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `).join('');

    // Add event listeners to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to Cart Functionality
async function addToCart(event) {
    const productId = event.target.dataset.productId;
    try {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),
        });

        if (response.ok) {
            updateCartCount();
            showNotification('Product added to cart!');
        } else {
            showNotification('Failed to add product to cart', 'error');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Error adding to cart', 'error');
    }
}

// Update Cart Count
async function updateCartCount() {
    try {
        const response = await fetch('/api/cart/count');
        const { count } = await response.json();
        const cartIcon = cartButton.querySelector('i');
        cartButton.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${count})`;
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Search Form Handler
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchQuery = event.target.querySelector('input').value.trim();
    if (searchQuery) {
        window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchFeaturedProducts();
    updateCartCount();

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Add to Cart Animation
function animateCartButton(button) {
    button.classList.add('adding-to-cart');
    setTimeout(() => {
        button.classList.remove('adding-to-cart');
    }, 1000);
}

// Error Handling
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showNotification('An error occurred. Please try again.', 'error');
}); 