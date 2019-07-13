$('.carousel').jCarouselLite({
    speed: 500,
    visible: 1,
    vertical: true,
    mousewheel: true,
    btnNext: '.btn-slide .next',
    btnPrev: '.btn-slide .prev',
    btnGo: ['.btn-slide .1', '.btn-slide .2', '.btn-slide .3', '.btn-slide .4', '.btn-slide .5']
});

$(function () {
  $('.me3').trigger('click');
  window.setTimeout(function () {
    $('.bg').css('z-index', '-2');
  }, 500);

  var backToMainImg;
  $('#pictur, #avalanche, #chess').mouseenter(function (event) {
    window.clearTimeout(backToMainImg);
    $('.' + event.currentTarget.id).trigger('click');
  });

  $('#pictur, #avalanche, #chess').mouseout(function (event) {
    backToMainImg = window.setTimeout(function () {
      $('.me3').trigger('click');
    }, 500);
  });
});
