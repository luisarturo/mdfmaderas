document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".menu a");
  const sideMenuLinks = document.querySelectorAll(".side-menu a");
  const sections = document.querySelectorAll("section");
  const subSections = document.querySelectorAll("#inicio > section"); // Solo subsecciones dentro de "inicio"

  function hideAllSections() {
    sections.forEach(section => {
      section.style.display = "none";
      section.classList.remove("active");
    });
  }

  function hideAllSubSections() {
    subSections.forEach(subSection => {
      subSection.style.display = "none";
      subSection.classList.remove("active");
    });
  }

  function removeActiveClass(links) {
    links.forEach(link => link.classList.remove("active"));
  }

  function showSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      hideAllSections();
      targetSection.style.display = "block";
      targetSection.classList.add("active");
      if (targetId === "inicio") {
        hideAllSubSections();
        selectFirstSideMenuOption();
      }
    }
  }

  function showSubSection(targetId) {
    hideAllSubSections(); // Oculta todas las subsecciones antes de mostrar la nueva
    const targetSubSection = document.getElementById(targetId);
    if (targetSubSection) {
      targetSubSection.style.display = "block";
      targetSubSection.classList.add("active");
    }
  }

  function handleMenuClick(link, linksGroup) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      showSection(targetId);
      removeActiveClass(linksGroup);
      this.classList.add("active");
    });
  }

  function handleSideMenuClick(link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      showSubSection(targetId);
      removeActiveClass(sideMenuLinks);
      removeActiveClassFromLi(sideMenuLinks);
      this.classList.add("active");
      this.parentElement.classList.add("active"); // Agregar la clase active al li
    });
  }

  function removeActiveClassFromLi(linksGroup) {
    linksGroup.forEach(link => {
      link.classList.remove("active");
      link.parentElement.classList.remove("active"); // Eliminar la clase active del li
    });
  }

  function selectFirstSideMenuOption() {
    const firstSideMenuLink = document.querySelector(".side-menu a");
    if (firstSideMenuLink) {
      const targetId = firstSideMenuLink.getAttribute("href").substring(1);
      showSubSection(targetId);
      removeActiveClass(sideMenuLinks);
      removeActiveClassFromLi(sideMenuLinks);
      firstSideMenuLink.classList.add("active");
      firstSideMenuLink.parentElement.classList.add("active"); // Agregar la clase active al li
    }
  }

  menuLinks.forEach(link => handleMenuClick(link, menuLinks));
  sideMenuLinks.forEach(link => handleSideMenuClick(link));

  // Seleccionar la opción "Inicio" por defecto
  const firstSection = sections[0];
  const firstLink = menuLinks[0];

  if (firstSection && firstLink) {
    hideAllSections();
    firstSection.style.display = "block";
    firstSection.classList.add("active");
    firstLink.classList.add("active");
    hideAllSubSections(); // Asegura que las subsecciones están ocultas inicialmente
    selectFirstSideMenuOption(); // Activa la primera opción del side-menu por defecto
  }

  // MODAL
  // Datos de cada botón
  const modalData = [
    {
      title: "Optimización de cortes",
      img: "/image/IMG_8833-1024x768-1-800x600.jpg",
      text: `Contamos con servicio de optimización de corte para un mejor aprovechamiento de los tableros buscando reducir el desperdicio. 
              A través de un software se calculan cuántos tableros se requieren para un proyecto, se define un diagrama de corte y la orientación de las vetas que tendrán cada pieza del proyecto:
              • Servicios de dimensionado.
              • Servicios de Optimizacion de Cortes.`
    },
    {
      title: "Enchapados de cantos",
      img: "/image/DJI_0465-1-800x600.jpg",
      text: `Realizamos la colocación del canto de manera impecable para un mejor acabado de tu mueble. Contamos con maquinaria especializada que permite adherirlos con una mayor presión y exactitud. Puedes elegir entre una amplia variedad de cubrecantos melamínicos o de PVC y proteger tus muebles contra golpes y humedad.`
    },
    {
      title: "Mecanizado con CNC",
      img: "/image/MECANIZADO-CNC-800x826.png",
      text: `Perforamos los tableros de manera exacta, para que puedas colocar más fácilmente los taquetes. Contamos con maquinaria CNC; especial para hacer este tipo de perforaciones con exactitud de longitud y profundidad para la colocación de tornillos y taquetes.`
    }
  ];

  // Función para abrir el modal con el contenido dinámico
  function openModal(index) {
    const data = modalData[index];
    document.getElementById("modal-title").innerText = data.title;
    document.getElementById("modal-img").src = data.img;
    document.getElementById("modal-text").innerText = data.text;
    document.getElementById("modal").style.display = "flex";
  }

  // Función para cerrar el modal
  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }

  // Cierra el modal si se hace clic fuera del contenido
  window.onclick = function (event) {
    let modal = document.getElementById("modal");
    if (event.target === modal) {
      closeModal();
    }
  };

  // Asignar eventos a los botones dinámicamente
  window.onload = function () {
    const buttons = document.querySelectorAll(".buttonContainer button");

    buttons.forEach((button, index) => {
      button.addEventListener("click", function () {
        openModal(index);
      });
    });

    // Asignar evento para cerrar el modal
    document.getElementById("close-modal").addEventListener("click", closeModal);
  };
});
