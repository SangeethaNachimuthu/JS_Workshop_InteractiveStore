// main.js

// 1. Initialize State
let cart = [];

// 2. Select DOM Elements
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const cartCount = document.getElementById('cart-count');
const categoryFilters = document.querySelectorAll('.category-filter');


// 3. Render Products Function
function renderProducts(productsToRender) {
    // TODO: Clear productGrid
    productGrid.innerHTML = "";

    // TODO: Loop through productsToRender
    // TODO: Generate HTML for each product card
    // TODO: Append to productGrid
    productGrid.innerHTML = productsToRender
        .map(productToRender => createProductCard(productToRender))
        .join("")

}

// 4. Add to Cart Function
function addToCart(productId) {
    // TODO: Find product by id
    // TODO: Add to cart array
    // TODO: Update cart count UI
    // TODO: Save to localStorage
    const itemToAdd = products.find(product => product.id === productId)
    cart.push(itemToAdd)
    localStorage.setItem("cart", JSON.stringify(cart))
    updateCartCount()
    alert("Added to cart!")

}
// 5. Update Cart Count UI
function updateCartCount() {
    // TODO: Set textContent of cartCount
    // TODO: Show/hide cartCount based on items
    cartCount.textContent = cart.length

    if(cart.length === 0) {
        cartCount.style.display = 'none'
    } else {
        cartCount.style.display = 'inline-block'
    }
}

// 6. Event Listeners
// Search
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        // TODO: Filter products by name or description
        const searchName = e.target.value.toLowerCase();
        //console.log(searchName)
        const filteredProduct = products.filter(product =>
            product.name.toLowerCase().includes(searchName));
        renderProducts(filteredProduct)
    });
}

// Category Filters
categoryFilters.forEach(filter => {
    filter.addEventListener('change', () => {
        // TODO: Collect active categories
        // TODO: Filter products and re-render
        const checkedCategories = document.querySelectorAll(".category-filter:checked")
        // Convert to array of values
        const selectedCategories = Array.from(checkedCategories)
                                            .map(checkBox => checkBox.value);
        //If "All" OR nothing selected → show all
        if (selectedCategories.length === 0 || selectedCategories.includes("All")) {
            renderProducts(products);
            return;
        }

        // Filter products
        const filteredProducts = products.filter(product =>
            selectedCategories.includes(product.category)
        );
        // Render filtered products
        if(selectedCategories.includes("all")) {
            renderProducts(products)
        } else {
            renderProducts(filteredProducts);
        }

    });
});

// 7. Initial Load
document.addEventListener('DOMContentLoaded', () => {
    // TODO: Load cart from localStorage
    // TODO: Update cart count UI
    // TODO: Render all products initially
    const savedCart = localStorage.getItem("cart")
    if(savedCart) {
        cart = JSON.parse(savedCart)
    }
    updateCartCount()

    renderProducts(products);
});

function createProductCard(product) {
    return `
        <div class="group relative flex flex-col overflow-hidden rounded-[1.5rem] 
                    border border-slate-200 bg-white p-2 transition-all duration-500 
                    hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-400">
            <!-- Image Container -->
            <div class="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-slate-100">
                <img src="${product.image}" alt="${product.name}" 
                    class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110">
                <!-- Add to Cart Overlay -->
                <button onclick="addToCart(${product.id})" 
                    class="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl 
                        bg-white/90 text-slate-900 shadow-lg backdrop-blur-md transition-all duration-300 
                        hover:bg-blue-600 hover:text-white scale-0 group-hover:scale-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                        stroke-linejoin="round"><path d="M5 12h14m-7-7v14"/>
                    </svg>
                </button>
            </div>
            <!-- Info -->
            <div class="flex flex-1 flex-col p-4">
                <span class="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">
                    ${product.category}
                </span>
                <h3 class="text-sm font-bold text-slate-900 line-clamp-1">
                    ${product.name}
                </h3>
                <p class="mt-1 text-[11px] font-medium text-slate-500 line-clamp-2 leading-relaxed">
                    ${product.description}
                </p>
                <div class="mt-auto pt-4 flex items-center justify-between">
                    <span class="text-lg font-black text-slate-900">$${product.price}</span>
                </div>
            </div>
        </div>
    `;
}

function renderCart() {

    const cartGrid = document.getElementById('cart-grid');
    cartGrid.innerHTML = "";

    if(cart.length === 0) {
        cartGrid.innerHTML = "<p>Your cart is empty!</p>";
         return;
    }

    cart.forEach(item => {
        const innerHTMLItem = `
            <div class="w-92 h-12 ">
                <div class="flex justify-between items-center gap-8 w-92 h-12 p-2">
                    <span class="">${item.name}</span>
                    <span>${item.price}</span>  
                    <button onclick="removeItem(${item.id})" class="text-red-500">
                        Remove
                    </button> 
                </div>
            </div>
        `;
        cartGrid.innerHTML += innerHTMLItem;
    })
}

function openCart() {
    renderCart();
    document.getElementById('cart-modal').classList.remove("hidden")
}

function closeCart() {
    document.getElementById('cart-modal').classList.add("hidden")
}

function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId)
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}