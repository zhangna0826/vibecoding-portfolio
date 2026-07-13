const GENRES = [
  'Action', 'Comedy', 'Drama', 'Sci-Fi',
  'Romance', 'Thriller', 'Animation', 'Horror',
];

const MOVIES = [
  {
    id: 1,
    title: 'The Grand Budapest Hotel',
    poster: 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Grand_Budapest_Hotel.png',
    synopsis: 'A legendary concierge and his protégé become embroiled in a murder mystery and a battle for a family fortune at a famous European hotel.',
    rating: 8.1,
    genres: ['Comedy', 'Drama'],
    mood: 'cheerful',
    type: 'feel-good',
    company: 'alone',
  },
  {
    id: 2,
    title: 'Blade Runner 2049',
    poster: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Blade_Runner_2049_poster.png',
    synopsis: 'A young blade runner discovers a long-buried secret that leads him to track down former blade runner Rick Deckard, missing for thirty years.',
    rating: 8.0,
    genres: ['Sci-Fi', 'Thriller'],
    mood: 'thoughtful',
    type: 'mind-bending',
    company: 'alone',
  },
  {
    id: 3,
    title: 'Spirited Away',
    poster: 'https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png',
    synopsis: 'During her family\'s move to the suburbs, a sullen 10-year-old wanders into a world ruled by gods, witches, and spirits.',
    rating: 8.6,
    genres: ['Animation', 'Drama'],
    mood: 'adventurous',
    type: 'feel-good',
    company: 'with-someone',
  },
  {
    id: 4,
    title: 'Get Out',
    poster: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Get_Out_poster.png',
    synopsis: 'A young African-American visits his white girlfriend\'s parents for the weekend, where his uneasiness about their reception turns into terror.',
    rating: 7.8,
    genres: ['Horror', 'Thriller'],
    mood: 'intense',
    type: 'mind-bending',
    company: 'with-someone',
  },
  {
    id: 5,
    title: 'La La Land',
    poster: 'https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png',
    synopsis: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations.',
    rating: 8.0,
    genres: ['Romance', 'Drama'],
    mood: 'romantic',
    type: 'feel-good',
    company: 'with-someone',
  },
  {
    id: 6,
    title: 'Mad Max: Fury Road',
    poster: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg',
    synopsis: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland with the aid of a group of female prisoners.',
    rating: 8.1,
    genres: ['Action', 'Sci-Fi'],
    mood: 'adventurous',
    type: 'action-packed',
    company: 'alone',
  },
  {
    id: 7,
    title: 'Drive',
    poster: 'https://upload.wikimedia.org/wikipedia/en/1/13/Drive2011Poster.jpg',
    synopsis: 'A mysterious Hollywood stuntman and mechanic moonlights as a getaway driver and finds himself a target for helping out his neighbor.',
    rating: 7.8,
    genres: ['Thriller', 'Drama'],
    mood: 'intense',
    type: 'slow-burn',
    company: 'alone',
  },
  {
    id: 8,
    title: 'Before Sunrise',
    poster: 'https://upload.wikimedia.org/wikipedia/en/d/da/Before_Sunrise_poster.jpg',
    synopsis: 'A young man and woman meet on a train in Europe and spend one evening together in Vienna, walking and talking until sunrise.',
    rating: 8.1,
    genres: ['Romance', 'Drama'],
    mood: 'romantic',
    type: 'slow-burn',
    company: 'with-someone',
  },
];

const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    sectionId: 'sectionQ1',
    label: 'Mood',
    question: 'What mood are you in?',
    options: [
      { value: 'feel-good', label: 'Feel-good & uplifting' },
      { value: 'mind-bending', label: 'Mind-bending & complex' },
      { value: 'action-packed', label: 'Action-packed & fast' },
      { value: 'slow-burn', label: 'Slow-burn & atmospheric' },
    ],
  },
  {
    id: 'q2',
    sectionId: 'sectionQ2',
    label: 'Type',
    question: 'What type of movie do you want?',
    options: [
      { value: 'cheerful', label: 'Cheerful & lighthearted' },
      { value: 'thoughtful', label: 'Thoughtful & reflective' },
      { value: 'adventurous', label: 'Adventurous & excited' },
      { value: 'intense', label: 'Intense & gripping' },
      { value: 'romantic', label: 'Romantic & dreamy' },
    ],
  },
  {
    id: 'q3',
    sectionId: 'sectionQ3',
    label: 'Company',
    question: 'Watching alone or with someone?',
    options: [
      { value: 'alone', label: 'Solo — just me and the screen' },
      { value: 'with-someone', label: 'With someone — shared experience' },
    ],
  },
];

const SCORE_KEYS = ['mood', 'type', 'company'];

function scoreMovie(movie, answers) {
  return SCORE_KEYS.reduce((score, key) => {
    return movie[key] === answers[key] ? score + 1 : score;
  }, 0);
}

function recommendMovie(answers) {
  const rankings = MOVIES.map((movie) => ({
    movie,
    score: scoreMovie(movie, answers),
  })).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.movie.rating - a.movie.rating;
  });

  const best = rankings[0];

  return {
    movie: best.movie,
    score: best.score,
    maxScore: SCORE_KEYS.length,
    rankings,
    answers,
  };
}

function getSuggestionsFromRankings(rankings, excludeId, count = 3) {
  return rankings
    .filter((entry) => entry.movie.id !== excludeId)
    .slice(0, count)
    .map((entry) => entry.movie);
}

function getMovieById(id) {
  return MOVIES.find((movie) => movie.id === id);
}

function getFeaturedMovies(count = 6) {
  return [...MOVIES]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
}

function getPosterFallbackColor(title) {
  const colors = [
    '#c06c84', '#355c7d', '#6c5b7b', '#2d3436',
    '#f67280', '#e17055', '#2c3e50', '#d4a574',
  ];
  let hash = 0;
  for (let i = 0; i < title.length; i += 1) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function createPosterElement(movie) {
  const container = document.createElement('div');
  container.className = 'poster-media';

  const showPlaceholder = () => {
    container.replaceChildren();
    container.className = 'poster-media poster-media--placeholder';
    container.style.backgroundColor = getPosterFallbackColor(movie.title);
    container.textContent = movie.title;
  };

  if (!movie.poster) {
    showPlaceholder();
    return container;
  }

  const img = document.createElement('img');
  img.src = movie.poster;
  img.alt = `${movie.title} poster`;
  img.className = 'poster-image';
  img.loading = 'lazy';
  img.addEventListener('error', showPlaceholder);
  container.appendChild(img);
  return container;
}
