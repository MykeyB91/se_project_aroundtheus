import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";

const profileEditForm = document.querySelector("#profile-edit-form");
const profileAddForm = document.querySelector("#profile-add-form");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//Form Validation
const profileEditFormValidator = new FormValidator(settings, profileEditForm);
profileEditFormValidator.enableValidation();

const profileAddFormValidator = new FormValidator(settings, profileAddForm);
profileAddFormValidator.enableValidation();

//Image Modal
const previewImagePopup = new PopupWithImage("#preview-image-modal");
previewImagePopup.setEventListeners();

const handleImageClick = (name, link) => {
  previewImagePopup.open(name, link);
};

//Initializing Popups
const profileEditPopup = new PopupWithForm("#edit-modal", (formData) => {
  handleProfileEditSave(formData);
});
profileEditPopup.setEventListeners();

const profileAddPopup = new PopupWithForm("#add-modal", (formData) => {
  section.addItem(createCard({ name: formData.title, link: formData.link }));
});
profileAddPopup.setEventListeners();

//Handling Form Submissions
const handleProfileEditSave = (formData) => {
  console.log("Form Data:", formData);
  userInfo.setUserInfo({ name: formData.title, job: formData.description });
  document.querySelector(".profile__title").textContent = formData.title;
  document.querySelector(".profile__description").textContent =
    formData.description;
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

//Initialize User Info
const userInfo = new UserInfo({
  nameSelector: "#profile-title-input",
  jobSelector: "#profile-description-input",
});

//Event Listeners for opening Modals
document.querySelector("#profile-edit-button").addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();
  profileTitleInput.value = userInfoData.name;
  profileDescriptionInput.value = userInfoData.job;
  profileEditPopup.open();
  profileEditFormValidator.disableSubmitButton();
});

document.querySelector("#profile-add-button").addEventListener("click", () => {
  profileAddPopup.open();
  profileAddFormValidator.resetValidation();
});

//User Info
const userData = userInfo.getUserInfo();
console.log("User Data", userData);

const newUserData = {
  name: "John Doe",
  job: "Software Developer",
};
userInfo.setUserInfo(newUserData);
