import { CircleCheck, Package, ShoppingBag, Truck } from 'lucide-react'
import React from 'react'
import { useEffect } from 'react'
import { useEffectEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'

function OrderSuccess() {
   
    const location =useLocation()

    const order =location.state?.order

    console.log(order);

    if(!order){
        return <div>No order information found</div>
    }
    

    const getAOrderDetails=async()=>{


      try{

        const response = await fetch(`/http://localhost:3000/api/orders/${order._id}`,{

          headers:{
            "Content-Type":"application/json"
          }
        })

      
        const data = await response.json()

        console.log("api response",data);
        

      }
      catch(err){


      }
    }


    useEffect(()=>{


      getAOrderDetails()
    },[])
    
  return (
     <div className="min-h-screen bg-gray-50 px-4 py-12">

      <div className="max-w-4xl mx-auto">

        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center mb-8">

          <div className="flex justify-center mb-5">
            <div className="bg-green-100 p-4 rounded-full">
              <CircleCheck size={55} className="text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Thank you for your purchase!
          </h1>

          <p className="text-gray-500 mb-6">
            Your order has been placed successfully.
            We'll send you an update when your order ships.
          </p>

          <div className="inline-block bg-gray-100 rounded-lg px-6 py-3">
            <p className="text-sm text-gray-500">Order number</p>
            <p className="font-bold text-lg">{order.orderNumber}</p>
          </div>

        </div>

        {/* Order Information */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

          <h2 className="text-xl font-bold mb-6">Order Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="flex items-center gap-3">
              <Package size={26} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Order Status</p>
                <p className="font-semibold text-green-600">{order.status}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Truck size={26} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Delivery</p>
                <p className="font-semibold">3–5 Working Days</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShoppingBag size={26} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-semibold">Credit / Debit Card</p>
              </div>
            </div>

          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          {/* Product Item */}
          {
            order.products.map((item)=>(
                 <div key={item.id} className="flex items-center gap-4 border-b pb-5 mb-5">

            <div className="w-20 h-20 rounded-lg bg-gray-100">
                <img src={item.thumbnail} alt={item.title} />
              {/* Product image */}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.quantity}</p>
            </div>

            <p className="font-semibold">£{(item.price * item.quantity).toFixed(2)}
</p>

          </div>



            ))
          }
         

          {/* Price Details */}
          <div className="space-y-3">

            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>£{order.subTotal}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>£{order.shipping}</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>£{order.total}</span>
            </div>

          </div>

        </div>

        {/* Continue Shopping */}
        <div className="text-center">
         <Link to={'/'}>

          <button 

          className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition">
            Continue Shopping
          </button>

         
         </Link>
         
          <p className="text-sm text-gray-500 mt-5">
            Thank you for shopping with us!
          </p>

        </div>

      </div>
    </div>
  )
}

export default OrderSuccess
