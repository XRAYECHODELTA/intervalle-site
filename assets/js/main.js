// ===============================
// MAIN.JS — VERSION PROPRE COMPLETE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // HEADER SCROLL
  // ===============================
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

  // ===============================
  // AUTO ACTIVE NAV LINK
  // ===============================
  const links = document.querySelectorAll(".site-nav a");
  const current = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute("href");

    if (href !== "/" && current.includes(href)) {
      link.classList.add("active");
    }
  });

  // ===============================
  // FADE UP SCROLL (INTERSECTION OBSERVER)
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
    // fallback vieux navigateur
    animatedElements.forEach(el => {
      el.classList.add("visible");
    });
  }

});