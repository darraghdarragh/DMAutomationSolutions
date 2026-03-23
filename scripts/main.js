// === DM Web Solutions — main.js (refined) ===

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const preloader = document.getElementById("preloader");
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const themeToggle = document.getElementById("themeToggle");
  const floatingTheme = document.getElementById("floatingTheme");
  const yearEls = document.querySelectorAll("#year");
  const animatedEls = document.querySelectorAll(".reveal, .fade-in");

  // ==============================
  // Preloader
  // ==============================
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hide");
      setTimeout(() => {
        if (preloader.parentNode) preloader.remove();
      }, 500);
    }, 500);
  }

  // ==============================
  // Sticky header shadow on scroll
  // ==============================
  const handleScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // ==============================
  // Mobile nav toggle
  // ==============================
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close nav when clicking a link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close nav when clicking outside
    document.addEventListener("click", (e) => {
      const clickedInsideNav = nav.contains(e.target);
      const clickedToggle = navToggle.contains(e.target);

      if (!clickedInsideNav && !clickedToggle && nav.classList.contains("open")) {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ==============================
  // Theme toggle
  // ==============================
  const setThemeButtonLabel = (theme) => {
    const label = theme === "dark" ? "☀️" : "🌙";

    if (themeToggle) {
      themeToggle.innerHTML = `<span>${label}</span>`;
      themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
      themeToggle.setAttribute("title", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    }

    if (floatingTheme) {
      floatingTheme.textContent = label;
      floatingTheme.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
      floatingTheme.setAttribute("title", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    }
  };

  const applyTheme = (theme) => {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setThemeButtonLabel(theme);
  };

  const savedTheme = localStorage.getItem("theme");
  const initialTheme = savedTheme || "light";
  applyTheme(initialTheme);

  const toggleTheme = () => {
    const currentTheme = html.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  };

  themeToggle?.addEventListener("click", toggleTheme);
  floatingTheme?.addEventListener("click", toggleTheme);

  // ==============================
  // Reveal / Fade-in animations
  // ==============================
  if (animatedEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("in");
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    animatedEls.forEach((el) => observer.observe(el));
  }

  // ==============================
  // Dynamic year
  // ==============================
  if (yearEls.length > 0) {
    const year = new Date().getFullYear();
    yearEls.forEach((el) => {
      el.textContent = year;
    });
  }

  console.log("✅ main.js loaded successfully");
});