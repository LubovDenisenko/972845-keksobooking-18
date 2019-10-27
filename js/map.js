var URL = 'https://js.dump.academy/keksobooking/data';
var ObjectOfFlats;
var mapPinMain = document.querySelector('.map__pin--main');

//функция, которая переводит карту в активное состояние
(function() {
    makePageActive = function() {
        //отрисовка похожих меток
        var pinTemplate = document.querySelector('#pin')
            .content
            .querySelector('.map__pin');

        var pinImg = document.querySelector('#pin')
            .content
            .querySelector('img');

        var newMap = document.querySelector('.map');

        // отрисовка меток
        var onSuccess = function(newObject) {
            for (var i = 0; i < 8; i++) {
                var pinElement = pinTemplate.cloneNode(true);
                pinElement.style.left = newObject[i].location.x - 20 + 'px';
                pinElement.style.top = newObject[i].location.y - 40 + 'px';
                pinImg.src = newObject[i].author.avatar;
                pinImg.alt = 'заголовок объявления';

                newMap.appendChild(pinElement);
            };
        };

        window.load(URL, onSuccess, ObjectOfFlats);
    }
})();

//регистратор событий, который переводит функцию в активное состояние
(function() {
    mapPinMain = mapPinMain;
    mapPinMain.addEventListener('mousedown', function() {
        window.setFormStatusEnable();
        var elem = document.querySelector('.map--faded');
        elem.classList.remove('map--faded');
        var advertismentForm = document.querySelector('.ad-form--disabled')
        advertismentForm.classList.remove('ad-form--disabled');
        makePageActive();
    })
})();

(function() {
    mapPinMain.addEventListener('keydown', function(evt) {
        if (evt.keyCode === 13) {
            window.setFormStatusEnable();
            var elem = document.querySelector('.map--faded');
            elem.classList.remove('map--faded');
            var advertismentForm = document.querySelector('.ad-form--disabled')
            advertismentForm.classList.remove('ad-form--disabled');
            makePageActive()
        }
    })
})();
