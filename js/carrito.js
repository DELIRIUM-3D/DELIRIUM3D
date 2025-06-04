function agregarAlCarrito(nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Buscar si ya existe el producto
  const index = carrito.findIndex(item => item.nombre === nombre);

  if (index !== -1) {
    carrito[index].cantidad += 1; // Aumentar cantidad
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`${nombre} se ha añadido al carrito.`);
}

function registrarClickProducto(nombre) {
  let clicks = JSON.parse(localStorage.getItem('productoClicks')) || {};
  clicks[nombre] = (clicks[nombre] || 0) + 1;
  localStorage.setItem('productoClicks', JSON.stringify(clicks));
}
