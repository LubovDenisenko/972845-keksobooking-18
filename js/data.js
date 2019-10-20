
  (function() {

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
  window.newArrayOfOffers = newArrayOfOffers;

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

  window.makeOffersArray = function() {
      for (var i = 0; i < OFFERS_COUNT; i++) {
          var tempX = randomInteger(MIN_X, MAX_X);
          var tempY = randomInteger(MIN_Y, MAX_Y);

          window.newArrayOfOffers.push({
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
      return window.newArrayOfOffers
  };
  window.makeOffersArray()
  } ) ();
