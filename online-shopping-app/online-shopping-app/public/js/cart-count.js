document.addEventListener("DOMContentLoaded", () => {
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        document.getElementById("cart-count").innerText = cart.length;
    }

    updateCartCount();

    // Listen for storage changes (so it updates when items are added)
    window.addEventListener("storage", updateCartCount);
});
