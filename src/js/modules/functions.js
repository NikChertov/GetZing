import {langArr} from "./lang.js";
/* Проверка поддержки webp, добавление класс webp или no-webp для HTML */
export function isWebp() {
    // Проверка поддержки webp
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function() {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    // Добавление класса _webp или _no-webp для HTML
    testWebP(function (support){
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}
// Изменение языка на сайте
export function changeLanguage() {
    const buttonUA = document.querySelector('.lang-ua');
    const buttonEN = document.querySelector('.lang-en');
    const allLang = ['ua','en'];

    buttonUA.addEventListener('click', changeURLLanguage);
    buttonEN.addEventListener('click', changeURLLanguage);
    // Изменение URL при клике на кнопку
    function changeURLLanguage(event) {
        let lang = event.target.innerText.toLowerCase();
        location.href = window.location.pathname + "#" + lang;
        location.reload();
        
    }

    let hash = window.location.hash.substring(1);
    // Проверка ввода нужного хеша языка в адресной строке
    if (!allLang.includes(hash)){
        location.href = window.location.pathname + "#en";
        location.reload();
    }
    // Добавление класса для измнения цвета кнопки
    if(hash==='en'){
        document.querySelector('.lang-en').classList.add('active');
    }
    else {
        document.querySelector('.lang-ua').classList.add('active');
    }
    // Изменение текста в соотвествии с языком
    for (let key in langArr) {
        let elem = document.querySelector('.lng-'+ key);
        if (elem) {
            elem.innerHTML = langArr[key][hash];
        }
    }
    document.querySelector('input').placeholder = langArr['form-placeholder'][hash];
}