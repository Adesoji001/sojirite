import { products } from "../data/products.js";
import {cart, saveStorage, updateQuantity, removeFromCart} from '../data/cart.js';


function renderCheckout(){
  let displayHtml='';
  let displayOrderSummary=document.querySelector('.js-order-summary');
  cart.forEach((cartItem)=>{
            let matchingId;
    products.forEach((product)=>{
            if(product.id===cartItem.productId){
                  matchingId=product;
            }
    }); 

            const html= `
            <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingId.image}>

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingId.name}
                </div>
                <div class="product-price">
                  $${(matchingId.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-button" data-product-id="${cartItem.productId}">
                    Update
                  </span>
                  <span>
                      <input type="text" class="update-quantity js-update-quantity js-update-quantity-${cartItem.productId}" data-product-id="${cartItem.productId}" >  
                      <span class="save-button link-primary js-save-button" data-product-id="${cartItem.productId}">
                          save                      
                      </span>                
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-button" data-product-id="${cartItem.productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-1-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            `;
            displayHtml+=html;
  }); 
  displayOrderSummary.innerHTML=displayHtml;
   updateCheckoutQuantity();
  updateElement();


 
}
renderCheckout();

//add an event listener to all update button
function updateElement(){
const updateBtn=document.querySelectorAll('.js-update-button');
updateBtn.forEach((updateButton)=>{
  updateButton.addEventListener('click', ()=>{
      const productId=updateButton.dataset.productId;
      const itemContainer=document.querySelector(`.js-cart-item-container-${productId}`);
       itemContainer.classList.add('is-editing');       

  });
});
}
//updateElement();

//this is the function that work for save quantity
const saveButton=document.querySelectorAll('.js-save-button');
      saveButton.forEach((saveBtn)=>{
            saveBtn.addEventListener('click', ()=>{
            const productId=saveBtn.dataset.productId;
            const input=document.querySelector(`.js-update-quantity-${productId}`);
            const inputValue=Number(input.value);
                updateQuantity(productId, inputValue);
             const itemContainer=document.querySelector(`.js-cart-item-container-${productId}`);
             itemContainer.classList.remove('is-editing');
             input.value='';
            renderCheckout();
       

              
            });
      });

 
//this is the function that work for input quantity
      const input=document.querySelectorAll('.js-update-quantity');
      input.forEach((inputValue)=>{
          inputValue.addEventListener('keydown',(event)=>{
              const productId=inputValue.dataset.productId; 
              if(event.key==='Enter'){                      
            const input=document.querySelector(`.js-update-quantity-${productId}`);
            const inputValue=Number(input.value);
                updateQuantity(productId, inputValue);
             const itemContainer=document.querySelector(`.js-cart-item-container-${productId}`);
             itemContainer.classList.remove('is-editing');
             input.value='';
             
                renderCheckout();
              }
             
          })
      });
     
        
//function that work for updatecheckout header quantity

 function updateCheckoutQuantity(){
  const checkOutHeader=document.querySelector('.js-checkout-header');
    let checkOutQuantity=0;
   cart.forEach((cartItem)=>{ 
        checkOutQuantity+=cartItem.quantity;   
   });
  
   checkOutHeader.innerHTML=`
          Checkout (<a class="return-to-home-link"
            href="amazon.html">${checkOutQuantity} items</a>)            
          `;
          
         return checkOutQuantity;
 
 }

 // delete button function

 const deleteButton=document.querySelectorAll('.js-delete-button');
deleteButton.forEach((deleteBtn)=>{
    deleteBtn.addEventListener('click', ()=>{
      const productId=deleteBtn.dataset.productId;
      removeFromCart(productId)
      const container=document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove(productId);
      //renderCheckout();
    });
});

// order summary in the checkout

function renderOrderSummary(){
  let orderSummaryHtml='';
  let orderSummary=document.querySelector('.js-payment-summary');
  let matchingItem;
  let totalPrice=0;
  let totalQuantity=0;
  let totalItems=0;
  cart.forEach((cartItem)=>{
    totalQuantity+=cartItem.quantity;
     
        products.forEach((product)=>{
          matchingItem=product;
         
        });       
            totalPrice=cartItem.quantity*matchingItem.priceCents     

            const html= `
           <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${updateCheckoutQuantity()}):</div>
            <div class="payment-summary-money">$${(totalPrice/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$4.99</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;
      orderSummaryHtml=html;
  });
    orderSummary.innerHTML=orderSummaryHtml;
 
}

renderOrderSummary();