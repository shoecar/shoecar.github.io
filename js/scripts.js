const slideTimeout = 500;
let slideHomeTimeoutId;

function slideTo(slide) {
    $(`.${slide}`).trigger('click');
}

function revealPageContent() {
    $('.background-overlay').css('z-index', '-1');
    $('.background').css('z-index', '-2');
}

function slideToHovered(event) {
    window.clearTimeout(slideHomeTimeoutId);
    slideTo(event.currentTarget.id);
}

function slideHomeOnDelayCallback(homeSlide) {
    return function (event) {
        slideHomeTimeoutId = window.setTimeout(slideTo.bind(null, homeSlide), slideTimeout);
    }
}

function createBtnGos(orderedBtnSlideNames) {
    const $btnSlideContainer = $('.btn-slide');
    return orderedBtnSlideNames.map(function (slideName, index) {
        $btnSlideContainer.append(`<a class="${slideName} go ${index}"></a>`);
        return `.btn-slide .${index}`;
    });
}

function initalize() {
    const $carouselElement = $('.carousel');
    const slideNames = $carouselElement.find('li').toArray().map(slide => slide.dataset.slideName);
    const homeSlide = $carouselElement.find('ul')[0].dataset.homeSlide;
    const carouselHoverQuery = slideNames.map(slideName => `#${slideName}`).join(', ');
    const $carouselHoverElements = $(carouselHoverQuery);

    $carouselElement.jCarouselLite({
        speed: slideTimeout,
        visible: 1,
        vertical: true,
        mousewheel: true,
        btnNext: '.btn-slide .next',
        btnPrev: '.btn-slide .prev',
        btnGo: createBtnGos(slideNames)
    });

    $carouselHoverElements.mouseenter(slideToHovered);
    $carouselHoverElements.mouseout(slideHomeOnDelayCallback(homeSlide));

    slideTo(homeSlide);
    window.setTimeout(revealPageContent, slideTimeout);
}

$(initalize);
