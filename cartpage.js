// cartPage.js — renders full cart page
document.addEventListener("DOMContentLoaded", () => renderCartPage());

function formatINR(n){ return "₹" + Number(n).toLocaleString("en-IN"); }

function renderCartPage(){
  const container = document.getElementById("cartContainer");
  const summary = document.getElementById("cartSummary");
  if (!container || !summary) return;

  const cart = loadCart();

  if (!cart || cart.length === 0) {
    container.innerHTML = `
      <div class="text-center mt-5">
        <h4 class="text-muted">Your cart is empty.</h4>
        <a href="catalogue.html" class="btn primary-btn mt-3">Continue Shopping</a>
      </div>`;
    summary.innerHTML = "";
    return;
  }

  container.innerHTML = cart.map((item, idx) => `
    <div class="cart-item d-flex flex-column flex-lg-row gap-3 p-3 rounded mb-3 shadow-sm">
      <img src="${item.img}" class="cart-img rounded" style="width:130px;height:110px;object-fit:cover">
      <div class="flex-grow-1">
        <h5 class="fw-bold">${item.name}</h5>
        <p class="text-muted small">${item.fabric} • ${item.color}</p>
        <div class="d-flex align-items-center gap-3 mt-2">
          <button class="btn btn-outline-secondary btn-sm qty-dec" data-index="${idx}">−</button>
          <span class="fw-semibold qty-value">${item.qty}</span>
          <button class="btn btn-outline-secondary btn-sm qty-inc" data-index="${idx}">+</button>
        </div>
        <div class="text-danger small mt-2 remove-btn" data-index="${idx}" style="cursor:pointer">Remove</div>
      </div>
      <div class="price-section fw-bold fs-5">${formatINR(item.price * item.qty)}</div>
    </div>
  `).join("");

  summary.innerHTML = `
    <h4 class="fw-bold">Order Summary</h4>
    <div class="d-flex justify-content-between mt-3">
      <span>Subtotal</span>
      <span class="fw-bold">${formatINR(cartTotal())}</span>
    </div>
    <button class="btn primary-btn w-100 mt-4 py-2">Proceed to Checkout</button>
  `;

  // attach events
  container.querySelectorAll(".qty-inc").forEach(btn => btn.addEventListener("click", ()=>{
    const i = Number(btn.dataset.index);
    const c = loadCart();
    updateQty(i, c[i].qty + 1);
    renderCartPage();
  }));
  container.querySelectorAll(".qty-dec").forEach(btn => btn.addEventListener("click", ()=>{
    const i = Number(btn.dataset.index);
    const c = loadCart();
    if (c[i].qty > 1) updateQty(i, c[i].qty - 1);
    renderCartPage();
  }));
  container.querySelectorAll(".remove-btn").forEach(btn => btn.addEventListener("click", ()=>{
    removeFromCart(btn.dataset.index);
    renderCartPage();
  }));
}
