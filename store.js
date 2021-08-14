import items from "./items.json";
import { addToCart } from "./shoppingCart";
import formatCurrency from "./util/formatCurrency";

const storeItemTemplate = document.querySelector("#store-item-template");
const storeItemContainer = document.querySelector("[data-store-container]");
const IMAGE_URL = "https://dummyimage.com/420x260";
export function setupStore() {
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-add-to-cart-button]")) {
      const id = e.target.closest("[data-store-item]").dataset.itemId;
      addToCart(parseInt(id));
    }
  });
  items.forEach(renderStoreItem);
}

function renderStoreItem(item) {
  const storeItem = storeItemTemplate.content.cloneNode(true);

  const container = storeItem.querySelector("[data-store-item]");
  container.dataset.itemId = item.id;

  const itemName = storeItem.querySelector("[data-name]");
  itemName.innerText = item.name;

  const itemCategory = storeItem.querySelector("[data-category]");
  itemCategory.innerText = item.category;

  const itemPrice = storeItem.querySelector("[data-price]");
  itemPrice.innerText = formatCurrency(item.priceCents / 100);

  const itemImage = storeItem.querySelector("[data-image]");
  itemImage.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`;

  storeItemContainer.appendChild(storeItem);
}
