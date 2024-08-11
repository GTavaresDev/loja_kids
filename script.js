// Referências aos elementos do DOM
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCounter = document.getElementById("cart-count");
const checKoutBtn = document.getElementById("chekout-btn");
const addressInput = document.getElementById("personalise");
const addressWarn = document.getElementById("addres-warn");

const sizeModal = document.getElementById("size-modal");
const sizeSelect = document.getElementById("size-select");
const confirmSizeBtn = document.getElementById("confirm-size-btn");
const cancelSizeBtn = document.getElementById("cancel-size-btn");

let cart = [];
let selectedProduct = null;

// Adicionando o evento de clique para abrir o carrinho
cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Congelar o fundo
});

// Fechar o carrinho ao clicar fora do modal
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Fechar o carrinho ao clicar no botão "Fechar"
closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none";
    document.body.style.overflow = "auto";
});

// Atualizar o modal do carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
            <p class="font-medium">${item.name} (Tamanho: ${item.size})</p>
            <p>Qtd: ${item.quantity}</p>
            <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-from-cart-btn" data-name="${item.name}" data-size="${item.size}">
                Remover
            </button>          
        </div>
        `;

        total += item.price * item.quantity;
        totalQuantity += item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = totalQuantity;
}

// Adicionar produto ao carrinho
function addToCart(name, price, size) {
    const existingItem = cart.find(item => item.name === name && item.size === size);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            size,
            quantity: 1,
        });
    }
    updateCartModal();
}

// Remover item do carrinho
cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");
        const size = event.target.getAttribute("data-size");
        removeItemCard(name, size);
    }
});

function removeItemCard(name, size) {
    const index = cart.findIndex(item => item.name === name && item.size === size);
    if (index !== -1) {
        const item = cart[index];
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCartModal();
    }
}

// Abrir o modal de seleção de tamanho
function openSizeModal(name, price) {
    selectedProduct = { name, price };
    sizeModal.style.display = "flex";
}

// Confirmar seleção de tamanho
confirmSizeBtn.addEventListener("click", function () {
    if (selectedProduct) {
        const size = sizeSelect.value;
        addToCart(selectedProduct.name, selectedProduct.price, size);
        sizeModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Cancelar seleção de tamanho
cancelSizeBtn.addEventListener("click", function () {
    sizeModal.style.display = "none";
    document.body.style.overflow = "auto";
});

// Adicionar evento de clique para abrir o modal de seleção de tamanho ao adicionar ao carrinho
document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", function () {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        openSizeModal(name, price);
    });
});

// Finalizar pedido
checKoutBtn.addEventListener("click", function () {
    if (cart.length === 0) {
        return;
    }

    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

    const totalPedido = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const cartItems = cart.map(item => {
        return `${item.name} (Tamanho: ${item.size})\nQuantidade: ${item.quantity}\nPreço: R$${item.price.toFixed(2)}\n\n\n\t`;
    }).join("");

    const finalMessage = `${cartItems}\n\n\n\n Valor Final do pedido: R$${totalPedido.toFixed(2)}`;

    const message = encodeURIComponent(finalMessage);
    const phone = "62982190366";

    window.open(`https://wa.me/${phone}?text=${message}%20Forma%20de%20pagamento:%20${encodeURIComponent(addressInput.value)}`, "_blank");

    cart = [];
    updateCartModal();
});

// Função para verificar se o restaurante está aberto
function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    const diaDaSemana = data.getDay(); // 0 (Domingo) a 6 (Sábado)

    const estaAberto = (diaDaSemana >= 1 && diaDaSemana <= 5) && (hora >= 9 && hora < 18);

    return estaAberto;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();

if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-700");
} else {
    spanItem.classList.remove("bg-green-700");
    spanItem.classList.add("bg-red-500");
}

// Abrir Instagram
document.getElementById("abrir-insta").addEventListener("click", function () {
    window.open("https://www.instagram.com/dmkidsgo/");
});
