import { updateCartQuantity } from "../scripts/amazon.js";

export const cart= JSON.parse(localStorage.getItem('cart'))||[];


      // function to add to cart
    export  function addToCart(productId){
        const selectedValue=document.querySelector(`.js-select-value-${productId}`);
        const selection=Number(selectedValue.value);  
        console.log(selection)      
        let matchingItem;
          cart.forEach((cartItem)=>{
              if(productId===cartItem.productId){
                    matchingItem=cartItem;
              }
          });
          if(matchingItem){
            matchingItem.quantity+=selection;
          }else{
                cart.push({
                  productId: productId,
                  quantity: selection
                });
          }       
                console.log(cart);
                saveStorage();
               
      }
      

      //fucntion to save cart to local storage 
      export function saveStorage(){
          localStorage.setItem('cart', JSON.stringify(cart));
      }
