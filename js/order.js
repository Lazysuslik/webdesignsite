import { animation } from './animation.js';
var phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function (e) {
  var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});

animation();

const date = new Date();
date.setDate(date.getDate() + 1);
const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
const tomorrow = date.toLocaleString("ru", options).split('.').reverse().join('-');
document.getElementById("date").setAttribute("min", tomorrow);

const cartcounterdata = localStorage.getItem('cartcounter');
const cartcounter = document.getElementById('cart-counter');

  if (parseInt(cartcounterdata) > 0 ){
  cartcounter.textContent = cartcounterdata;
  cartcounter.style.opacity = 1
  }
  else{
  cartcounter.style.opacity = 0;
  }