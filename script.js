// ==================== THEME TOGGLE ====================
(function () {
  const savedTheme = localStorage.getItem("theme");
  const body = document.body;
  const button = document.querySelector(".dark-toggle");

  if (savedTheme === "dark") {
    body.classList.add("dark");
    if (button) button.textContent = "☀️"; // show sun
  } else {
    body.classList.remove("dark");
    if (button) button.textContent = "🌙"; // show moon
  }
})();

function toggleDarkMode() {
  const body = document.body;
  const button = document.querySelector(".dark-toggle");

  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    button.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    button.textContent = "🌙";
  }
}

// ==================== NAV HIGHLIGHT ON SCROLL ====================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const verticalNavLinks = document.querySelectorAll(".vertical-nav a");
const heroSection = document.querySelector("#home");

window.addEventListener("scroll", () => {
  let current = "";
  const heroHeight = heroSection ? heroSection.offsetHeight : 0;

  // Only activate navigation if scrolled past a small threshold to prevent default selection
  if (scrollY > 50) {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 50;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (current && link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });

  verticalNavLinks.forEach((link) => {
    link.classList.remove("active");
    if (current && link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });

  // Show vertical nav only when scrolled away from hero section
  const verticalNav = document.querySelector(".vertical-nav");
  if (scrollY > heroHeight - 100) { // Adjust threshold as needed
    verticalNav.classList.add("show");
  } else {
    verticalNav.classList.remove("show");
  }
})


document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded ✅");

  // Typing animation
  const typingEl = document.getElementById("typing");
  if (typingEl) {
    const text = "Naznin Basheer";
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        typingEl.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 180);
      } else {
        typingEl.style.borderRight = "none";
      }
    }
    setTimeout(typeWriter, 1500);
  }

  // Education fade-in
  const faders = document.querySelectorAll(".fade-in-on-scroll");
  const options = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

  const eduObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("show"), index * 200);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  faders.forEach(fader => eduObserver.observe(fader));
});

// hero image glow

const heroImage = document.querySelector(".hero-combined");

if (heroImage) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heroImage.classList.add("glow");
      } else {
        heroImage.classList.remove("glow");
      }
    });
  }, { threshold: 0.5 });

  heroObserver.observe(heroImage);
}
