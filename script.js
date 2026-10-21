/* FABRIPLAY — WEBINAR LANDING PAGE */


/* 1. CONFIG — EDIT THIS BLOCK ONLY

   REGISTER_URL : where every "Register Now" button goes.
                  Put your form, checkout or WhatsApp link here.
                  Leave "#offer" to scroll to the offer section instead.
   OPEN_IN_NEW  : true  -> opens in a new tab
                  false -> opens in the same tab
   PRICE        : shown on the hero chip. Use "Free" if there is no fee.
   NOTE         : the small line under every button.
   STICKY_NOTE  : the line inside the mobile sticky bar.
   STICKY_AFTER : how far down the page (in pixels) the sticky bar appears.
                  0 = automatically, after the hero.
*/
var CONFIG = {
  REGISTER_URL: "#offer",
  OPEN_IN_NEW:  false,
  PRICE:        "\u20B9199",
  NOTE:         "\u20B9199 \u00B7 3 hours \u00B7 Live in English \u00B7 Limited seats",
  STICKY_NOTE:  "3 Hours \u00B7 Limited seats",
  STICKY_AFTER: 0
};


/* 2. FILL PRICE AND NOTE TEXT FROM CONFIG */
(function fillText(){
  document.querySelectorAll(".js-price").forEach(function (el) {
    el.textContent = CONFIG.PRICE;
  });
  document.querySelectorAll(".js-note").forEach(function (el) {
    el.textContent = CONFIG.NOTE;
  });
  document.querySelectorAll(".js-sticky-note").forEach(function (el) {
    el.textContent = CONFIG.STICKY_NOTE;
  });
})();


/* 3. APPLY REGISTER LINK TO EVERY CTA */
(function applyRegisterLink(){
  var url = CONFIG.REGISTER_URL;
  if (!url || url === "#offer") return;

  document.querySelectorAll(".js-register").forEach(function (el) {
    el.setAttribute("href", url);
    if (CONFIG.OPEN_IN_NEW) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });
})();


/* 4. SCROLL REVEAL */
(function reveal(){
  var items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  items.forEach(function (el) { io.observe(el); });

  /* anything already on screen at load shows straight away */
  window.addEventListener("load", function () {
    items.forEach(function (el) {
      var box = el.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) {
        el.classList.add("is-in");
      }
    });
  });
})();


/* 5. FAQ ACCORDION */
(function faq(){
  var buttons = document.querySelectorAll(".faq__q");
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item   = btn.closest(".faq__item");
      var panel  = item.querySelector(".faq__a");
      var isOpen = item.classList.contains("is-open");

      document.querySelectorAll(".faq__item").forEach(function (other) {
        other.classList.remove("is-open");
        other.querySelector(".faq__q").setAttribute("aria-expanded", "false");
        other.querySelector(".faq__a").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  window.addEventListener("resize", function () {
    var open = document.querySelector(".faq__item.is-open .faq__a");
    if (open) open.style.maxHeight = open.scrollHeight + "px";
  });
})();


/* 6. HEADER BACKGROUND ON SCROLL */
(function header(){
  var el = document.getElementById("header");
  if (!el) return;

  var onScroll = function () {
    el.classList.toggle("is-stuck", window.scrollY > 40);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();


/* 7. MOBILE STICKY CTA */
(function sticky(){
  var bar  = document.getElementById("stickyBar");
  var hero = document.getElementById("top");
  if (!bar || !hero) return;

  var ticking = false;

  var update = function () {
    var trigger = CONFIG.STICKY_AFTER || hero.offsetHeight * 0.75;
    bar.classList.toggle("is-on", window.scrollY > trigger);
    ticking = false;
  };

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", update, { passive: true });
  update();
})();


/* 8. FOOTER YEAR */
(function year(){
  document.querySelectorAll(".js-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();