// main.js – Funciones JS básicas para DËLIRIUM 3D

document.addEventListener("DOMContentLoaded", () => {
  console.log("DËLIRIUM 3D cargado correctamente");

  // Scroll suave para los enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
      e.preventDefault();
      const destino = document.querySelector(this.getAttribute('href'));
      if (destino) {
        destino.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Ejemplo: carga dinámica de productos (versión básica)
  if (document.querySelector("#contenedor-productos")) {
    const productos = [
      {
        nombre: "Funko personalizado",
        imagen: "imagenes/funko1.jpg",
        precio: "29.99 €"
      },
      {
        nombre: "Cartel LED Minecraft",
        imagen: "imagenes/cartel1.jpg",
        precio: "24.99 €"
      },
      {
        nombre: "Soporte Mando PS5",
        imagen: "imagenes/soporte1.jpg",
        precio: "14.99 €"
      }
    ];

    const contenedor = document.querySelector("#contenedor-productos");

    productos.forEach(prod => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h4>${prod.nombre}</h4>
        <p>${prod.precio}</p>
        <a class="boton" href="https://wa.me/34600000000?text=Hola,%20quiero%20comprar:%20${encodeURIComponent(prod.nombre)}">Comprar por WhatsApp</a>
      `;
      contenedor.appendChild(div);
    });
  }

});
