(function () {
  "use strict";

  function initMobileMenu() {
    const menu = document.getElementById("main-menu");
    const toggle = document.getElementById("menu-toggle");
    if (!menu || !toggle) {
      return;
    }

    const setExpanded = (isOpen) => {
      toggle.setAttribute("aria-expanded", String(isOpen));
    };

    const closeMenu = () => {
      menu.classList.remove("is-open");
      setExpanded(false);
      menu.querySelectorAll(".menu-item.open").forEach((item) => {
        item.classList.remove("open");
      });
    };

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = menu.classList.toggle("is-open");
      setExpanded(isOpen);
    });

    document.addEventListener("click", (event) => {
      if (toggle.contains(event.target) || menu.contains(event.target)) {
        return;
      }
      closeMenu();
    });

    menu.querySelectorAll(".menu-item.has-submenu > span").forEach((span) => {
      span.addEventListener("click", (event) => {
        if (!window.matchMedia("(max-width: 980px)").matches) {
          return;
        }
        event.preventDefault();
        const item = span.closest(".menu-item");
        if (item) {
          item.classList.toggle("open");
        }
      });
    });

    const mq = window.matchMedia("(max-width: 980px)");
    const handleChange = (event) => {
      if (!event.matches) {
        closeMenu();
      }
    };

    if (mq.addEventListener) {
      mq.addEventListener("change", handleChange);
    } else if (mq.addListener) {
      mq.addListener(handleChange);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileMenu);
  } else {
    initMobileMenu();
  }
})();
