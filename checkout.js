// ======================= GET CART ============================
function getCart() {
    return JSON.parse(localStorage.getItem("soffa_cart")) || [];
}

// ======================= RENDER CHECKOUT ITEMS ===============
function renderCheckout() {
    const cart = getCart();
    const container = document.getElementById("checkoutItems");
    const subtotalBox = document.getElementById("checkoutSubtotal");

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `<p class="text-muted">Your cart is empty.</p>`;
        subtotalBox.innerText = "₹0";
        return;
    }

    let html = "";
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.qty * item.price;

        html += `
        <div class="checkout-item d-flex gap-3 mb-3 p-3 rounded" 
             style="background:#f7f3ee;border:1px solid #d9c9b8;">

            <img src="${item.img}" class="checkout-thumb rounded"
                 style="width:80px;height:80px;object-fit:cover;">

            <div class="flex-grow-1">
                <div class="fw-bold">${item.name}</div>
                <div class="text-muted small">${item.fabric} • ${item.color}</div>
                <div class="fw-semibold mt-1">Qty: ${item.qty}</div>
            </div>

            <div class="fw-bold">
                ₹${(item.qty * item.price).toLocaleString()}
            </div>
        </div>
        `;
    });

    container.innerHTML = html;
    subtotalBox.innerText = "₹" + subtotal.toLocaleString();
}


// ======================= CITY LIST ============================
const cityList = {
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangalore"],
    "Kerala": ["Kochi", "Trivandrum", "Calicut"],
    "Andhra Pradesh": ["Vijayawada", "Vizag", "Guntur"],
    "Telangana": ["Hyderabad", "Warangal"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"]
};

document.getElementById("state").addEventListener("change", () => {
    const state = document.getElementById("state").value;
    const cityDropdown = document.getElementById("city");

    cityDropdown.innerHTML = `<option value="">Select City</option>`;

    if (cityList[state]) {
        cityList[state].forEach(city => {
            cityDropdown.innerHTML += `<option>${city}</option>`;
        });
    }
});


// ======================= FORM VALIDATION ============================
function validateCheckoutForm() {
    let valid = true;

    const name = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const state = document.getElementById("state").value.trim();
    const city = document.getElementById("city").value.trim();
    const pincode = document.getElementById("pincode").value.trim();

    // Name
    showError("nameError", name.length < 3);

    // Phone
    showError("phoneError", !/^[6-9]\d{9}$/.test(phone));

    // Email
    showError("emailError", !email.match(/^\S+@\S+\.\S+$/));

    // Address
    showError("addressError", address.length < 5);

    // State
    showError("stateError", state === "");

    // City
    showError("cityError", city === "");

    // Pincode
    showError("pinError", !/^\d{6}$/.test(pincode));

    return document.querySelectorAll(".text-danger:not(.d-none)").length === 0;
}

function showError(id, condition) {
    document.getElementById(id).classList.toggle("d-none", !condition);
}


// ======================= PLACE ORDER BUTTON ============================
document.addEventListener("DOMContentLoaded", () => {

    renderCheckout();

    const placeOrderBtn = document.getElementById("placeOrderBtn");

    placeOrderBtn.addEventListener("click", () => {

        if (!validateCheckoutForm()) {
            alert("Please fill all fields correctly!");
            return;
        }

        if (getCart().length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Clear cart
        localStorage.removeItem("soffa_cart");

        // Hide form + summary
        document.getElementById("checkoutFormArea").classList.add("d-none");
        document.getElementById("summaryArea").classList.add("d-none");

        // Show success
        document.getElementById("orderSuccess").classList.remove("d-none");
    });
});
function loadCustomConfig() {

    let config = JSON.parse(localStorage.getItem("custom_config")) || {};
    let price = localStorage.getItem("custom_price") || "0";

    let box = document.getElementById("configDetails");
    let priceBox = document.getElementById("configTotal");

    if (!box) return;

    let html = "";

    for (let key in config) {
        if (config[key]) {
            html += `
                <div class="d-flex justify-content-between">
                    <span>${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <span class="fw-semibold">${config[key]}</span>
                </div>
            `;
        }
    }

    box.innerHTML = html;
    priceBox.innerText = "₹" + price;
}

document.addEventListener("DOMContentLoaded", loadCustomConfig);
