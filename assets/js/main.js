// ===============================
// MAIN.JS — VERSION PROD FIX
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  const basePath = window.location.origin;

  // ===============================
  // LOAD HEADER
  // ===============================
  fetch(basePath + "/components/header.html")
    .then(res => res.text())
    .then(data => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = data;
      document.body.prepend(wrapper);

      initHeader();
      setActiveNav();
    })
    .catch(() => console.error("Header load error"));

  // ===============================
  // LOAD FOOTER
  // ===============================
  fetch(basePath + "/components/footer.html")
    .then(res => res.text())
    .then(data => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = data;
      document.body.appendChild(wrapper);
    })
    .catch(() => console.error("Footer load error"));

  // ===============================
  // HEADER SCROLL
  // ===============================
  function initHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  // ===============================
  // ACTIVE NAV
  // ===============================
  function setActiveNav() {
    const links = document.querySelectorAll(".site-nav a");
    let path = window.location.pathname;

    if (path.endsWith("/")) path += "index.html";
    if (path === "/") path = "/index.html";

    links.forEach(link => {
      let href = link.getAttribute("href");
      if (!href) return;

      if (href.endsWith("/")) href += "index.html";

      if (path.includes(href)) {
        link.classList.add("active");
      }
    });
  }

  // ===============================
  // ANIMATIONS
  // ===============================
  const elements = document.querySelectorAll(".fade");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add("show"));
  }

});