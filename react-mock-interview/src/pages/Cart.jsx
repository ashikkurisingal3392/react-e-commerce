import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

function Cart() {

  
    const cartItems = useSelector((state)=> state.cart.items)

   console.log("Redux cart state:", cartItems);

     const dispatch = useDispatch()

   const handleRemove =(productId)=>{

  

    dispatch(removeFromCart(productId))

   }

   const handleIncrease=(productId)=>{

    dispatch(increaseQuantity(productId))

   }
     const handleDecrease=(productId)=>{

    dispatch(decreaseQuantity(productId))

   }

   const subAmount = cartItems.reduce((total,item)=>total+item.price *item.quantity,0)

   const totalQuantity = cartItems.reduce((total,item)=> total+item.quantity,0)
   console.log(totalQuantity);
   
   const shippingCost = subAmount >= 50 ? 0: 4.99
   const totalAmount=  subAmount > 0?subAmount+shippingCost:0

   const canCheckout = cartItems.length >=1 && subAmount >=10 
    
  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* Cart heading */}
      <h2 className="text-2xl font-bold mb-8">
        Shopping Cart
      </h2>
      <p className='flex justify-self-end mb-3'>Total items: {totalQuantity}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Cart products section */}
        <div className="md:col-span-2 space-y-4">

          {/* Product card */}
          {
            cartItems.length>0?

               cartItems.map((item)=>(

                   <div key={item.id} className="flex items-center justify-between border rounded-lg p-5">

            {/* Product information */}
            
                

                    <div>
            
              <img src={item.thumbnail} className='w-24 h-24' alt="" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-500">£{item.price}</p>
            </div>



             
            
            

            {/* Quantity controls */}
            <div className="flex items-center gap-3">
              <button 
              onClick={()=>handleDecrease(item.id)}
              className="border rounded px-3 py-1">
                -
              </button>

              <span>{item.quantity}</span>

              <button 
              onClick={()=>handleIncrease(item.id)}
              className="border rounded px-3 py-1">
                +
              </button>
            </div>

            {/* Remove */}
            <button
            type="button"
            onClick={()=>handleRemove(item.id)}
             className="text-red-500">
              Remove
            </button>

          </div>




                   ))
            
            :
            (
               <p className="text-gray-500 text-center py-10">
    Your cart is empty.
         </p>
            )

         

          }
       
        </div>

        {/* Order summary */}
        <div className="border rounded-lg p-5 h-fit">

          <h3 className="text-xl font-bold mb-5">
            Order Summary
          </h3>

          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span>£{subAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Shipping</span>
            <span>£{shippingCost.toFixed(2)}</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>£{totalAmount.toFixed(2)}</span>
          </div>
        <Link to={'/checkout'}>
         <button
          type="button"
          disabled={!canCheckout}
           className="w-full bg-black text-white py-3 rounded-lg mt-6 disabled:opacity-40 disabled:cursor-not-allowed ">
            Proceed to Checkout
           
            
          </button>
        </Link>
         

        </div>

      </div>

    </div>
  )
}

export default Cart
