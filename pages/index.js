import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileEditForm = document.querySelector("#profileEditForm");
const profileEditFormValidator = new FormValidator(settings, profileEditForm);
profileEditFormValidator.enableValidation();

const profileAddForm = document.querySelector("#profileAddForm");
const profileAddFormValidator = new FormValidator(settings, profileAddForm);
profileAddFormValidator.enableValidation();

//Variables
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileEditClosedButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const profileAddModal = document.querySelector("#add-modal");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAddClosedButton = profileAddModal.querySelector(".modal__close");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector(".modal__preview-image");
const previewImageClosedButton =
  previewImageModal.querySelector(".modal__close");
const previewImageCaption = document.querySelector(".modal__image-caption");

//Form Data
const nameInput = profileEditForm.querySelector("modal__input_type_name");
const jobInput = profileEditForm.querySelector("modal__input_type_description");
const cardTitleInput = profileAddForm.querySelector(".modal__input_type_title");
const cardUrlInput = profileAddForm.querySelector(".modal__input_type_link");

//Functions

// function renderCard(cardData) {
//   const cardElement = getCardElement(cardData);
//   cardListEl.prepend(cardElement);
// }

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteButton = cardElement.querySelector(".card__delete-button");

// likeButton.addEventListener("click", () => {
//   likeButton.classList.toggle("card__like-button_active");
// });

//   deleteButton.addEventListener("click", () => {
//     cardElement.remove();
//   });

//   cardImageEl.addEventListener("click", () => {
//     openModal(previewImageModal);
//     previewImage.src = cardData.link;
//     previewImage.alt = cardData.name;
//     previewImageCaption.textContent = cardData.name;
//   });

//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.link;
//   cardTitleEl.textContent = cardData.name;
//   return cardElement;
// }

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
  profileEditForm.reset();
  profileEditFormValidator.disableSubmitButton();
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const card = new Card(
    { name, link },
    "#card-template",
    handleImageClick
  )._generateCard();
  cardListEl.prepend(card);
  closeModal(profileAddModal);
  profileAddForm.reset();
  profileAddFormValidator.disableSubmitButton();
}

function handleImageClick(_name, _link) {
  const modalImage = document.querySelector(".modal__preview-image");
  const modalTitle = document.querySelector(".modal__image-caption");

  modalImage.alt = _name;
  modalImage.src = _link;
  modalTitle.textContent = _name;

  openModal(previewImageModal);
  //closeModal(previewImageModal);
}

//EventListeners Below

//Edit
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditClosedButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//Add
profileAddButton.addEventListener("click", () => {
  openModal(profileAddModal);
});

profileAddClosedButton.addEventListener("click", () => {
  closeModal(profileAddModal);
});

profileAddForm.addEventListener("submit", handleProfileAddSubmit);

//Image
previewImageClosedButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

//forEach()
initialCards.forEach((cardData) => {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick
  )._generateCard();

  cardListEl.prepend(card);
});

//Escape and Overlay functions & eventListeners
function handleEscKey(evt) {
  console.log("keydown event fired");
  if (evt.key === "Escape") {
    const openModals = document.querySelectorAll(".modal_opened");
    openModals.forEach((modal) => closeModal(modal));
  }
}

function openModal(modal) {
  console.log("open_modal");
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKey);
}

const overlays = document.querySelectorAll(".modal");
overlays.forEach((overlay) => {
  overlay.addEventListener("click", () => {
    const modal = overlay.closest(".modal");
    closeModal(modal);
  });
});

const modalContents = document.querySelectorAll(".modal__content");
modalContents.forEach((content) => {
  content.addEventListener("click", (evt) => {
    evt.stopPropagation(); // Prevents clicks inside modal from bubbling up to overlay
  });
});
