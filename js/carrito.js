// Recuperar el carrito desde localStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar el carrito actualizado
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Añadir producto al carrito
function añadirAlCarrito(nombre, precio) {
  const existente = carrito.find(p => p.nombre === nombre);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  guardarCarrito();
  alert(`${nombre} se ha añadido al carrito`);
}

// Mostrar productos en la página del carrito
function mostrarCarrito() {
  const contenedor = document.getElementById("carrito-items");
  const totalElemento = document.getElementById("carrito-total");
  contenedor.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalElemento.innerHTML = "";
    return;
  }

  carrito.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("item-carrito");
    div.innerHTML = `
      <span>${producto.nombre} x${producto.cantidad}</span>
      <span>${(producto.precio * producto.cantidad).toFixed(2)} €</span>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    contenedor.appendChild(div);
    total += producto.precio * producto.cantidad;
  });

  const envio = 4.99;
  totalElemento.innerHTML = `<strong>Total: ${(total + envio).toFixed(2)} € (incl. envío)</strong>`;
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  mostrarCarrito();
}

// Vaciar todo el carrito
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  mostrarCarrito();
}

// Evento al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const btnVaciar = document.getElementById("btnVaciar");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", vaciarCarrito);
  }

  if (document.getElementById("carrito-items")) {
    mostrarCarrito();
  }
});
