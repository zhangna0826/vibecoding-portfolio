document.addEventListener('DOMContentLoaded', () => {
  const result = getLastQuizResult();

  if (!result || !result.answers) {
    window.location.href = '/quiz/';
    return;
  }

  const recommendation = recommendMovie(result.answers);
  const movie = recommendation.movie;

  const poster = document.getElementById('moviePoster');
  poster.replaceChildren(createPosterElement(movie));

  document.getElementById('movieTitle').textContent = movie.title;
  document.getElementById('movieRating').textContent = `★ ${movie.rating} / 10`;
  document.getElementById('movieSynopsis').textContent = movie.synopsis;

  const genresEl = document.getElementById('movieGenres');
  movie.genres.forEach((genre) => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = genre;
    genresEl.appendChild(tag);
  });

  const btnSave = document.getElementById('btnSaveWatchlist');

  btnSave.addEventListener('click', () => {
    if (isMovieInWatchlist(movie.id)) {
      showPopup('Already saved');
      return;
    }

    addToWatchlist(movie.id);
    window.location.href = '/watchlist/';
  });

  const grid = document.getElementById('alsoLikeGrid');
  getSuggestionsFromRankings(recommendation.rankings, movie.id).forEach((suggestion) => {
    const card = document.createElement('article');
    card.className = 'suggestion-card';
    card.innerHTML = `
      <div class="suggestion-card__poster"></div>
      <div class="suggestion-card__body">
        <h3>${suggestion.title}</h3>
        <span class="rating">★ ${suggestion.rating}</span>
        <div class="tag-list">${suggestion.genres.map((g) => `<span class="tag">${g}</span>`).join('')}</div>
      </div>
    `;
    card.querySelector('.suggestion-card__poster').appendChild(createPosterElement(suggestion));
    grid.appendChild(card);
  });
});
