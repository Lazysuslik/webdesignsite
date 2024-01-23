const userDataString = localStorage.getItem('idlist');
let gettotalprice = localStorage.getItem('totalprice');
let total = document.getElementById('price')
total.innerText = gettotalprice;
import { animation } from './animation.js';
const cartcounterdata = localStorage.getItem('cartcounter');
const cartcounter = document.getElementById('cart-counter');

  if (parseInt(cartcounterdata) > 0 ){
  cartcounter.textContent = cartcounterdata;
  cartcounter.style.opacity = 1
  }
  else{
  cartcounter.style.opacity = 0;
  }

// Преобразование JSON-строки обратно в объект
const userData = JSON.parse(userDataString);

// Использование данных
console.log(userData);

const productsContainer = document.querySelector('#products-container');

// Асинхронная функция получения данных из файла products.json
async function getProducts() {
  // Получаем данные из products.json
  const response = await fetch('./js/products.json');
  // Парсим данные из JSON формата в JS
  const productsArray = await response.json();
  // Запускаем ф-ю рендера (отображения товаров)
  renderProducts(productsArray);
}

let totalprice = 0;
function renderProducts(productsArray) {
    
    for (let index=0; index<userData.length;index++){
        const item = productsArray[userData[index]-1];

        const productHTML = `     
          <div class="item-container" data-id="${item.id}">
          <button class="imagine" onClick="location.href='itemcard.html'"><img src="img/${item.imgSrc}" alt="" data-id="${item.id}"></button>
            <div class="name">
                  <h3>${item.name}</h3>
                  <p id="counter"style="margin-top: -10%"> Кол-во ${localStorage.getItem(`counter_${item.id}`) || 1}</p>
            </div>
            <h3>${localStorage.getItem(`price_${item.id}`)|| item.price}</h3>
          
          </div>`;
        
      productsContainer.insertAdjacentHTML('beforeend', productHTML);
    
    }; 
};  

getProducts();
animation();

var cardnumberInput = document.getElementById('card-number');
cardnumberInput.addEventListener('input', function (e) {
  var x = e.target.value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
  e.target.value =!x[2] ? x[1] :!x[3] ? x[1] + ' ' + x[2] :!x[4] ? x[1] + ' ' + x[2] + ' ' + x[3] :x[1] + ' ' + x[2] + ' ' + x[3] + ' ' + x[4];
});

var cvvInput = document.getElementById('cvv');
cvvInput.addEventListener('input', function (e) {
  var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})/);
  e.target.value =x[1];
});

var dateInput = document.getElementById('date');
dateInput.addEventListener('input', function (e) {
  var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})/);
  e.target.value =!x[2] ? x[1] : x[1] + '/' + x[2];
});

let NameInput = document.getElementById('name')

document.addEventListener('DOMContentLoaded', function () {
  
  const submitButton = document.getElementById('button');

  // Функция для проверки заполненности полей
  function checkFields() {
    const isField1Filled = cardnumberInput.value.trim() !== '';
    const isField2Filled = dateInput.value.trim() !== '';
    const isField3Filled = cvvInput.value.trim() !== '';
    const isField4Filled = NameInput.value.trim() !== '';

    // Используем условный оператор if для определения, заполнено ли поле
    if (isField1Filled & isField2Filled & isField3Filled & isField4Filled) {
        // Если поле заполнено, активируем кнопку
        submitButton.disabled = false;
    } else {
        // Если поле не заполнено, деактивируем кнопку
        submitButton.disabled = true;
    }
}

  // Слушаем изменения в полях ввода
  cardnumberInput.addEventListener('input', checkFields);
  dateInput.addEventListener('input', checkFields);
  cvvInput.addEventListener('input', checkFields);
  NameInput.addEventListener('input', checkFields);
});