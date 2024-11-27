function updateCart() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartTable = document.getElementById('cart-table');
    const totalAmount = document.getElementById('cart-total');
    const totalDiscountCart = document.getElementById('cart-discount');
    let totalPrice = 0;
    let totalDiscount = 0;

    cartTable.innerHTML = '';

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.product}</td>
            <td>${item.quantity}</td>
            <td>R$ ${item.value.toFixed(2)}</td>
            <td>R$ ${item.totalPrice.toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeItem(${index})">X</button></td>
        `;
        cartTable.appendChild(row);
        totalPrice += item.totalPrice;
        totalDiscount += item.discountAmount;
    });

    totalAmount.textContent = totalPrice.toFixed(2);
    totalDiscountCart.textContent = totalDiscount.toFixed(2);
    updateCartBadge();
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

function removeItem(index) {
    showPopup('Tem certeza que deseja remover este item do carrinho?',() => {
            const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            cart.splice(index, 1);
            sessionStorage.setItem('cart', JSON.stringify(cart));
            updateCart(); 
        },
    );
}

document.addEventListener('DOMContentLoaded', function() {
    const botaoFinalizar = document.getElementById('finalizar-compra');
    const modal = document.getElementById('modalName');
    const btnConfirmar = document.getElementById('btnCofirm');
    const closeBtn = document.getElementsByClassName('close-btn')[0];
    const nomeInput = document.getElementById('BuyerName');

    if (botaoFinalizar) {
        botaoFinalizar.addEventListener('click', () => {
            const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            

            if (cart.length > 0) {
                modal.style.display = "block";
            // Quando clica em "Confirmar", gera a mensagem para WhatsApp
            btnConfirmar.addEventListener('click', function() {
                const nome = nomeInput.value;
                
                // Gerar mensagem para WhatsApp
                const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
                let message = `Olá, meu nome é ${nome} e desejo realizar uma compra. Segue pedido de compra abaixo:\n\n`;

                cart.forEach(item => {
                    message += `Produto: ${item.product}\nQuantidade: ${item.quantity}\nPreço Total: R$ ${item.totalPrice.toFixed(2)}\n\n`;
                });

                const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0);
                message += `Total da Compra: R$ ${totalPrice.toFixed(2)}\n`;

                const completedMessage = encodeURIComponent(message);
                const whatsappLink = `https://wa.me/554884928409?text=${completedMessage}`;
                window.open(whatsappLink, '_blank'); // Abre o WhatsApp

                modal.style.display = "none";
            });

            // Fechar modal quando clicar no "X"
            closeBtn.addEventListener('click', function() {
                modal.style.display = "none";
            });

            // Fechar modal se clicar fora da modal
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });
            } else {
                showAutoPopup("Carrinho está vazio!", 2500);
            }
        });
    } else {
    }
});


function loadNavlogoCarrinho(){
    fetch('../../navlogo/navlogo-carrinho.html')
        .then(response => response.text())
        .then(data => document.getElementById('navlogo-carrinho-mainpage').innerHTML = data)
}

function loadNavbar(){
    fetch('../../navbar/navbar.html')
        .then(response => response.text())
        .then(data => document.getElementById('navbar-mainpage').innerHTML = data)
}

// Carrega o carrinho quando a página de carrinho é carregada
document.addEventListener('DOMContentLoaded', updateCart);
document.addEventListener('DOMContentLoaded', loadNavlogoCarrinho);
document.addEventListener('DOMContentLoaded', loadNavbar);