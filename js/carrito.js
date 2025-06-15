document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();

  const btnVaciar = document.getElementById("btnVaciar");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      localStorage.removeItem("carrito");
      mostrarCarrito();
    });
  }

  const btnPagar = document.getElementById("btnPagar");
  if (btnPagar) {
    btnPagar.addEventListener("click", () => {
      const carrito = obtenerCarrito();
      const envio = 12;
      const total = calcularTotal(carrito) + envio;
      generarFacturaPDF(carrito, total, envio);
    });
  }
});

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function añadirAlCarrito(nombre, precio) {
  const carrito = obtenerCarrito();
  const index = carrito.findIndex(p => p.nombre === nombre);
  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  guardarCarrito(carrito);
  mostrarCarrito();
}

function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const carritoItems = document.getElementById("carrito-items");
  const carritoTotal = document.getElementById("carrito-total");
  const envio = 12;

  if (!carritoItems || !carritoTotal) return;

  carritoItems.innerHTML = "";

  if (carrito.length === 0) {
    carritoItems.innerHTML = "<p>Tu carrito está vacío.</p>";
    carritoTotal.innerHTML = "";
    return;
  }

  carrito.forEach((item, i) => {
    const div = document.createElement("div");
    div.classList.add("carrito-item");
    div.innerHTML = `
      <strong>${item.nombre}</strong> - ${item.precio.toFixed(2)} € x ${item.cantidad}
      <button onclick="cambiarCantidad(${i}, 1)">+</button>
      <button onclick="cambiarCantidad(${i}, -1)">-</button>
    `;
    carritoItems.appendChild(div);
  });

  const total = calcularTotal(carrito);
  carritoTotal.innerHTML = `
    <p>Envío: ${envio.toFixed(2)} €</p>
    <h3>Total: ${(total + envio).toFixed(2)} €</h3>
  `;
}

function cambiarCantidad(index, cambio) {
  const carrito = obtenerCarrito();
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  guardarCarrito(carrito);
  mostrarCarrito();
}

function calcularTotal(carrito) {
  return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

function generarFacturaPDF(productos, total, envio) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const fecha = new Date().toLocaleString();
  const numeroPedido = Math.floor(Math.random() * 1000000);

  doc.setFontSize(18);
  doc.text("Factura - DËLIRIUM 3D", 20, 20);
  doc.setFontSize(12);
  doc.text(`N.º Pedido: #${numeroPedido}`, 20, 30);
  doc.text(`Fecha: ${fecha}`, 20, 37);

  let y = 50;
  doc.text("Productos:", 20, y); y += 10;

  productos.forEach(p => {
    doc.text(`- ${p.nombre} x${p.cantidad} - ${(p.precio * p.cantidad).toFixed(2)} €`, 20, y);
    y += 7;
  });

  doc.text(`Envío: ${envio.toFixed(2)} €`, 20, y + 5);
  doc.setFontSize(14);
  doc.text(`Total: ${total.toFixed(2)} €`, 20, y + 15);
  doc.save(`factura_pedido_${numeroPedido}.pdf`);
}
