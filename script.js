// active hamburger menu
const navbarNav = document.querySelector('.navbar-nav');

document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// active search
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
    e.preventDefault(); // Prevent default action to avoid unintended behaviors
    searchForm.classList.toggle('active');
};

// hamburger menu
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }

    if (
        !searchForm.contains(e.target) &&
        !document.querySelector('#search-button').contains(e.target)
    ) {
        searchForm.classList.remove('active');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const navbarNav = document.querySelector('.navbar-nav');
    const searchForm = document.querySelector('.search-form');
    const searchBox = document.querySelector('#search-box');
    const hamburger = document.querySelector('#hamburger-menu');
    const searchButton = document.querySelector('#search-button');
    const cart = document.querySelector('.shopping-cart');
    const cartButton = document.getElementById('shopping-cart');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    // Toggle navbar menu
    hamburger.onclick = () => {
        navbarNav.classList.toggle('active');
    };

    // Toggle search form
    searchButton.onclick = (e) => {
        e.preventDefault(); // Prevent default action to avoid unintended behaviors
        searchForm.classList.toggle('active');
    };

    // Close navbar and search form when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
            navbarNav.classList.remove('active');
        }

        if (
            !searchForm.contains(e.target) &&
            !searchButton.contains(e.target)
        ) {
            searchForm.classList.remove('active');
        }

        if (!cart.contains(e.target) && !cartButton.contains(e.target)) {
            cart.style.display = 'none';
        }
    });

    // Toggle shopping cart display
    cartButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Stop the click event from propagating to document
        cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
    });

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product');
            const productName = product.querySelector('h3').innerText;
            const productPrice = parseFloat(
                product.querySelector('.product-price').innerText
            );

            const cartItem = document.createElement('li');
            cartItem.innerHTML = `${productName} - $${productPrice.toFixed(
                2
            )} <button class="remove-item">Remove</button>`;
            cartItems.appendChild(cartItem);

            total += productPrice;
            cartTotal.innerText = total.toFixed(2);

            // Remove item from cart functionality
            cartItem
                .querySelector('.remove-item')
                .addEventListener('click', () => {
                    cartItems.removeChild(cartItem);
                    total -= productPrice;
                    cartTotal.innerText = total.toFixed(2);
                });
        });
    });
});

// Modal box
const itemDetailModals = document.querySelectorAll('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');
const closeModalButtons = document.querySelectorAll('.close');

itemDetailButtons.forEach((btn, index) => {
    btn.onclick = (e) => {
        // Mengubah tampilan modal yang sesuai dengan tombol ditekan menjadi 'flex'
        itemDetailModals[index].style.display = 'flex';
        e.preventDefault();
    };
});

closeModalButtons.forEach((btn, index) => {
    btn.onclick = () => {
        // Mengubah tampilan modal yang sesuai dengan tombol close ditekan menjadi 'none'
        itemDetailModals[index].style.display = 'none';
    };
});

// Menambahkan event listener untuk menutup modal saat area di luar modal ditekan
window.onclick = (event) => {
    itemDetailModals.forEach((modal) => {
        if (event.target === modal) {
            // Menutup modal hanya jika yang diklik adalah area di luar modal
            modal.style.display = 'none';
        }
    });
};

// Mendapatkan elemen tombol close
const closeModalButton = document.querySelector('.close');

// Menambahkan event listener ke tombol close
closeModalButton.addEventListener('click', (e) => {
    e.preventDefault(); // Mencegah navigasi ke halaman #
    itemDetailModals.style.display = 'none'; // Menutup modal
});

// Menambahkan event listener untuk menutup modal saat area di luar modal ditekan
window.onclick = (event) => {
    if (event.target === itemDetailModals) {
        // Menutup modal hanya jika yang diklik adalah area di luar modal
        itemDetailModals.style.display = 'none';
    }
};
