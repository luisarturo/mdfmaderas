document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".menu a");
  const sections = document.querySelectorAll("section");

  function hideAllSections() {
    sections.forEach(section => section.classList.remove("active"));
  }

  menuLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        hideAllSections(); // Oculta todas las secciones
        targetSection.classList.add("active"); // Muestra la seleccionada
      } else {
        console.error("Sección no encontrada:", targetId);
      }
    });
  });

  // Mostrar la primera sección al cargar
  sections[0].classList.add("active");
});
