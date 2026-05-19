const header = document.querySelector("[data-header]");
const revealEls = document.querySelectorAll(".reveal");
const form = document.querySelector(".reservation-form");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

function updateHeader() {
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 28);
  }
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
);

revealEls.forEach((element) => revealObserver.observe(element));

function setMobileMenu(open) {
  if (!menuToggle || !mobileMenu) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);

  if (open) {
    mobileMenu.hidden = false;
    window.requestAnimationFrame(() => mobileMenu.classList.add("is-open"));
    return;
  }

  mobileMenu.classList.remove("is-open");
  window.setTimeout(() => {
    if (menuToggle.getAttribute("aria-expanded") === "false") {
      mobileMenu.hidden = true;
    }
  }, 300);
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMobileMenu(!isOpen);
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target === mobileMenu || event.target.closest("a")) {
      setMobileMenu(false);
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileMenu(false);
    }
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    button.textContent = "Request noted";
    window.setTimeout(() => {
      button.textContent = "Send request";
    }, 2600);
  });
}

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("load", updateHeader);
updateHeader();
