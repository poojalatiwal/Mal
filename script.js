document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search")?.trim().toLowerCase();

    if (searchQuery) {
        document.getElementById("searchInput").value = searchQuery;
        filterMalls(searchQuery);
    }
});

function searchMall() {
    const input = document.getElementById("searchInput").value.trim().toLowerCase();
    filterMalls(input);

    // Update URL without reloading
    const newUrl = `malls.html?search=${encodeURIComponent(input)}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
}

function filterMalls(query) {
    const malls = document.querySelectorAll(".mall-item");
    let found = false;

    malls.forEach(mall => {
        const location = mall.getAttribute("data-location").toLowerCase();
        if (location.includes(query)) {
            mall.style.display = "block";
            found = true;
        } else {
            mall.style.display = "none";
        }
    });

    let noResultMessage = document.getElementById("noResultMessage");

    if (!found) {
        if (!noResultMessage) {
            noResultMessage = document.createElement("p");
            noResultMessage.id = "noResultMessage";
            noResultMessage.className = "text-center text-white mt-3";
            noResultMessage.textContent = `No malls found for "${query}". Try another location.`;
            document.getElementById("mallList").appendChild(noResultMessage);
        }
    } else {
        if (noResultMessage) {
            noResultMessage.remove();
        }
    }
}

// Allow Enter key to trigger search
function handleKeyPress(event) {
    if (event.key === "Enter") {
        searchMall();
    }
}

function showDetails(name, location, hours, image) {
    window.location.href = `mall-details.html?name=${encodeURIComponent(name)}&location=${encodeURIComponent(location)}&hours=${encodeURIComponent(hours)}&image=${encodeURIComponent(image)}`;
}

function loadMallDetails() {
    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById("mallName").innerText = urlParams.get("name") || "Mall Name";
    document.getElementById("mallLocation").innerText = "📍 Location: " + (urlParams.get("location") || "Unknown");
    document.getElementById("mallHours").innerText = "⏰ Hours: " + (urlParams.get("hours") || "10 AM - 10 PM");

    const mallImage = urlParams.get("image");
    document.getElementById("mallImage").src = mallImage ? mallImage : "placeholder.png";

    if (document.getElementById("shopList")) {
        loadMallShops(urlParams.get("name"));
    }
}

function loadMallShops(mallName) {
    const shops = {
        "World Trade Park": [
            { name: "H&M", category: "Clothing", image: "hm.png" },
            { name: "Zara", category: "Clothing", image: "zara.png" },
            { name: "Zudio", category: "Affordable Fashion", image: "zudio.png" },
            { name: "Apple Store", category: "Electronics", image: "apple_store.png" },
            { name: "Starbucks", category: "Café", image: "starbucks.png" }
        ],
        "Pink Square": [
            { name: "Nike", category: "Sportswear", image: "nike.png" },
            { name: "H&M", category: "Clothing", image: "hm.png" },
            { name: "McDonald's", category: "Fast Food", image: "mcdonalds.png" }
        ],
        "Airia Mall": [
            { name: "Zara", category: "Clothing", image: "zara.png" },
            { name: "Levi's", category: "Denim", image: "levis.png" },
            { name: "Samsung", category: "Electronics", image: "samsung.png" },
            { name: "Costa Coffee", category: "Café", image: "costa.png" },
            { name: "Zudio", category: "Affordable Fashion", image: "zudio.png" }
        ],
        "MGF Metropolitan Mall": [
            { name: "Puma", category: "Sportswear", image: "puma.png" },
            { name: "Adidas", category: "Shoes & Apparel", image: "adidas.png" },
            { name: "Haldiram's", category: "Food Court", image: "haldiram.png" }
        ],
        "Ambience Mall": [
            { name: "Marks & Spencer", category: "Clothing", image: "marks_spencer.png" },
            { name: "Samsung", category: "Electronics", image: "samsung.png" },
            { name: "Burger King", category: "Fast Food", image: "burger_king.png" },
            { name: "Zara", category: "Clothing", image: "zara.png" },
            { name: "Apple Store", category: "Electronics", image: "apple_store.png" }
        ]
    };

    let shopList = document.getElementById("shopList");
    shopList.innerHTML = ""; 

    if (shops[mallName]) {
        shops[mallName].forEach(shop => {
            shopList.innerHTML += `
                <div class="col-md-4">
                    <div class="card shadow-sm">
                        <img src="${shop.image}" class="card-img-top" alt="${shop.name}" style="height: 180px; object-fit: cover;">
                        <div class="card-body text-center">
                            <h5 class="card-title">${shop.name}</h5>
                            <p class="card-text">${shop.category}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        shopList.innerHTML = "<p class='text-center'>No shops found for this mall.</p>";
    }
}
