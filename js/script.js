document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".menu a, .side-menu a");
  const sections = document.querySelectorAll("section");

  function hideAllSections() {
    sections.forEach(section => {
      section.style.display = "none";
    });
  }

  function removeActiveClass() {
    menuLinks.forEach(link => link.classList.remove("active"));
  }

  menuLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        hideAllSections(); // Oculta todas las secciones
        targetSection.style.display = "block"; // Muestra la sección seleccionada

        removeActiveClass(); // Elimina la clase active de todos los enlaces
        this.classList.add("active"); // Agrega la clase active al enlace seleccionado
      } else {
        console.error("Sección no encontrada:", targetId);
      }
    });
  });

  // Seleccionar la opción "Inicio" por defecto
  const firstSection = sections[0];
  const firstLink = menuLinks[0];

  if (firstSection && firstLink) {
    hideAllSections();
    firstSection.style.display = "block"; // Muestra la primera sección
    firstLink.classList.add("active"); // Marca el primer enlace como activo
  }
});
