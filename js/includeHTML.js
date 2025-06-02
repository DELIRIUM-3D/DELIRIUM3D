function includeHTML() {
  const elements = document.querySelectorAll('[w3-include-html]');

  elements.forEach(el => {
    const file = el.getAttribute('w3-include-html');
    if (!file) return;

    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Error al cargar ${file}`);
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;
        el.removeAttribute('w3-include-html');
        includeHTML(); // Carga recursiva si hay más componentes dentro
      })
      .catch(err => {
        el.innerHTML = "No se pudo cargar el contenido.";
        console.error(err);
      });
  });
}
