// function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.add(inputErrorClass);
//   errorMessageEl.textContent = inputEl.validationMessage;
//   errorMessageEl.classList.add(errorClass);
// }

// function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.remove(inputErrorClass);
//   errorMessageEl.textContent = "";
//   errorMessageEl.classList.remove(errorClass);
// }

// function checkInputValidity(formEl, inputEl, options) {
//   if (!inputEl.validity.valid) {
//     return showInputError(formEl, inputEl, options);
//   }
//   hideInputError(formEl, inputEl, options);
// }

// function toggleButtonState(inputElms, submitButton, { inactiveButtonClass }) {
//   const isFormInvalid = inputElms.some((inputEl) => !inputEl.validity.valid);

//   if (isFormInvalid) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
//   } else {
//     submitButton.classList.remove(inactiveButtonClass);
//     submitButton.disabled = false;
//   }
// }

// function setEventListener(formEl, options) {
//   const { inputSelector } = options;
//   const inputElms = [...formEl.querySelectorAll(inputSelector)];
//   const submitButton = formEl.querySelector(options.submitButtonSelector);

//   inputElms.forEach((inputEl) => {
//     inputEl.addEventListener("input", (e) => {
//       checkInputValidity(formEl, inputEl, options);
//       toggleButtonState(inputElms, submitButton, options);
//     });
//   });
// }

// function enableValidation(options) {
//   const formElms = [...document.querySelectorAll(options.formSelector)];
//   formElms.forEach((formEl) => {
//     formEl.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//     });

//     setEventListener(formEl, options);
//   });
// }

// const config = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };

// enableValidation(config);
