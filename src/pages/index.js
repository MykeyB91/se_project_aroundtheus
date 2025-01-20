import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards, settings } from "../../utils/constants.js";

const cardListEl = document.querySelector(".cards__list");
const profileEditForm = document.querySelector("#profileEditForm");
const profileAddForm = document.querySelector("#profileAddForm");

//Form Validation
const profileEditFormValidator = new FormValidator(settings, profileEditForm);
profileEditFormValidator.enableValidation();

const profileAddFormValidator = new FormValidator(settings, profileAddForm);
profileAddFormValidator.enableValidation();

//Image Modal
const previewImagePopup = new PopupWithImage("#preview-image-modal");
const handleImageClick = (name, link) => {
  previewImagePopup.open(name, link);
};

//Handling Form Submissions
const handleProfileEditSave = (formData) => {
  console.log("Form Data:", formData);
  userInfo.setUserInfo({ name: formData.title, job: formData.description });
  profileEditPopup.close();
};

//Create Card Functon
function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.generateCard();
}

//Section
const items = [];

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => section.addItem(createCard(item)),
  },
  ".cards__list"
);
section.renderItems();

//Initializing Popups
const profileEditPopup = new PopupWithForm("#edit-modal", (formData) => {
  handleProfileEditSave(formData);
});
profileEditPopup.setEventListeners();

const profileAddPopup = new PopupWithForm("#add-modal", (formData) => {
  section.addItem(createCard({ name: formData.title, link: formData.link }));
});
profileAddPopup.setEventListeners();

//Initialize User Info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

//Event Listeners for opening Modals
document
  .querySelector("#profile__edit-button")
  .addEventListener("click", () => {
    const userInfoData = userInfo.getUserInfo();
    document.querySelector("#profile-title-input").value = userInfoData.name;
    document.querySelector("#profile-description-input").value =
      userInfoData.job;
    profileEditPopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  profileAddPopup.open();
});

//User Info
const userData = userInfo.getUserInfo();
console.log("User Data", userData);

const newUserData = {
  name: "John Doe",
  job: "Software Developer",
};
userInfo.setUserInfo(newUserData);

// Profile Edit Modal
const profileEditModal = document.querySelector("#edit-modal");
const profileEditClosedButton = profileEditModal.querySelector(
  "#edit-modal .modal__close"
);

profileEditClosedButton.addEventListener("click", () => {
  closeModal(document.querySelector("#edit-modal"));
});

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Add Card Modal
const profileAddModal = document.querySelector("#add-modal");
const profileAddClosedButton = profileAddModal.querySelector(
  "#add-modal .modal__close"
);

profileAddClosedButton.addEventListener("click", () => {
  closeModal(document.querySelector("#add-modal"));
});

// Preview Image Modal
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector(".modal__preview-image");
// const previewImageClosedButton =
//   previewImageModal.querySelector(".modal__close");
// const previewImageOverlay = previewImageModal.querySelector(".modal");
const previewImageCaption = document.querySelector(".modal__image-caption");
const modalImage = document.querySelector(".modal__preview-image");
const modalTitle = document.querySelector(".modal__image-caption");

//Image
const previewImageClosedButton = document.querySelector(".modal__close");
previewImageClosedButton.addEventListener("click", () => {
  closeModal(document.querySelector("#preview-image-modal"));
});

const previewImageOverlay = document.querySelector(".modal");
previewImageOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal_opened")) {
    closeModal("#preview-image-modal");
  }
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
