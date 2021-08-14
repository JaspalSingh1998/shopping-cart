import items from "./items.json";
import formatCurrency from "./util/formatCurrency";
const cartButton = document.querySelector("[data-cart-button]");
const cartItemsWrapper = document.querySelector("[data-cart-items-wrapper]");
const cartItemTemplate = document.querySelector("#cart-item-template");
const cartItemContainer = document.querySelector("[data-cart-items-container]");
const IMAGE_URL = "https://dummyimage.com/210x130";
let shoppingCart = [];

export function setupShoppingCart() {}

// Remove items from cart
// Show/Hide the cart when it has no items or when it goes from 0 to 1 item
// Persist across multiple pages
// Calculate an accurate total
// Handle multiple of the same item in the cart

// show/Hide cart when clicked
cartButton.addEventListener("click", () => {
  cartItemsWrapper.classList.toggle("invisible");
});

// Add items to cart
export function addToCart(id) {
  shoppingCart.push({ id: id, quantity: 1 });
  renderCart();
}

function renderCart() {
  cartItemContainer.innerHTML = "";
  shoppingCart.forEach((entry) => {
    const item = items.find((i) => entry.id === i.id);
    const cartItem = cartItemTemplate.content.cloneNode(true);

    const container = cartItem.querySelector("[data-item]");
    container.dataset.itemId = item.id;

    const itemName = cartItem.querySelector("[data-name]");
    itemName.innerText = item.name;

    const itemQuantity = cartItem.querySelector("[data-quantity]");
    itemQuantity.innerText = `x${entry.quantity}`;

    const itemPrice = cartItem.querySelector("[data-price]");
    itemPrice.innerText = formatCurrency(
      (item.priceCents * entry.quantity) / 100
    );

    const itemImage = cartItem.querySelector("[data-image]");
    itemImage.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`;

    cartItemContainer.appendChild(cartItem);
  });
}
