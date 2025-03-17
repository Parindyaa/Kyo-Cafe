document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        const cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
            cartCountElement.innerText = cart.length;
        }
    }

    function renderCart() {
        const cartContainer = document.getElementById("cart-items");
        if (!cartContainer) return;

        cartContainer.innerHTML = "";
        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                    <button class="remove-from-cart" data-index="${index}">Remove</button>
                </div>
            `;
            cartContainer.appendChild(div);
        });

        document.querySelectorAll(".remove-from-cart").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
                updateCartCount();
            });
        });
    }

    updateCartCount();
    renderCart();
});
