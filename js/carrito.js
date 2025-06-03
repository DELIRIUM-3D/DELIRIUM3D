let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`${nombre} se ha añadido al carrito.`);
}

function mostrarCarrito() {
  const contenedor = document.getElementById('carrito-contenido');
  const totalDiv = document.getElementById('carrito-total');
  contenedor.innerHTML = '';

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
    totalDiv.innerHTML = '';
    return;
  }

  let total = 0;
  carrito.forEach((item, index) => {
    total += item.precio;
    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>${item.nombre}</strong> - ${item.precio.toFixed(2)} € 
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button></p>
    `;
    contenedor.appendChild(div);
  });

  totalDiv.innerHTML = `<h3>Total: ${total.toFixed(2)} €</h3>`;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}
