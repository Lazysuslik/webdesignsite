const productsContainer = document.querySelector('#products-container');
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
  productsArray.forEach(function (item) {
    
    const productHTML = `   
        <div class="item-container" data-id="${item.id}">
          <button class="imagine" onClick="location.href='itemcard.html'"><img src="img/${item.imgSrc}" alt="" data-id="${item.id}"></button>
            
            <div class="details">
                <h3>${item.name}</h3>
                <h3>${item.price}</h3>
            </div>
            
            <p style="margin-top:0">${item.description}</p>
            <button class="addtocart" style="width:75%"data-id="${item.id}">Добавить в корзину</button>
      </div>`;

    productsContainer.insertAdjacentHTML('beforeend', productHTML);
  })

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

  const cartcounter = document.getElementById('cart-counter');
  const cartcounterdata = localStorage.getItem('cartcounter');
  
  if (parseInt(cartcounterdata) > 0){
  cartcounter.textContent = cartcounterdata;
  cartcounter.style.opacity = 1
  }
  else{
  cartcounter.style.opacity = 0;
  }
  //сохранить состояние кнопки после перезагрузки
  let idlist = JSON.parse(localStorage.getItem('idlist')) || [];

  const addToCartButtons = document.querySelectorAll('.addtocart');

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
}
getProducts();