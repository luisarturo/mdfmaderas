document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".menu a");
  const sections = document.querySelectorAll("section");

  // Menús laterales y subsecciones
  const sideMenuInicio = document.querySelectorAll("#inicio .side-menu a");
  const sideMenuServicio = document.querySelectorAll("#servicios .side-menu a");
  const subSectionsInicio = document.querySelectorAll("#inicio > section");
  const subSectionsServicio = document.querySelectorAll("#servicios > section");

  function hideAllSections() {
    sections.forEach(section => {
      section.style.display = "none";
      section.classList.remove("active");
    });
  }

  function hideAllSubSections(subSections) {
    subSections.forEach(subSection => {
      if (subSection.id !== "video-gallery") {
        subSection.style.display = "none";
        subSection.classList.remove("active");
      }
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
        hideAllSubSections(subSectionsServicio); // Oculta subsecciones de Servicio si venías de ahí
        hideAllSubSections(subSectionsInicio);
        selectFirstSideMenuOption(sideMenuInicio, subSectionsInicio);
      } else if (targetId === "servicios") {
        hideAllSubSections(subSectionsInicio); // Oculta subsecciones de Inicio si venías de ahí
        hideAllSubSections(subSectionsServicio);
        selectFirstSideMenuOption(sideMenuServicio, subSectionsServicio);
      }
    }
  }

  function showSubSection(targetId, subSections) {
    hideAllSubSections(subSections);
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

  function handleSideMenuClick(link, sideMenuGroup, subSections) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      showSubSection(targetId, subSections);
      removeActiveClass(sideMenuGroup);
      removeActiveClassFromLi(sideMenuGroup);
      this.classList.add("active");
      this.parentElement.classList.add("active");
    });
  }

  function removeActiveClassFromLi(linksGroup) {
    linksGroup.forEach(link => {
      link.classList.remove("active");
      if (link.parentElement) {
        link.parentElement.classList.remove("active");
      }
    });
  }

  function selectFirstSideMenuOption(sideMenuGroup, subSections) {
    if (sideMenuGroup.length > 0) {
      const firstSideMenuLink = sideMenuGroup[0];
      const targetId = firstSideMenuLink.getAttribute("href").substring(1);
      showSubSection(targetId, subSections);
      removeActiveClass(sideMenuGroup);
      removeActiveClassFromLi(sideMenuGroup);
      firstSideMenuLink.classList.add("active");
      firstSideMenuLink.parentElement.classList.add("active");
    }
  }

  // Agregar eventos a los enlaces del menú principal
  menuLinks.forEach(link => handleMenuClick(link, menuLinks));

  // Agregar eventos a los enlaces de cada menú lateral
  sideMenuInicio.forEach(link => handleSideMenuClick(link, sideMenuInicio, subSectionsInicio));
  sideMenuServicio.forEach(link => handleSideMenuClick(link, sideMenuServicio, subSectionsServicio));

  // Mostrar la sección inicial por defecto
  const firstSection = sections[0];
  const firstLink = menuLinks[0];

  if (firstSection && firstLink) {
    hideAllSections();
    firstSection.style.display = "block";
    firstSection.classList.add("active");
    firstLink.classList.add("active");

    hideAllSubSections(subSectionsInicio);
    selectFirstSideMenuOption(sideMenuInicio, subSectionsInicio);
  }

  // MODAL
  const modalData = [
    {
      title: "Optimización de cortes",
      img: "/image/IMG_8833-1024x768-1-800x600.jpg",
      text: `Contamos con servicio de optimización de corte para un mejor aprovechamiento de los tableros buscando reducir el desperdicio. 
              A través de un software se calculan cuántos tableros se requieren para un proyecto, se define un diagrama de corte y la orientación de las vetas que tendrán cada pieza del proyecto:
              • Servicios de dimensionado.
              • Servicios de Optimización de Cortes.`
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

  function openModal(index) {
    const data = modalData[index];
    document.getElementById("modal-title").innerText = data.title;
    document.getElementById("modal-img").src = data.img;
    document.getElementById("modal-text").innerText = data.text;
    document.getElementById("modal").style.display = "flex";

    modal.classList.add('show');
    modal.classList.remove('hide');
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 500); // Tiempo de la animación
  }

  window.onclick = function (event) {
    let modal = document.getElementById("modal");
    if (event.target === modal) {
      closeModal();
    }
  };

  window.onload = function () {
    const buttons = document.querySelectorAll(".buttonContainer button");
    buttons.forEach((button, index) => {
      button.addEventListener("click", function () {
        openModal(index);
      });
    });

    document.getElementById("close-modal").addEventListener("click", closeModal);
  };

  // SLIDER
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  const slideInterval = setInterval(nextSlide, 5000); // Cambiar a 5 segundos

  function nextSlide() {
    slides[currentSlide].classList.remove("active");
    slides[currentSlide].classList.add("fade-out");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("fade-in");
    slides[currentSlide].classList.add("active");
    setTimeout(() => {
      slides.forEach(slide => slide.classList.remove("fade-in", "fade-out"));
    }, 1000); // Duración de la animación de desvanecimiento
  }

  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", function () {
      slides[currentSlide].classList.remove("active");
      slides[currentSlide].classList.add("fade-out");
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      slides[currentSlide].classList.add("fade-in");
      slides[currentSlide].classList.add("active");
      setTimeout(() => {
        slides.forEach(slide => slide.classList.remove("fade-in", "fade-out"));
      }, 1000); // Duración de la animación de desvanecimiento
    });

    nextButton.addEventListener("click", function () {
      slides[currentSlide].classList.remove("active");
      slides[currentSlide].classList.add("fade-out");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("fade-in");
      slides[currentSlide].classList.add("active");
      setTimeout(() => {
        slides.forEach(slide => slide.classList.remove("fade-in", "fade-out"));
      }, 1000); // Duración de la animación de desvanecimiento
    });
  }

  // Mostrar el caption al pasar el puntero
  slides.forEach(slide => {
    slide.addEventListener("mouseenter", function () {
      const caption = this.querySelector(".caption");
      if (caption) {
        caption.style.opacity = "1";
      }
    });

    slide.addEventListener("mouseleave", function () {
      const caption = this.querySelector(".caption");
      if (caption) {
        caption.style.opacity = "0";
      }
    });
  });
});
