const WATCHLIST_KEY = 'filmfind_watchlist';

function getWatchlist() {
  try {
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

function saveWatchlist(list) {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
}

function isMovieInWatchlist(movieId) {
  return getWatchlist().some((item) => item.movieId === movieId);
}

function addToWatchlist(movieId) {
  const list = getWatchlist();
  if (list.some((item) => item.movieId === movieId)) return false;

  list.push({ movieId, watched: false, savedAt: Date.now() });
  saveWatchlist(list);
  return true;
}

function removeFromWatchlist(movieId) {
  const list = getWatchlist().filter((item) => item.movieId !== movieId);
  saveWatchlist(list);
  return list;
}

function markAsWatched(movieId, watched = true) {
  const list = getWatchlist().map((item) =>
    item.movieId === movieId ? { ...item, watched } : item
  );
  saveWatchlist(list);
  return list;
}

function getWatchlistStats(list) {
  const total = list.length;
  const watched = list.filter((item) => item.watched).length;
  return { total, watched, remaining: total - watched };
}

function getLastQuizResult() {
  try {
    return JSON.parse(sessionStorage.getItem('filmfind_last_result'));
  } catch {
    return null;
  }
}

function saveQuizResult(recommendation) {
  sessionStorage.setItem(
    'filmfind_last_result',
    JSON.stringify({
      movieId: recommendation.movie.id,
      score: recommendation.score,
      maxScore: recommendation.maxScore,
      answers: recommendation.answers,
      timestamp: Date.now(),
    })
  );
}

function clearQuizResult() {
  sessionStorage.removeItem('filmfind_last_result');
}
