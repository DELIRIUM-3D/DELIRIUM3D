function includeHTML() {
  const elements = document.querySelectorAll('[w3-include-html]');
  elements.forEach((el) => {
    const file = el.getAttribute('w3-include-html');
    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar " + file);
        return res.text();
      })
      .then(html => {
        el.innerHTML = html;
        el.removeAttribute('w3-include-html');
        includeHTML(); // soporte para componentes anidados
      })
      .catch(err => {
        el.innerHTML = "Error al cargar el componente.";
        console.error(err);
      });
  });
}
