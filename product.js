// ===========================================================
// PRODUCT DATA (20 ITEMS) — INDIA FABRIC COLLECTION
// 3 IMAGES PER PRODUCT
// ===========================================================

const productData = {
    "sofa1": { name: "Kalamkari Collection", price: 45999, images: ["k11.jpg", "k12.jpg", "k13.jpg"], desc: "Detailed hand-drawn motifs add narrative and artistic depth to the sofa surface." },
    "sofa2": { name: "Kalamkari Collection", price: 39499, images: ["k21.jpg", "k22.jpg", "k23.jpg"], desc: "Softer cotton-blend textiles keep it comfortable enough for everyday use." },
    "sofa3": { name: "Kalamkari Collection", price: 52499, images: ["k31.jpg", "k32.jpg", "k33.jpg"], desc: "Pairs best with wooden interiors, muted palettes, and classic Indian aesthetics." },
    "sofa4": { name: "Kalamkari Collection", price: 48999, images: ["k41.jpg", "k42.jpg", "k43.jpg"], desc: "Appeals to buyers who value storytelling, craft history, and refined cultural expression." },
    "sofa5": { name: "Chikankari Collection", price: 42999, images: ["c11.jpg", "c12.jpg", "c13.jpg"], desc: "Subtle embroidered textures create an upscale, lightweight, and tactile surface." },
    "sofa6": { name: "Chikankari Collection", price: 54999, images: ["c21.jpg", "c22.jpg", "c23.jpg"], desc: "Softer fabrics deliver a clean, luxury-minimal look with detailed craftsmanship." },
    "sofa7": { name: "Chikankari Collection", price: 59999, images: ["c31.jpg", "c32.jpg", "c33.jpg"], desc: "Best suited for bright interiors, pastel palettes, and calm living spaces." },
    "sofa8": { name: "Chikankari Collection", price: 46499, images: ["c41.jpg", "c42.jpg", "c43.jpg"], desc: "Designed for customers who want elegance without heavy prints or loud colours." },
    "sofa9": { name: "Ajrakh Collection", price: 44999, images: ["a11.jpg", "a12.jpg", "a13.jpg"], desc: "Natural dyes and geometric block prints deliver a bold, heritage-driven visual identity." },
    "sofa10": { name: "Ajrakh Collection", price: 38999, images: ["a21.jpg", "a22.jpg", "a23.jpg"], desc: "Dense cotton fabric gives the sofa durability without sacrificing comfort." },
    "sofa11": { name: "Ajrakh Collection", price: 43999, images: ["a31.jpg", "a32.jpg", "a33.jpg"], desc: "Works well in contemporary interiors with earthy, terracotta-tone palettes." },
    "sofa12": { name: "Ajrakh Collection", price: 57999, images: ["a41.jpg", "a42.jpg", "a43.jpg"], desc: "Ideal for customers who want cultural detail without excessive ornamentation." },
    "sofa13": { name: "Tie-Dye Collection", price: 62999, images: ["t11.jpg", "t12.jpg", "t13.jpg"], desc: "Hand-dyed gradients create unpredictable, organic patterns — no two sofas look identical." },
    "sofa14": { name: "Tie-Dye Collection", price: 49999, images: ["t21.jpg", "t22.jpg", "t23.jpg"], desc: "Lightweight cotton blends keep the seating breathable, casual, and easy to maintain." },
    "sofa15": { name: "Tie-Dye Collection", price: 29999, images: ["t31.jpg", "t32.jpg", "t33.jpg"], desc: "Patterns work best in relaxed, bohemian, or minimal modern interiors that need character." },
    "sofa16": { name: "Tie-Dye Collection", price: 68999, images: ["t41.jpg", "t42.jpg", "t43.jpg"], desc: "Perfect for buyers who want a playful statement piece without looking loud or cheap." },

    // FIXED BROKEN IMAGES
    "sofa17": { name: "Kantha Collection", price: 74999, images: ["kantha1.jpg", "kantha2.jpg", "kantha3.jpg"], desc: "Bold, multi-coloured embroidery brings high visual energy and cultural punch." },

    "sofa18": { name: "Phulkari Collection", price: 41999, images: ["p11.jpg", "p12.jpg", "p13.jpg"], desc: "Bold, multi-coloured embroidery brings high visual energy and cultural punch." },
    "sofa19": { name: "Phulkari Collection", price: 58999, images: ["p21.jpg", "p22.jpg", "p23.jpg"], desc: "Heavier fabrics add structure to the sofa, making it feel plush and substantial." },
    "sofa20": { name: "Phulkari Collection", price: 64499, images: ["p31.jpg", "p32.jpg", "p33.jpg"], desc: "Works well as a focal point in neutral interiors that can accommodate bold accents." }
};


// ===========================================================
// LOAD PRODUCT + IMAGES
// ===========================================================

function loadProduct() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id || !productData[id]) return;

    const p = productData[id];

    document.querySelector(".product-title").innerText = p.name;
    document.querySelector(".product-subtitle").innerText = p.desc;
    document.querySelector(".price-tag").innerText = "₹" + p.price.toLocaleString();
    document.querySelector(".product-description").innerText = p.desc;

    const mainImg = document.getElementById("mainImage");
    mainImg.src = p.images[0];

    // assign thumbnails
    ["thumb1", "thumb2", "thumb3"].forEach((id, i) => {
        const img = document.getElementById(id);
        img.src = p.images[i];
        img.dataset.src = p.images[i];
        img.onclick = () => switchImage(p.images[i], img);
    });
}


// ===========================================================
// SWITCH IMAGE ON CLICK
// ===========================================================

function switchImage(src, el) {

    document.getElementById("mainImage").src = src;

    document.querySelectorAll(".thumb-img")
        .forEach(t => t.classList.remove("active"));

    el.classList.add("active");
}


// ===========================================================
// CLICK TO ZOOM
// ===========================================================

document.addEventListener("click", e => {
    const img = document.getElementById("mainImage");
    if (e.target !== img) return;
    img.classList.toggle("zoomed");
});


// ===========================================================
// QUANTITY CONTROL
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {
    const qtyInput = document.querySelector(".qty-input");
    document.querySelector(".qty-plus").onclick = () => qtyInput.value++;
    document.querySelector(".qty-minus").onclick = () => qtyInput.value = Math.max(1, qtyInput.value - 1);
});


// ===========================================================
// ADD TO CART
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

    function addCurrentProductToCart() {

        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const p = productData[id];

        const product = {
            id,
            name: p.name,
            price: p.price,
            img: document.getElementById("mainImage").src,
            qty: Number(document.querySelector(".qty-input").value),
        };

        addToCart(product);
        alert("Added to cart!");
    }

    document.getElementById("addToCartBtn").addEventListener("click", addCurrentProductToCart);
});


// INIT
document.addEventListener("DOMContentLoaded", loadProduct);
