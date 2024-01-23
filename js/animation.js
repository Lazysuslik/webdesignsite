export function animation(){
const addToCartButtons = document.querySelectorAll('.addtocart');
addToCartButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
      button.classList.add('addtocarthover');
    });
  });
  
    addToCartButtons.forEach(button => {
    button.addEventListener('mouseout', () => {
      button.classList.remove('addtocarthover');
    });
  });
}