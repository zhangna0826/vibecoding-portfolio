document.addEventListener('DOMContentLoaded', () => {
  const answers = { mood: null, type: null, company: null };
  const answerKeys = ['type', 'mood', 'company'];
  let currentStep = 0;

  const btnPrevious = document.getElementById('btnPrevious');
  const btnFindFilm = document.getElementById('btnFindFilm');
  const progressSteps = document.querySelectorAll('.progress__step');
  const questions = document.querySelectorAll('.question');

  QUIZ_QUESTIONS.forEach((q, index) => {
    const section = document.getElementById(q.sectionId);
    const optionsEl = section.querySelector('.options');

    q.options.forEach((option) => {
      const label = document.createElement('label');
      label.className = 'option';
      label.innerHTML = `
        <input type="radio" name="${q.id}" value="${option.value}">
        <span class="option__label">${option.label}</span>
      `;

      label.querySelector('input').addEventListener('change', () => {
        answers[answerKeys[index]] = option.value;
        section.querySelectorAll('.option').forEach((el) => el.classList.remove('option--selected'));
        label.classList.add('option--selected');
        updateActionButtons();

        if (index < QUIZ_QUESTIONS.length - 1) {
          currentStep += 1;
          updateProgress();
          updateActionButtons();
        }
      });

      optionsEl.appendChild(label);
    });
  });

  function updateActionButtons() {
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === QUIZ_QUESTIONS.length - 1;
    const hasAnswer = answers[answerKeys[currentStep]] !== null;

    btnPrevious.classList.toggle('btn--hidden', isFirstStep);
    btnFindFilm.classList.toggle('btn--hidden', !isLastStep);
    btnFindFilm.disabled = !hasAnswer;
  }

  function updateProgress() {
    progressSteps.forEach((step, index) => {
      step.classList.toggle('progress__step--active', index === currentStep);
      step.classList.toggle('progress__step--done', index < currentStep);
    });

    questions.forEach((q, index) => {
      q.classList.toggle('question--active', index === currentStep);
    });
  }

  btnPrevious.addEventListener('click', () => {
    if (currentStep === 0) return;
    currentStep -= 1;
    updateProgress();
    updateActionButtons();
  });

  btnFindFilm.addEventListener('click', () => {
    if (answers[answerKeys[currentStep]] === null) return;

    const recommendation = recommendMovie(answers);
    saveQuizResult(recommendation);
    window.location.href = '/result/';
  });

  updateProgress();
  updateActionButtons();
});
