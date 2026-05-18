const header = document.querySelector("[data-header]");
const revealEls = document.querySelectorAll(".reveal");
const form = document.querySelector(".reservation-form");

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
