document.addEventListener('DOMContentLoaded', () => {
    // Quantity selector functionality
    const quantitySelectors = document.querySelectorAll('.quantity-selector select');
    quantitySelectors.forEach(selector => {
        selector.addEventListener('change', (e) => {
            const itemId = e.target.closest('.cart-item').dataset.itemId;
            const newQuantity = parseInt(e.target.value);
            updateCartQuantity(itemId, newQuantity);
        });
    });

    // Delete item functionality
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.closest('.cart-item').dataset.itemId;
            removeFromCart(itemId);
        });
    });

    // Update cart quantity
    function updateCartQuantity(itemId, quantity) {
        // Implement update cart quantity logic here
        console.log(`Updating quantity for item ${itemId} to ${quantity}`);
        updateSubtotal();
    }

    // Remove item from cart
    function removeFromCart(itemId) {
        // Implement remove from cart logic here
        console.log(`Removing item ${itemId} from cart`);
        const itemElement = document.querySelector(`.cart-item[data-item-id="${itemId}"]`);
        if (itemElement) {
            itemElement.remove();
            updateSubtotal();
            checkEmptyCart();
        }
    }

    // Update subtotal
    function updateSubtotal() {
        const items = document.querySelectorAll('.cart-item');
        let subtotal = 0;

        items.forEach(item => {
            const price = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity-selector select').value);
            subtotal += price * quantity;
        });

        document.querySelector('.subtotal span:last-child').textContent = `$${subtotal.toFixed(2)}`;
    }

    // Check if cart is empty
    function checkEmptyCart() {
        const items = document.querySelectorAll('.cart-item');
        const cartContent = document.querySelector('.cart-content');
        const emptyCart = document.querySelector('.empty-cart');

        if (items.length === 0) {
            cartContent.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartContent.style.display = 'block';
            emptyCart.style.display = 'none';
        }
    }

    // Initialize cart
    updateSubtotal();
    checkEmptyCart();
}); 