const whatsappNumber = "351915536745";
const whatsappMessage = "Olá Dani! Gostava de pedir um orçamento para uma tatuagem.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

document.querySelectorAll(".js-whatsapp").forEach((link) => { link.href = whatsappUrl; });
document.querySelectorAll(".js-instagram").forEach((link) => { link.href = "https://instagram.com/_braga.ink"; });
document.querySelector("#year").textContent = new Date().getFullYear();
