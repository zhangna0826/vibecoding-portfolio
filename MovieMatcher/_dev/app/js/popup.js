function showPopup(message) {
  let overlay = document.getElementById('popupOverlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'popupOverlay';
    overlay.className = 'popup-overlay';
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="popup" role="alertdialog" aria-live="polite">
        <p class="popup__message"></p>
        <button type="button" class="btn btn--primary popup__close">OK</button>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('.popup__close').addEventListener('click', hidePopup);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) hidePopup();
    });
  }

  overlay.querySelector('.popup__message').textContent = message;
  overlay.hidden = false;
  overlay.classList.add('popup-overlay--visible');
}

function hidePopup() {
  const overlay = document.getElementById('popupOverlay');
  if (!overlay) return;

  overlay.classList.remove('popup-overlay--visible');
  overlay.hidden = true;
}
