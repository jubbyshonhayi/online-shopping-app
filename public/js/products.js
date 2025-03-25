document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products-container");
    const cartCount = document.getElementById("cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const products = [
        { id: 1, name: "Cake", price: 15, image: "images/cake.jpg" },
        { id: 2, name: "Cupcakes", price: 10, image: "images/cupcakes.jpg" },
        { id: 3, name: "Buffet", price: 50, image: "images/buffet.jpg" }
    ];

    function renderProducts() {
        productsContainer.innerHTML = "";
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
                <button onclick="buyNow(${product.id})">Buy Now</button>
            `;

            productsContainer.appendChild(productCard);
        });
    }

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to cart!`);
    };

    window.buyNow = function(productId) {
        alert(`Redirecting to checkout...`);
        window.location.href = "checkout.html";
    };

    function updateCartCount() {
        cartCount.innerText = cart.length;
    }

    renderProducts();
    updateCartCount();
    
});
