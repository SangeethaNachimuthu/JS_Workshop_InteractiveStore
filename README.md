![Lexicon Logo](https://lexicongruppen.se/media/wi5hphtd/lexicon-logo.svg)

# JavaScript Workshop: Building an Interactive Store

In this workshop, you will transform a static HTML product listing into a fully dynamic and interactive e-commerce page. You will use the `products.js` file as your data source.

## Prerequisites
- Link `products.js` and a new `main.js` file in your `JS_Workshop.html`.
- Ensure you have the `products` array available in your global scope.

---

## Task 1: Dynamic Product Listing
Instead of having hardcoded products in your HTML, you will generate them using JavaScript.

### Steps:
1. Select the product grid container in `JS_Workshop.html` (add an `id="product-grid"` to the container if it doesn't have one).
2. Create a function `renderProducts(productsToRender)` that:
    - Clears the current content of the grid.
    - Loops through the provided array.
    - Creates a product card for each item using template literals or `document.createElement`.
    - Appends the card to the grid.

### Hint:
```javascript
function createProductCard(product) {
    return `
        <div class="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-2 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-400">
            <!-- Image Container -->
            <div class="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-slate-100">
                <img src="${product.image}" alt="${product.name}" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110">
                <!-- Add to Cart Overlay -->
                <button onclick="addToCart(${product.id})" class="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-slate-900 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-blue-600 hover:text-white scale-0 group-hover:scale-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7v14"/></svg>
                </button>
            </div>
            <!-- Info -->
            <div class="flex flex-1 flex-col p-4">
                <span class="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">${product.category}</span>
                <h3 class="text-sm font-bold text-slate-900 line-clamp-1">${product.name}</h3>
                <p class="mt-1 text-[11px] font-medium text-slate-500 line-clamp-2 leading-relaxed">${product.description}</p>
                <div class="mt-auto pt-4 flex items-center justify-between">
                    <span class="text-lg font-black text-slate-900">$${product.price}</span>
                </div>
            </div>
        </div>
    `;
}
```

---

## Task 2: Filtering by Category
Make the sidebar checkboxes functional so users can filter products by their category.

### Steps:
1. Add `id` or `class` to the category checkboxes (e.g., `class="category-filter"`).
2. Attach a `change` event listener to all checkboxes.
3. When a checkbox changes:
    - Collect all checked categories.
    - If "All Products" is checked (or nothing is checked), show everything.
    - Otherwise, filter the `products` array to include only matching categories.
    - Call `renderProducts()` with the filtered list.

---

## Task 3: Real-time Search
Implement the search bar functionality to filter products by name or description.

### Steps:
1. Select the search input field.
2. Add an `input` event listener.
3. As the user types, filter the products array based on whether the `name` or `description` includes the search string (case-insensitive).
4. Update the UI using `renderProducts()`.

---

## Task 4: (Optional) Shopping Cart Logic
Keep track of products added to the cart and update the cart counter in the header.

### Steps:
1. Initialize an empty `cart` array.
2. Create the `addToCart(productId)` function:
    - Find the product in the `products` array by ID.
    - Add it to the `cart` array.
    - Update the number shown on the cart icon in the header.
    -  Show a small notification or "toast" when an item is added.

---

## Task 5: (Optional) Persistent Cart (Local Storage)
Make sure the cart items stay there even if the page is refreshed.

### Steps:
1. Every time `addToCart` is called, save the `cart` array to `localStorage` using `JSON.stringify()`.
2. When the page loads, check `localStorage` for any saved cart data using `JSON.parse()`.
3. Update the cart counter immediately on page load.
