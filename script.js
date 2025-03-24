
document.addEventListener("DOMContentLoaded", function () {
    // Counter Animation
    const counter = document.getElementById("shop-counter");
    if (counter) {
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
    }

    // Cart Management
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

    // Functionality to add item to cart when "Add to Cart" button is clicked
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();
        updateCartCount();
    }

    // Attaching event listeners to "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const productId = parseInt(this.getAttribute("data-id"));
            const productName = this.getAttribute("data-name");
            const productPrice = parseFloat(this.getAttribute("data-price"));
            const productImage = this.getAttribute("data-image");

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage
            };

            addToCart(product);
        });
    });

    updateCartCount();
    renderCart();

    // Menu items for each category
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
            { id: 11, name: "Cinnamon roll",price:2.50, image: "Images/cinnamon.jpg"},
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

        // Add more categories here


    Object.keys(menuItems).forEach(category => {
        renderMenu(category, menuItems[category]);
    });

    function renderMenu(category, items) {
        const categoryGrid = document.getElementById(category);
        if (!categoryGrid) return;

        categoryGrid.innerHTML = "";
        items.forEach(item => {
            const menuItemCard = document.createElement("div");
            menuItemCard.classList.add("menu-item");

            menuItemCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">Add to Cart</button>
            `;

            categoryGrid.appendChild(menuItemCard);
        });
    }
});
