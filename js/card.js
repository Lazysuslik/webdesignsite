// Получаем id товара на который нажали в каталоге
let gettingnumber = localStorage.getItem('number');

const productsContainer = document.querySelector('#product');
import { animation } from './animation.js';

// Асинхронная функция получения данных из файла products.json
async function getProducts() {
  // Получаем данные из products.json
  const response = await fetch('./js/products.json');
  // Парсим данные из JSON формата в JS
  const productsArray = await response.json();
  // Запускаем ф-ю рендера (отображения товаров)
  renderProducts(productsArray);
}

function renderProducts(productsArray) {
  const item = productsArray[gettingnumber-1];
    const productHTML = `      
    <div class="item-container" data-id="${item.id}">
      <img src="img/${item.imgSrc}" alt="" data-id="${item.id}">
      <div class="big-container">
        <div style="height:5%">
          <h2 style="margin-top:-18px; margin-bottom:0">${item.name}</h2>
          <p style="margin-top:0">${item.description}</p>
        </div>
        <h4>${item.price}</h4>
        <div class="name1">
          <p>${item.fulldescription}</p>
          <button class="addtocart" data-id="${item.id}"> Добавить в корзину </button>
        </div>
      </div>
    </div>`;
      
      productsContainer.insertAdjacentHTML('beforeend', productHTML);

      const cartcounter = document.getElementById('cart-counter');
      const cartcounterdata = localStorage.getItem('cartcounter');
      
      if (parseInt(cartcounterdata) > 0){
      cartcounter.textContent = cartcounterdata;
      cartcounter.style.opacity = 1;
      }
      else{
      cartcounter.style.opacity = 0;
      }



      // Взаимодействие с кнопками
  const addToCartButtons = document.querySelectorAll('.addtocart');
  let idlist = JSON.parse(localStorage.getItem('idlist')) || [];
  addToCartButtons.forEach(button => {
  const buttonid = button.getAttribute('data-id');

  // Устанавливаем начальное состояние кнопок на основе данных из localStorage
  if (idlist.includes(buttonid)) {
    button.classList.add('addtocartfocus');
  } else {
    button.classList.add('addtocart');
  }
  
  button.addEventListener('click', () => {
    if (button.classList.contains('addtocartfocus')) {
      button.classList.remove('addtocartfocus');
      button.classList.add('addtocart');

      // Удаление из корзины
      const filteredNumbers = idlist.filter(item => item !== buttonid);
      idlist = filteredNumbers;
      localStorage.setItem('idlist', JSON.stringify(idlist));
      
      cartcounter.textContent = parseInt(cartcounter.textContent) - 1;
      if (cartcounter.textContent < 1){
        cartcounter.style.opacity = 0;
      }
      localStorage.setItem('cartcounter',cartcounter.textContent );
    } else {
      button.classList.add('addtocartfocus');
      button.classList.remove('addtocart');

      // Добавление в корзину
      idlist.push(buttonid);
      localStorage.setItem('idlist', JSON.stringify(idlist));
    
      cartcounter.textContent = parseInt(cartcounter.textContent) + 1;
      localStorage.setItem('cartcounter',cartcounter.textContent );

      if (cartcounter.textContent >= 1){
        cartcounter.style.opacity = 1;
      }
    }
  });
});
 animation();
};

getProducts();

