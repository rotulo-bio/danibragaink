const whatsappNumber = "351915536745";
const whatsappMessage = "Olá Dani! Gostava de pedir um orçamento para uma tatuagem.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

const root = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("dani-theme");
const modal = document.querySelector(".gallery-modal");
const modalImage = document.querySelector(".gallery-modal__image");
const modalLabel = document.querySelector(".gallery-modal__label");
const modalClose = document.querySelector(".gallery-modal__close");

const setTheme = (theme) => {
  const isDark = theme === "dark";
  root.dataset.theme = theme;

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Alternar para modo claro" : "Alternar para modo noturno");
    themeToggle.querySelector(".theme-toggle__icon").textContent = isDark ? "☀" : "☾";
    themeToggle.querySelector(".theme-toggle__label").textContent = isDark ? "Claro" : "Noturno";
  }

  localStorage.setItem("dani-theme", theme);
};

const openModal = (src, altText) => {
  if (!modal || !modalImage) return;
  modalImage.src = src;
  modalImage.alt = altText;
  modalLabel.textContent = altText || "Arte personalizada";
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
};

const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
setTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

document.querySelectorAll(".gallery__item").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    const img = item.querySelector("img");
    if (!img) return;
    openModal(img.src, img.alt);
  });
});

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

document.querySelectorAll(".js-whatsapp").forEach((link) => { link.href = whatsappUrl; });
document.querySelectorAll(".js-instagram").forEach((link) => { link.href = "https://instagram.com/_braga.ink"; });
document.querySelector("#year").textContent = new Date().getFullYear();
