let dots = document.querySelectorAll('.slider__dot');
let slides = document.querySelectorAll('.slider__slide');
let currentSlide = 1;
let countSlides = 3;
let switchingTime = 500;

for (let elem of dots) {
    elem.addEventListener('click', nextSlide);
}

function changeAll(slide) {
    dots[currentSlide-1].classList.remove('slider__dot_active');
    dots[slide-1].classList.add('slider__dot_active');

    let currentImg = slides[currentSlide-1];
    let nextImg = slides[slide-1]

    nextImg.style.opacity = 0;
    currentImg.style.opacity = 1;

    let changeOpacity = setInterval(() => {
        let unit = 1 / (switchingTime / 20);
        nextImg.style.opacity = +nextImg.style.opacity + unit;
        currentImg.style.opacity = +currentImg.style.opacity - unit;

        if (+currentImg.style.opacity <= 0) {
            clearInterval(changeOpacity)
        }
    }, 20)

    currentSlide = slide;
}

function nextSlide(e) {
    clearInterval(autoSlide);
    let slide = +e.currentTarget.getAttribute('data-slide');
    changeAll(slide);
    autoSlide = setInterval(nextSlideAuto, 5000)
}

function nextSlideAuto() {
    if (currentSlide === countSlides) {
        changeAll(1);
    } else {
        changeAll(currentSlide + 1);
    }
}

let autoSlide = setInterval(nextSlideAuto, 5000);