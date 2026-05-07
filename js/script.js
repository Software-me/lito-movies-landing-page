function closePlayer(modalSelector, videoSelector) {
  const modal = document.querySelector(modalSelector);
  const video = document.querySelector(videoSelector);
  if (!modal || !video || !modal.classList.contains('active')) return;
  video.pause();
  modal.classList.remove('active');
}

function togglePlayer(modalSelector, videoSelector, siblingModalSelector, siblingVideoSelector) {
  const modal = document.querySelector(modalSelector);
  const video = document.querySelector(videoSelector);
  if (!modal || !video) return;

  if (modal.classList.contains('active')) {
    closePlayer(modalSelector, videoSelector);
    return;
  }

  closePlayer(siblingModalSelector, siblingVideoSelector);
  modal.classList.add('active');
  video.play().catch(() => {
    // Autoplay can be blocked by browser settings.
  });
}

function toggleTrailerVideo() {
  togglePlayer('.trailer', '.trailer video', '.movie-player', '.movie-player video');
}

function setTrailerSource(videoSrc) {
  if (!videoSrc) return;
  const trailerVideo = document.querySelector('.trailer video');
  if (!trailerVideo) return;

  if (trailerVideo.getAttribute('src') !== videoSrc) {
    trailerVideo.setAttribute('src', videoSrc);
    trailerVideo.load();
  }
}

function toggleMovieVideo() {
  togglePlayer('.movie-player', '.movie-player video', '.trailer', '.trailer video');
}

function openTrailerIfClosed() {
  const trailer = document.querySelector('.trailer');
  if (!trailer.classList.contains('active')) {
    toggleTrailerVideo();
  }
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

function normalizeSearchTerm(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

document.addEventListener('DOMContentLoaded', () => {
  const trailerButtons = document.querySelectorAll('[data-action="toggle-trailer"]');
  trailerButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      setTrailerSource(button.dataset.videoSrc);
      toggleTrailerVideo();
    });
  });

  const movieButtons = document.querySelectorAll('[data-action="toggle-movie"]');
  movieButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      toggleMovieVideo();
    });
  });

  const carouselItems = document.querySelectorAll('.carousel-item[data-bg][data-title]');
  const searchInput = document.querySelector('.search input');
  const searchIcon = document.querySelector('.search .fa-search');
  const searchStatus = document.querySelector('.search-status');

  const keywordAliases = {
    'the-ritual': ['ritual', 'romance', 'date', 'couple'],
    'the-bagman': ['bagman', 'action', 'thriller', 'killer'],
    'flight-risk': ['flight risk', 'flight', 'horror', 'plane', 'airplane'],
    graduation: [
      'graduation',
      'commencement',
      'bachelor',
      'software development',
      'achievement',
      'recruiter',
      'recruitment',
      'portfolio',
      'ceremony',
    ],
    predator: ['predator', 'horror', 'monster', 'alien', 'survival'],
  };

  const searchableTitles = Array.from(carouselItems).map((item) => {
    const key = item.dataset.title;
    const content = document.querySelector(`.content.${key}`);
    const metaText = content?.querySelector('h4')?.textContent || '';
    const descriptionText = content?.querySelector('p')?.textContent || '';
    const posterAlt = item.querySelector('img')?.alt || '';
    const aliasText = (keywordAliases[key] || []).join(' ');
    const searchBlob = normalizeSearchTerm(`${key} ${metaText} ${descriptionText} ${posterAlt} ${aliasText}`);

    return {
      key,
      bg: item.dataset.bg,
      dim: item.dataset.dim || '0.6',
      searchBlob,
    };
  });

  function setSearchStatus(message) {
    if (searchStatus) {
      searchStatus.textContent = message;
    }
  }

  function runSearch(rawQuery) {
    const query = normalizeSearchTerm(rawQuery);
    if (!query) {
      setSearchStatus('');
      return;
    }

    const exactMatch = searchableTitles.find((movie) => {
      const aliasList = keywordAliases[movie.key] || [];
      return aliasList.map(normalizeSearchTerm).includes(query);
    });
    const partialMatch =
      exactMatch || searchableTitles.find((movie) => movie.searchBlob.includes(query));

    if (!partialMatch) {
      setSearchStatus(`No result for "${rawQuery}". Try title, genre, or keyword.`);
      return;
    }

    changeBg(partialMatch.bg, partialMatch.key, partialMatch.dim);
    setSearchStatus(`Showing ${partialMatch.key.replace('-', ' ')}.`);

    if (partialMatch.key === 'graduation') {
      openTrailerIfClosed();
    }
  }

  carouselItems.forEach((item) => {
    item.addEventListener('click', () => {
      const bg = item.dataset.bg;
      const title = item.dataset.title;
      const dim = item.dataset.dim;
      changeBg(bg, title, dim);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        runSearch(searchInput.value);
      }
    });
  }

  if (searchIcon) {
    searchIcon.addEventListener('click', () => runSearch(searchInput?.value || ''));
    searchIcon.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        runSearch(searchInput?.value || '');
      }
    });
  }
});
