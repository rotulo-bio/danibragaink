const whatsappNumber = "351915536745";
const whatsappMessage = "Olá Dani! Gostava de pedir um orçamento para uma tatuagem.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
document.querySelectorAll(".js-whatsapp").forEach((link) => { link.href = whatsappUrl; link.target = "_blank"; link.rel = "noopener noreferrer"; });
document.querySelector("#year").textContent = new Date().getFullYear();

const carousel = document.querySelector(".carousel");
const cards = [...document.querySelectorAll(".work-card")];
const step = () => cards[0].getBoundingClientRect().width + 20;
document.querySelector(".carousel-prev").addEventListener("click", () => carousel.scrollBy({ left: -step(), behavior: "smooth" }));
document.querySelector(".carousel-next").addEventListener("click", () => carousel.scrollBy({ left: step(), behavior: "smooth" }));

const dialog = document.querySelector(".lightbox");
const dialogImage = dialog.querySelector("img");
const dialogCaption = dialog.querySelector("p");
let current = 0;
let opener = null;
const show = (index) => { current = (index + cards.length) % cards.length; const image = cards[current].querySelector("img"); dialogImage.src = image.currentSrc || image.src; dialogImage.alt = image.alt; dialogCaption.textContent = `${image.alt}. Imagem ${current + 1} de ${cards.length}.`; };
cards.forEach((card,index) => card.addEventListener("click", () => { opener = card; show(index); dialog.showModal(); dialog.querySelector(".lightbox-close").focus(); }));
dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
dialog.querySelector(".lightbox-prev").addEventListener("click", () => show(current - 1));
dialog.querySelector(".lightbox-next").addEventListener("click", () => show(current + 1));
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("close", () => { dialogImage.src = ""; opener?.focus(); });
document.addEventListener("keydown", (event) => { if (!dialog.open) return; if (event.key === "ArrowLeft") show(current - 1); if (event.key === "ArrowRight") show(current + 1); });
