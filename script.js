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
            cartCountElement.innerText = cart.length;
        }
    }

    function addToCart(product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    // Fetch and Display Menu Items
    const menuContainer = document.getElementById("menu-items");
    if (menuContainer) {
        fetch("products.json")
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    const div = document.createElement("div");
                    div.classList.add("menu-item");
                    div.innerHTML = `
                        <h3>${item.name}</h3>
                        <p>${item.price}</p>
                        <button class="add-to-cart" data-item='${JSON.stringify(item)}'>Add to Cart</button>
                    `;
                    menuContainer.appendChild(div);
                });

                // Attach event listeners after elements are created
                document.querySelectorAll(".add-to-cart").forEach(button => {
                    button.addEventListener("click", function () {
                        const product = JSON.parse(this.getAttribute("data-item"));
                        addToCart(product);
                    });
                });
            })
            .catch(error => console.error("Error loading products:", error));
    }

    // Display Cart Items
    const cartContainer = document.getElementById("cart-items");
    if (cartContainer) {
        cart.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("menu-item");
            div.innerHTML = `<h3>${item.name}</h3><p>${item.price}</p>`;
            cartContainer.appendChild(div);
        });
    }

    updateCartCount();

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
            { id: 10, name: "Veg Pattie", price: 4.00, image: "Images/veg patt.jpg" },
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
            { id: 44, name: "Coffee Cake", price: 5.00, image: "images/coffeecake.jpg" },
            { id: 45, name: "Ribbon Cake", price: 5.00, image: "images/coffeecake.jpg" },
            { id: 46, name: "Cake Pieces", price: 5.00, image: "images/coffeecake.jpg" },
            { id: 47, name: "Caramel Cake", price: 5.00, image: "images/coffeecake.jpg" },
            { id: 48, name: "Cheese Cake", price: 5.00, image: "images/coffeecake.jpg" },
            { id: 49, name: "Red-Velvet Cake", price: 5.00, image: "images/coffeecake.jpg" },
            { id: 50, name: "Fruit Gateau", price: 5.00, image: "images/coffeecake.jpg" }
        ]
    };

    // Render all categories
    renderMenu('baked-items', menuItems['baked-items']);
    renderMenu('desserts', menuItems['Desserts']);
    renderMenu('Bread and Sandwiches', menuItems['Bread and Sandwiches']);
    renderMenu('Beverages', menuItems['Beverages']);
    renderMenu('cakes', menuItems['cakes']);
});

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

function addToCart(itemId) {
    const item = Object.values(menuItems).flat().find(item => item.id === itemId);
    
    if (!item) {
        console.error("Item not found");
        return;
    }

    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`${item.name} added to cart!`);
    updateCartCount();
}
