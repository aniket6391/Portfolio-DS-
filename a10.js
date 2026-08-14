// ===============================
// Typing Animation for Home Section
// ===============================
const typingText = document.getElementById("typing-text");
const roles = ["Data Science Enthusiast...", "Master of Computer Applications..."];
let roleIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
  const current = roles[roleIndex];
  if (!deleting) {
    typingText.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else { 
    typingText.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 50 : 120);
}
typeEffect();


// ===============================
// Navbar Active Link + Smooth Scroll
// ===============================
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      const id = section.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) link.classList.add("active");
      });
    }
  });
});

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      const top = target.offsetTop - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});


// ===============================
// Theme Toggle (Dark / Light Mode)
// ===============================
const themeToggle = document.getElementById("theme-toggle");
const icon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    icon.classList.replace("bx-moon", "bx-sun");
  } else {
    icon.classList.replace("bx-sun", "bx-moon");
  }
});






// ===============================
// Scroll Reveal Animation
// ===============================
const revealElements = document.querySelectorAll(
  ".skill-card, .certificate, .project-card, .contact-form, .contact-info, .home-content, .home-img"
);

const scrollObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => scrollObserver.observe(el));

// Add CSS for animation dynamically
const animStyle = document.createElement("style");
animStyle.textContent = `
  .skill-card, .certificate, .project-card, .contact-form, .contact-info, .home-content, .home-img {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .skill-card.show, .certificate.show, .project-card.show, .contact-form.show, .contact-info.show, .home-content.show, .home-img.show {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(animStyle);

// ===============================
// Mobile Menu Toggle
// ===============================
const menuIcon = document.getElementById("menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
  // toggle icon style
  menuIcon.classList.toggle("bx-x");
});


// ===============================
// EmailJS Contact Form
// ===============================
const contactForm = document.getElementById("contact-form");
const statusMessage = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Strict Email Validation
    const emailInput = contactForm.querySelector('input[name="reply_to"]').value;
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(emailInput)) {
      alert("Please type a valid email address (for example: name@gmail.com, or ending in .in, .gov, .com)");
      statusMessage.textContent = "❌ Please enter a valid email address.";
      statusMessage.style.color = "red";
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";

    emailjs.sendForm("service_w5bs1iu", "template_gohq7re", contactForm)
      .then(() => {
        statusMessage.textContent = "✅ Message sent successfully!";
        statusMessage.style.color = "lime";
        contactForm.reset();
        
        setTimeout(() => {
          statusMessage.textContent = "";
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Show the EXACT error returned by EmailJS so we can fix it!
        statusMessage.textContent = "❌ Error: " + (error.text || JSON.stringify(error));
        statusMessage.style.color = "red";
      })
      .finally(() => {
        submitBtn.textContent = originalText;
      });
  });
}

// ===============================
// Scroll Progress Bar
// ===============================
window.addEventListener("scroll", () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
});

// ===============================
// Custom Cursor
// ===============================
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

if (cursor && cursorFollower) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        
        // slight delay for the follower
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + "px";
            cursorFollower.style.top = e.clientY + "px";
        }, 50);
    });

    // Add hover effect to all links and buttons
    const clickables = document.querySelectorAll("a, button, input, textarea, i");
    clickables.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.style.width = "20px";
            cursor.style.height = "20px";
            cursor.style.background = "transparent";
            cursor.style.border = "2px solid var(--main-color)";
            cursorFollower.style.width = "50px";
            cursorFollower.style.height = "50px";
        });
        el.addEventListener("mouseleave", () => {
            cursor.style.width = "8px";
            cursor.style.height = "8px";
            cursor.style.background = "var(--main-color)";
            cursor.style.border = "none";
            cursorFollower.style.width = "30px";
            cursorFollower.style.height = "30px";
        });
    });
}

// ===============================
// Project Filters
// ===============================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));
        // Add active class to clicked button
        button.classList.add("active");

        const filterValue = button.getAttribute("data-filter");

        projectCards.forEach(card => {
            if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }
        });
    });
});

// ===============================
// Particle Network Background
// ===============================
if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: { enable: true, mode: "grab" },
                resize: true
            },
            modes: {
                grab: { distance: 140, links: { opacity: 1 } }
            }
        },
        particles: {
            color: { value: "#00ff88" },
            links: {
                color: "#00ff88",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: false,
                straight: false,
                outModes: { default: "bounce" }
            },
            number: { density: { enable: true, area: 800 }, value: 60 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } }
        },
        detectRetina: true
    });
}
