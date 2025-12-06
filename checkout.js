// ======================= CART ============================
function getCart() {
    return JSON.parse(localStorage.getItem("soffa_cart")) || [];
}

// ======================= SHIPPING ============================
function calculateShipping(subtotal) {
    const country = document.getElementById("country").value.trim().toLowerCase();
    let shipping = 0;
    let message = "";

    if (!country) return {shipping: 0, total: subtotal, message: ""};

    if (country === "india") {
        shipping = 0;
        message = "🚚 Free Delivery within India";
    } else {
        shipping = 2500;
        message = "🌍 International Shipping (+₹2,500)";
    }

    return {shipping, total: subtotal + shipping, message};
}

// ======================= RENDER CHECKOUT ============================
function renderCheckout() {
    const cart = getCart();
    const container = document.getElementById("checkoutItems");
    const subtotalBox = document.getElementById("checkoutSubtotal");
    const shippingBox = document.getElementById("shippingCost");
    const totalBox = document.getElementById("grandTotal");
    const msgBox = document.getElementById("shippingMessage");

    if (cart.length === 0) {
        container.innerHTML = `<p class="text-muted">Your cart is empty.</p>`;
        subtotalBox.innerText = "₹0";
        shippingBox.innerText = "₹0";
        totalBox.innerText = "₹0";
        msgBox.innerHTML = "";
        return;
    }

    let html = "";
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.qty * item.price;

        html += `
        <div class="checkout-item d-flex gap-3 mb-3 p-3 rounded">
            <img src="${item.img}" style="width:80px;height:80px;object-fit:cover;border-radius:5px;">
            <div class="flex-grow-1">
                <div class="fw-bold text-light">${item.name}</div>
                <div class="text-muted small">${item.fabric} • ${item.color}</div>
                <div class="fw-semibold mt-1 text-light">Qty: ${item.qty}</div>
            </div>
            <div class="fw-bold text-light">₹${(item.qty * item.price).toLocaleString()}</div>
        </div>`;
    });

    container.innerHTML = html;
    subtotalBox.innerText = "₹" + subtotal.toLocaleString();

    const ship = calculateShipping(subtotal);

    shippingBox.innerText = "₹" + ship.shipping.toLocaleString();
    totalBox.innerText = "₹" + ship.total.toLocaleString();
    msgBox.innerHTML = ship.message;
}



// ======================= VALIDATION ============================
function showError(id, condition) {
    document.getElementById(id).classList.toggle("d-none", !condition);
}

function validateCheckoutForm() {

    const name = fullName.value.trim();
    const phoneVal = phone.value.trim();
    const emailVal = email.value.trim();
    const addr = address.value.trim();
    const countryVal = country.value.trim();
    const stateVal = state.value.trim();
    const cityVal = city.value.trim();
    const pin = pincode.value.trim();

    showError("nameError", name.length < 3);
    showError("phoneError", !/^[0-9]{7,15}$/.test(phoneVal));
    showError("emailError", !emailVal.match(/^\S+@\S+\.\S+$/));
    showError("addressError", addr.length < 5);
    showError("countryError", countryVal.length < 2);
    showError("stateError", stateVal.length < 2);
    showError("cityError", cityVal.length < 2);
    showError("pinError", pin.length < 3);

    return document.querySelectorAll(".text-danger:not(.d-none)").length === 0;
}



// ======================= PLACE ORDER ============================
document.addEventListener("DOMContentLoaded", () => {

    renderCheckout();

    document.getElementById("country").addEventListener("input", renderCheckout);

    document.getElementById("placeOrderBtn").addEventListener("click", () => {

        if (!validateCheckoutForm()) {
            alert("Please fill all fields correctly!");
            return;
        }

        if (getCart().length === 0) {
            alert("Your cart is empty!");
            return;
        }

        localStorage.removeItem("soffa_cart");

        document.getElementById("checkoutFormArea").classList.add("d-none");
        document.getElementById("summaryArea").classList.add("d-none");

        document.getElementById("orderSuccess").classList.remove("d-none");
    });
});
