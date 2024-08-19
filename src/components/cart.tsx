import React, { useEffect, useState } from 'react';
import Card from './card.astro'

const items = [
    {
        name: "Pencil",
        price: 10,
        index: 1,
    },
    {
        name: "Eraser",
        price: 5,
        index: 2,
    }
]
const cart = [
    {
        name: "Pencil",
        price: 10,
        index: 1,
    }
]
var total = 0;


const Cart: React.FC = () => {
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        
        // Perform side effect: attach event listeners to buttons
        const addToCartButtons = document.getElementsByClassName('add-button');
    
        for (let i = 0; i < addToCartButtons.length; i++) {
          const button = addToCartButtons[i] as HTMLElement;
    
          button.addEventListener('click', function(event){
            var buttonClicked = event.target;
            
            updateCartTotal()
          });
        }
        
        // Cleanup function to remove event listeners
        return () => {
          for (let i = 0; i < addToCartButtons.length; i++) {
            const button = addToCartButtons[i] as HTMLElement;
            button.removeEventListener('click', () => {
            });
          }
        };
      }, []);
      useEffect(() => {
        // Attach event listeners to all quantity inputs
        const quantityInputs = document.getElementsByClassName('cart-quantity');
    
        const handleInputChange = () => {
          updateCartTotal();
        };
    
        for (let i = 0; i < quantityInputs.length; i++) {
          const input = quantityInputs[i] as HTMLInputElement;
          input.addEventListener('change', handleInputChange);
        }
    
        // Run updateCartTotal initially to set the initial total
        updateCartTotal();
    
        // Cleanup function to remove event listeners
        return () => {
          for (let i = 0; i < quantityInputs.length; i++) {
            const input = quantityInputs[i] as HTMLInputElement;
            input.removeEventListener('change', handleInputChange);
          }
        };
      }, []);
      function updateCartTotal() {
        let newTotal = 0;
        var cartContainer = document.getElementsByClassName('cart-items');
        var cartRows = document.getElementsByClassName('cart-row');
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i];
            var priceElement = cartRow.getElementsByClassName('cart-price')[0];
            var quantityElement = cartRow.querySelector(
                '.cart-quantity'
              ) as HTMLInputElement;
            var price = 0;
            var quantity = 0;
            if (priceElement && priceElement.textContent) {
                price = parseFloat(priceElement.textContent.replace('$', ''));
            }
            if (quantityElement) {
                quantity = quantityElement.valueAsNumber || 0; // Use valueAsNumber for numeric inputs
              }
            newTotal += (price * quantity)
        }
        setTotal(newTotal);

    }

  return(
    <div className="flex ml-5">
        <ul className="mt-5 flex justify-center gap-10 flex-wrap">
        {
            items.map((item) => (
                <div key={item.index} className="bg-slate-300 border-8 border-black" data-index={item.index} data-name={item.name} data-price={item.price}>
                    <h2 className="m-2 text-lg font-semibold">{item.name}</h2>
                    <p className="m-2">${item.price}</p>
                    <a href='/store/'className="m-2 p-.5">View Item</a>
                    <div className="select-none add-button m-6 border-2 border-black p-4 hover:bg-slate-500">
                        Add To Cart
                    </div>
                </div>
            ))
        }
        </ul>
        <div className="absolute w-15 right-0 mr-20 h-full text-center pl-20 border-l-4 border-black">
            <h1 className="border-black border-b-2 font-bold text-lg">Cart</h1>
            <div className='mt-6 cart-items'>
                <ul>
                    {
                        cart.map((cartItem) => (
                            <div key={cartItem.index} className='cart-row flex gap-5'>
                                <h2>{cartItem.name}</h2>
                                <input className='cart-quantity bg-slate-200 w-10 border-black border-2' type='number' placeholder='0' min="1"></input>
                                <h3>----</h3>
                                <h3 className='cart-price'>{cartItem.price}</h3>
                            </div>
                        ))
                    }
                </ul>
            </div>
            <div className='cart-total mt-5 border-black border-t-2'>

                <h1>Total: ${total}</h1>
            </div>
        </div>
        
        
    </div>
    
    );
}
export default Cart