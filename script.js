const menuButton = document.querySelector(".menu-button");
const navMenu = document.querySelector(".nav");

menuButton.addEventListener("click", function() {
    const isOpen = navMenu.classList.toggle("is-open");

    menuButton.textContent = isOpen ? "×" : "☰";
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "メニューを閉じる" : "メニューを開く"
    );
    menuButton.setAttribute("aria-expanded", isOpen);
});

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function() {
        navMenu.classList.remove("is-open");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "メニューを開く");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

/*ChatBot */

const chatbotArea = document.querySelector(".chatbot-area");
const chatbotToggle = document.querySelector(".chatbot-toggle");
const chatbotClose = document.querySelector(".chatbot-close");

chatbotToggle.addEventListener("click", () => {
  chatbotArea.classList.add("is-open");
  chatbotToggle.setAttribute("aria-expanded", "true");
});

chatbotClose.addEventListener("click", () => {
  chatbotArea.classList.remove("is-open");
  chatbotToggle.setAttribute("aria-expanded", "false");
});

/*feature-animation */
document.documentElement.classList.add("js");

const initFeatureReveal = () => {
  const revealItems = document.querySelectorAll(".js-reveal");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* 動きを減らす設定、または対象カードがない場合 */
  if (reduceMotion || revealItems.length === 0) {
    revealItems.forEach((card) => {
      card.classList.add("is-visible");
    });

    return;
  }

  /* IntersectionObserver非対応ブラウザ向け */
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((card) => {
      card.classList.add("is-visible");
    });

    return;
  }

  const featureObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealItems.forEach((card) => {
    featureObserver.observe(card);
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFeatureReveal);
} else {
  initFeatureReveal();
}
