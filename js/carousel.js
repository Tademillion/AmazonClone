class BackgroundCarousel {
    constructor(images) {
        this.images = images;
        this.currentIndex = 0;
        this.interval = null;
        this.init();
    }

    init() {
        // Create carousel container
        const container = document.createElement('div');
        container.className = 'carousel-container';
        
        // Create slides
        this.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide' + (index === 0 ? ' active' : '');
            slide.style.backgroundImage = `url(${image})`;
            container.appendChild(slide);
        });

        // Add overlay
        const overlay = document.createElement('div');
        overlay.className = 'carousel-overlay';
        container.appendChild(overlay);

        // Create controls
        const controls = document.createElement('div');
        controls.className = 'carousel-controls';
        
        this.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
            dot.addEventListener('click', () => this.goToSlide(index));
            controls.appendChild(dot);
        });

        container.appendChild(controls);
        document.body.insertBefore(container, document.body.firstChild);

        // Start automatic rotation
        this.startRotation();
    }

    goToSlide(index) {
        // Update slides
        const slides = document.querySelectorAll('.carousel-slide');
        slides[this.currentIndex].classList.remove('active');
        slides[index].classList.add('active');

        // Update dots
        const dots = document.querySelectorAll('.carousel-dot');
        dots[this.currentIndex].classList.remove('active');
        dots[index].classList.add('active');

        this.currentIndex = index;
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.goToSlide(nextIndex);
    }

    startRotation() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => this.nextSlide(), 5000);
    }

    stopRotation() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Using placeholder images from Unsplash
    const backgroundImages = [
        'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ];

    new BackgroundCarousel(backgroundImages);
}); 