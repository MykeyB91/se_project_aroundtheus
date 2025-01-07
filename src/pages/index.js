import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

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

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const cardListEl = document.querySelector(".cards__list");

const profileEditForm = document.querySelector("#profileEditForm");
const profileEditFormValidator = new FormValidator(settings, profileEditForm);
profileEditFormValidator.enableValidation();

const profileAddForm = document.querySelector("#profileAddForm");
const profileAddFormValidator = new FormValidator(settings, profileAddForm);
profileAddFormValidator.enableValidation();

function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.generateCard();
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
});

function handleImageClick(name, link) {
  modalImage.alt = name;
  modalImage.src = link;
  modalTitle.textContent = name;

  openModal(previewImageModal);
}

const items = [{ name: "Item 1" }, { name: "Item 2" }, { name: "Item 3" }];

const section = new Section(
  {
    items,
    renderer: (item) => {
      const card = createCard(item);
      section.addItem(card);
    },
  },
  ".cards-container"
);

section.renderItems();

const formPopup1 = new PopupWithForm(".popup_type_form1", (formData) => {
  console.log("Form 1 submitted with data:", formData);
});
formPopup1.setEventListeners();

const formPopup2 = new PopupWithForm(".popup_type_form2", (formData) => {
  console.log("Form 2 submitted with data:", formData);
});
formPopup2.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

const userData = UserInfo.getUserInfo();
console.log("User Data", userData);

const newUserData = {
  name: "John Doe",
  job: "Software Developer",
};
userInfo.setUserInfo(newUserData);

const profileForm = document.querySelector(".profile-form");
profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.querySelector(".profile-form__input_type_name");
  const jobInput = document.querySelector(".profile-form__input_type_job");
  const updateData = {
    name: nameInput.value,
    job: jobInput.value,
  };
  userInfo.setuserInfo(updateData);
});

// Profile Edit Modal
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileEditClosedButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Add Card Modal
const profileAddModal = document.querySelector("#add-modal");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAddClosedButton = profileAddModal.querySelector(".modal__close");

// Preview Image Modal
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector(".modal__preview-image");
const previewImageClosedButton =
  previewImageModal.querySelector(".modal__close");
const previewImageCaption = document.querySelector(".modal__image-caption");
const modalImage = document.querySelector(".modal__preview-image");
const modalTitle = document.querySelector(".modal__image-caption");

//Form Data
const nameInput = profileEditForm.querySelector("modal__input_type_name");
const jobInput = profileEditForm.querySelector("modal__input_type_description");
const cardTitleInput = profileAddForm.querySelector(".modal__input_type_title");
const cardUrlInput = profileAddForm.querySelector(".modal__input_type_link");

// Form Submission
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

  const cardElement = createCard({ name, link });
  cardListEl.prepend(cardElement);

  closeModal(profileAddModal);
  profileAddForm.reset();
  profileAddFormValidator.disableSubmitButton();
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
