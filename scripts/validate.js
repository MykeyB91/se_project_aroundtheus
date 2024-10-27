// enabling validation by calling enableValidation()
// pass all the settings on call

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM fully loaded and parsed");

//   document
//     .querySelector("#open-profile-modal-btn")
//     .addEventListener("click", () => {
//       const profileModal = document.querySelector("#edit-modal");
//       openModal(profileModal);
//     });

//   document
//     .querySelector("#open-add-modal-btn")
//     .addEventListener("click", () => {
//       const addModal = document.querySelector("#add-modal");
//       openModal(addModal);
//     });
// });

// const forms = document.querySelectorAll(".modal__form");
// forms.forEach((form) => {
//   form.addEventListener("submit", (evt) => {
//     evt.preventDefault();
//   });
// });

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
  //console.log(`#${inputEl.id}-error`);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
  hideInputError(formEl, inputEl, options);
}

function toggleButtonState(inputElms, submitButton, { inactiveButtonClass }) {
  const isFormInvalid = inputElms.some((inputEl) => !inputEl.validity.valid);

  if (isFormInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListener(formEl, options) {
  const { inputSelector } = options;
  const inputElms = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(options.submitButtonSelector);
  const inputError = formEl.querySelector(options.inputErrorClass);
  const modalError = formEl.querySelector(options.errorClass);

  inputElms.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputElms, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElms = [...document.querySelectorAll(options.formSelector)];
  formElms.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListener(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
