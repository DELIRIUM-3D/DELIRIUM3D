// Código JS general para interacción
document.addEventListener('DOMContentLoaded', () => {
  // Si deseas hacer acciones al cargar la página, hazlo aquí
  console.log("DËLIRIUM 3D cargado correctamente.");
  
  // Ejemplo: marcar el menú actual activo
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });
});
// ==========================
// 🔥 PRODUCTOS MÁS BUSCADOS
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductosPopulares();
});

function mostrarProductosPopulares() {
  const productosDisponibles = {
    "Funko personalizado": {
      precio: 30,
      imagen: "assets/img/funko-ejemplo.jpg"
    },
    "Cartel LED Minecraft": {
      precio: 19.99,
      imagen: "assets/img/cartel-led.jpg"
    },
    "Soporte móvil": {
      precio: 7.99,
      imagen: "assets/img/soporte-movil.jpg"
    },
    "Llavero anime": {
      precio: 4.99,
      imagen: "assets/img/llavero-anime.jpg"
    }
    // Puedes agregar más productos aquí si deseas
  };

  const clicks = JSON.parse(localStorage.getItem('productoClicks')) || {};
  const ordenados = Object.entries(clicks)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const contenedor = document.getElementById('productos-populares');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  ordenados.forEach(([nombre]) => {
    const producto = productosDisponibles[nombre];
    if (producto) {
      contenedor.innerHTML += `
        <div class="producto">
          <img src="${producto.imagen}" alt="${nombre}" />
          <h4>${nombre}</h4>
          <p>${producto.precio.toFixed(2)} €</p>
          <button class="boton" onclick="agregarAlCarrito('${nombre}', ${producto.precio})">Añadir al carrito</button>
        </div>
      `;
    }
  });
}
