const whatsappNumber = "351915536745";
const whatsappMessage = "Olá Dani! Gostava de pedir um orçamento para uma tatuagem.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
document.querySelectorAll(".js-whatsapp").forEach((link) => { link.href = whatsappUrl; link.target = "_blank"; link.rel = "noopener noreferrer"; });
document.querySelector("#year").textContent = new Date().getFullYear();

const items = [...document.querySelectorAll(".gallery__item")];
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const caption = document.querySelector(".lightbox__caption");
const closeButton = document.querySelector(".lightbox__close");
const previousButton = document.querySelector(".lightbox__previous");
const nextButton = document.querySelector(".lightbox__next");
let currentIndex = 0;
let opener = null;

const showImage = (index) => {
  currentIndex = (index + items.length) % items.length;
  const source = items[currentIndex].querySelector("img");
  lightboxImage.src = source.currentSrc || source.src;
  lightboxImage.alt = source.alt;
  caption.textContent = `${source.alt}. Imagem ${currentIndex + 1} de ${items.length}.`;
};
const openLightbox = (index, button) => { opener = button; showImage(index); lightbox.showModal(); closeButton.focus(); };
const closeLightbox = () => { if (lightbox.open) lightbox.close(); };
items.forEach((item, index) => item.addEventListener("click", () => openLightbox(index, item)));
closeButton.addEventListener("click", closeLightbox);
previousButton.addEventListener("click", () => showImage(currentIndex - 1));
nextButton.addEventListener("click", () => showImage(currentIndex + 1));
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
lightbox.addEventListener("close", () => { lightboxImage.src = ""; opener?.focus(); });
document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showImage(currentIndex - 1);
  if (event.key === "ArrowRight") showImage(currentIndex + 1);
});
