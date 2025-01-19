import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".modal__preview-image");
    this._captionElement = this._popup.querySelector(".modal__image_caption");
  }

  open(name, link) {
    this._image.src = name;
    this._image.alt = link;
    this._caption.textContent = name;
    super.open();
  }
}
