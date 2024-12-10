export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getView() {
    return (this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true));
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_is-active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
  }

  _setEventListener() {
    //".card__image"
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });

    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });

    // this._cardElement.addEventListener("click", () => {
    //   this._handleImageClick(this);
    // });
  }

  _generateCard() {
    this._cardElement = this._getView();
    this._cardElement.querySelector(".card__title").textContent = this.name;
    // const imageElement = this._cardElement.querySelector(".card__image");
    this._cardElement.querySelector(".card__image").src = this.link;
    this._cardElement.querySelector(".card__image").alt = this.name;
    this._setEventListener();

    return this._cardElement;
  }
}
