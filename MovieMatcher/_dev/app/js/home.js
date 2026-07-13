document.addEventListener('DOMContentLoaded', () => {
  const genreContainer = document.getElementById('genreTags');
  const featuredGrid = document.getElementById('featuredMoviesGrid');
  const featuredEmpty = document.getElementById('featuredEmpty');
  const featuredSubtitle = document.getElementById('featuredSubtitle');

  if (!genreContainer || !featuredGrid) return;

  const featuredMovies = getFeaturedMovies(6);
  let selectedGenre = null;

  GENRES.forEach((genre) => {
    const tag = document.createElement('button');
    tag.type = 'button';
    tag.className = 'tag tag--filter';
    tag.dataset.genre = genre;
    tag.textContent = genre;
    tag.addEventListener('click', () => toggleGenreFilter(genre, tag));
    genreContainer.appendChild(tag);
  });

  function toggleGenreFilter(genre, tagEl) {
    if (selectedGenre === genre) {
      selectedGenre = null;
      tagEl.classList.remove('tag--active');
    } else {
      genreContainer.querySelectorAll('.tag--filter').forEach((tag) => {
        tag.classList.toggle('tag--active', tag.dataset.genre === genre);
      });
      selectedGenre = genre;
    }

    renderFeaturedMovies();
  }

  function renderFeaturedMovies() {
    const filtered = selectedGenre
      ? featuredMovies.filter((movie) => movie.genres.includes(selectedGenre))
      : featuredMovies;

    featuredGrid.innerHTML = '';

    if (filtered.length === 0) {
      featuredEmpty.hidden = false;
      featuredSubtitle.textContent = selectedGenre
        ? `No featured movies in ${selectedGenre}`
        : 'Top picks from our catalog';
      return;
    }

    featuredEmpty.hidden = true;
    featuredSubtitle.textContent = selectedGenre
      ? `Featured ${selectedGenre} movies`
      : 'Top picks from our catalog';

    filtered.forEach((movie) => {
      const card = document.createElement('article');
      card.className = 'featured-card';
      card.innerHTML = `
        <div class="featured-card__poster"></div>
        <div class="featured-card__body">
          <h3>${movie.title}</h3>
          <span class="rating">★ ${movie.rating}</span>
          <div class="tag-list">${movie.genres.map((g) => `<span class="tag">${g}</span>`).join('')}</div>
        </div>
      `;
      card.querySelector('.featured-card__poster').appendChild(createPosterElement(movie));
      featuredGrid.appendChild(card);
    });
  }

  renderFeaturedMovies();
});
