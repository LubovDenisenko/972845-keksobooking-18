//задача 1

//задача 1
var arrayOfObjects = [];
var arrayOfTypes = ['palace', 'flat', 'house', 'bungalo']
var arrayOfTime = ['12:00', '13:00', '14:00']
var options = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var newArrayOfOptions = [];
var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var newArrayOfPhotos = [];
var newArrayOfOffers = [];

//генератор случайных чисел в пределах
function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

//аватар
var makeAvatar = function() {
    return 'img/avatars/user' + '0' + randomInteger(1, 8) + '.png'
}
//локация
var makeLocation = function() {
    return Math.floor(Math.random() * 1000) + ', ' + Math.floor(Math.random() * 1000)
}
//прайс
var makePrice = function() {
    return Math.floor(Math.random() * 1000) + ' рублей за ночь'
}
//опции

var makeOptionsArray = function() {
    for (var i = 0; i < randomInteger(1, 6); i++) {
        newArrayOfOptions.push(options[randomInteger(0, 5)])
    }
    return newArrayOfOptions
}

//фото
var makePhotosArray = function() {
    for (var i = 0; i < randomInteger(1, 3); i++) {
        newArrayOfPhotos.push(photos[randomInteger(0, 2)])
    }
    return newArrayOfPhotos
}

var makeArray = function() {
    var objectTemplate = {
        "author": {
            "avatar": makeAvatar(),
        },
        "offer": {
            "title": "Заголовок предложения",
            "address": makeLocation(),
            "price": makePrice(),
            "type": arrayOfTypes[randomInteger(0, 4)],
            "rooms": randomInteger(1, 3),
            "guests": randomInteger(1, 5),
            "checkin": arrayOfTime[randomInteger(0, 2)],
            "checkout": arrayOfTime[randomInteger(0, 2)],
            "features": makeOptionsArray(),
            "description": "Описание",
            "photos": makePhotosArray(),
        },

        "location": {
            "x": randomInteger(130, 630),
            "y": randomInteger(130, 630),
        }
    }

    return objectTemplate
}

var makeOffersArray = function() {
    for (var i = 0; i < 8; i++) {
        newArrayOfOffers.push(makeArray())
    }
    return newArrayOfOffers
};
makeOffersArray()



//задача 2

var elem = document.querySelector('.map--faded');
elem.classList.remove('map--faded');

//задача 3

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
