// Recuperar carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

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
      <span>${producto.nombre}</span>
      <div>
        <button onclick="cambiarCantidad(${index}, -1)">−</button>
        <span> ${producto.cantidad} </span>
        <button onclick="cambiarCantidad(${index}, 1)">+</button>
      </div>
      <span>${(producto.precio * producto.cantidad).toFixed(2)} €</span>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    contenedor.appendChild(div);
    total += producto.precio * producto.cantidad;
  });

  const envio = 4.99;
  totalElemento.innerHTML = `<strong>Total: ${(total + envio).toFixed(2)} € (incl. envío)</strong>`;
}

function cambiarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  guardarCarrito();
  mostrarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  const btnVaciar = document.getElementById("btnVaciar");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", vaciarCarrito);
  }

  if (document.getElementById("carrito-items")) {
    mostrarCarrito();
  }
});
