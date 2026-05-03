export let cart = JSON.parse(localStorage.getItem('cart'))||[{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
},
{
   productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}];


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
      

      //function to save cart to local storage 
      export function saveStorage(){
          localStorage.setItem('cart', JSON.stringify(cart));
      }

     export function updateQuantity(productId, inputValue){
            if(!inputValue||inputValue===''||inputValue<=0){
              alert('please enter a valid figure');
            }else{
               cart.forEach((cartItem)=>{
                if(cartItem.productId===productId){
                  cartItem.quantity+=inputValue;
                }
            });
            }
            saveStorage();
      }

      export function removeFromCart(productId){
          const newCart= cart.filter((cartItem)=>{
              if(cartItem.productId!==productId){
                 return cartItem;
              }
             
          });
           cart=newCart;
         console.log(cart);
         saveStorage();
      }
    
    
     