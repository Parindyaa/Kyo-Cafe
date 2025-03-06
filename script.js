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
        { id: 6, name: "Pizza", price: 4.00, image: "images/cinnamonrolls.jpg" },
        { id: 7, name: "Chicken Pie", price: 4.00, image: "images/cinnamonrolls.jpg" },
        { id: 8, name: "Fish Pattie", price: 4.00, image: "images/cinnamonrolls.jpg" },
        { id: 9, name: "Chicken Pattie", price: 4.00, image: "images/cinnamonrolls.jpg" },
        { id: 10, name: "Veg Pattie", price: 4.00, image: "images/cinnamonrolls.jpg" },
    ],
    "Desserts": [
        { id: 11, name: "Cinnomen Roll", price: 2.50, image: "images/cupcake.jpg" },
        { id: 12, name: "Pudding", price: 4.50, image: "images/carrotcake.jpg" },
        { id: 13, name: "IceCream With Jelly", price: 5.00, image: "images/coffeecake.jpg" },
        { id: 14, name: "Biscuit Pudding", price: 4.00, image: "images/cinnamonrolls.jpg" },
        { id: 15, name: "Chocolate Moose", price: 4.00, image: "images/cinnamonrolls.jpg" },
        { id: 16, name: "Chocolate Brownies", price: 4.00, image: "images/cinnamonrolls.jpg" },
        { id: 17, name: "Doughnut", price: 4.00, image: "images/cinnamonrolls.jpg" },
        { id: 18, name: "Muffins", price: 4.00, image: "images/cinnamonrolls.jpg" },

    ],
    "cakes": [
        { id: 19, name: "Cupcake", price: 2.50, image: "images/cupcake.jpg" },
        { id: 20, name: "Carrot Cake", price: 4.50, image: "images/carrotcake.jpg" },
        { id: 21, name: "Coffee Cake", price: 5.00, image: "images/coffeecake.jpg" }
    ]
};

function renderMenu(category, items) {
    const categoryGrid = document.getElementById(category);
    items.forEach(item => {
        const menuItemCard = document.createElement('div');
        menuItemCard.classList.add('menu-item');
        
        menuItemCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>$${item.price.toFixed(2)}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        
        categoryGrid.appendChild(menuItemCard);
    });
}

// Render all categories
renderMenu('baked-items', menuItems['baked-items']);
renderMenu('desserts', menuItems['Desserts']);
renderMenu('cakes', menuItems['cakes']);

function addToCart(itemId) {
// You can implement the add to cart functionality here
console.log(`Item with ID ${itemId} added to cart`);
}