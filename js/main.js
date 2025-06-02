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
