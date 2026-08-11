/* 枳生 Zhisheng · hub — one orchestrated entrance + nav scrolled state */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Nav: subtle border when scrolled past the hero */
  var nav = document.querySelector(".site-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Below-fold cards: single reveal on first intersection */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = el.style.getPropertyValue("--i")
            ? parseInt(el.style.getPropertyValue("--i"), 10) * 90
            : 0;
          setTimeout(function () { el.classList.add("is-in"); }, delay);
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  reveals.forEach(function (el) { io.observe(el); });
})();