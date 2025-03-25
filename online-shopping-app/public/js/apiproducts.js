document.addEventListener("DOMContentLoaded", () => {
    fetch('/apiproducts')  // Fetch products from backend API
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById("product-list");
            productContainer.innerHTML = "";  // Clear previous content

            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product");

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <button onclick="buyNow(${product.id})">Buy Now</button>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;

                productContainer.appendChild(productCard);
            });

            updateCartCount();  // Update cart count when page loads
        })
        .catch(error => console.error("Error fetching products:", error));
});

// Handle "Buy Now" button
function buyNow(productId) {
    localStorage.setItem("buyNowProduct", productId);  // Store selected product
    window.location.href = "checkout.html";  // Redirect to checkout
}

// Handle "Add to Cart" button
function addToCart(productId) {
    fetch('/apiproducts')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);
            if (product) {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                cart.push(product);  // Store full product details
                localStorage.setItem("cart", JSON.stringify(cart));

                updateCartCount();
                alert("Product added to cart!");
            }
        });
}

// Update cart count in the header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}
