// ===========================================================
// PRODUCT DATA (20 ITEMS)
// ===========================================================
const productData = {
    "sofa1": { name: "Nordic Luxe", price: 45999, img: "sofa.png", desc: "Ultra-soft Scandinavian comfort with premium velvet upholstery." },
    "sofa2": { name: "Urban Cozy", price: 39499, img: "sofa2.png", desc: "Soft linen sofa designed for compact modern homes." },
    "sofa3": { name: "Comfort Max", price: 52499, img: "sofa3.png", desc: "Deep cushioning engineered for all-day relaxation." },
    "sofa4": { name: "Lounge Pro", price: 48999, img: "sofa4.png", desc: "Relaxed recline angle with premium foam profile." },
    "sofa5": { name: "Scandi Classic", price: 42999, img: "sofa5.png", desc: "Minimal Scandinavian wooden frame with plush seating." },
    "sofa6": { name: "Valborg Sofa", price: 54999, img: "sofa6.png", desc: "Premium Nordic linen with kiln-dried hardwood." },
    "sofa7": { name: "Astra Plush", price: 59999, img: "sofa7.png", desc: "Wide and deep seating for luxurious comfort." },
    "sofa8": { name: "Melo Arc", price: 46499, img: "sofa8.png", desc: "Elegant curved armrest design for modern living rooms." },
    "sofa9": { name: "NordWood Sofa", price: 44999, img: "sofa9.png", desc: "Exposed natural wood details with textured upholstery." },
    "sofa10": { name: "Classic Beige", price: 38999, img: "sofa10.png", desc: "Sisal beige edition with stain-resistant coating." },
    "sofa11": { name: "Verde Comfort", price: 43999, img: "sofa11.png", desc: "Eco-friendly recycled fabric with soft cushioning." },
    "sofa12": { name: "Aurora Set", price: 57999, img: "sofa12.png", desc: "Pastel-toned sofa with premium foam layering." },
    "sofa13": { name: "Haven Cloud", price: 62999, img: "sofa13.png", desc: "Cloud-like feather-mix cushioning for ultimate softness." },
    "sofa14": { name: "Arden Luxe", price: 49999, img: "sofa14.png", desc: "Signature box-stitch detailing with high-density foam." },
    "sofa15": { name: "Nordic Duo", price: 29999, img: "sofa15.png", desc: "Compact 2-seater that fits beautifully in small spaces." },
    "sofa16": { name: "Royal Plush", price: 68999, img: "sofa16.png", desc: "Deep luxury velvet with premium wood frame." },
    "sofa17": { name: "Feather Cloud", price: 74999, img: "sofa17.png", desc: "Feather-blend cushions wrapped in soft linen fabric." },
    "sofa18": { name: "Zen Minimal", price: 41999, img: "sofa18.png", desc: "Ultra-minimalist frame with clean Nordic lines." },
    "sofa19": { name: "Copenhagen Sofa", price: 58999, img: "sofa19.png", desc: "Straight Nordic design with premium stitching." },
    "sofa20": { name: "Hygge Haven", price: 64499, img: "sofa20.png", desc: "Warm Scandinavian comfort with long-lasting support." }
};

// ===========================================================
// LOAD PRODUCT BY ID
// ===========================================================
function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id || !productData[id]) {
        document.querySelector(".product-title").innerText = "Product Not Found";
        return;
    }

    const p = productData[id];

    document.querySelector(".product-title").innerText = p.name;
    document.querySelector(".product-subtitle").innerText = p.desc;
    document.querySelector(".price-tag").innerText = "₹" + p.price.toLocaleString();
    document.querySelector(".product-description").innerText = p.desc;

    document.getElementById("mainImage").src = p.img;

    ["thumb1", "thumb2", "thumb3", "thumb4"].forEach(imgId => {
        document.getElementById(imgId).src = p.img;
    });

    document.querySelectorAll(".thumb").forEach(btn => {
        btn.setAttribute("data-src", p.img);
    });
}

document.addEventListener("DOMContentLoaded", loadProduct);

// ===========================================================
// THUMBNAIL SWITCH
// ===========================================================
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".thumb").forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById("mainImage").src = btn.getAttribute("data-src");
        });
    });
});

// ===========================================================
// QUANTITY CONTROL
// ===========================================================
document.addEventListener("DOMContentLoaded", () => {
    const qtyInput = document.querySelector(".qty-input");

    document.querySelector(".qty-plus").onclick = () =>
        qtyInput.value = Number(qtyInput.value) + 1;

    document.querySelector(".qty-minus").onclick = () =>
        qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
});

// ===========================================================
// ADD TO CART → FIXED VERSION
// ===========================================================
document.addEventListener("DOMContentLoaded", () => {

    function addCurrentProductToCart() {

        const params = new URLSearchParams(window.location.search);
        const productId = params.get("id"); // VERY IMPORTANT

        const product = {
            id: productId,
            name: document.querySelector(".product-title").innerText,
            price: Number(document.querySelector(".price-tag").innerText.replace(/[^0-9]/g, "")),
            img: document.getElementById("mainImage").src,
            fabric: document.querySelector(".option-btn.active")?.getAttribute("data-val") || "Default Fabric",
            color: document.querySelector(".color-dot.selected")?.getAttribute("data-val") || "Default Color",
            qty: Number(document.querySelector(".qty-input").value)
        };

        addToCart(product);
        alert("Added to cart!");
    }

    document.getElementById("addToCartBtn")
        .addEventListener("click", addCurrentProductToCart);
});
