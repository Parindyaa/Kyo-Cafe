document.addEventListener("DOMContentLoaded", function () {
    const counter = document.getElementById("shop-counter");
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const updateCounter = () => {
        if (count < target) {
            count += 1;
            counter.textContent = count;
            setTimeout(updateCounter, 50);
        }
    };

    updateCounter();
});


document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        document.getElementById("cart-count").innerText = cart.length;
    }

    function addToCart(product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    if (document.getElementById("menu-items")) {
        fetch("products.json")
            .then(response => response.json())
            .then(data => {
                const menuContainer = document.getElementById("menu-items");
                data.forEach(item => {
                    const div = document.createElement("div");
                    div.classList.add("menu-item");
                    div.innerHTML = `
                        <h3>${item.name}</h3>
                        <p>${item.price}</p>
                        <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
                    `;
                    menuContainer.appendChild(div);
                });
            });
    }

    if (document.getElementById("cart-items")) {
        const cartContainer = document.getElementById("cart-items");
        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("menu-item");
            div.innerHTML = `<h3>${item.name}</h3><p>${item.price}</p>`;
            cartContainer.appendChild(div);
        });
    }

    updateCartCount();
});
