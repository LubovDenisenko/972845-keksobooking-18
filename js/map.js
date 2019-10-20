//функция, которая переводит карту в активное состояние
(function(){
window.makePageActive = function() {
  //отрисовка похожих меток
  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var pinImg = document.querySelector('#pin')
      .content
      .querySelector('img');

  var similarPins = document.querySelector('.map');

  for (var i = 0; i < 8; i++) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = window.newArrayOfOffers[i].location.x - 20 + 'px';
      pinElement.style.top = window.newArrayOfOffers[i].location.y - 40 + 'px';
      pinImg.src = window.newArrayOfOffers[i].author.avatar;
      pinImg.alt = 'заголовок объявления';

      similarPins.appendChild(pinElement);
  }
}
} ) ();
//регистратор событий, который переводит функцию в активное состояние
(function() {
var mapPinMain = document.querySelector('.map__pin--main');
window.mapPinMain = mapPinMain;
window.mapPinMain.addEventListener('mousedown', function() {
  window.setFormStatusEnable();
  var elem = document.querySelector('.map--faded');
  elem.classList.remove('map--faded');
  var advertismentForm = document.querySelector('.ad-form--disabled')
  advertismentForm.classList.remove('ad-form--disabled');
  window.makePageActive();
})
}) ();

(function(){
  window.mapPinMain.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 13) {
    window.setFormStatusEnable();
      var elem = document.querySelector('.map--faded');
      elem.classList.remove('map--faded');
      var advertismentForm = document.querySelector('.ad-form--disabled')
      advertismentForm.classList.remove('ad-form--disabled');
      window.makePageActive()
  }
})
}) ();
