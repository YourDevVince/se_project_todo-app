class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector('.popup__close');
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close(this);
    }
  };

  open() {
    this._popupElement.classList.add('popup_visible');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_visible');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (
        evt.target === this._popupElement ||
        evt.target.classList.contains('popup__close')
      ) {
        this.close();
      }
    });
  }
}
export default Popup;
