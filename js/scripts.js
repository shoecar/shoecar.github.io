const slideTimeout = 500;
const homeSlide = 'me';
const slides = ['extole', 'flexport', 'me', 'pictur', 'avalanche', 'chess'];
const carouselHoverQuery = slides.map(slide => `#${slide}`).join(', ');

let slideHomeTimeout;

function triggerSlide(slide) {
    $(`.${slide || homeSlide}`).trigger('click');
}

function revealPageContent() {
    $('.background-overlay').css('z-index', '-1');
    $('.background').css('z-index', '-2');
}

function slideHome(event) {
    slideHomeTimeout = window.setTimeout(triggerSlide, slideTimeout);
}

function slideToHovered(event) {
    window.clearTimeout(slideHomeTimeout);
    triggerSlide(event.currentTarget.id);
}

function createBtnGos(orderedBtnSlides) {
    const $btnSlideContainer = $('.btn-slide');
    return orderedBtnSlides.map(function (slide, index) {
        $btnSlideContainer.append(`<a class="${slide} go ${index}"></a>`);
        return `.btn-slide .${index}`;
    });
}

function initalize() {
    const $carouselElement = $('.carousel');
    const $carouselHoverElements = $(carouselHoverQuery);

    $carouselElement.jCarouselLite({
        speed: slideTimeout,
        visible: 1,
        vertical: true,
        mousewheel: true,
        btnNext: '.btn-slide .next',
        btnPrev: '.btn-slide .prev',
        btnGo: createBtnGos(slides)
    });

    $carouselHoverElements.mouseenter(slideToHovered);
    $carouselHoverElements.mouseout(slideHome);

    triggerSlide(homeSlide);
    window.setTimeout(revealPageContent, slideTimeout);
}

$(initalize);
