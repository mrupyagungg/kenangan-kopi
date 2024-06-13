document.addEventListener('alpine:init', () => {
    Alpine.data('product', () => ({
        items: [
            { id: 1, name: 'Dalgona', img: '1.jpg', price: '32000' },
            { id: 2, name: 'Americano', img: '2.jpg', price: '31000' },
            { id: 3, name: 'Espresso', img: '3.jpg', price: '20000' },
            { id: 4, name: 'Caffé Latte', img: '4.jpg', price: '33000' },
            { id: 5, name: 'Mocca', img: '5.jpg', price: '34000' },
        ],
    }));
});

// Initialize Feather icons
feather.replace();
