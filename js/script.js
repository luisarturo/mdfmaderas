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
      } else if (targetId === "contactanos") {
        const sliderSection = document.getElementById("form__wrap");
        const sliderContact = document.getElementById("contact__info");
        if (sliderSection && sliderContact) {
          sliderSection.style.display = "block";
          sliderContact.style.display = "block";
        }
        // Enfocar el input "nombre"
        const nombreInput = document.querySelector(".contact-form input[name='nombre']");
        if (nombreInput) {
          nombreInput.focus();
        }
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
    },
    {
      title: "Instalación de cajones",
      video: "https://youtu.be/kBeDZkdXgM0?si=CueEDYS3O1YLeFn1",
      text: `Tutorial de instalación de cajones con correderas de extensión de cierre suave en un ensamblado simple.`
    },
    {
      title: "Instalación para puertas corredizas",
      video: "https://youtu.be/aPUhB5fXY3k",
      text: `Video tutorial de instalación de sistema para puerta corrediza riel doble «J», estos rodamientos se utilizan comúnmente en puertas para closet.`
    },
    {
      title: "Instalación de ménsulas",
      video: "https://youtu.be/SV5lM3ZRxTw",
      text: `Video tutorial de instalación de Ménsulas.`
    },
    {
      title: "Instalación de puertas plegadizas",
      video: "https://youtu.be/4nB9zR97D9k",
      text: `Video tutorial de instalación de sistema de puerta plegadiza, estos rodamientos se utilizan comúnmente en puertas para closet.`
    },
    {
      title: "Instalación de corredoras",
      video: "https://youtu.be/_2rnZrrmjxQ",
      text: `Vídeo tutorial instalación de Correderas Extensión para mueble.`
    },
    {
      title: "Instalación de nuestro pistón Handy Home",
      video: "https://youtu.be/4nB9zR97D9k",
      text: `En este video veremos paso por paso la instalación de nuestro pistón Handy Home en las puertas de gabinetes.`
    }
  ];

  function openModal(index) {
    const data = modalData[index];
    document.getElementById("modal-title").innerText = data.title;
    document.getElementById("modal-text").innerText = data.text;

    const modalImg = document.getElementById("modal-img");
    const modalVideo = document.getElementById("modal-video");

    if (data.img) {
      modalImg.src = data.img;
      modalImg.style.display = "block";
      modalVideo.style.display = "none";
    } else if (data.video) {
      modalVideo.src = data.video;
      modalVideo.style.display = "block";
      modalImg.style.display = "none";
    }

    document.getElementById("modal").style.display = "flex";
    modal.classList.add('show');
    modal.classList.remove('hide');
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      document.getElementById("modal-video").src = ""; // Detener el video
    }, 500); // Tiempo de la animación
  }

  window.onclick = function (event) {
    let modal = document.getElementById("modal");
    if (event.target === modal) {
      closeModal();
    }
  };

  window.onload = function () {
    const buttons = document.querySelectorAll(".buttonContainer button, .videos-tutoriales button");
    buttons.forEach((button, index) => {
      button.addEventListener("click", function () {
        openModal(index);
      });
    });

    document.getElementById("close-modal").addEventListener("click", closeModal);
  };

  // Configuracion del Slider
  var swiper = new Swiper(".mySwiper", {
    effect: "cube",
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: 2000,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });

});
