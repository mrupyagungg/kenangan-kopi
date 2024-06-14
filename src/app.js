document.addEventListener('alpine:init', () => {
    Alpine.data('product', () => ({
        items: [
            { id: 1, name: 'Dalgona', img: '1.jpg', price: '32000' },
            { id: 2, name: 'Americano', img: '2.jpg', price: '31000' },
            { id: 3, name: 'Espresso', img: '3.jpg', price: '20000' },
            { id: 4, name: 'Caffé Latte', img: '4.jpg', price: '33000' },
            { id: 5, name: 'Mocca', img: '5.jpg', price: '34000' },
            { id: 5, name: 'Machiato', img: '6.jpg', price: '24000' },
        ],
    }));
    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            this.items.push(newItem);
            this.total += newItem.price;
            this.quantity++;
            console.log('thisTotal');
        },
    });
});

// Initialize Feather icons
feather.replace();

// rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};
