const whatsappNumber = "351915536745";
const whatsappMessage = "Olá Dani! Gostava de pedir um orçamento para uma tatuagem.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
document.querySelectorAll(".js-whatsapp").forEach((link) => { link.href = whatsappUrl; link.target = "_blank"; link.rel = "noopener noreferrer"; });
document.querySelector("#year").textContent = new Date().getFullYear();

const carousel = document.querySelector(".carousel");
const cards = [...document.querySelectorAll(".work-card")];
const step = () => cards[0].getBoundingClientRect().width - (window.innerWidth <= 520 ? 30 : 58);
let autoplay = null;
let isDragging = false;
let hasDragged = false;
let dragStartX = 0;
let dragStartScroll = 0;

const stopAutoplay = () => { window.clearInterval(autoplay); autoplay = null; };
const startAutoplay = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || autoplay) return;
  autoplay = window.setInterval(() => {
    const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 8;
    carousel.scrollTo({ left: atEnd ? 0 : carousel.scrollLeft + step(), behavior: "smooth" });
  }, 3200);
};

carousel.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "touch") return;
  isDragging = true; hasDragged = false; dragStartX = event.clientX; dragStartScroll = carousel.scrollLeft;
  carousel.classList.add("is-dragging"); carousel.setPointerCapture(event.pointerId); stopAutoplay();
});
carousel.addEventListener("pointermove", (event) => {
  if (!isDragging) return;
  const distance = event.clientX - dragStartX;
  if (Math.abs(distance) > 5) hasDragged = true;
  carousel.scrollLeft = dragStartScroll - distance;
});
const finishDrag = (event) => {
  if (!isDragging) return;
  isDragging = false; carousel.classList.remove("is-dragging");
  if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId);
  window.setTimeout(startAutoplay, 1200);
};
carousel.addEventListener("pointerup", finishDrag);
carousel.addEventListener("pointercancel", finishDrag);
carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", () => { if (!isDragging) startAutoplay(); });
carousel.addEventListener("focusin", stopAutoplay);
carousel.addEventListener("focusout", startAutoplay);
carousel.addEventListener("touchstart", stopAutoplay, { passive: true });
carousel.addEventListener("touchend", () => window.setTimeout(startAutoplay, 1200), { passive: true });
startAutoplay();

const dialog = document.querySelector(".lightbox");
const dialogImage = dialog.querySelector("img");
const dialogCaption = dialog.querySelector("p");
let current = 0;
let opener = null;
const show = (index) => { current = (index + cards.length) % cards.length; const image = cards[current].querySelector("img"); dialogImage.src = image.currentSrc || image.src; dialogImage.alt = image.alt; dialogCaption.textContent = `${image.alt}. Imagem ${current + 1} de ${cards.length}.`; };
cards.forEach((card,index) => card.addEventListener("click", (event) => { if (hasDragged) { event.preventDefault(); hasDragged = false; return; } opener = card; show(index); stopAutoplay(); dialog.showModal(); dialog.querySelector(".lightbox-close").focus(); }));
dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
dialog.querySelector(".lightbox-prev").addEventListener("click", () => show(current - 1));
dialog.querySelector(".lightbox-next").addEventListener("click", () => show(current + 1));
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("close", () => { dialogImage.src = ""; opener?.focus(); startAutoplay(); });
document.addEventListener("keydown", (event) => { if (!dialog.open) return; if (event.key === "ArrowLeft") show(current - 1); if (event.key === "ArrowRight") show(current + 1); });
