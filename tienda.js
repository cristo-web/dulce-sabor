const carrito = [];

document.addEventListener('DOMContentLoaded', () => {
  const listaCarrito = document.getElementById('lista-carrito');
  const btnPedido = document.getElementById('realizar-pedido');

  const botonesComprar = document.querySelectorAll('.btn-comprar');
  botonesComprar.forEach((btn) => {
    btn.addEventListener('click', () => {
      const producto = btn.closest('.tarjeta');
      const nombre = producto.querySelector('h3').textContent;
      const precio = parseFloat(producto.querySelector('.precio').textContent.replace('$', ''));

      const itemExistente = carrito.find(item => item.nombre === nombre);
      if (itemExistente) {
        itemExistente.cantidad += 1;
        itemExistente.precioTotal += precio;
      } else {
        carrito.push({
          nombre,
          precioUnitario: precio,
          precioTotal: precio,
          cantidad: 1
        });
      }

      actualizarCarrito();
    });
  });

  listaCarrito.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar')) {
      const nombre = e.target.dataset.nombre;
      const index = carrito.findIndex(item => item.nombre === nombre);
      if (index !== -1) {
        carrito.splice(index, 1);
        actualizarCarrito();
      }
    }
  });

  btnPedido.addEventListener('click', () => {
  const mensajePedido = document.getElementById('mensaje-pedido');

  if (carrito.length === 0) {
    mensajePedido.style.color = 'red';
    mensajePedido.textContent = 'La lista está vacía...';
    return;
  }

  mensajePedido.style.color = 'green';
  mensajePedido.textContent = '¡Gracias por su compra!';

  carrito.length = 0;
  actualizarCarrito();

  // Opcional: limpiar el mensaje después de 3 segundos
  setTimeout(() => {
    mensajePedido.textContent = '';
  }, 3000);
 });

  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    carrito.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.nombre} x${item.cantidad} - $${item.precioTotal.toFixed(2)}
     <button class="eliminar" data-nombre="${item.nombre}" 
         style="margin-left: 5px; border: none; background: black; color: white; 
           cursor: pointer; padding: 4px 7px; border-radius: 6px; 
           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); transition: box-shadow 0.3s ease;">
         🗑️
      </button>`;
      listaCarrito.appendChild(li);
    });
  }
});

