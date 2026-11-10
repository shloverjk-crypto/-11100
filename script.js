const menuButton = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-links");

const publicSiteOrigin = "";
const pageUrl = publicSiteOrigin
  ? new URL(location.pathname, publicSiteOrigin).href
  : (location.protocol === "http:" || location.protocol === "https:"
    ? `${location.origin}${location.pathname}`
    : "");

if (pageUrl) {
  const canonical = document.createElement("link");
  canonical.rel = "canonical";
  canonical.href = pageUrl;
  document.head.append(canonical);
  const openGraphUrl = document.createElement("meta");
  openGraphUrl.setAttribute("property", "og:url");
  openGraphUrl.content = pageUrl;
  document.head.append(openGraphUrl);
}

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("is-open", !expanded);
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = String(new Date().getFullYear());
});
