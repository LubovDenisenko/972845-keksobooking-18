  //xhr
  window.load = function(url, onSuccess, newObject) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function() {

        if (xhr.status === 200) {
            newObject = JSON.parse(xhr.responseText);
            onSuccess(newObject)
        } else {
            onError('Произошла ошибка' + xhr.statusText)
        }
    });

    xhr.addEventListener('error', function() {
        onError('Произошла ошибка сервера')
    });
    xhr.addEventListener('timeout', function() {
        onError('Слишком долго')
    });
    xhr.timeout = 1000;

    xhr.open('GET', url)
    xhr.send();
}

//ошибка
onError = function(text) {
    var errorTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');
    var newError = errorTemplate.cloneNode(true);
    var errorText = newError.querySelector('.error__message');
    errorText.innerText = text;
    var main = document.querySelector('main');
    main.after(newError);
}
