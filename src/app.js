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
            { name: 'Dalgona', image: 'img/product/1.jpg', price: 32000 },
            { name: 'Americano', image: 'img/product/2.jpg', price: 31000 },
            { name: 'Espresso', image: 'img/product/3.jpg', price: 20000 },
            { name: 'Caffé Latte', image: 'img/product/4.jpg', price: 33000 },
            { name: 'Mocca', image: 'img/product/5.jpg', price: 34000 },
            { name: 'Machiato', image: 'img/product/6.jpg', price: 24000 },
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

// Send data when the checkout button is clicked
checkoutButton.addEventListener('click', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    console.log(objData);
});
