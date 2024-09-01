import React, { useEffect, useState } from 'react';
import Card from './card.astro'

export type CartType = {
  name: string;
  price: number;
  index: number;
};
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

const Cart: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [cart, setCart] = useState<CartType[]>([]);
  const [quantity, setQuantity] = useState(1);

  // Function to handle changes in the input field
  const handleChange = (event: { target: { value: any; }; }) => {
    const newValue = event.target.value;
    setQuantity(newValue);
  };
  useEffect(() => {
    const handleInputChange = () => {
      
      updateCartTotal();
    };
    const quantityInputs = document.getElementsByClassName('cart-quantity');` `
    for (let i = 0; i < quantityInputs.length; i++) {
      const input = quantityInputs[i] as HTMLInputElement;
      input.addEventListener('change', handleInputChange);
    }
    updateCartTotal();
  }, [cart]); // Re-run the total calculation whenever the cart changes

  const handleAddToCart = (index: number) => {
    setCart((prevCart) => {
      const product = prevCart.find((item) => item.index === items[index].index);
      
      if (product) {
        // Update the quantity of the existing item
        return prevCart.map((item) =>
          item.index === product.index
            ? { ...item}
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...items[index], quantity: 1 }];
      }
    });
  };
  const handleRemoveFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.index !== index));
  };  
  const handlePurchase = () => {
    if (cart.length === 0) {
      alert('Your cart is empty! Please add items to your cart before purchasing.');
      return;
    }
    alert(`Purchase successful! Total: $${total}`);
    setCart([]); // Clear the cart
    setTotal(0); // Reset the total
  };

  const updateCartTotal = () => {
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

  };
  return(
    <div className="flex ml-5">
        <ul className="mt-5 flex justify-center gap-10 flex-wrap">
        {
            items.map((item, i) => (
                <div key={item.index} className="bg-slate-300 border-8 border-black">
                    <h2 className="m-2 text-lg font-semibold">{item.name}</h2>
                    <p className="m-2">${item.price}</p>
                    <a href='/store/'className="m-2 p-.5">View Item</a>
                    <button onClick={() => handleAddToCart(i)} className="select-none add-button m-6 border-2 border-black p-4 hover:bg-slate-500">
                        Add To Cart
                    </button>
                </div>
            ))
        }
        </ul>
        <div className="flex flex-col absolute w-15 right-0 mr-20 h-full text-center pl-20 border-l-4 border-black">
            <h1 className="border-black border-b-2 font-bold text-lg">Cart</h1>
            <div className='mt-1 cart-items'>
                <ul>
                    {
                        cart.map((cartItem) => (
                            <div key={cartItem.index} className='cart-row flex gap-5 mt-5'>
                                <h2>{cartItem.name}</h2>
                                <input className='cart-quantity bg-slate-200 w-10 border-black border-2' type='number' value={quantity} min="1" onChange={handleChange}></input>
                                <h3>----</h3>
                                <h3 className='cart-price'>{cartItem.price}</h3>
                                <button onClick={() => handleRemoveFromCart(cartItem.index)} className='bg-red-500 border-black border-2'>Remove</button>
                            </div>
                        ))
                    }
                </ul>
            </div>
            <div className='cart-total mt-6 border-black border-t-2'>

                <h1>Total: ${total}</h1>
            </div>
            <div className='bg-red-500 border-black border-2 mt-10 p-1'>
              <button onClick={handlePurchase}>Purchase Items</button>
            </div>
        </div>
        
        
    </div>
    
    );
}
export default Cart