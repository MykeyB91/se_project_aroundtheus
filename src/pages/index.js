import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
// import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";

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
    profileEditFormValidator.disableSubmitButton();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  profileAddPopup.open();
  profileAddFormValidator.disableSubmitButton();
});

//User Info
const userData = userInfo.getUserInfo();
console.log("User Data", userData);

const newUserData = {
  name: "John Doe",
  job: "Software Developer",
};
userInfo.setUserInfo(newUserData);
