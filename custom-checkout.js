document.addEventListener("DOMContentLoaded", () => {

  const order = JSON.parse(localStorage.getItem("soffa_custom_order"));
  const list = document.getElementById("customSummaryList");
  const baseEl = document.getElementById("customBasePrice");
  const upgEl  = document.getElementById("customUpgradePrice");
  const totalEl = document.getElementById("customTotalPrice");
  const shipEl  = document.getElementById("customShipping");
  const msgEl   = document.getElementById("shippingMessage");

  // No config stored
  if(!order){
    list.innerHTML = `<li>No custom configuration found.</li>`;
    return;
  }

  // Render config
  list.innerHTML = "";
  for (let k in order.config){
    const c = order.config[k];
    const li = document.createElement("li");
    li.className="d-flex justify-content-between mb-2";
    li.innerHTML = `<span>${c.label}</span><span>${c.extra>0?`+₹${c.extra}`:``}</span>`;
    list.appendChild(li);
  }

  baseEl.textContent = "₹" + order.basePrice;
  upgEl.textContent  = "₹" + order.upgrades;


  // ===== SHIPPING LOGIC =====
  function getShipping(country, subtotal){
    if(!country) 
      return {fee:0,total:subtotal,msg:""};

    if(country.toLowerCase()==="india")
      return {fee:0,total:subtotal,msg:"🎉 Free Delivery within India"};

    return {fee:2500,total:subtotal+2500,msg:"🌍 International Shipping ₹2,500"};
  }

  function updateTotals(){
    const country = document.getElementById("country").value.trim();
    const res = getShipping(country, order.total);

    shipEl.textContent = "₹" + res.fee;
    totalEl.textContent = "₹" + res.total;
    msgEl.textContent = res.msg;
  }

  updateTotals();
  document.getElementById("country").addEventListener("input", updateTotals);


  // ===== VALIDATION =====
  function validate(){
    let ok = true;
    function e(id,cond){
      document.getElementById(id).classList.toggle("d-none",!cond);
      if(cond) ok=false;
    }

    e("nameError", fullName.value.trim().length<3);
    e("phoneError", !/^[6-9]\d{9}$/.test(phone.value.trim()));
    e("emailError", !/^\S+@\S+\.\S+$/.test(email.value.trim()));
    e("addressError", address.value.trim().length<5);
    e("countryError", country.value.trim().length<2);
    e("stateError", state.value.trim().length<2);
    e("cityError", city.value.trim().length<2);
    e("pinError", !/^\d{6}$/.test(pincode.value.trim()));

    return ok;
  }


  // ===== PLACE ORDER =====
  document.getElementById("customPlaceOrderBtn").addEventListener("click",()=>{

    if(!validate()){
      alert("Please fill all fields correctly.");
      return;
    }

    document.getElementById("customCheckoutFormArea").classList.add("d-none");
    document.getElementById("customSummaryArea").classList.add("d-none");
    document.getElementById("customOrderSuccess").classList.remove("d-none");

    localStorage.removeItem("soffa_custom_order");
  });

});
