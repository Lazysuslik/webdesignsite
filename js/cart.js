const userDataString = localStorage.getItem('idlist');
const cartcounterdata = localStorage.getItem('cartcounter');
const cartcounter = document.getElementById('cart-counter');
import { animation } from './animation.js';

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
let submitButton = document.getElementById('button');
let totalprice = 0;
function renderProducts(productsArray) {
  if (userData === null) {
      const emptycart = document.getElementById('empty-cart');
      emptycart.style.display = 'inline';
      submitButton.disabled = true;
  }
    else{
    submitButton.disabled = false;
    for (let index=0; index<userData.length;index++){
        const item = productsArray[userData[index]-1];

        const productHTML = `     
          <div class="item-container" style="margin-bottom:10px" data-id="${item.id}">
          <button class="imagine" onClick="location.href='itemcard.html'"><img src="img/${item.imgSrc}" alt="" data-id="${item.id}"></button>
            
            <div class="counter-and-price" style="width:80%">
              <div class="name" style="width:35%">
                <h3 style="margin:0">${item.name}</h3>
                <p style="margin:0">${item.description}</p>
              </div>

              <div class="counter-and-price" style="width:40%">
                <div class="counter-wrapper">
                  <button class="items-control" style="margin-top: -10px" data-action="minus">–</button>
                  <div class="items-current" data-counter data-id="${item.id}">${localStorage.getItem(`counter_${item.id}`) || 1}</div>
                  <button class="items-control" data-action="plus">+</button>
                </div>
                
                <p id="start-price" start-price>${item.price}</p>
                <h3 id="price-counter" price-counter data-id="${item.id}">${localStorage.getItem(`price_${item.id}`) || item.price }</h3>
                <button class="items-control" data-action="delete">&#215;</button>
              </div>
            </div>
          
          </div>`;
          
      productsContainer.insertAdjacentHTML('beforeend', productHTML);

    //   Подсчет общей стоимости корзины
    const priceValue = localStorage.getItem(`price_${item.id}`) || item.price;
    
    totalprice = totalprice + parseInt(priceValue)
    localStorage.setItem('totalprice', totalprice);
    price.textContent = totalprice

  }
  };
    // Находим все фотографии товаров
  const productImages = document.querySelectorAll('#products-container img');

  // Обработчик события клика на каждую фотографию товара
  productImages.forEach(photo => {
    photo.addEventListener('click', () => {
      const productId = photo.getAttribute('data-id'); // Получаем id товара
      let cardid = productId;
	    localStorage.setItem('number', cardid);
    });
  });

};  

getProducts();
animation();