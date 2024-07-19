// enabling validation by calling enableValidation()
// pass all the settings on call

function enableValidation(config) {
  console.log(config);
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: ".modal__button_disabled",
  inputErrorClass: ".modal__input_type_error",
  errorClass: ".modal__error_visible",
};

//enableValidation(config);
