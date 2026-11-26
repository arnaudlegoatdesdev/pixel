const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ---------- En-tête : état au défilement + menu mobile ---------- */

const topbar = document.querySelector(".topbar");
const menuToggle = document.querySelector(".menu-toggle");

if (topbar) {
  const onScroll = () => topbar.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open) => {
    topbar.classList.toggle("is-open", open);
    menuToggle?.setAttribute("aria-expanded", String(open));
  };

  menuToggle?.addEventListener("click", () => setMenu(!topbar.classList.contains("is-open")));
  topbar.querySelectorAll(".nav a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && topbar.classList.contains("is-open")) {
      setMenu(false);
      menuToggle?.focus();
    }
  });
}

/* ---------- Hero : surface de 24 pixels qui réagit aux objets posés ---------- */

const surface = document.querySelector(".surface");

if (surface) {
  const COLS = Number(surface.dataset.cols) || 6;
  const ROWS = Number(surface.dataset.rows) || 4;
  const total = COLS * ROWS;
  const activeOut = document.querySelector("[data-readout-active]");
  const idleOut = document.querySelector("[data-readout-idle]");

  // Chaque scénario : des objets posés (colonne, ligne, largeur, hauteur) et le mode activé dessous.
  const scenarios = [
    [
      { c: 0, r: 1, w: 2, h: 2, mode: "hot", label: "Plat chaud" },
      { c: 4, r: 0, w: 1, h: 1, mode: "cold", label: "Boisson" },
    ],
    [
      { c: 3, r: 2, w: 3, h: 2, mode: "hot", label: "Pizza" },
      { c: 1, r: 0, w: 1, h: 1, mode: "cold", label: "Canette" },
    ],
    [
      { c: 1, r: 1, w: 2, h: 2, mode: "cold", label: "Dessert" },
      { c: 4, r: 1, w: 1, h: 1, mode: "hot", label: "Tasse" },
      { c: 5, r: 3, w: 1, h: 1, mode: "cold", label: "Eau" },
    ],
  ];

  const cells = [];
  for (let i = 0; i < total; i++) {
    const cell = document.createElement("span");
    cell.className = "cell";
    cell.style.gridColumn = String((i % COLS) + 1);
    cell.style.gridRow = String(Math.floor(i / COLS) + 1);
    surface.appendChild(cell);
    cells.push(cell);
  }

  const cellsUnder = ({ c, r, w, h }) => {
    const list = [];
    for (let y = r; y < r + h; y++) for (let x = c; x < c + w; x++) list.push(cells[y * COLS + x]);
    return list;
  };

  const updateReadout = () => {
    const active = cells.filter((cell) => cell.classList.contains("is-hot") || cell.classList.contains("is-cold")).length;
    if (activeOut) activeOut.textContent = String(active);
    if (idleOut) idleOut.textContent = String(total - active);
  };

  const makeObject = (obj) => {
    const el = document.createElement("div");
    el.className = "surface-object";
    el.style.gridColumn = `${obj.c + 1} / span ${obj.w}`;
    el.style.gridRow = `${obj.r + 1} / span ${obj.h}`;
    const label = document.createElement("span");
    label.textContent = obj.label;
    el.appendChild(label);
    surface.appendChild(el);
    return el;
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Version statique (mouvement réduit) : premier scénario affiché tel quel.
  const showStatic = () => {
    scenarios[0].forEach((obj) => {
      makeObject(obj).classList.add("is-placed");
      cellsUnder(obj).forEach((cell) => cell.classList.add(`is-${obj.mode}`));
    });
    updateReadout();
  };

  let running = false;
  let visible = true;

  const whenVisible = async () => {
    while (!visible || document.hidden) await wait(400);
  };

  const run = async () => {
    running = true;
    let index = 0;
    while (running) {
      const scenario = scenarios[index % scenarios.length];
      const objects = [];

      for (const obj of scenario) {
        await whenVisible();
        const el = makeObject(obj);
        objects.push(el);
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-placed")));
        await wait(650);
        // Tous les pixels sous l'objet s'allument ensemble, en fondu.
        cellsUnder(obj).forEach((cell) => cell.classList.add(`is-${obj.mode}`));
        updateReadout();
        await wait(1500);
      }

      await wait(3200);
      await whenVisible();

      objects.forEach((el) => el.classList.remove("is-placed"));
      await wait(500);
      cells.forEach((cell) => cell.classList.remove("is-hot", "is-cold"));
      updateReadout();
      await wait(1300);
      objects.forEach((el) => el.remove());
      await wait(500);
      index++;
    }
  };

  if (reducedMotion.matches) {
    showStatic();
  } else {
    updateReadout();
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
    }).observe(surface);
    run();
  }
}

/* ---------- Simulation interactive ---------- */

const simGrid = document.querySelector(".sim-grid");

if (simGrid) {
  const COLS = 8;
  const ROWS = 4;
  const total = COLS * ROWS;

  for (let i = 0; i < total; i++) {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "sim-cell";
    cell.setAttribute("aria-label", `Pixel ${i + 1}, éteint`);
    simGrid.appendChild(cell);
  }

  const simCells = [...simGrid.querySelectorAll(".sim-cell")];
  const modeButtons = document.querySelectorAll(".sim-mode");
  const hotOut = document.querySelector("[data-sim-hot]");
  const coldOut = document.querySelector("[data-sim-cold]");
  const idleOut = document.querySelector("[data-sim-idle]");
  const hotLabel = document.querySelector("[data-sim-hot-label]");
  const coldLabel = document.querySelector("[data-sim-cold-label]");
  let currentMode = "hot";
  let isPainting = false;

  const updateStatus = () => {
    const hot = simCells.filter((c) => c.classList.contains("is-hot")).length;
    const cold = simCells.filter((c) => c.classList.contains("is-cold")).length;
    if (hotOut) hotOut.textContent = String(hot);
    if (coldOut) coldOut.textContent = String(cold);
    if (idleOut) idleOut.textContent = String(total - hot - cold);
    if (hotLabel) hotLabel.textContent = hot > 1 ? "chauds" : "chaud";
    if (coldLabel) coldLabel.textContent = cold > 1 ? "froids" : "froid";
  };

  const stateLabel = { hot: "chaud", cold: "froid", erase: "éteint" };

  const applyMode = (cell) => {
    cell.classList.remove("is-hot", "is-cold");
    if (currentMode === "hot") cell.classList.add("is-hot");
    if (currentMode === "cold") cell.classList.add("is-cold");
    cell.setAttribute("aria-label", `Pixel ${simCells.indexOf(cell) + 1}, ${stateLabel[currentMode]}`);
    updateStatus();
  };

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modeButtons.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-pressed", String(b === btn));
      });
      currentMode = btn.dataset.mode;
      simGrid.dataset.mode = currentMode;
    });
  });

  simCells.forEach((cell) => {
    cell.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      if (cell.hasPointerCapture?.(event.pointerId)) cell.releasePointerCapture(event.pointerId);
      isPainting = true;
      applyMode(cell);
    });
    // Clavier (Entrée / Espace) : un clic sans pointeur.
    cell.addEventListener("click", (event) => {
      if (event.detail === 0) applyMode(cell);
    });
  });

  simGrid.addEventListener("pointermove", (event) => {
    if (!isPainting) return;
    const target = document.elementFromPoint(event.clientX, event.clientY);
    if (target?.classList?.contains("sim-cell")) applyMode(target);
  });

  const stopPainting = () => {
    isPainting = false;
  };
  window.addEventListener("pointerup", stopPainting);
  window.addEventListener("pointercancel", stopPainting);

  // Réinitialiser : la surface s'éteint en vague, de gauche à droite.
  document.querySelector(".sim-reset")?.addEventListener("click", () => {
    const stagger = reducedMotion.matches ? 0 : 35;
    simCells.forEach((c, i) => {
      setTimeout(() => {
        c.classList.remove("is-hot", "is-cold");
        c.setAttribute("aria-label", `Pixel ${i + 1}, éteint`);
        updateStatus();
      }, (i % COLS) * stagger);
    });
  });
}

/* ---------- Vidéo d'archive : pause à la fermeture ---------- */

const videoArchive = document.querySelector(".video-archive");
if (videoArchive) {
  const archivedVideo = videoArchive.querySelector("video");
  videoArchive.addEventListener("toggle", () => {
    if (!videoArchive.open) archivedVideo.pause();
  });
}

/* ---------- Apparition au défilement ---------- */

const revealItems = document.querySelectorAll("[data-reveal]");

if (revealItems.length) {
  // Les éléments voisins arrivent l'un après l'autre.
  revealItems.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((child) => child.hasAttribute("data-reveal"));
    const index = siblings.indexOf(el);
    if (index > 0) el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 110}ms`);
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealItems.forEach((el) => revealObserver.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }
}

/* ---------- Menu : lien de la section en cours ---------- */

const navLinks = [...document.querySelectorAll(".nav a")];

if (navLinks.length && "IntersectionObserver" in window) {
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const current = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-current", current);
          if (current) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  // Retour en haut de page : plus aucun lien actif.
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY < window.innerHeight * 0.5) {
        navLinks.forEach((link) => {
          link.classList.remove("is-current");
          link.removeAttribute("aria-current");
        });
      }
    },
    { passive: true }
  );
}
