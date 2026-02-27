// script.js - handles cart and interactivity for farmer ecommerce

const products = [
    { id: 1, name: 'Fresh Tomatoes', price: 30, image: 'https://via.placeholder.com/200?text=Tomatoes' },
    { id: 2, name: 'Organic Apples', price: 50, image: 'https://via.placeholder.com/200?text=Apples' },
    { id: 3, name: 'Basmati Rice (1kg)', price: 80, image: 'https://via.placeholder.com/200?text=Rice' },
    { id: 4, name: 'Pure Milk (1L)', price: 40, image: 'https://via.placeholder.com/200?text=Milk' }
];

let cart = [];

function init() {
    renderProducts();
    document.getElementById('cart-btn').addEventListener('click', toggleCart);
    document.getElementById('checkout-btn').addEventListener('click', showCheckout);
    document.getElementById('purchase-form').addEventListener('submit', handlePurchase);
    const printBtn = document.getElementById('print-btn');
    if (printBtn) printBtn.addEventListener('click', () => window.print());

    // contact form stub
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e){
            e.preventDefault();
            alert('Thank you for your message. We will get back to you soon.');
            contactForm.reset();
        });
    }
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h4>${p.name}</h4>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    toggleCart(true);
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        `;
        container.appendChild(div);
    });
    const totalDiv = document.getElementById('cart-total');
    totalDiv.textContent = `Total: ₹${total}`;
}

function toggleCart(forceOpen) {
    const cartEl = document.getElementById('cart');
    if (forceOpen === true) {
        cartEl.classList.add('open');
    } else {
        cartEl.classList.toggle('open');
    }
}

function showCheckout() {
    document.getElementById('checkout-page').classList.add('active');
    document.getElementById('main-content').style.display = 'none';
    toggleCart(false);
}

function handlePurchase(e) {
    e.preventDefault();
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const message = document.getElementById('cust-message').value;
    const receipt = generateReceipt(name, phone, message);
    const receiptEl = document.getElementById('receipt');
    receiptEl.textContent = receipt;
    const printBtn = document.getElementById('print-btn');
    if (printBtn) printBtn.style.display = 'block';
}

function generateReceipt(name, phone, message) {
    let text = '--- Purchase Receipt ---\n';
    text += `Customer: ${name}\n`;
    text += `Phone: ${phone}\n`;
    text += `Message: ${message}\n\n`;
    let total = 0;
    cart.forEach(item => {
        text += `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
        total += item.price * item.quantity;
    });
    text += `\nTotal Amount: ₹${total}\n`;
    text += '\nThank you for shopping local!';
    return text;
}

// initialize when DOM ready
window.addEventListener('DOMContentLoaded', init);
