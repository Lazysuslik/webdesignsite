// Добавляем прослушку на всем окне
total = document.getElementById('price')

window.addEventListener('click', function (event) {

    // Объявляем переменную для счетчика
    let counter;

    // Проверяем клик строго по кнопкам Плюс либо Минус
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
		// Находим обертку счетчика
		const counterWrapper = event.target.closest('.counter-wrapper');
		// Находим див с числом счетчика
        counter = counterWrapper.querySelector('[data-counter]');
		const itemcontainer = event.target.closest('.item-container');
		price = itemcontainer.querySelector('[price-counter]');
		startprice = itemcontainer.querySelector('[start-price]');	
	}

	// Проверяем является ли элемент по которому был совершен клик кнопкой Плюс
	if (event.target.dataset.action === 'plus') {
		const itemId = counter.dataset.id;
		counter.innerText = ++counter.innerText;
		localStorage.setItem(`counter_${itemId}`, counter.innerText);

		price.innerText = parseInt(price.innerText) + parseInt(startprice.innerText);
		localStorage.setItem(`price_${itemId}`, price.innerText);
		
		total.innerText = parseInt(startprice.innerText) + parseInt(total.innerText);
		localStorage.setItem('totalprice', total.innerText);
		console.log(localStorage.getItem('totalprice', total.innerText))

		const cartcounterdata = localStorage.getItem('cartcounter');
		updatecounter = parseInt(cartcounterdata) + 1;
		localStorage.setItem('cartcounter', updatecounter);

		const cartcounter = document.getElementById('cart-counter');
  
  		if (parseInt(updatecounter) > 0){
  		cartcounter.textContent = updatecounter;
  		cartcounter.style.display = 'inline'
  		}
  		else{
  		cartcounter.style.display = 'none';
  		}
	}

	// Проверяем является ли элемент по которому был совершен клик кнопкой Минус
	if (event.target.dataset.action === 'minus') {

		// Проверяем чтобы счетчик был больше 1
		if (parseInt(counter.innerText) > 1) {
			const itemId = counter.dataset.id;
			counter.innerText = --counter.innerText;
			localStorage.setItem(`counter_${itemId}`, counter.innerText);
			
			price.innerText = parseInt(price.innerText) - parseInt(startprice.innerText);
			localStorage.setItem(`price_${itemId}`, price.innerText);

			total.innerText = parseInt(total.innerText) - parseInt(startprice.innerText);
			localStorage.setItem('totalprice', total.innerText);

			const cartcounterdata = localStorage.getItem('cartcounter');
			updatecounter = parseInt(cartcounterdata) - 1;
			localStorage.setItem('cartcounter', updatecounter);

			const cartcounter = document.getElementById('cart-counter');
  
  			if (parseInt(updatecounter) > 0){
  			cartcounter.textContent = updatecounter;
  			cartcounter.style.display = 'inline'
  			}
  			else{
  			cartcounter.style.display = 'none';
  			}
		}
	}

	if (event.target.dataset.action === 'delete') {

		if (event.target.dataset.action === 'delete') {
			const itemContainer = event.target.closest('.item-container');

			const count = itemContainer.querySelector('[data-counter]');
			const itemcountId = count.dataset.id;
			localStorage.removeItem(`counter_${itemcountId}`);
			localStorage.removeItem(`price_${itemcountId}`);
			
			const cartcounterdata = localStorage.getItem('cartcounter');
			updatecounter = cartcounterdata - parseInt(count.innerText);
			localStorage.setItem('cartcounter', updatecounter);
			
			const itemId = itemContainer.dataset.id;
			const userDataString = localStorage.getItem('idlist');
			const userData = JSON.parse(userDataString);
            
			total.innerText = parseInt(total.innerText) - parseInt(price.innerText);
			localStorage.setItem('totalprice', total.innerText);

			// // Фильтруем массив, оставляя только те id, которые не совпадают с удаляемым
			const updatedUserData = userData.filter(id => id !== itemId);
		
			// // Сохраняем обновленный массив обратно в localStorage
			localStorage.setItem('idlist', JSON.stringify(updatedUserData));
			location.reload();
		}
	}
})