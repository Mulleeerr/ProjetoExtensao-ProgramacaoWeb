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
        const [product, value, quantity, imageUrl] = rows[i];
        if (product && value && quantity && imageUrl) {
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
                                  <i class="h5 col bi bi-cart-plus" onclick="addToCart('${product}', ${value})"></i>
                                  <input id="quantidade-${product}" class="col" value="1" min="1" />
                              </div>
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

  function addToCart(product, value) {
    const quantityProduct = document.getElementById(`quantidade-${product}`);
    const quantity = parseInt(quantityProduct.value);

    if (quantity > 0) {
        const cartItem = {
            product,
            quantity,
            value,
            totalPrice: value * quantity
        };
        const productName = product.split(' ')[0];
        let confirmation = confirm(`Deseja adicionar ${quantity}x ${productName} ao Carrinho?`);

        // Verifica se existe ja um carrinho armazenado no sessionStorage, se tiver, converte ele em um array
        let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        // Procura um produto se algum produto deste array e retorna o indice dele no carrinho
        const existingProductIndex = cart.findIndex(item => item.product === product);

        // Caso o produto que esta tentando adicionar ja exista, apenas incrementa a quantidade e altera o preco
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += quantity;
            cart[existingProductIndex].totalPrice = cart[existingProductIndex].value * cart[existingProductIndex].quantity;
        } else {
            cart.push(cartItem);
        }
        // Armazena no SessionStorage o carrinho atualizado
        sessionStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
    }
}


document.addEventListener('DOMContentLoaded', loadNavlogo);
document.addEventListener('DOMContentLoaded', loadNavbar);
document.addEventListener("DOMContentLoaded", () => {
    fetchCSVData(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vT4g_MUqtcSP4loWHNBUvLkuKRmsV_17z_umXslBqHu361Cxtn5nG1QRwDMGivyB_tgttme4xeAXzcg/pub?gid=0&single=true&output=csv"
    );
  });
  