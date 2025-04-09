document.addEventListener("DOMContentLoaded", function () {
    // Counter Animation
    const counter = document.getElementById("shop-counter");
    if (counter) {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        let started = false;

        const updateCounter = () => {
            if (count < target) {
                count += 1;
                counter.textContent = count;
                setTimeout(updateCounter, 50);
            }
        };

        const isElementInViewport = (el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

        const onScroll = () => {
            if (!started && isElementInViewport(counter)) {
                started = true;
                updateCounter();
                window.removeEventListener("scroll", onScroll);
            }
        };

        window.addEventListener("scroll", onScroll);
    }

    renderAllMenus();
});

let cart = [];

function addToCart(id, category) {
    const item = menuItems[category].find(item => item.id === id);
    const existingItem = cart.find(c => c.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1, selected: true });
    }

    renderCart();
}

function renderCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Cart is empty</p>";
        return;
    }

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `
            <input type="checkbox" onchange="toggleSelect(${item.id})" ${item.selected ? "checked" : ""}>
            <img src="${item.image}" width="60">
            ${item.name} - $${item.price.toFixed(2)}
            <br>
            Quantity: 
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
            ${item.quantity}
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
            <br>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartDiv.appendChild(itemDiv);
    });
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, category) {
    const item = menuItems[category].find(item => item.id === id);
    const existingItem = cart.find(c => c.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1, selected: true });
    }

    saveCart(); //  save to localStorage
    renderCart();
}

function changeQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }

    saveCart(); // 
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart(); // 
    renderCart();
}

function toggleSelect(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.selected = !item.selected;
        saveCart(); // 
    }
}


// Menu items data
const menuItems = {
    "baked-items": [
        { id: 1, name: "Rolls", price: 2.50, image: "Images/rolls1.jpg" },
        { id: 2, name: "Pastries", price: 3.00, image: "Images/Fish-Pastry.jpg" },
        { id: 3, name: "Egg Rolls", price: 2.80, image: "Images/egg rolls.jpg" },
        { id: 4, name: "Chicken Rolls", price: 3.20, image: "Images/Chicken rolls.jpg" },
        { id: 5, name: "Fish Rolls", price: 3.50, image: "Images/Fish rolls.jpg" },
        { id: 6, name: "Pizza", price: 4.00, image: "Images/pizza.jpg" },
        { id: 7, name: "Fish pattie", price: 4.00, image: "Images/Fish-Pastry.jpg" },
        { id: 8, name: "Chicken Pie", price: 4.00, image: "Images/chicken pie.jpg" },
        { id: 9, name: "Chicken Pattie", price: 4.00, image: "Images/chicken pattie.jpg" },
        { id: 10, name: "Veg Pattie", price: 4.00, image: "Images/vegs.jpg" },
    ],
    "Desserts": [
        { id: 11, name: "Cinnamon roll", price: 2.50, image: "Images/cinnamon.jpg" },
        { id: 12, name: "Pudding", price: 4.50, image: "Images/pudding.jpg" },
        { id: 13, name: "IceCream ", price: 5.00, image: "Images/icecream.jpg" },
        { id: 14, name: "Biscuit Pudding", price: 4.00, image: "Images/biscuit pudding.jpg" },
        { id: 15, name: "Chocolate Moose", price: 4.00, image: "Images/moose.jpg" },
        { id: 16, name: "Chocolate Brownies", price: 4.00, image: "Images/brownies.jpg" },
        { id: 17, name: "Doughnut", price: 4.00, image: "Images/doughnut.jpg" },
        { id: 18, name: "Muffins", price: 4.00, image: "Images/muffins.jpg" },
    ],
    "Bread and Sandwiches": [
        { id: 19, name: "Chicken Sandwich", price: 2.50, image: "Images/c-sandwich.jpg" },
        { id: 20, name: "Fish Sandwich", price: 4.50, image: "Images/tuna.jpeg" },
        { id: 21, name: "Cheese Sandwich", price: 5.00, image: "Images/cheese.jpg" },
        { id: 22, name: "Submarine", price: 4.00, image: "Images/submarine.jpg" },
        { id: 23, name: "Veg Sandwich", price: 4.00, image: "Images/vegs.jpg" },
        { id: 24, name: "Egg Sandwich", price: 4.00, image: "Images/eggs.jpg" },
        { id: 25, name: "Grilled Cheese", price: 4.00, image: "Images/grilchee.jpg" },
        { id: 26, name: "Garlic Bread", price: 4.00, image: "Images/garlic.jpg" },
        { id: 27, name: "Chicken Burger", price: 4.00, image: "Images/cburgur.jpg" },
        { id: 28, name: "Bacon Burger", price: 4.00, image: "Images/bburgur.jpg" },
        { id: 29, name: "French Fries", price: 4.00, image: "Images/french.jpg" }, 
    ],
    "Beverages": [
        { id: 30, name: "Hot-Coffee", price: 2.50, image: "Images/hcoffee.jpg" },
        { id: 31, name: "Iced-Coffee", price: 4.50, image: "Images/icoffee.jpg" },
        { id: 32, name: "Americano", price: 5.00, image: "Images/americano.jpeg" },
        { id: 33, name: "Cafe-Latte", price: 5.00, image: "Images/Cafe-Latte.jpg" },
        { id: 34, name: "Espresso", price: 5.00, image: "Images/espresso.jpg" },
        { id: 35, name: "Match-Latte", price: 5.00, image: "Images/mlatte.jpg" },
        { id: 36, name: "Vanilla-Milk Shake", price: 5.00, image: "Images/vanilla.jpg" },
        { id: 37, name: "Chocolate-Milk Shake", price: 5.00, image: "Images/chocolate.jpg" },
        { id: 38, name: "Strawberry-Milk Shake", price: 5.00, image: "Images/strawberry.jpg" },
        { id: 39, name: "Bubble-Tea", price: 5.00, image: "Images/bubble.jpg" },
        { id: 40, name: "Lemonade", price: 5.00, image: "Images/lemonade.jpg" },
        { id: 41, name: "Hot-Chocolate", price: 5.00, image: "Images/hot choco.jpg" },
    ],
    "cakes": [
        { id: 42, name: "Cupcake", price: 2.50, image: "Images/cup.jpg" },
        { id: 43, name: "Carrot Cake", price: 4.50, image: "images/carrot.jpg" },
        { id: 44, name: "Coffee Cake", price: 5.00, image: "Images/coffee cake.jpg" },
        { id: 45, name: "Ribbon Cake", price: 5.00, image: "Images/ribbon.jpg" },
        { id: 46, name: "Cake Pieces", price: 5.00, image: "Images/pieses.jpg" },
        { id: 47, name: "Caramel Cake", price: 5.00, image: "Images/caramel.jpg" },
        { id: 48, name: "Cheese Cake", price: 5.00, image: "Images/cheese cake.jpg" },
        { id: 49, name: "Red-Velvet Cake", price: 5.00, image: "Images/red.jpg" },
        { id: 50, name: "Fruit Gateau", price: 5.00, image: "Images/fruit.jpg" }
    ]
};

function renderAllMenus() {
    Object.keys(menuItems).forEach(category => {
        const container = document.getElementById(category);
        if (container) {
            container.innerHTML = "";
            menuItems[category].forEach(item => {
                const div = document.createElement("div");
                div.classList.add("menu-item");
                div.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" width="100">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                    <button onclick="addToCart(${item.id}, '${category}')">Add to Cart</button>
                `;
                container.appendChild(div);
            });
        }
    });
}
