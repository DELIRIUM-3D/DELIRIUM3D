// Añadir producto al carrito con cantidad acumulada
function agregarAlCarrito(nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex(item => item.nombre === nombre);

  if (index !== -1) {
    carrito[index].cantidad = (carrito[index].cantidad || 1) + 1;
  } else {
    carrito.push({
      nombre: nombre,
      precio: precio,
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarNotificacion(`${nombre} añadido al carrito.`);
}

// Mostrar notificación flotante con sonido
function mostrarNotificacion(texto) {
  const notif = document.getElementById("notificacion-carrito");
  const sonido = document.getElementById("sonido-carrito");

  if (!notif) return;

  notif.textContent = "✅ " + texto;
  notif.classList.add("mostrar");

  if (sonido) sonido.play();

  setTimeout(() => {
    notif.classList.remove("mostrar");
    setTimeout(() => notif.style.display = "none", 400);
  }, 2000);

  notif.style.display = "block";
}
async function generarFacturaPDF(productos, total, envio) {
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
  doc.text("Productos:", 20, y);
  y += 10;

  productos.forEach(p => {
    doc.text(`- ${p.nombre} x${p.cantidad} - ${p.precio.toFixed(2)}€`, 20, y);
    y += 7;
  });

  doc.text(`Envío: ${envio.toFixed(2)}€`, 20, y + 5);
  doc.setFontSize(14);
  doc.text(`Total: ${total.toFixed(2)}€`, 20, y + 15);

  doc.save(`factura_pedido_${numeroPedido}.pdf`);
}
