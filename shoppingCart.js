import items from "./items.json";
import formatCurrency from "./util/formatCurrency";
import addGlobalEventListener from "./util/addGlobalEventListener";

const cartButton = document.querySelector("[data-cart-button]");
const cartItemsWrapper = document.querySelector("[data-cart-items-wrapper]");
const cartItemTemplate = document.querySelector("#cart-item-template");
const cartItemContainer = document.querySelector("[data-cart-items-container]");
const cartQuantity = document.querySelector("[data-cart-quantity]");
const cartTotal = document.querySelector("[data-cart-total]");
const cart = document.querySelector("[data-cart]");

const IMAGE_URL = "https://dummyimage.com/210x130";
let shoppingCart = [];

export function setupShoppingCart() {
  renderCart();
}

addGlobalEventListener("click", "[data-remove-from-cart-button]", (e) => {
  const id = e.target.closest("[data-item]").dataset.itemId;
  removeFromCart(parseInt(id));
});

// Remove items from cart
// Show/Hide the cart when it has no items or when it goes from 0 to 1 item
// Persist across multiple pages

// show/Hide cart when clicked
cartButton.addEventListener("click", () => {
  cartItemsWrapper.classList.toggle("invisible");
});

// Add items to cart
export function addToCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    shoppingCart.push({ id: id, quantity: 1 });
  }
  renderCart();
}

function removeFromCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id);
  if (existingItem == null) return;
  shoppingCart = shoppingCart.filter((entry) => entry.id !== id);
  renderCart();
}

function renderCart() {
  if (shoppingCart.length === 0) {
    hideCart();
  } else {
    showCart();
    renderCartItems();
  }
}

function hideCart() {
  cart.classList.add("invisible");
  cartItemsWrapper.classList.add("invisible");
}
function showCart() {
  cart.classList.remove("invisible");
}

function renderCartItems() {
  cartQuantity.textContent = shoppingCart.length;
  const totalCents = shoppingCart.reduce((sum, entry) => {
    const item = items.find((i) => entry.id === i.id);
    return sum + item.priceCents * entry.quantity;
  }, 0);
  cartTotal.textContent = formatCurrency(totalCents / 100);
  cartItemContainer.innerHTML = "";
  shoppingCart.forEach((entry) => {
    const item = items.find((i) => entry.id === i.id);
    const cartItem = cartItemTemplate.content.cloneNode(true);

    const container = cartItem.querySelector("[data-item]");
    container.dataset.itemId = item.id;

    const itemName = cartItem.querySelector("[data-name]");
    itemName.innerText = item.name;

    if (entry.quantity > 1) {
      const itemQuantity = cartItem.querySelector("[data-quantity]");
      itemQuantity.innerText = `x${entry.quantity}`;
    }

    const itemPrice = cartItem.querySelector("[data-price]");
    itemPrice.innerText = formatCurrency(
      (item.priceCents * entry.quantity) / 100
    );

    const itemImage = cartItem.querySelector("[data-image]");
    itemImage.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`;

    cartItemContainer.appendChild(cartItem);
  });
}
