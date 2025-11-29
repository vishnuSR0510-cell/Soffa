// =========================== CART SYSTEM =============================
function getCart() {
    return JSON.parse(localStorage.getItem("soffa_cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("soffa_cart", JSON.stringify(cart));
}

// =========================== ADD TO CART =============================
function addToCart(product) {
    let cart = getCart();

    const existing = cart.find(
        item =>
            item.id === product.id &&
            item.fabric === product.fabric &&
            item.color === product.color
    );

    if (existing) {
        existing.qty += product.qty;
    } else {
        cart.push(product);
    }

    saveCart(cart);
}

// =========================== REMOVE ITEM =============================
function removeItem(id, fabric, color) {
    let cart = getCart();
    cart = cart.filter(item => !(item.id === id && item.fabric === fabric && item.color === color));
    saveCart(cart);
    renderCartPage();
}

// =========================== UPDATE QTY =============================
function updateQty(id, fabric, color, change) {
    let cart = getCart();

    cart.forEach(item => {
        if (item.id === id && item.fabric === fabric && item.color === color) {
            item.qty = Math.max(1, item.qty + change);
        }
    });

    saveCart(cart);
    renderCartPage();
}

// =========================== RENDER CART PAGE =============================
function renderCartPage() {
    const cart = getCart();
    const container = document.getElementById("cartItems");
    const subtotalBox = document.getElementById("cartSubtotal");
    const totalBox = document.getElementById("cartTotal");

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `<p class="text-center text-muted">Your cart is empty</p>`;
        subtotalBox.innerText = "₹0";
        totalBox.innerText = "₹0";
        return;
    }

    let html = "";
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.qty * item.price;

        html += `
        <div class="cart-item-card">
            <img src="${item.img}" class="cart-thumb">

            <div class="flex-grow-1">
                <div class="item-name">${item.name}</div>
                <div class="item-options">${item.fabric} • ${item.color}</div>
                <div class="fw-bold mt-2">₹${item.price.toLocaleString()}</div>

                <div class="qty-box mt-2">
                    <button class="qty-btn" onclick="updateQty('${item.id}', '${item.fabric}', '${item.color}', -1)">−</button>
                    <span class="qty-count">${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty('${item.id}', '${item.fabric}', '${item.color}', 1)">+</button>
                </div>
            </div>

            <div onclick="removeItem('${item.id}', '${item.fabric}', '${item.color}')" class="remove-btn">
                <i class="bi bi-trash"></i>
            </div>
        </div>`;
    });

    container.innerHTML = html;

    subtotalBox.innerText = "₹" + subtotal.toLocaleString();
    totalBox.innerText = "₹" + subtotal.toLocaleString();
}
