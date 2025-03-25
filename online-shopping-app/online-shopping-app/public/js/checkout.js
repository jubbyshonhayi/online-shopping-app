document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Order confirmed! Thank you for shopping.");
    document.getElementById("checkout-container").innerHTML = "<h2>Order Placed Successfully!</h2>";
});
