let slideTime = 7000;

const currentImage = document.getElementById('currentImage');
let refreshIntervalID = 7000;
let images = ['../images/pic.jpg'];
let currentImageNum = 0;

const addImage = image => {
    images.push(image);
}

const setSlideTime = time => {
    clearInterval(refreshIntervalID);
    slideTime = parseInt(time, 10) * 1000;
    refreshIntervalID = setInterval(slideShow, slideTime);
}

const slideShow = () => {
    currentImage.src = images[currentImageNum];
    // Loop through
    currentImageNum = ++currentImageNum % images.length;
}

const startSlideShow = () => {
    refreshIntervalID = setInterval(slideShow, slideTime);
}

startSlideShow();