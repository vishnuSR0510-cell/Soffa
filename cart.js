// ===================== CART STORAGE =====================
function getCart() {
  return JSON.parse(localStorage.getItem("soffa_cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("soffa_cart", JSON.stringify(cart));
}

// ===================== ADD ITEM =====================
function addToCart(product) {
  let cart = getCart();

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += product.qty;
  } else {
    cart.push(product);
  }

  saveCart(cart);
}

// ===================== REMOVE ITEM =====================
function removeItem(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCartPage();
}

// ===================== UPDATE QTY =====================
function updateQty(id, change) {
  let cart = getCart();

  cart.forEach(item => {
    if (item.id === id) {
      item.qty = Math.max(1, item.qty + change);
    }
  });

  saveCart(cart);
  renderCartPage();
}

// ===================== RENDER CART =====================
function renderCartPage() {
  const cart = getCart();
  const container = document.getElementById("cartItems");
  const subtotalBox = document.getElementById("cartSubtotal");
  const totalBox = document.getElementById("cartTotal");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-center text-light">Your cart is empty</p>`;
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
        <div class="item-options">${item.fabric || ""} ${item.color || ""}</div>
        <div class="fw-bold mt-2">₹${item.price.toLocaleString()}</div>

        <div class="qty-box mt-2">
          <button class="qty-btn" onclick="updateQty('${item.id}', -1)">−</button>
          <span class="qty-count">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
        </div>
      </div>

      <div onclick="removeItem('${item.id}')" class="remove-btn">
        <i class="bi bi-trash"></i>
      </div>
    </div>
    `;
  });

  container.innerHTML = html;

  subtotalBox.innerText = "₹" + subtotal.toLocaleString();
  totalBox.innerText = "₹" + subtotal.toLocaleString();
}
