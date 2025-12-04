// ================== BASE PRICE ==================
const BASE_PRICE = 45999;

// ================== UPDATE SUMMARY ==================
function updateSummary() {
    const summaryList = document.getElementById("configSummary");
    let upgradeTotal = 0;

    if (summaryList) summaryList.innerHTML = "";

    function addLine(labelText, groupKey) {
        const activeBtn = document.querySelector(
            `.option-group[data-group="${groupKey}"] .option-btn.active`
        );

        let label = "- Not selected -";
        let extra = 0;

        if (activeBtn) {
            label = activeBtn.getAttribute("data-label") || activeBtn.textContent.trim();
            extra = Number(activeBtn.getAttribute("data-price") || 0);
        }

        upgradeTotal += extra;

        if (summaryList) {
            const li = document.createElement("li");
            li.className = "summary-row d-flex justify-content-between";
            li.innerHTML = `
                <span>${labelText}</span>
                <span>${label}${extra > 0 ? ` (+₹${extra.toLocaleString()})` : ""}</span>
            `;
            summaryList.appendChild(li);
        }
    }

    addLine("Colour", "color");
    addLine("Fabric Type", "fabric");
    addLine("Cushion Firmness", "firmness");
    addLine("Layout / Size", "size");
    addLine("Leg Finish", "legs");
    addLine("Stitching Style", "stitching");

    // Update prices
    document.getElementById("basePrice").textContent = BASE_PRICE.toLocaleString();
    document.getElementById("upgradePrice").textContent = upgradeTotal.toLocaleString();
    document.getElementById("grandTotal").textContent = (BASE_PRICE + upgradeTotal).toLocaleString();
}

// ================== INIT OPTION CLICKS ==================
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".option-group").forEach(group => {
        group.addEventListener("click", e => {
            const btn = e.target.closest(".option-btn");
            if (!btn) return;

            // remove active from this group
            group.querySelectorAll(".option-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            updateSummary();
        });
    });

    // initial summary
    updateSummary();

    // checkout button
    const checkoutBtn = document.getElementById("customCheckoutBtn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            const requiredGroups = ["color", "fabric", "firmness", "size", "legs", "stitching"];

            const missing = requiredGroups.filter(g =>
                !document.querySelector(`.option-group[data-group="${g}"] .option-btn.active`)
            );

            if (missing.length) {
                alert("Please choose options in all sections before checkout.");
                return;
            }

            // Build order object
            let upgrades = 0;
            const config = {};

            requiredGroups.forEach(g => {
                const btn = document.querySelector(
                    `.option-group[data-group="${g}"] .option-btn.active`
                );
                const label = btn.getAttribute("data-label") || btn.textContent.trim();
                const extra = Number(btn.getAttribute("data-price") || 0);
                upgrades += extra;
                config[g] = { label, extra };
            });

            const order = {
                type: "custom-sofa",
                title: "Custom Sofa — Handcrafted in India",
                basePrice: BASE_PRICE,
                upgrades,
                total: BASE_PRICE + upgrades,
                config
            };

            localStorage.setItem("soffa_custom_order", JSON.stringify(order));
            window.location.href = "custom-checkout.html";
        });
    }
});
