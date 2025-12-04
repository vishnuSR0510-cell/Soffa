// ========= STATE → CITY MAP =========
const cityList = {
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangalore"],
  "Kerala": ["Kochi", "Trivandrum", "Calicut"],
  "Andhra Pradesh": ["Vijayawada", "Vizag", "Guntur"],
  "Telangana": ["Hyderabad", "Warangal"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"]
};

document.addEventListener("DOMContentLoaded", () => {
  // Populate summary from localStorage
  const raw = localStorage.getItem("soffa_custom_order");
  const summaryList = document.getElementById("customSummaryList");
  const baseEl = document.getElementById("customBasePrice");
  const upgEl = document.getElementById("customUpgradePrice");
  const totalEl = document.getElementById("customTotalPrice");

  if (!raw) {
    if (summaryList) {
      summaryList.innerHTML = `<li>No custom configuration found. Please <a href="customisation.html">build your custom sofa</a> first.</li>`;
    }
    return;
  }

  const order = JSON.parse(raw);

  // Fill list
  summaryList.innerHTML = "";
  const labels = {
    color: "Colour",
    fabric: "Fabric Type",
    firmness: "Cushion Firmness",
    size: "Layout / Size",
    legs: "Leg Finish",
    stitching: "Stitching Style"
  };

  Object.keys(labels).forEach(key => {
    const cfg = order.config[key];
    if (!cfg) return;
    const li = document.createElement("li");
    li.className = "summary-row d-flex justify-content-between";
    li.innerHTML = `
      <span>${labels[key]}</span>
      <span>${cfg.label}${cfg.extra > 0 ? ` (+₹${cfg.extra.toLocaleString()})` : ""}</span>
    `;
    summaryList.appendChild(li);
  });

  baseEl.textContent = "₹" + order.basePrice.toLocaleString().replace("₹", "");
  upgEl.textContent = "₹" + order.upgrades.toLocaleString().replace("₹", "");
  totalEl.textContent = "₹" + order.total.toLocaleString().replace("₹", "");

  // State → city dropdown
  const stateSel = document.getElementById("state");
  const citySel = document.getElementById("city");

  if (stateSel && citySel) {
    stateSel.addEventListener("change", () => {
      const state = stateSel.value;
      citySel.innerHTML = `<option value="">Select City</option>`;
      if (cityList[state]) {
        cityList[state].forEach(c => {
          const opt = document.createElement("option");
          opt.textContent = c;
          opt.value = c;
          citySel.appendChild(opt);
        });
      }
    });
  }

  // Place order button
  const btn = document.getElementById("customPlaceOrderBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      if (!validateCustomCheckoutForm()) return;

      // hide form + summary
      document.getElementById("customCheckoutFormArea").classList.add("d-none");
      document.getElementById("customSummaryArea").classList.add("d-none");
      document.getElementById("customOrderSuccess").classList.remove("d-none");

      // clear order
      localStorage.removeItem("soffa_custom_order");
    });
  }
});

// ========= VALIDATION =========
function validateCustomCheckoutForm() {
  let valid = true;

  const name = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const state = document.getElementById("state").value.trim();
  const city = document.getElementById("city").value.trim();
  const pincode = document.getElementById("pincode").value.trim();

  // Name
  if (name.length < 3) {
    document.getElementById("nameError").classList.remove("d-none");
    valid = false;
  } else document.getElementById("nameError").classList.add("d-none");

  // Phone (10 digits, Indian)
  if (!/^[6-9]\d{9}$/.test(phone)) {
    document.getElementById("phoneError").classList.remove("d-none");
    valid = false;
  } else document.getElementById("phoneError").classList.add("d-none");

  // Email
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    document.getElementById("emailError").classList.remove("d-none");
    valid = false;
  } else document.getElementById("emailError").classList.add("d-none");

  // Address
  if (address.length < 5) {
    document.getElementById("addressError").classList.remove("d-none");
    valid = false;
  } else document.getElementById("addressError").classList.add("d-none");

  // State
  if (!state) {
    document.getElementById("stateError").classList.remove("d-none");
    valid = false;
  } else document.getElementById("stateError").classList.add("d-none");

  // City
  if (!city) {
    document.getElementById("cityError").classList.remove("d-none");
    valid = false;
  } else document.getElementById("cityError").classList.add("d-none");

  // Pincode (6 digits)
  if (!/^\d{6}$/.test(pincode)) {
    document.getElementById("pinError").classList.remove("d-none");
    valid = false;
  } else document.getElementById("pinError").classList.add("d-none");

  return valid;
}
