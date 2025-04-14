document.addEventListener('DOMContentLoaded', () => {
    // Order filters functionality
    const timeFilter = document.querySelector('.order-filters select:first-child');
    const statusFilter = document.querySelector('.order-filters select:last-child');

    if (timeFilter) {
        timeFilter.addEventListener('change', () => {
            // Implement time filter logic here
            console.log('Time filter changed:', timeFilter.value);
            filterOrders();
        });
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', () => {
            // Implement status filter logic here
            console.log('Status filter changed:', statusFilter.value);
            filterOrders();
        });
    }

    // Track package functionality
    const trackButtons = document.querySelectorAll('.order-actions .btn-outline:first-child');
    trackButtons.forEach(button => {
        button.addEventListener('click', () => {
            const orderNumber = button.closest('.order-card').querySelector('.order-number').textContent;
            // Implement track package logic here
            console.log('Tracking package for order:', orderNumber);
        });
    });

    // Leave feedback functionality
    const feedbackButtons = document.querySelectorAll('.order-actions .btn-outline:nth-child(2)');
    feedbackButtons.forEach(button => {
        button.addEventListener('click', () => {
            const orderNumber = button.closest('.order-card').querySelector('.order-number').textContent;
            // Implement leave feedback logic here
            console.log('Leaving feedback for order:', orderNumber);
        });
    });

    // Write review functionality
    const reviewButtons = document.querySelectorAll('.order-actions .btn-outline:last-child');
    reviewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const orderNumber = button.closest('.order-card').querySelector('.order-number').textContent;
            // Implement write review logic here
            console.log('Writing review for order:', orderNumber);
        });
    });

    // Function to filter orders based on selected criteria
    function filterOrders() {
        const timeValue = timeFilter ? timeFilter.value : 'All Orders';
        const statusValue = statusFilter ? statusFilter.value : 'All Status';
        
        const orderCards = document.querySelectorAll('.order-card');
        orderCards.forEach(card => {
            const orderDate = new Date(card.querySelector('.order-date').textContent.replace('Order Placed: ', ''));
            const orderStatus = card.querySelector('.order-status').textContent;
            
            let showCard = true;

            // Time filter
            if (timeValue !== 'All Orders') {
                const now = new Date();
                const timeDiff = now - orderDate;
                const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

                switch (timeValue) {
                    case 'Past 30 days':
                        showCard = daysDiff <= 30;
                        break;
                    case 'Past 3 months':
                        showCard = daysDiff <= 90;
                        break;
                    case '2024':
                        showCard = orderDate.getFullYear() === 2024;
                        break;
                }
            }

            // Status filter
            if (statusValue !== 'All Status' && showCard) {
                showCard = orderStatus === statusValue;
            }

            card.style.display = showCard ? 'block' : 'none';
        });
    }
}); 