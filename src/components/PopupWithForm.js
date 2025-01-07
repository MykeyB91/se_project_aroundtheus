import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
  }

  _getInputValues() {
    const inputList = this._form.querySelectorAll(".modal__input");
    const formValues = {};
    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._form !== null) {
      this._form.addEventListener("submit", (event) => {
        event.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    } else {
      console.error("Form element not found");
    }
  }

  open() {
    super.open();
    if (this._form) {
      this._form.reset();
    }
  }

  close() {
    super.close();
    if (this.form) {
      this._form.reset();
    }
  }
}
