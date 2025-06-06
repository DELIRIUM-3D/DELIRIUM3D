// Cargar header y footer automáticamente una vez
function includeHTML() {
  if (document.body.classList.contains("html-incluido")) return;
  document.body.classList.add("html-incluido");

  const elements = document.querySelectorAll('[data-include]');
  elements.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => res.text())
      .then(data => el.innerHTML = data)
      .catch(() => el.innerHTML = "<p>Error al cargar componente</p>");
  });
}
document.addEventListener("DOMContentLoaded", includeHTML);

// Mostrar productos populares desde localStorage
function mostrarProductosPopulares() {
  const datos = JSON.parse(localStorage.getItem("productosPopulares")) || [];
  if (!Array.isArray(datos) || datos.length === 0) return;

  // Ordenar por clics descendente
  const populares = datos.sort((a, b) => b.clicks - a.clicks).slice(0, 3);
  if (populares.length === 0) return;

  const contenedor = document.getElementById("productos-populares");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  populares.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h4>${producto.nombre}</h4>
      <p>${producto.precio.toFixed(2)} €</p>
      <button class="boton" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Añadir al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}
document.addEventListener("DOMContentLoaded", mostrarProductosPopulares);

// Registrar clic en producto para popularidad
function registrarClickProducto(nombre) {
  let datos = JSON.parse(localStorage.getItem("productosPopulares")) || [];
  const index = datos.findIndex(p => p.nombre === nombre);

  if (index !== -1) {
    datos[index].clicks++;
  } else {
    datos.push({
      nombre: nombre,
      clicks: 1,
      precio: 0,
      imagen: "assets/img/no-image.png"
    });
  }

  localStorage.setItem("productosPopulares", JSON.stringify(datos));
}
