import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".modal__preview-image");
    this._caption = this._popup.querySelector(".modal__image-caption");
    console.log("Image Element:", this._image);
    console.log("Caption Element:", this._caption);
  }

  open(name, link) {
    if (!this._image || !this._caption) {
      console.error("Image or caption element not found");
      return;
    }
    this._image.src = link;
    this._image.alt = link;
    this._caption.textContent = name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector(".modal__close").addEventListener("click", () => {
      console.log("Close button clicked");
      this.close();
    });
    this._popup.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal_opened")) {
        console.log("Overlay clicked");
        this.close();
      }
    });
  }
}
