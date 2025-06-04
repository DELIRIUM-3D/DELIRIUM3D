function agregarAlCarrito(nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const index = carrito.findIndex(item => item.nombre === nombre);

  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ nombre, precio: parseFloat(precio), cantidad: 1 });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`${nombre} se ha añadido al carrito.`);

  // ✅ Registrar clic para estadísticas de popularidad
  registrarClickProducto(nombre);
}

// ✅ Registro de clics para productos más buscados
function registrarClickProducto(nombre) {
  let clicks = JSON.parse(localStorage.getItem('productoClicks')) || {};
  clicks[nombre] = (clicks[nombre] || 0) + 1;
  localStorage.setItem('productoClicks', JSON.stringify(clicks));
}
