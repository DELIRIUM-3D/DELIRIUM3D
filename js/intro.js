// animación de entrada con salto por clic o scrolldocument.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const skipIntro = () => intro.classList.add('hidden');

  setTimeout(skipIntro, 3000); // Oculta tras 3 segundos
  window.addEventListener('click', skipIntro);
  window.addEventListener('scroll', skipIntro);
});
