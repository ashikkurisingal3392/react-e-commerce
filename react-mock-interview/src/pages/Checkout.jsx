import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../redux/cartSlice'
import OrderSuccess from './OrderSuccess'
import { useNavigate } from 'react-router-dom'

function Checkout() {


  const cartItems = useSelector((state) => state.cart.items)

  const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subTotal === 0 ? 0 : subTotal >= 50 ? 0 : 4.99
  const total = (subTotal + shipping)

  const dispatch = useDispatch()

  // const[placeOrder,setPlaceOrder]=useState(null)

  const navigate = useNavigate()

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      postCode: "",
      country: "united Kingdom"
    }

  })

  const[isSubmitting,setIsSubmitting] = useState(false)

  const handlePlaceOrder = async () => {

   

    if (cartItems.length === 0) {
      alert("your cart is empty")
      return
    }

    try{

      if (!user.firstName.trim() || !user.lastName.trim() || !user.email.trim() || !user.phone.trim()

      || !user.address.street.trim() || !user.address.city.trim() || !user.address.postCode.trim() || !user.address.country.trim()
    ) {
      alert("please fill the forms")
      return
    }
       
     setIsSubmitting(true)

    const order = {
      orderNumber: `ORD-${Date.now()}`,
      customer: user,
      products: cartItems,
      subTotal: Number(subTotal.toFixed(2)),
      shipping: Number(shipping.toFixed(2)),
      total: Number(total.toFixed(2)),
      status: "confirmed"
    }
    //console.log(order);


    /**
     * using fetch method for api call
     */


    const response = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    })
     
    if(!response.ok){

      const erroData =await response.json()
      throw new Error(erroData.message ||"Failed to create order")
    }

    const data = await response.json()

    console.log(data);

     setUser({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        postCode: "",
        country: "united Kingdom"
      }

    })



        dispatch(clearCart())

    //setPlaceOrder(order)
    /**
     * data passing throug useNavigate
     */

    navigate('/success', {
      state: { order: data.order }
    })

    

   


    }
    catch(err){

      console.log("server error",err.message);
      


    }
    finally{
      setIsSubmitting(false)
    }

    


  }


  console.log(isSubmitting);
  

  /**
   * passing props
   */
  // if(placeOrder){
  //   return <OrderSuccess order={placeOrder}/>
  // }

  return (

    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">
          Checkout
        </h1>

        <p className="text-gray-500 mb-8">
          Complete your order by providing your details.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">

            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">

              <h2 className="text-xl font-semibold mb-5">
                1. Customer Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    placeholder="Enter first name"
                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    placeholder="Enter last name"
                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="example@email.com"
                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-sm p-6">

              <h2 className="text-xl font-semibold mb-5">
                2. Delivery Address
              </h2>

              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={user.address.street}
                    onChange={(e) => setUser({ ...user, address: { ...user.address, street: e.target.value } })}
                    placeholder="House number and street"
                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={user.address.city}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, city: e.target.value } })}
                      placeholder="City"
                      className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Postcode
                    </label>
                    <input
                      type="text"
                      value={user.address.postCode}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, postCode: e.target.value } })}
                      placeholder="Postcode"
                      className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={user.address.country}
                    onChange={(e) => setUser({ ...user, address: { ...user.address, country: e.target.value } })}
                    placeholder="United Kingdom"
                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white rounded-xl shadow-sm p-6">

              <h2 className="text-xl font-semibold mb-5">
                3. Delivery Method
              </h2>

              <div className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Standard Delivery</p>
                  <p className="text-sm text-gray-500">
                    Delivery within 3-5 working days
                  </p>
                </div>

                <span className="font-semibold">
                  Free
                </span>
              </div>

            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm p-6">

              <h2 className="text-xl font-semibold mb-5">
                4. Payment Method
              </h2>

              <div className="border rounded-lg p-4 mb-4">
                <p className="font-medium">
                  Credit / Debit Card
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Secure payment using Stripe (integration coming later).
                </p>
              </div>

              <div className="flex gap-3 items-center text-gray-500 text-sm">
                <span>VISA</span>
                <span>Mastercard</span>
                <span>AMEX</span>
              </div>

            </div>

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">

            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">

              <h2 className="text-xl font-semibold mb-6">
                Order Summary
              </h2>

              {
                cartItems.length > 0 ?

                  cartItems.map((item) => (

                    <div key={item.id} className="flex gap-4 mb-5">


                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img src={item.thumbnail} alt={item.title} />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Quantity:{item.quantity}
                        </p>
                        <p className="font-semibold mt-1">
                          £{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>



                    </div>


                  ))
                  : (


                    <div>

                      <p>Cart is Empty</p>

                    </div>


                  )
              }








              <hr className="my-5" />

              <div className="flex justify-between mb-3 text-gray-600">
                <span>Subtotal</span>
                <span>£{subTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-3 text-gray-600">
                <span>Shipping</span>
                <span>£{shipping.toFixed(2)}</span>
              </div>

              <hr className="my-5" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>

              <button
                type="button"
               disabled={isSubmitting}
              
                onClick={handlePlaceOrder}
                className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition"
              >
                {
                  isSubmitting?"Processing....":"Place Order"
                }
                
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Your personal information is securely protected.
              </p>

            </div>

          </div>

        </div>

      </div>


    </div>
  )
}

export default Checkout
