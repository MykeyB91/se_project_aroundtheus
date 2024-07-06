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
const profileEditForm = document.querySelector("#profileEditForm");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const profileAddModal = document.querySelector("#add-modal");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAddClosedButton = profileAddModal.querySelector(".modal__close");
const profileAddForm = document.querySelector("#profileAddForm");
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
function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openPopup(previewImageModal);
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewImageCaption.textContent = cardData.name;
    return previewImageCaption;
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.link;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
  document.getElementById("profileEditForm").reset();
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(profileAddModal);
  document.getElementById("profileAddForm").reset();
}

function handleImageClick(e) {
  e.preventDefault();
  closePopup(previewImageModal);
}

//EventListeners Below

//Edit
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditClosedButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//Add
profileAddButton.addEventListener("click", () => {
  openPopup(profileAddModal);
});

profileAddClosedButton.addEventListener("click", () => {
  closePopup(profileAddModal);
});

profileAddForm.addEventListener("submit", handleProfileAddSubmit);

//Image
//openPopup(previewImageModal);
//previewImage.addEventListener("click", () => {
//previewImageModal.classList.add("modal_opened");
//previewImageCaption.src = cardData.link;
// previewImageCaption.alt = cardData.name;
//});

previewImageClosedButton.addEventListener("click", () => {
  closePopup(previewImageModal);
});

//forEach()
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
