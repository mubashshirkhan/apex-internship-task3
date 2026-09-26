document.addEventListener("DOMContentLoaded", function () {
  const yearElement = document.getElementById("year");
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const leadForm = document.getElementById("leadForm");
  const formStatus = document.getElementById("formStatus");
  const faqButtons = document.querySelectorAll(".faq-question");
  const themeIcon = themeToggle
    ? themeToggle.querySelector(".theme-icon")
    : null;
  const themeText = themeToggle
    ? themeToggle.querySelector(".theme-text")
    : null;

  const savedTheme = localStorage.getItem("novaflow-theme");
  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;

  function applyTheme(isLight) {
    document.body.classList.toggle("light-theme", isLight);
    if (themeIcon) themeIcon.textContent = isLight ? "🌙" : "☀️";
    if (themeText) themeText.textContent = isLight ? "Dark" : "Light";
  }

  if (savedTheme === "light" || (!savedTheme && prefersLight)) {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isLight = !document.body.classList.contains("light-theme");
      applyTheme(isLight);
      localStorage.setItem("novaflow-theme", isLight ? "light" : "dark");
    });
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("is-open");
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("is-open");
      });
    });
  }

  if (faqButtons.length) {
    faqButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const faqItem = button.parentElement;
        const isOpen = faqItem.classList.contains("active");

        faqButtons.forEach(function (otherButton) {
          const otherItem = otherButton.parentElement;
          otherItem.classList.remove("active");
          otherButton.setAttribute("aria-expanded", "false");
          otherButton.querySelector(".faq-icon").textContent = "+";
        });

        if (!isOpen) {
          faqItem.classList.add("active");
          button.setAttribute("aria-expanded", "true");
          button.querySelector(".faq-icon").textContent = "−";
        }
      });
    });
  }

  if (leadForm) {
    leadForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const company = document.getElementById("company").value.trim();

      if (!name || !email || !company) {
        formStatus.textContent =
          "Please complete all fields before requesting a demo.";
        formStatus.style.color = "#ff9f8f";
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formStatus.textContent = "Please enter a valid work email address.";
        formStatus.style.color = "#ff9f8f";
        return;
      }

      formStatus.textContent =
        "Thanks! We’ll reach out within one business day.";
      formStatus.style.color = "#55d6a2";
      leadForm.reset();
    });
  }

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
