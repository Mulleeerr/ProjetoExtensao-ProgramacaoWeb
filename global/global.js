function updateCartBadge() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const badge = document.getElementById("cart-badge");

  console.log("Itens no carrinho:", cart); // Diagnóstico
  if (badge) {
    badge.textContent = cart.length;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    updateCartBadge();
  }
});

function showAutoPopup(message, duration = 3000) {
  const popup = document.getElementById("auto-popup");
  const messageElement = document.getElementById("popup-message");

  messageElement.textContent = message;

  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");
  }, duration);
}
