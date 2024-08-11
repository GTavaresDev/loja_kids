document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos do DOM
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartModalSize = document.getElementById('cart-modal-size-1');
    const closeModalBtnSize = document.getElementById('close-modal-btn-size');
    const saveSizeBtnSize = document.getElementById('save-size-btn-size');
    const cartModal = document.getElementById('cart-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const checkoutBtn = document.getElementById('chekout-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const addressInput = document.getElementById('personalise');
    const addressWarn = document.getElementById('addres-warn');
    const abrirInsta = document.getElementById('abrir-insta');
  
    let cart = [];
  
    cartBtn.addEventListener("click", function () {
      updateCartModal();
      cartModal.classList.remove("hidden"); // Mostrar modal
      document.body.style.overflow = "hidden"; // Congelar fundo
  });
  
  closeModalBtn.addEventListener("click", function () {
      cartModal.classList.add("hidden"); // Esconder modal
      document.body.style.overflow = "auto"; // Descongelar fundo
  });
  
  cartModal.addEventListener("click", function (event) {
      if (event.target === cartModal) {
          cartModal.classList.add("hidden"); // Fechar modal ao clicar fora
          document.body.style.overflow = "auto"; // Descongelar fundo
      }
  });
    // Adiciona item ao carrinho
    function addToCart(name, price) {
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          name,
          price,
          quantity: 1,
        });
      }
      updateCartModal();
    }
  
    // Atualiza o modal do carrinho
    function updateCartModal() {
      cartItemsContainer.innerHTML = "";
      let total = 0;
      let totalQuantity = 0;
  
      cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col');
        cartItemElement.innerHTML = `
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">${item.name}</p>
              <p>Qtd: ${item.quantity}</p>
              <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>
          </div>
        `;
        total += item.price * item.quantity;
        totalQuantity += item.quantity;
        cartItemsContainer.appendChild(cartItemElement);
      });
  
      cartTotal.textContent = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      cartCount.textContent = totalQuantity;
    }
  
    // Remove item do carrinho
    cartItemsContainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('remove-from-cart-btn')) {
        const name = event.target.getAttribute('data-name');
        removeItemFromCart(name);
      }
    });
  
    function removeItemFromCart(name) {
      const index = cart.findIndex(item => item.name === name);
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
  
    // Finaliza o pedido
    checkoutBtn.addEventListener('click', function() {
      if (cart.length === 0) {
        return;
      }
  
      if (addressInput.value === "") {
        addressWarn.classList.remove('hidden');
        addressInput.classList.add('border-red-500');
        return;
      }
  
      const totalPedido = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      const cartItems = cart.map(item => `${item.name} \n Quantidade: (${item.quantity}) \n Preço: R$${item.price} \n\n`).join("");
      const finalMessage = `${cartItems}\nValor Final do pedido: R$${totalPedido.toFixed(2)}`;
      const message = encodeURIComponent(finalMessage);
      const phone = "62982190366";
      window.open(`https://wa.me/${phone}?text=${message}%20Forma%20de%20pagamento:%20${encodeURIComponent(addressInput.value)}`, "_blank");
      
      cart = [];
      updateCartModal();
    });
  
    // Abre o Instagram
    abrirInsta.addEventListener('click', function() {
      window.open("https://www.instagram.com/dmkidsgo/");
    });
  });
  