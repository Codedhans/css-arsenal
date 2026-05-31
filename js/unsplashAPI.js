// Unsplash API Integration

class UnsplashAPI {
    constructor(accessKey = '') {
        // Using public Unsplash API - no key required for basic requests
        this.baseURL = 'https://api.unsplash.com';
        this.accessKey = accessKey;
    }

    async getRandomImage(query = 'website ui design') {
        try {
            // Using public API endpoint
            const url = `https://source.unsplash.com/800x400/?${encodeURIComponent(query)}`;
            return url;
        } catch (error) {
            console.error('Error fetching image:', error);
            return this.getPlaceholderImage();
        }
    }

    async getWebUIImage() {
        const queries = [
            'website interface',
            'web design',
            'user interface',
            'dashboard',
            'app design',
            'web application',
            'responsive design',
            'modern website'
        ];
        
        const randomQuery = queries[Math.floor(Math.random() * queries.length)];
        return this.getRandomImage(randomQuery);
    }

    getPlaceholderImage() {
        return 'https://via.placeholder.com/800x400?text=CSS+Challenge';
    }

    // Load image with error handling
    async loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => reject(this.getPlaceholderImage());
            img.src = url;
        });
    }
}

// Create global instance
const unsplashAPI = new UnsplashAPI();