//функция, которая делает форму неактивной
(function(){
  var setFormStatusDisabled = function() {
  var adFormInput = document.querySelectorAll('.ad-form--disabled fieldset input');
  for (var i = 0; i < adFormInput.length; i++) {
      adFormInput[i].setAttribute('disabled', true);
  }
  var adFormSelect = document.querySelectorAll('.ad-form--disabled fieldset select');
  for (var i = 0; i < adFormSelect.length; i++) {
      adFormSelect[i].setAttribute('disabled', true);
  }
}
setFormStatusDisabled();
})();


//функция, которая делает форму активной
(function(){
  window.setFormStatusEnable = function() {
  var adFormInput = document.querySelectorAll('.ad-form--disabled fieldset input');
  for (var i = 0; i < adFormInput.length; i++) {
      adFormInput[i].removeAttribute('disabled', true);
  }
  var adFormSelect = document.querySelectorAll('.ad-form--disabled fieldset select');
  for (var i = 0; i < adFormSelect.length; i++) {
      adFormSelect[i].removeAttribute('disabled', true);
  }


 //и вписывает адрес

 var rect = document.querySelector('.ad-form__label').getBoundingClientRect();
 var mainPinX = rect.top + 65;
 var mainPinY = rect.right + 32.5;
 var addresInput = document.querySelector('#address');
 addresInput.value = mainPinX + ', ' + mainPinY; // не знаю, как правильно рассчитать координаты штыречка метки
}
 } ) ();

//функция, которая проводит валидацию
(function() {
var roomOptions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

var roomNumber = document.querySelector('#room_number');
var roomCapacity = document.querySelector('#capacity');

var capacityList = roomCapacity.querySelectorAll('option');

var calculateGuestsNumber = function (value) {
  capacityList.forEach(function (option) {
    option.disabled = true;
  });

  roomOptions[value].forEach(function (it) {
    capacityList.forEach(function (opt) {
      if (Number(opt.value) === it) {
        opt.disabled = false;
        opt.selected = true;
      }
  });
});}

calculateGuestsNumber(roomNumber.value);

roomNumber.addEventListener('change', function (event) {
  calculateGuestsNumber(event.target.value);
}) } ) ();
