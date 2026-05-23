const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    body.classList.toggle("nav-open", isOpen);
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("nav-open");
    }
  });
}

function setupFilter(buttonSelector, itemSelector, attributeName) {
  const buttons = Array.from(document.querySelectorAll(buttonSelector));
  const items = Array.from(document.querySelectorAll(itemSelector));

  if (!buttons.length || !items.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset[attributeName];
      buttons.forEach((current) => current.classList.toggle("active", current === button));
      items.forEach((item) => {
        const value = item.dataset[attributeName.replace("Filter", "Item")] || item.dataset.department;
        const show = filter === "all" || value === filter;
        item.hidden = !show;
      });
    });
  });
}

setupFilter("[data-gallery-filter]", "[data-gallery-item]", "galleryFilter");
setupFilter("[data-staff-filter]", "[data-department]", "staffFilter");

const lightbox = document.querySelector("#lightbox");
const lightboxContent = document.querySelector(".lightbox-content");
const lightboxClose = document.querySelector(".lightbox-close");

if (lightbox && lightboxContent && lightboxClose) {
  document.querySelectorAll(".gallery-card").forEach((card) => {
    card.addEventListener("click", () => {
      const image = card.querySelector("img");
      const visual = card.querySelector(".visual-scene");
      const caption = card.querySelector("figcaption")?.cloneNode(true);

      lightboxContent.innerHTML = "";
      if (image) {
        const preview = image.cloneNode(true);
        preview.alt = image.alt;
        lightboxContent.append(preview);
      } else if (visual) {
        lightboxContent.append(visual.cloneNode(true));
      } else {
        const videoMessage = document.createElement("div");
        videoMessage.className = "video-placeholder";
        videoMessage.textContent = "Annual Day video preview";
        lightboxContent.append(videoMessage);
      }
      if (caption) lightboxContent.append(caption);

      lightbox.hidden = false;
      body.style.overflow = "hidden";
      lightboxClose.focus();
    });
  });

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxContent.innerHTML = "";
    body.style.overflow = "";
  };

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
}
