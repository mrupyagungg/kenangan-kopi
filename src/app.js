document.addEventListener('alpine:init', () => {
    Alpine.data('product', () => ({
        items: [
            { id: 1, name: 'Dalgona', img: '1.jpg', price: 32000 },
            { id: 2, name: 'Americano', img: '2.jpg', price: 31000 },
            { id: 3, name: 'Espresso', img: '3.jpg', price: 20000 },
            { id: 4, name: 'Caffé Latte', img: '4.jpg', price: 33000 },
            { id: 5, name: 'Mocca', img: '5.jpg', price: 34000 },
            { id: 6, name: 'Machiato', img: '6.jpg', price: 24000 },
        ],
        init() {
            console.log('Product data initialized:', this.items);
        },
        rupiah(value) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(value);
        },
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            console.log('Adding item:', newItem);
            const cartItem = this.items.find((item) => item.id === newItem.id);

            if (!cartItem) {
                this.items.push({
                    ...newItem,
                    quantity: 1,
                    total: newItem.price,
                });
                this.quantity++;
                this.total += newItem.price;
            } else {
                this.items = this.items.map((item) => {
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        item.quantity++;
                        item.total += item.price;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
            console.log('Cart items after adding:', this.items);
        },
        remove(id) {
            console.log('Removing item with id:', id);
            const cartItem = this.items.find((item) => item.id === id);

            if (cartItem.quantity > 1) {
                this.items = this.items.map((item) => {
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total -= item.price;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else if (cartItem.quantity === 1) {
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
            console.log('Cart items after removing:', this.items);
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

// data menu
function menuData() {
    return {
        menuItems: [
            {
                name: 'Coffe-Based Drink',
                image: 'img/product/8.jpg',
                info: 'Dari minunan tradisional berbasis espresso sampai berbagai minuman racikan kopi terkini.',
            },
            {
                name: 'Non-Coffe',
                image: 'img/product/7.jpg',
                info: 'Kami juga memiliki menu non-coffee untuk kamu yang ingin pilihan lain selain kopi dan untuk anak - anak..',
            },
            {
                name: 'Food & Snack',
                image: 'img/product/9.jpg',
                info: 'Berbagai macam makanan ringan sampai makanan utama siap menemani secangkir kopimu.',
            },
            {
                name: 'Our Bread',
                image: 'img/product/10.jpg',
                info: 'Biji kopi grade Specialty Arabica dan Fine Robusta dari 9 perkebunan terbaik Indonesia.',
            },
        ],
    };
}
// Data validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function () {
    let allFieldsFilled = true;
    for (let i = 0; i < form.elements.length; i++) {
        if (
            form.elements[i].type !== 'submit' &&
            form.elements[i].value.length === 0
        ) {
            allFieldsFilled = false;
            break;
        }
    }
    if (allFieldsFilled) {
        checkoutButton.disabled = false;
        checkoutButton.classList.remove('disabled');
    } else {
        checkoutButton.disabled = true;
        checkoutButton.classList.add('disabled');
    }
});

checkoutButton.addEventListener('click', function (e) {
    e.preventDefault();

    // Collect data from Alpine store and form
    const data = {
        items: JSON.stringify(Alpine.store('cart').items),
        total: Alpine.store('cart').total,
        name: form.elements['name'].value,
        email: form.elements['email'].value,
        phone: form.elements['phone'].value,
    };

    // Ensure total is a valid number
    if (isNaN(data.total)) {
        console.error('Total is not a number:', data.total);
        data.total = 0;
    }

    // Format message
    const message = formatMessage(data);

    // Open WhatsApp with the formatted message
    window.open(
        'http://wa.me/6281904050707?text=' + encodeURIComponent(message)
    );
});

// Function to format the WhatsApp message
const formatMessage = (obj) => {
    return `✨ *Data Customer* ✨
*Name:* ${obj.name}
*Email:* ${obj.email}
*No HP:* ${obj.phone}

📦 *Data Pesanan* 📦
${JSON.parse(obj.items)
    .map((item) => `- ${item.name} (${item.quantity} x ${rupiah(item.total)})`)
    .join('\n')}
💰 *TOTAL:* ${rupiah(obj.total)}

🙏 Terima Kasih telah berbelanja dengan kami! 🙏`;
};
