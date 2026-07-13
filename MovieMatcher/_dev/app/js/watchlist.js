document.addEventListener('DOMContentLoaded', () => {
  let activeFilter = 'all';
  const listEl = document.getElementById('savedList');
  const emptyState = document.getElementById('emptyState');
  const filterTabs = document.querySelectorAll('.filter-tab');

  function renderWatchlist() {
    const watchlist = getWatchlist();
    const stats = getWatchlistStats(watchlist);

    document.getElementById('statTotal').textContent = stats.total;
    document.getElementById('statWatched').textContent = stats.watched;
    document.getElementById('statRemaining').textContent = stats.remaining;

    const filtered = watchlist.filter((item) => {
      if (activeFilter === 'to-watch') return !item.watched;
      if (activeFilter === 'watched') return item.watched;
      return true;
    });

    listEl.innerHTML = '';

    if (filtered.length === 0) {
      emptyState.hidden = watchlist.length > 0;
      emptyState.textContent =
        watchlist.length > 0
          ? 'No films match this filter.'
          : 'No saved films yet. Take the quiz to find your first match!';
      return;
    }

    emptyState.hidden = true;

    filtered.forEach((item) => {
      const movie = getMovieById(item.movieId);
      if (!movie) return;

      const li = document.createElement('li');
      li.className = `saved-item${item.watched ? ' saved-item--watched' : ''}`;
      li.innerHTML = `
        <div class="saved-item__poster"></div>
        <div class="saved-item__body">
          <h3 class="saved-item__title${item.watched ? ' saved-item__title--watched' : ''}">${movie.title}</h3>
          <span class="rating">★ ${movie.rating}</span>
          <div class="tag-list">${movie.genres.map((g) => `<span class="tag">${g}</span>`).join('')}</div>
          <span class="saved-item__status">${item.watched ? 'Watched' : 'To watch'}</span>
        </div>
        <div class="saved-item__actions">
          <button type="button" class="btn btn--secondary btn--small btn-mark-watched">
            ${item.watched ? 'Mark as to watch' : 'Mark as watched'}
          </button>
          <button type="button" class="btn btn--ghost btn--small btn-remove">Remove</button>
        </div>
      `;

      li.querySelector('.saved-item__poster').appendChild(createPosterElement(movie));

      li.querySelector('.btn-mark-watched').addEventListener('click', () => {
        markAsWatched(movie.id, !item.watched);
        renderWatchlist();
      });

      li.querySelector('.btn-remove').addEventListener('click', () => {
        removeFromWatchlist(movie.id);
        renderWatchlist();
      });

      listEl.appendChild(li);
    });
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activeFilter = tab.dataset.filter;
      filterTabs.forEach((t) => {
        const isActive = t === tab;
        t.classList.toggle('filter-tab--active', isActive);
        t.setAttribute('aria-selected', isActive);
      });
      renderWatchlist();
    });
  });

  renderWatchlist();
});
