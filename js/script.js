function toggleVideo() {
  const trailer = document.querySelector('.trailer');
  const video = document.querySelector('video');
  if (trailer.classList.contains('active')) {
    video.pause();
  } else {
    video.play().catch(() => {
      // Autoplay can be blocked by browser settings.
    });
  }
  trailer.classList.toggle('active');
}
// change the background images and movie content text
function changeBg(bg, title, dim = '0.6') {
  const banner = document.querySelector('.banner');
  const contents = document.querySelectorAll('.content');
  banner.style.background = `url("./images/movies/${bg}")`;
  banner.style.backgroundSize = 'cover';
  banner.style.backgroundPosition = 'center';
  banner.style.setProperty('--banner-overlay-opacity', dim);

  contents.forEach((content) => {
    content.classList.remove('active');
    if (content.classList.contains(title)) {
      content.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const playButtons = document.querySelectorAll('[data-action="toggle-trailer"]');
  playButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      toggleVideo();
    });
  });

  const carouselItems = document.querySelectorAll('.carousel-item[data-bg][data-title]');
  carouselItems.forEach((item) => {
    item.addEventListener('click', () => {
      const bg = item.dataset.bg;
      const title = item.dataset.title;
      const dim = item.dataset.dim;
      changeBg(bg, title, dim);
    });
  });
});
