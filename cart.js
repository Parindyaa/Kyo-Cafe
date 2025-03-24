document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        const cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.innerText = totalItems;
        }
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function renderCart() {
        const cartContainer = document.getElementById("cart-items");
        if (!cartContainer) return;

        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
            return;
        }

        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: <button class="decrease" data-id="${item.id}">-</button> 
                ${item.quantity} 
                <button class="increase" data-id="${item.id}">+</button></p>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;

            cartContainer.appendChild(cartItem);
        });

        attachCartListeners();
    }

    function attachCartListeners() {
        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", function () {
                const productId = parseInt(this.getAttribute("data-id"));
                const item = cart.find(p => p.id === productId);
                if (item) {
                    item.quantity += 1;
                    saveCart();
                    renderCart();
                }
            });
        });

        document.querySelectorAll(".decrease").forEach(button => {
            button.addEventListener("click", function () {
                const productId = parseInt(this.getAttribute("data-id"));
                const item = cart.find(p => p.id === productId);
                if (item && item.quantity > 1) {
                    item.quantity -= 1;
                    saveCart();
                    renderCart();
                }
            });
        });

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const productId = parseInt(this.getAttribute("data-id"));
                cart = cart.filter(p => p.id !== productId);
                saveCart();
                renderCart();
            });
        });
    }

    updateCartCount();
    renderCart();
});
