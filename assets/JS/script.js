/* =================================
   Section Sidebar
================================= */
const openSidebar = document.getElementById("openSidebar");
const closeSidebar = document.getElementById("closeSidebar");
const contactSidebar = document.getElementById("contactSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

// Open sidebar
openSidebar.addEventListener("click", () => {
  contactSidebar.classList.add("active");
  sidebarOverlay.classList.add("active");

  document.body.style.overflow = "hidden";
});

// Close sidebar
closeSidebar.addEventListener("click", closeSidebarMenu);

// Close when clicking outside sidebar
sidebarOverlay.addEventListener("click", closeSidebarMenu);

function closeSidebarMenu() {
  contactSidebar.classList.remove("active");
  sidebarOverlay.classList.remove("active");

  document.body.style.overflow = "";
}

// Close with ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSidebarMenu();
  }
});

/* =================================
    Section Video
================================= */
const openVideo = document.getElementById("openVideo");
const videoModal = document.getElementById("videoModal");
const closeVideo = document.getElementById("closeVideo");
const closeVideoBtn = document.getElementById("closeVideoBtn");
const popupVideo = document.getElementById("popupVideo");

// Open Video
openVideo.addEventListener("click", function () {
  videoModal.classList.add("active");
  document.body.classList.add("video-modal-open");

  popupVideo.play().catch(() => {});
});

// Close Video
function closeVideoModal() {
  videoModal.classList.remove("active");
  document.body.classList.remove("video-modal-open");

  popupVideo.pause();
  popupVideo.currentTime = 0;
}

// Close Via Overlay
closeVideo.addEventListener("click", closeVideoModal);

// Close Via X Button
closeVideoBtn.addEventListener("click", closeVideoModal);

// Close Via ESC Button
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeVideoModal();
  }
});

/* =================================
    Section Project
================================= */
const track = document.getElementById("projectsTrack");
const prevButton = document.getElementById("projectPrev");
const nextButton = document.getElementById("projectNext");
const originalCards = [...track.querySelectorAll(".project-card")];
const total = originalCards.length;

for (let i = 0; i < 5; i++) {
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.classList.remove("active");
    track.appendChild(clone);
  });
}
originalCards.forEach((card) => {
  card.remove();
});

let cards = [...track.querySelectorAll(".project-card")];
let currentIndex = total * 2;
let isMoving = false;
const trackWrapper = document.querySelector(".projects-track-wrapper");
let sliderMetrics = { wrapperWidth: 0, cardWidth: 0, step: 0 };

function measureSlider() {
  const card = cards[0];
  const cardWidth = card.offsetWidth;
  const trackStyle = window.getComputedStyle(track);
  const gap = parseFloat(trackStyle.columnGap) || 0;
  sliderMetrics = {
    wrapperWidth: trackWrapper.offsetWidth,
    cardWidth,
    step: cardWidth + gap,
  };
}

function getTranslate(index) {
  const { wrapperWidth, cardWidth, step } = sliderMetrics;
  const centerPosition = (wrapperWidth - cardWidth) / 2;
  return centerPosition - index * step;
}

function updateActive() {
  cards.forEach((card, index) => {
    card.classList.toggle("active", index === currentIndex);
  });
}

function moveSlider() {
  const position = getTranslate(currentIndex);
  track.style.transform = `translateX(${position}px)`;
  updateActive();
}

track.style.transition = "none";
measureSlider();
moveSlider();
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    track.style.transition = "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)";
  });
});
nextButton.addEventListener("click", () => {
  if (isMoving) return;
  isMoving = true;
  currentIndex++;
  moveSlider();
});

prevButton.addEventListener("click", () => {
  if (isMoving) return;
  isMoving = true;
  currentIndex--;
  moveSlider();
});

track.addEventListener("transitionend", (event) => {
  if (event.propertyName !== "transform") {
    return;
  }
  if (currentIndex >= total * 3) {
    track.style.transition = "none";
    currentIndex -= total;
    moveSlider();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition =
          "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)";
      });
    });
  } else if (currentIndex < total) {
    track.style.transition = "none";
    currentIndex += total;
    moveSlider();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition =
          "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)";
      });
    });
  }
  isMoving = false;
});

window.addEventListener("resize", () => {
  track.style.transition = "none";
  measureSlider();
  moveSlider();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      track.style.transition = "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)";
    });
  });
});

/* =================================
   Navbar Mobile
================================= */
const mobileMenuButton = document.getElementById("openMobileMenu");
const navbarMenu = document.querySelector(".navbar-menu");

if (mobileMenuButton && navbarMenu) {
  // OPEN / CLOSE MENU
  mobileMenuButton.addEventListener("click", () => {
    const isActive = navbarMenu.classList.toggle("active");
    mobileMenuButton.classList.toggle("active", isActive);
    mobileMenuButton.setAttribute("aria-expanded", isActive);
  });

  // MENU LINKS
  const mobileMenuLinks = navbarMenu.querySelectorAll("a");

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbarMenu.classList.remove("active");
      mobileMenuButton.classList.remove("active");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    });
  });

  //  RESIZE
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navbarMenu.classList.remove("active");
      mobileMenuButton.classList.remove("active");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    }
  });
}
