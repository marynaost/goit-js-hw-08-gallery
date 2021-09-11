const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  { 
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  galleryOfImages: document.querySelector('ul.js-gallery'),
  modal: document.querySelector("div.js-lightbox"),
  closeButton: document.querySelector('button[data-action ="close-lightbox"]'),
  modalImage: document.querySelector('img.lightbox__image'),
  overlay: document.querySelector('div.lightbox__overlay')
}
const { galleryOfImages, modal, closeButton, modalImage, overlay } = refs;
const imagesMarkup = createGalleryItems(galleryItems)

galleryOfImages.insertAdjacentHTML('afterbegin', imagesMarkup)
galleryOfImages.addEventListener('click', onGalleryOfImagesClick)
closeButton.addEventListener('click', closeModalByButton)
overlay.addEventListener('click', closeModalByClick )

function createGalleryItems(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `
  }).join('') 
}


function onGalleryOfImagesClick(evt) {
  evt.preventDefault();
  
  if (evt.target.nodeName !== "IMG") {
    return;
  }

  showElement(modal)
  setImageAttr(evt.target.dataset.source, evt.target.alt)
  window.addEventListener('keydown', closeModalByKey)
  window.addEventListener('keydown', scrollingPictures)
}

function showElement(element) {
  element.classList.add('is-open')
}

function hideElement(element) {
  element.classList.remove('is-open');
  setImageAttr(" ", "");
  window.removeEventListener('keydown', closeModalByKey);
  window.removeEventListener('keydown', scrollingPictures)
}

function closeModalByButton() {
  hideElement(modal)
   
}

function setImageAttr(src, alt) {
  modalImage.setAttribute('src', src);
  modalImage.setAttribute('alt', alt)
  
}

function closeModalByClick(evt){
  if(evt.target.classList.contains('lightbox__overlay')){
    hideElement(modal)
  }
}


function closeModalByKey(evt) {
if(evt.code === 'Escape'){
    hideElement(modal)
  }
}

function scrollingPictures(evt){

let currentIndex = galleryItems.findIndex((image) => image.original === modalImage.src)
// console.log(currentIndex);
let nextIndex = currentIndex + 1;
let previousIndex = currentIndex - 1;

if(evt.code === "ArrowRight"){
  if(nextIndex >= galleryItems.length){
    nextIndex = 0;
  }
modalImage.src = galleryItems[nextIndex].original;
}

if(evt.code === "ArrowLeft"){
  if(previousIndex < 0){
    previousIndex = galleryItems.length - 1;
  }
  modalImage.src = galleryItems[previousIndex].original;
 }
}
