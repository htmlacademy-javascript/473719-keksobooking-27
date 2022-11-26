const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const IMAGE_WIDTH = 70;
const IMAGE_HEIGHT = 70;

const avatarChooser = document.querySelector('.ad-form-header__input');
const photoChooser = document.querySelector('.ad-form__input');
const avatarPreview = document.querySelector('.ad-form-header__avatar');
const photoPreview = document.querySelector('.ad-form__photo');


const initializeImagePreview = () => {
  const imageForPreview = document.createElement('img');

  photoPreview.append(imageForPreview);
  imageForPreview.width = IMAGE_WIDTH;
  imageForPreview.height = IMAGE_HEIGHT;
  imageForPreview.classList.add('ad-form__photo-image');
  return imageForPreview;
};

const changeImage = (input, output) => {
  input.addEventListener('change', () => {
    const preview = output;
    const file = input.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
};

const resetImage = () => {
  photoPreview.innerHTML = '';
  changeImage(photoChooser, initializeImagePreview());
};

const resetAvatar = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
};

changeImage(avatarChooser, avatarPreview);
changeImage(photoChooser, initializeImagePreview());

export {
  resetImage,
  resetAvatar
};
