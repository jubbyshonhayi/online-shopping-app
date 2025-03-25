document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-container");
    const cartTotal = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-button");
    const clearCartButton = document.getElementById("clear-cart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        document.getElementById("cart-count").innerText = cart.length;
    }

    function renderCart() {
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            cartTotal.style.display = "none";
            checkoutButton.style.display = "none";
            clearCartButton.style.display = "none";
            return;
        }

        cartTotal.style.display = "block";
        checkoutButton.style.display = "inline-block";
        clearCartButton.style.display = "inline-block";

        let total = 0;

        cart.forEach((product, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
                <button onclick="buySingleItem(${index})">Buy Item</button>
            `;

            cartContainer.appendChild(cartItem);
            total += product.price;
        });

        cartTotal.innerText = `Total: $${total}`;
        updateCartCount();
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    };

    window.buySingleItem = function(index) {
        localStorage.setItem("checkoutItem", JSON.stringify(cart[index]));
        window.location.href = "checkout.html";
    };

    checkoutButton.addEventListener("click", () => {
        localStorage.setItem("checkoutItem", JSON.stringify(cart));
        window.location.href = "checkout.html";
    });

    clearCartButton.addEventListener("click", () => {
        localStorage.removeItem("cart");
        cart = [];
        renderCart();
    });

    renderCart();
});
