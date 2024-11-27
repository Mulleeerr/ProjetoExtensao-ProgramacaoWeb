function loadNavbar(){
    fetch('./componentes/navbar/navbar.html')
        .then(response => response.text())
        .then(data => document.getElementById('navbar-mainpage').innerHTML = data)
}

function loadNavlogo(){
    fetch('./componentes/navlogo/navlogo.html')
        .then(response => response.text())
        .then(data => document.getElementById('navlogo-mainpage').innerHTML = data)
}


async function fetchCSVData(url) {
    try {
      const response = await fetch(url);
      const data = await response.text();
  
      // Convertendo o CSV em um array de linhas
      const rows = data.split("\n").map((row) => row.split(","));
  
      // Seleciona o container dos cartões
      const cardContainer = document.getElementById("card-produtos");
  
      // Ignora o cabeçalho e adiciona cada linha como um cartão
      for (let i = 1; i < rows.length; i++) {
        const [product, value, quantity, imageUrl,stock,discountQuantity,discountValue] = rows[i];
        console.log(`Linha ${i}:`, product, value, quantity, imageUrl, stock, discountQuantity, discountValue);
        if (product && value && quantity && imageUrl && stock && discountQuantity && discountValue) {
          // Cria o HTML para cada cartão com os dados do produto
          const card = `
          <div class="justify-content-evenly produtos">
                <div class="produto col-12 col-sm-6 col-md-4 col-lg-2">
                  <img class="center" src="${imageUrl}" alt="Imagem do produto">
                  <div class="card-body">
                      <div class="row corpo">
                          <div class="col align-self-center nome-preco">
                              <p class="h5">${product}</p>
                              <p class="h6" id="preco-produto">R$ ${value}</p>
                          </div>
                          <div class="col">
                              <div class="row botao-compra">
                                  <i class="h5 col bi bi-cart-plus" onclick="addToCart('${product}', ${value}, ${stock}, ${discountQuantity}, ${discountValue})"></i>
                                  <input id="quantidade-${product}" class="col" value="1" min="1" oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
                              </div>
                              <span class="quantidade-text">Estoque: ${stock}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `;
          cardContainer.innerHTML += card;
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  function showPopup(message, onConfirm, onCancel) {
    const popup = document.getElementById("popup-confirmation");
    const messageElement = document.getElementById("popup-message");
    const confirmButton = document.getElementById("popup-confirm");
    const cancelButton = document.getElementById("popup-cancel");

    messageElement.textContent = message;
    popup.classList.remove("hidden");

    // Eventos para confirmar ou cancelar
    confirmButton.onclick = () => {
        popup.classList.add("hidden");
        onConfirm();
    };

    cancelButton.onclick = () => {
        popup.classList.add("hidden");
        if (onCancel) onCancel();
    };
}

function addToCart(product, value, stock, discountQuantity, discountValue) {
    const quantityInput = document.getElementById(`quantidade-${product}`);
    const quantity = parseInt(quantityInput.value);

    if (quantity === 0) {
        showAutoPopup(`Adicione pelo menos uma unidade deste produto!`, 3000);
        return;
    }

    if (quantity > stock) {
        showAutoPopup(`Quantidade solicitada excede o estoque de ${stock} itens do produto ${product}!`, 3000);
        return;
    }

    let total = value * quantity;
    let finalPrice = total;
    let discountAmount = 0;

    // Se o desconto se aplica
    if (quantity >= discountQuantity) {
        discountAmount = quantity * discountValue;
        finalPrice = total - discountAmount;
    }

    const cartItem = {
        product,
        quantity,
        value,
        discountAmount,
        totalPrice: finalPrice,
    };

    // Exibe popup de confirmação
    const productName = product.split(' ')[0];
    showPopup(
        `Deseja adicionar ${quantity}x ${productName} ao Carrinho?`,
        () => {
            let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            const existingProductIndex = cart.findIndex(item => item.product === product);

            if (existingProductIndex !== -1) {
                // Atualiza o item no carrinho
                cart[existingProductIndex].quantity += quantity;
                cart[existingProductIndex].totalPrice += finalPrice;
            } else {
                // Adiciona novo item ao carrinho
                cart.push(cartItem);
            }

            // Atualiza o carrinho no sessionStorage
            sessionStorage.setItem('cart', JSON.stringify(cart));
            updateCartBadge();
        }
    );
}




document.addEventListener('DOMContentLoaded', loadNavlogo);
document.addEventListener('DOMContentLoaded', loadNavbar);
document.addEventListener("DOMContentLoaded", () => {
    fetchCSVData(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vT4g_MUqtcSP4loWHNBUvLkuKRmsV_17z_umXslBqHu361Cxtn5nG1QRwDMGivyB_tgttme4xeAXzcg/pub?gid=0&single=true&output=csv"
    );
  });
  