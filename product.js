// ===========================================================
// PRODUCT DATA (20 ITEMS) — UPDATED INDIA VERSION
// ===========================================================

const productData = {
    "sofa1": { 
        name: "Luxe Craft",
        price: 45999, 
        img: "sofa.png", 
        desc: "Premium Indian sofa crafted with organic cotton upholstery for rich comfort. Crafted for a lifetime."
    },

    "sofa2": { 
        name: "Urban Comfort", 
        price: 39499, 
        img: "sofa2.png", 
        desc: "Compact Indian-made sofa designed for modern apartments with sustainable linen fabric. Crafted for a lifetime."
    },

    "sofa3": { 
        name: "Max Comfort", 
        price: 52499, 
        img: "sofa3.png", 
        desc: "Deep cushioning handmade in India using soft hemp fabric for everyday comfort. Crafted for a lifetime."
    },

    "sofa4": { 
        name: "Lounge Master", 
        price: 48999, 
        img: "sofa4.png", 
        desc: "Relaxed seating profile designed by Indian artisans, wrapped in recycled polyester. Crafted for a lifetime."
    },

    "sofa5": { 
        name: "Classic Wood", 
        price: 42999, 
        img: "sofa5.png", 
        desc: "Minimal wooden frame handcrafted in India using sustainable materials. Crafted for a lifetime."
    },

    "sofa6": { 
        name: "Valley Fabric", 
        price: 54999, 
        img: "sofa6.png", 
        desc: "Premium Indian-made sofa with organic cotton and kiln-dried hardwood. Crafted for a lifetime."
    },

    "sofa7": { 
        name: "Astra Comfort", 
        price: 59999, 
        img: "sofa7.png", 
        desc: "Wide deep seating crafted by Indian artisans with eco-friendly fabrics. Crafted for a lifetime."
    },

    "sofa8": { 
        name: "Melo Arc", 
        price: 46499, 
        img: "sofa8.png", 
        desc: "Elegant curved design made in India using sustainable hemp fabric. Crafted for a lifetime."
    },

    "sofa9": { 
        name: "Wood Craft Sofa", 
        price: 44999, 
        img: "sofa9.png", 
        desc: "Natural wood details paired with organic cotton upholstery. Made in India. Crafted for a lifetime."
    },

    "sofa10": { 
        name: "Beige Classic", 
        price: 38999, 
        img: "sofa10.png", 
        desc: "Soft beige edition crafted with recycled polyester for durability. Made in India. Crafted for a lifetime."
    },

    "sofa11": { 
        name: "Verde Craft", 
        price: 43999, 
        img: "sofa11.png", 
        desc: "Eco-friendly Indian sofa using hemp fabric and high-density padding. Crafted for a lifetime."
    },

    "sofa12": { 
        name: "Pastel Set", 
        price: 57999, 
        img: "sofa12.png", 
        desc: "Soft pastel shades made in India with recycled materials. Crafted for a lifetime."
    },

    "sofa13": { 
        name: "Cloud Soft", 
        price: 62999, 
        img: "sofa13.png", 
        desc: "Feather-like softness crafted using premium Indian fabrics. Crafted for a lifetime."
    },

    "sofa14": { 
        name: "Stitch Luxe", 
        price: 49999, 
        img: "sofa14.png", 
        desc: "Detailed stitching handcrafted in India using organic cotton. Crafted for a lifetime."
    },

    "sofa15": { 
        name: "Compact Duo", 
        price: 29999, 
        img: "sofa15.png", 
        desc: "Compact Indian-made 2-seater perfect for small homes. Crafted for a lifetime."
    },

    "sofa16": { 
        name: "Royal Comfort", 
        price: 68999, 
        img: "sofa16.png", 
        desc: "Luxury velvet seating designed and handcrafted in India. Crafted for a lifetime."
    },

    "sofa17": { 
        name: "Feather Blend", 
        price: 74999, 
        img: "sofa17.png", 
        desc: "Feather-blend cushions wrapped in soft Indian recycled fabric. Crafted for a lifetime."
    },

    "sofa18": { 
        name: "Zen Minimal", 
        price: 41999, 
        img: "sofa18.png", 
        desc: "Minimalist design inspired by Indian craftsmanship with hemp fabric. Crafted for a lifetime."
    },

    "sofa19": { 
        name: "Linear Craft", 
        price: 58999, 
        img: "sofa19.png", 
        desc: "Straight-line silhouette handcrafted with organic cotton. Made in India. Crafted for a lifetime."
    },

    "sofa20": { 
        name: "Haven Comfort", 
        price: 64499, 
        img: "sofa20.png", 
        desc: "Indian-made sofa built with sustainable materials for long-lasting support. Crafted for a lifetime."
    }
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
