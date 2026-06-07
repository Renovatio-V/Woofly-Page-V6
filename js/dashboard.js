/* ========================
   DASHBOARD PAGE LOGIC
   ======================== */
document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  initIcons();
  initSlideshow();
});

/* ---- SLIDESHOW ---- */
const TOTAL_SLIDES = 5;
let slideIndex = 0;
let slideVisible = 3; // cards visible at once
let autoSlideTimer = null;

function getVisibleCount() {
  return window.innerWidth <= 900 ? 1 : window.innerWidth <= 1200 ? 2 : 3;
}

function initSlideshow() {
  slideVisible = getVisibleCount();
  const dots = document.getElementById('slideDots');
  const maxIndex = TOTAL_SLIDES - slideVisible;
  dots.innerHTML = '';
  for (let i = 0; i <= maxIndex; i++) {
    const d = document.createElement('button');
    d.className = 'slide-dot' + (i === 0 ? ' active' : '');
    d.onclick = () => goToSlide(i);
    dots.appendChild(d);
  }
  goToSlide(0);
  startAutoSlide();
  window.addEventListener('resize', () => {
    slideVisible = getVisibleCount();
    initSlideshow();
  });
}

function goToSlide(idx) {
  const maxIndex = TOTAL_SLIDES - slideVisible;
  slideIndex = Math.max(0, Math.min(idx, maxIndex));
  const track = document.getElementById('slidesTrack');
  const cardWidth = track.children[0].offsetWidth + 20; // +gap
  track.style.transform = `translateX(-${slideIndex * cardWidth}px)`;
  document.querySelectorAll('.slide-dot').forEach((d, i) => {
    d.classList.toggle('active', i === slideIndex);
  });
}

function slidePrev() {
  goToSlide(slideIndex - 1);
  resetAutoSlide();
}

function slideNext() {
  const maxIndex = TOTAL_SLIDES - slideVisible;
  goToSlide(slideIndex >= maxIndex ? 0 : slideIndex + 1);
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideTimer = setInterval(() => {
    const maxIndex = TOTAL_SLIDES - slideVisible;
    goToSlide(slideIndex >= maxIndex ? 0 : slideIndex + 1);
  }, 4000);
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}
