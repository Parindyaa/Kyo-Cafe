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
// Menu items for each category
const menuItems = {
    "baked-items": [
        { id: 1, name: "Rolls", price: 2.50, image: "images/rolls.jpg" },
        { id: 2, name: "Pastries", price: 3.00, image: "images/pastries.jpg" },
        { id: 3, name: "Egg Rolls", price: 2.80, image: "images/eggrolls.jpg" },
        { id: 4, name: "Fish Rolls", price: 3.20, image: "images/fishrolls.jpg" },
        { id: 5, name: "Chicken Rolls", price: 3.50, image: "images/chickenrolls.jpg" },
        { id: 6, name: "Cinnamon Rolls", price: 4.00, image: "images/cinnamonrolls.jpg" }
    ],
    "cakes": [
        { id: 7, name: "Cupcake", price: 2.50, image: "images/cupcake.jpg" },
        { id: 8, name: "Carrot Cake", price: 4.50, image: "images/carrotcake.jpg" },
        { id: 9, name: "Coffee Cake", price: 5.00, image: "images/coffeecake.jpg" }
    ]
};

// Function to render menu items in their respective categories
function renderMenu() {
    Object.keys(menuItems).forEach(category => {
        const container = document.getElementById(category);
        menuItems[category].forEach(item => {
            const div = document.createElement("div");
            div.classList.add("menu-item");
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width:100px; height:100px;">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            `;
            container.appendChild(div);
        });
    });
}

// Function to add items to cart
const cart = [];
function addToCart(itemId) {
    const item = Object.values(menuItems).flat().find(i => i.id === itemId);
    cart.push(item);
    document.getElementById("cart-count").innerText = cart.length;
}

// Initialize menu when page loads
document.addEventListener("DOMContentLoaded", renderMenu);
