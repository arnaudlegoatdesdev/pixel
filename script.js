const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -80px 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const topbar = document.querySelector(".topbar");

window.addEventListener(
  "scroll",
  () => {
    const scrolled = window.scrollY > 16;
    topbar.style.background = scrolled ? "rgba(2, 7, 10, 0.9)" : "rgba(2, 7, 10, 0.76)";
  },
  { passive: true }
);
