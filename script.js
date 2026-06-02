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

const thermalGrid = document.querySelector(".thermal-grid");
if (thermalGrid) {
  const cells = thermalGrid.querySelectorAll("span");
  const randomize = () => {
    cells.forEach((cell) => {
      const duration = 6 + Math.random() * 6;
      const delay = -Math.random() * duration;
      cell.style.setProperty("--cell-duration", `${duration.toFixed(2)}s`);
      cell.style.setProperty("--cell-delay", `${delay.toFixed(2)}s`);
    });
  };
  randomize();

  const runFullSurfaceSequence = () => {
    thermalGrid.classList.add("is-all-cold");
    setTimeout(() => {
      thermalGrid.classList.remove("is-all-cold");
      thermalGrid.classList.add("is-all-hot");
      setTimeout(() => {
        thermalGrid.classList.remove("is-all-hot");
        setTimeout(randomize, 1200);
      }, 2400);
    }, 2400);
  };

  const scheduleNext = () => {
    const delay = 10000 + Math.random() * 7000;
    setTimeout(() => {
      runFullSurfaceSequence();
      setTimeout(scheduleNext, 7000);
    }, delay);
  };
  scheduleNext();
}

const simulationGrid = document.querySelector(".simulation-grid");
if (simulationGrid) {
  const COLS = 8;
  const ROWS = 4;
  for (let i = 0; i < COLS * ROWS; i++) {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "sim-cell";
    cell.setAttribute("aria-label", `Pixel ${i + 1}`);
    simulationGrid.appendChild(cell);
  }
  const simCells = simulationGrid.querySelectorAll(".sim-cell");
  const modeButtons = document.querySelectorAll(".sim-mode");
  let currentMode = "hot";
  let isPainting = false;

  const applyModeToCell = (cell) => {
    cell.classList.remove("is-hot", "is-cold");
    if (currentMode === "hot") cell.classList.add("is-hot");
    else if (currentMode === "cold") cell.classList.add("is-cold");
  };

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modeButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      currentMode = btn.dataset.mode;
    });
  });

  simCells.forEach((cell) => {
    cell.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      if (cell.hasPointerCapture && cell.hasPointerCapture(event.pointerId)) {
        cell.releasePointerCapture(event.pointerId);
      }
      isPainting = true;
      applyModeToCell(cell);
    });
    cell.addEventListener("pointerenter", () => {
      if (isPainting) applyModeToCell(cell);
    });
  });

  simulationGrid.addEventListener("pointermove", (event) => {
    if (!isPainting) return;
    const target = document.elementFromPoint(event.clientX, event.clientY);
    if (target && target.classList && target.classList.contains("sim-cell")) {
      applyModeToCell(target);
    }
  });

  window.addEventListener("pointerup", () => {
    isPainting = false;
  });
  window.addEventListener("pointercancel", () => {
    isPainting = false;
  });

  const resetButton = document.querySelector(".sim-reset");
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      simCells.forEach((c) => c.classList.remove("is-hot", "is-cold"));
    });
  }
}

const topbar = document.querySelector(".topbar");

window.addEventListener(
  "scroll",
  () => {
    const scrolled = window.scrollY > 16;
    topbar.style.background = scrolled ? "rgba(2, 7, 10, 0.9)" : "rgba(2, 7, 10, 0.76)";
  },
  { passive: true }
);
