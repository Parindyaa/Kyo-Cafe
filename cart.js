let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; // Clear cart container

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        return;
    }

    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        cartItemDiv.innerHTML = `
            <input type="checkbox" id="item-${item.id}" data-index="${index}" onclick="toggleCheckoutRemove()">
            <label for="item-${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </label>
            <button class="remove-button" onclick="removeFromCart(${index})">Remove</button>
        `;

        cartContainer.appendChild(cartItemDiv);
    });

    toggleCheckoutRemove(); // Ensure checkout and remove buttons are updated
}

function toggleCheckoutRemove() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const checkoutButton = document.getElementById('checkout-button');
    const removeButton = document.getElementById('remove-button');

    // If at least one checkbox is checked, show buttons
    if (checkboxes.length > 0) {
        checkoutButton.style.display = 'block';
        removeButton.style.display = 'block';
    } else {
        checkoutButton.style.display = 'none';
        removeButton.style.display = 'none';
    }

    // Ensure the remove button next to an individual item appears when checked
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.style.display = 'none'; // Hide all remove buttons initially
    });

    checkboxes.forEach(checkbox => {
        const itemIndex = checkbox.getAttribute('data-index');
        // Show the individual remove button for checked items
        const removeButton = document.querySelector(`.remove-button[data-index="${itemIndex}"]`);
        if (removeButton) {
            removeButton.style.display = 'block';
        }
    });
}

function removeFromCart(index) {
    // Remove item from cart
    cart.splice(index, 1);

    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render cart
    renderCart();
}

function checkout() {
    const selectedItems = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    checkboxes.forEach(checkbox => {
        const itemIndex = checkbox.getAttribute('data-index');
        selectedItems.push(cart[itemIndex]);
    });

    if (selectedItems.length === 0) {
        alert('Please select items to checkout.');
        return;
    }

    alert(`Proceeding to checkout for ${selectedItems.length} items!`);
    console.log(selectedItems);

    // Perform the checkout logic (e.g., send the data to a server)
}

// Function to remove selected items
function removeSelectedItems() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const indicesToRemove = [];

    checkboxes.forEach(checkbox => {
        const itemIndex = checkbox.getAttribute('data-index');
        indicesToRemove.push(itemIndex);
    });

    // Remove selected items from the cart
    indicesToRemove.reverse().forEach(index => {
        cart.splice(index, 1);
    });

    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render cart
    renderCart();
}

// Initial render of the cart
renderCart();
