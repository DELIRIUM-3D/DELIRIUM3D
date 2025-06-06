// Añadir producto al carrito
function agregarAlCarrito(nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Buscar si el producto ya existe
  const index = carrito.findIndex(item => item.nombre === nombre);

  if (index !== -1) {
    // Ya existe, sumar cantidad
    carrito[index].cantidad = (carrito[index].cantidad || 1) + 1;
  } else {
    // Nuevo producto
    carrito.push({
      nombre: nombre,
      precio: precio,
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Feedback opcional
  alert(`"${nombre}" añadido al carrito.`);
}
