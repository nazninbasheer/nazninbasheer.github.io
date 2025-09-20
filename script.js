function toggleDarkMode() {
  const body = document.body;
  const button = document.querySelector(".dark-toggle");

  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    button.textContent = "☀️"; // show sun in dark mode
  } else {
    button.textContent = "🌙"; // show moon in light mode
  }
}

// Highlight active nav link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

