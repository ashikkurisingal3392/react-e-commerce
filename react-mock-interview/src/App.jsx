import { useEffect, useEffectEvent, useState } from 'react'
import './App.css'
import ProductSearch from './pages/ProductSearch'

import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import { useSelector } from 'react-redux'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import OrderSuccess from './pages/OrderSuccess'


function App() {


  const [input, setInput] = useState("")
  const [task, setTask] = useState(()=>{

    const savedTasks = localStorage.getItem("tasks")

    return savedTasks?JSON.parse(savedTasks):[]
  })

  const addTask = () => {

    if (input.trim() === "") {
      return
    }



    setTask([...task, input])

    setInput("")






  }
  const handleChange = (e) => {

    console.log(e);

    setInput(e.target.value)

  }

  const handleDelete=(ind)=>{

   const newTask = task.filter((item,i)=>i !==ind)
   setTask(newTask)



  }

  const cartItems = useSelector((state)=> state.cart.items)

  const wishlistItems =useSelector((state)=>state.wishlist.items)


  useEffect(()=>{

    //localStorage.setItem("tasks",JSON.stringify(task))

    localStorage.setItem("cartItems",JSON.stringify(cartItems))
  

  },[cartItems])

  useEffect(()=>{

      localStorage.setItem("wishlistItems",JSON.stringify(wishlistItems))

  },[wishlistItems])

  // console.log(task);
  

  return (
    <>

       <Header/>
    <Routes>

      <Route path='/' element={<ProductSearch/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/checkout' element={<Checkout/>}/>
       <Route path='/wishlist' element={<Wishlist/>}/>
       <Route path='/success' element={<OrderSuccess/>}/>
    </Routes>
        
    

      {/* <section>



        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-300'>
          <h1 className="text-3xl font-bold mb-4">My Todo List</h1>



          <div className='flex gap-4 '>

            <div className='flex justify-between gap-3'>

              <input
                onChange={handleChange}
                value={input}
                className='outline-1 px-2' type="text" placeholder='Enter a Task' />
              <button onClick={addTask} className='bg-blue-600 px-5 py-2 rounded-2xl text-white'>Add</button>
            </div>

          </div>
          <div className='flex flex-col items-center gap-3  mt-4 w-full'>
           
              {
                task.length>0?
                task.map((item,index)=>(
                    <div key={index} className='flex items-center justify-between w-72 '>
                    <h3 className='font-bold'>{item}</h3>
                    <button onClick={()=>handleDelete(index)} className='bg-red-500 p-1 rounded-xl text-white'>Delete</button>
                         </div>

                ))
                :"no task"
              }
            

           

          </div>

        </div>
      </section> */}

    </>
  )
}

export default App
