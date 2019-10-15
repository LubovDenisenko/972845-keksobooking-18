//функция, которая делает форму неактивной
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

//функция, которая делает форму активной
var setFormStatusEnable = function() {
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

//функция, которая переводит всю страницу в активное состояние
var makePageActive = function() {

  var OFFERS_COUNT = 8;
  var MIN_X = 0;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var arrayOfTypes = ['palace', 'flat', 'house', 'bungalo']
  var arrayOfTime = ['12:00', '13:00', '14:00']
  var options = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  var newArrayOfOffers = []

  //генератор случайных чисел в пределах
  var randomInteger = function(min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
  }

  //рандомный массив
  var makeRandomArray = function(arr) {
      var newArr = [];
      var length = randomInteger(1, arr.length);
      for (var i = 0; i < length; i++) {
          newArr.push(arr[i])
      }
      return newArr;
  };

  //локация
  var makeLocation = function() {
      return Math.floor(Math.random() * 1000) + ', ' + Math.floor(Math.random() * 1000)
  }
  //прайс
  var makePrice = function() {
      return Math.floor(Math.random() * 1000) + ' рублей за ночь'
  }

  var makeOffersArray = function() {
      for (var i = 0; i < OFFERS_COUNT; i++) {
          var tempX = randomInteger(MIN_X, MAX_X);
          var tempY = randomInteger(MIN_Y, MAX_Y);

          newArrayOfOffers.push({
              "author": {
                  "avatar": 'img/avatars/user0' + (i + 1) + '.png',
              },
              "offer": {
                  "title": "Заголовок предложения",
                  "address": tempX + ', ' + tempY,
                  "price": makePrice(),
                  "type": arrayOfTypes[randomInteger(0, 4)],
                  "rooms": randomInteger(1, 3),
                  "guests": randomInteger(1, 5),
                  "checkin": arrayOfTime[randomInteger(0, 2)],
                  "checkout": arrayOfTime[randomInteger(0, 2)],
                  "features": makeRandomArray(options),
                  "description": "Описание",
                  "photos": makeRandomArray(photos),
              },

              "location": {
                  "x": tempX,
                  "y": tempY,
              }
          });
      }
      return newArrayOfOffers
  };
  makeOffersArray()

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
      pinElement.style.left = newArrayOfOffers[i].location.x - 20 + 'px';
      pinElement.style.top = newArrayOfOffers[i].location.y - 40 + 'px';
      pinImg.src = newArrayOfOffers[i].author.avatar;
      pinImg.alt = 'заголовок объявления';

      similarPins.appendChild(pinElement);
  }
}



//регистратор событий, который переводит функцию в активное состояние


var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mousedown', function() {
  setFormStatusEnable();
  var elem = document.querySelector('.map--faded');
  elem.classList.remove('map--faded');
  var advertismentForm = document.querySelector('.ad-form--disabled')
  advertismentForm.classList.remove('ad-form--disabled');
  makePageActive();
});

mapPinMain.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 13) {
      setFormStatusEnable();
      var elem = document.querySelector('.map--faded');
      elem.classList.remove('map--faded');
      var advertismentForm = document.querySelector('.ad-form--disabled')
      advertismentForm.classList.remove('ad-form--disabled');
      makePageActive()
  }
});

//валидация

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
})
