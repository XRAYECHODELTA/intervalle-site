// ===============================
// MAIN.JS — VERSION COMPLETE AVEC HEADER / FOOTER
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // LOAD HEADER
  // ===============================
  fetch("/components/header.html")
    .then(res => res.text())
    .then(data => {
      const headerContainer = document.createElement("div");
      headerContainer.innerHTML = data;
      document.body.prepend(headerContainer);

      initHeader(); // important
      setActiveNav(); // important
    });

  // ===============================
  // LOAD FOOTER
  // ===============================
  fetch("/components/footer.html")
    .then(res => res.text())
    .then(data => {
      const footerContainer = document.createElement("div");
      footerContainer.innerHTML = data;
      document.body.appendChild(footerContainer);
    });

  // ===============================
  // HEADER SCROLL
  // ===============================
  function initHeader() {
    const header = document.querySelector(".site-header");

    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      });
    }
  }

  // ===============================
  // ACTIVE NAV
  // ===============================
  function setActiveNav() {
    const links = document.querySelectorAll(".site-nav a");
    const current = window.location.pathname;

    links.forEach(link => {
      const href = link.getAttribute("href");

      if (href !== "/" && current.includes(href)) {
        link.classList.add("active");
      }
    });
  }

  // ===============================
  // ANIMATIONS
  // ===============================
  const animatedElements = document.querySelectorAll(
    ".pillar, .content p, .cta, .hero-small h1, .intro"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    animatedElements.forEach(el => {
      el.classList.add("fade-up");
      observer.observe(el);
    });

  } else {
    animatedElements.forEach(el => {
      el.classList.add("visible");
    });
  }

});