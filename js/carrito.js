function agregarAlCarrito(nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex(item => item.nombre === nombre);

  if (index !== -1) {
    carrito[index].cantidad = (carrito[index].cantidad || 1) + 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarNotificacion(`${nombre} añadido al carrito.`);
}

function mostrarNotificacion(texto) {
  const notif = document.getElementById("notificacion-carrito");
  if (!notif) return;

  notif.textContent = "✅ " + texto;
  notif.classList.add("mostrar");

  setTimeout(() => {
    notif.classList.remove("mostrar");
    setTimeout(() => notif.style.display = "none", 400);
  }, 2000);

  notif.style.display = "block";
}
