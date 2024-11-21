function updateCart() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartTable = document.getElementById('tabela-carrinho');
    const totalAmount = document.getElementById('total-carrinho');
    let totalPrice = 0;

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
    });

    totalAmount.textContent = totalPrice.toFixed(2);
}


function removeItem(index) {
    const confirmRemove = confirm('Tem certeza que deseja remover este item do carrinho?');
    if (confirmRemove) {
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        sessionStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const botaoFinalizar = document.getElementById('finalizar-compra');
    
    if (botaoFinalizar) {
        botaoFinalizar.addEventListener('click', () => {
            const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            //console.log('Conteúdo do carrinho:', cart);

            if (cart.length > 0) {
                // Cria e exibe o formulário de nome e telefone
                const nome = prompt("Por favor, insira seu nome:");
                if (!nome) {
                    alert("Nome não informado. A compra foi cancelada.");
                    return;
                }

                const telefone = prompt("Por favor, insira seu telefone (exemplo: 559999999999):");
                if (!telefone) {
                    alert("Telefone não informado. A compra foi cancelada.");
                    return;
                }

                let message = `Olá, meu nome é ${nome} e estou fazendo um pedido de compra. Confira as informações abaixo:\n\n`;
                let totalPrice = 0;
                
                cart.forEach(item => {
                    message += `Produto: ${item.product}\nQuantidade: ${item.quantity}\n`;
                    message += `Preço Total: R$ ${item.totalPrice.toFixed(2)}\n\n`;
                    totalPrice += item.totalPrice;
                });

                message += `Total da Compra: R$ ${totalPrice.toFixed(2)}\n`;
                message += `\nPor favor, aguardo o retorno sobre o status do meu pedido. Obrigado!`;
                
                const completedMessage = encodeURIComponent(message);

                // console.log('Mensagem gerada:', message);
                // console.log('Mensagem codificada:', completedMessage);

                const whatsappLink = `https://wa.me/${telefone}?text=${completedMessage}`;
                
                // Verifique se o link está correto
                console.log('Link gerado:', whatsappLink);
                
                // Abrir o link no WhatsApp
                window.open(whatsappLink, '_blank');
            } else {
                alert('Seu carrinho está vazio!');
            }
        });
    } else {
        console.error('Botão de finalizar compra não encontrado!');
    }
});


function loadNavlogoCarrinho(){
    fetch('./componentes/navlogo/navlogo-carrinho.html')
        .then(response => response.text())
        .then(data => document.getElementById('navlogo-carrinho-mainpage').innerHTML = data)
}

function loadNavbar(){
    fetch('./componentes/navbar/navbar.html')
        .then(response => response.text())
        .then(data => document.getElementById('navbar-mainpage').innerHTML = data)
}

// Carrega o carrinho quando a página de carrinho é carregada
document.addEventListener('DOMContentLoaded', updateCart);
document.addEventListener('DOMContentLoaded', loadNavlogoCarrinho);
document.addEventListener('DOMContentLoaded', loadNavbar);