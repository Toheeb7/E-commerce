
const shoes = [
  { id: 1, name: 'Running Shoe', description: 'Comfortable running shoe', price: 59.99, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Basketball Shoe', description: 'High-top basketball shoe', price: 89.99, image: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Casual Shoe', description: 'Stylish casual shoe', price: 49.99, image: 'https://via.placeholder.com/100' }
];

function displayShoes() {
    const shoeList = document.getElementById('shoe-list');
    shoeList.innerHTML = '';
    shoes.forEach(shoe => {
        const shoeItem = document.createElement('div');
        shoeItem.classList.add('shoe-item');
        shoeItem.innerHTML = `
            <img src="${shoe.image}" alt="${shoe.name}">
            <h2>${shoe.name}</h2>
            <p>$${shoe.price.toFixed(2)}</p>
            <a href="product.html?id=${shoe.id}">View Details</a>
        `;
        shoeList.appendChild(shoeItem);
    });
}


 
function displayShoeDetails() {
    const params = new URLSearchParams(window.location.search);
    const shoeId = parseInt(params.get('id'));
    const shoe = shoes.find(shoe => shoe.id === shoeId);

    if (shoe) {
        const shoeDetails = document.getElementById('shoe-details');
        shoeDetails.innerHTML = `
            <img src="${shoe.image}" alt="${shoe.name}">
            <h2>${shoe.name}</h2>
            <p>${shoe.description}</p>
            <p>$${shoe.price.toFixed(2)}</p>
            <button onclick="addToCart(${shoe.id})">Add to Cart</button>
        `;
    } else {
        document.getElementById('shoe-details').innerHTML = '<p>Shoe not found</p>';
    }
}

// Function to add a shoe to the cart
function addToCart(shoeId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const shoe = shoes.find(shoe => shoe.id === shoeId);
    cart.push(shoe);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${shoe.name} added to cart`);
}


function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('shoe-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>$${item.price.toFixed(2)}</p>
            `;
            cartItems.appendChild(cartItem);
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('shoe-list')) {
        displayShoes();
    } else if (document.getElementById('shoe-details')) {
        displayShoeDetails();
    } else if (document.getElementById('cart-items')) {
        displayCart();
    }
});
