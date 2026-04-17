// ==================== THEME TOGGLE ====================
(function () {
  const savedTheme = localStorage.getItem("theme");
  const body = document.body;
  const button = document.querySelector(".dark-toggle");

  if (savedTheme !== "light") {
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

// ==================== HAMBURGER MENU TOGGLE ====================
function toggleMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
}

// hero image glow and visibility

const heroLargeImages = document.querySelectorAll(".hero-img-large");
const heroSmallImages = document.querySelectorAll(".hero-img-small");

heroLargeImages.forEach(heroImage => {
  if (heroImage) {
    // Add visible and glow classes immediately on load
    heroImage.classList.add("visible");
    heroImage.classList.add("glow");

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
});

heroSmallImages.forEach(heroImage => {
  if (heroImage) {
    // Add visible class immediately on load
    heroImage.classList.add("visible");

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroImage.classList.add("visible");
        } else {
          heroImage.classList.remove("visible");
        }
      });
    }, { threshold: 0.5 });

    heroObserver.observe(heroImage);
  }
});

// ==================== CONTACT FORM ====================

// Close popup function
function closePopup() {
  const popup = document.getElementById("success-popup");
  if (popup) {
    popup.style.display = "none";
    window.location.hash = ""; // clear hash
  }
}

// Handle form submission
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        // Show custom popup
        const popup = document.getElementById("success-popup");
        if (popup) popup.style.display = "flex";

        this.reset();
      } else {
        alert("Something went wrong. Please try again.");
        console.error(result);
      }
    } catch (error) {
      alert("Error sending message. Please try again.");
      console.error(error);
    }
  });
}

// ==================== PROJECT DESCRIPTIONS (PROJECT PAGE ONLY) ====================
document.addEventListener("DOMContentLoaded", () => {
  const pathname = window.location.pathname.replace(/\\/g, "/");
  const isProjectPage = pathname.endsWith("/html/project.html") || pathname.endsWith("/project.html");
  if (!isProjectPage) return;

  const projectSection = document.querySelector("#projects");
  if (!projectSection) return;

  const descriptions = projectSection.querySelectorAll(".project-card .project-text p");
  if (!descriptions.length) return;

  const overlay = document.createElement("div");
  const modal = document.createElement("div");
  const closeBtn = document.createElement("button");
  const modalContent = document.createElement("div");

  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.display = "none";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.padding = "24px";
  overlay.style.background = "rgba(0, 0, 0, 0.55)";
  overlay.style.zIndex = "9999";

  modal.style.position = "relative";
  modal.style.width = "min(760px, 100%)";
  modal.style.maxHeight = "80vh";
  modal.style.overflowY = "auto";
  modal.style.borderRadius = "12px";
  modal.style.padding = "20px 22px";

  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.textContent = "X";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "10px";
  closeBtn.style.right = "12px";
  closeBtn.style.border = "none";
  closeBtn.style.background = "transparent";
  closeBtn.style.fontSize = "20px";
  closeBtn.style.fontWeight = "700";
  closeBtn.style.lineHeight = "1";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.padding = "0";

  modalContent.style.paddingRight = "26px";
  modalContent.style.lineHeight = "1.95";

  const applyModalTheme = () => {
    const sampleCard = projectSection.querySelector(".project-card");
    const samplePara = projectSection.querySelector(".project-card .project-text p");
    const cardStyle = sampleCard ? getComputedStyle(sampleCard) : null;
    const paraStyle = samplePara ? getComputedStyle(samplePara) : null;
    const isDark = document.body.classList.contains("dark");

    modal.style.background = cardStyle ? cardStyle.backgroundColor : (isDark ? "#1f1f1f" : "#ffffff");
    modal.style.color = paraStyle ? paraStyle.color : (isDark ? "#eeeeee" : "#111111");
    modal.style.boxShadow = isDark
      ? "0 12px 40px rgba(255, 255, 255, 0.2)"
      : "0 12px 40px rgba(0, 0, 0, 0.28)";
    closeBtn.style.color = modal.style.color;
    modalContent.style.color = modal.style.color;
  };

  const closeModal = () => {
    overlay.style.display = "none";
    document.body.style.overflow = "";
  };

  const appendPopupScreenshots = (sourceCard, targetContainer) => {
    if (!sourceCard || !targetContainer) return;
    const raw = sourceCard.getAttribute("data-project-screenshots");
    if (!raw) return;

    const screenshotPaths = raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!screenshotPaths.length) return;

    const gallery = document.createElement("div");
    gallery.style.display = "grid";
    gallery.style.gridTemplateColumns = "repeat(auto-fit, minmax(220px, 1fr))";
    gallery.style.gap = "12px";
    gallery.style.marginTop = "16px";

    screenshotPaths.forEach((path, index) => {
      const img = document.createElement("img");
      img.src = path;
      img.alt = `Project screenshot ${index + 1}`;
      img.loading = "lazy";
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.borderRadius = "10px";
      img.style.border = "1px solid rgba(127, 127, 127, 0.25)";
      img.style.display = "block";
      img.onerror = () => img.remove();
      gallery.appendChild(img);
    });

    if (gallery.childElementCount > 0) {
      targetContainer.appendChild(gallery);
    }
  };

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeModal();
  });

  modal.appendChild(closeBtn);
  modal.appendChild(modalContent);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  const measureNode = document.createElement("p");
  measureNode.style.position = "absolute";
  measureNode.style.visibility = "hidden";
  measureNode.style.pointerEvents = "none";
  measureNode.style.left = "-99999px";
  measureNode.style.top = "0";
  measureNode.style.margin = "0";
  measureNode.style.whiteSpace = "normal";
  measureNode.style.wordBreak = "normal";
  document.body.appendChild(measureNode);

  const suffixText = "... ";

  descriptions.forEach((p) => {
    if (p.dataset.projectClampDone === "1") return;
    p.dataset.projectClampDone = "1";

    const fullText = p.textContent.replace(/\s+/g, " ").trim();
    if (!fullText) return;

    const style = getComputedStyle(p);
    const lineHeight = parseFloat(style.lineHeight) || (parseFloat(style.fontSize) * 1.4);
    const maxHeight = (lineHeight * 5) + 1;

    measureNode.style.width = `${p.clientWidth}px`;
    measureNode.style.font = style.font;
    measureNode.style.fontSize = style.fontSize;
    measureNode.style.fontWeight = style.fontWeight;
    measureNode.style.letterSpacing = style.letterSpacing;
    measureNode.style.lineHeight = style.lineHeight;
    measureNode.style.textTransform = style.textTransform;

    measureNode.textContent = fullText;
    const fits = measureNode.scrollHeight <= maxHeight;
    if (fits) return;

    let low = 0;
    let high = fullText.length;
    let best = "";

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      let candidate = fullText.slice(0, mid).trim();
      candidate = candidate.replace(/\s+\S*$/, "").trim();
      const displayText = candidate ? `${candidate}${suffixText}View More` : `View More`;
      measureNode.textContent = displayText;

      if (measureNode.scrollHeight <= maxHeight) {
        best = candidate;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    p.textContent = best ? `${best}${suffixText}` : "";
    p.style.overflow = "hidden";
    p.style.minHeight = `${lineHeight * 5}px`;
    p.style.maxHeight = `${lineHeight * 5}px`;

    const viewMoreBtn = document.createElement("button");
    viewMoreBtn.type = "button";
    viewMoreBtn.textContent = "View More";
    viewMoreBtn.style.display = "inline";
    viewMoreBtn.style.border = "none";
    viewMoreBtn.style.background = "none";
    viewMoreBtn.style.color = "inherit";
    viewMoreBtn.style.font = "inherit";
    viewMoreBtn.style.fontWeight = "600";
    viewMoreBtn.style.textDecoration = "underline";
    viewMoreBtn.style.cursor = "pointer";
    viewMoreBtn.style.padding = "0";
    viewMoreBtn.style.margin = "0";
    viewMoreBtn.style.verticalAlign = "baseline";

    viewMoreBtn.dataset.projectViewMore = "1";

    viewMoreBtn.addEventListener("click", () => {
      const sourceProjectText = p.closest(".project-text");
      const sourceProjectCard = p.closest(".project-card");
      if (!sourceProjectText) return;

      const projectClone = sourceProjectText.cloneNode(true);
      const clonedDescription = projectClone.querySelector("p");
      if (clonedDescription) clonedDescription.textContent = fullText;
      projectClone.querySelectorAll("button[data-project-view-more='1']").forEach((btn) => btn.remove());
      projectClone.querySelectorAll("button[data-project-viewmore='1']").forEach((btn) => btn.remove());
      projectClone.querySelectorAll("button").forEach((btn) => {
        if (btn.textContent.trim().toLowerCase() === "view more") btn.remove();
      });

      modalContent.innerHTML = "";
      modalContent.appendChild(projectClone);
      modalContent.querySelectorAll("p").forEach((para) => {
        para.style.lineHeight = "1.95";
      });
      appendPopupScreenshots(sourceProjectCard, modalContent);
      applyModalTheme();
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    });

    p.appendChild(viewMoreBtn);
  });
});
