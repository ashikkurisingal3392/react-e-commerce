import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Heart } from 'lucide-react'
import { decreaseQuantity, increaseQuantity, addToCart} from '../redux/cartSlice';
import { addToFavorite, removFromFavorite } from '../redux/wishlistSlice';

function ProductSearch() {


    const[product,setProduct]=useState([])
    const[input,setInput]=useState("")
    const[loading,setLoading]=useState(true)
    const[error,setError]=useState("")

    const[currentPage,setCurrentPage]=useState(1)

     
    const dispatch =useDispatch()

    const handleAddToCart=(product)=>{

        dispatch(addToCart(product))
        //console.log("Product dispatched:", product);
    }


    const cartItems = useSelector((state)=> state.cart.items)

    const wishlistItems =useSelector((state)=>state.wishlist.items)
   
    

    const getCartItem =(productId)=>{

        return cartItems.find((item)=> item.id === productId)

    }

    const getWishlistItem = (productId)=>{
        return  wishlistItems.find((item)=>item.id === productId)
    }

    const handleFavorite =(product)=>{

        console.log(product);

        dispatch(addToFavorite(product))
        

    }

    const handleRemoveFavorite=(id)=>{
        dispatch(removFromFavorite(id))


    }


  
    const  getProducts=async()=>{

        try{

              const response = await fetch("https://dummyjson.com/products")
              if(!response.ok){
                throw new Error("unable to fetch products")
              }

           const data =await response.json()
             setProduct(data.products)

        }
        catch(err){

            console.log(err.message);
            setError(err.message)
            

        }
        finally{
            setLoading(false)
        }

      
        //console.log(data.products);

      
        
    }

    const filteredProduct = product.filter((item)=>item.title.toLowerCase().includes(input.trim().toLowerCase()))

    const handleSearch=(e)=>{
    
        
        setInput(e.target.value)
        setCurrentPage(1)
          
    }


    const handleReset=()=>{

        setInput("")
        setCurrentPage(1)

    }
      const itemsPerPage =10

    const totalPage =Math.max(1,Math.ceil(filteredProduct.length/itemsPerPage)) 
    const startIndex = (currentPage -1)*itemsPerPage

    const paginatedProducts = filteredProduct.slice(startIndex,startIndex+itemsPerPage)

    

    const handleNext=()=>{

        
         if(currentPage < totalPage){
            setCurrentPage(prev=>prev+1)

         }
        


    }

    const handlePrevious=()=>{
        if(currentPage > 1 ){
            setCurrentPage(prev =>prev-1)
        }


    }

    useEffect(()=>{
        
        getProducts()

    },[])

   
// console.log("Current Page:", currentPage);
// console.log("Total Pages:", totalPage);
// console.log("Filtered Products:", filteredProduct.length);
    
  return (
    
    <div>

     
     


        
     <section  className='p-5 max-w-7xl'>
       
       <div className='flex justify-center gap-2   '>
            <input
            value={input}
            onChange={handleSearch}
             className='w-96 h-12 outline-1 border-gray-600 px-2 ' type="text" placeholder='Search products' />

             <button
             onClick={handleReset}
              type="button" className="bg-red-700 p-2 w-24 rounded-md text-white">Clear</button>
       </div>

       {loading && <p>Loading Products......</p>}
       {error && <p className='text-red-500'>{error}</p>}

         {!loading  &&  !error &&(
                <div className="grid grid-cols-3 gap-5 py-5">

                    {paginatedProducts.length > 0 ? (

                        paginatedProducts.map((item) => (

                            <div
                                key={item.id}
                                className="flex flex-col gap-3 shadow-2xl p-3 rounded-2xl"
                            >
                                {
                                    !getWishlistItem(item.id)?

                                      <button
                                 onClick={()=>handleFavorite(item)}
                                  type='button'>
                                       <Heart className='flex text-blue-500' />
                                 </button>
                                    
                                    :(

                                          <button
                                 onClick={()=>handleRemoveFavorite(item.id)}
                                  type='button'>
                                       <Heart className='flex text-red-500 fill-red-500' />
                                 </button>


                                    )
                                }
                               
                               
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                />

                                <h1 className="font-semibold">
                                    {item.title}
                                </h1>

                                <h6 className="text-blue-600">
                                    £{item.price}
                                </h6>

                                <p className="text-sm">
                                    {item.description}
                                </p>

                               
                                    {
                                        !getCartItem(item.id) ? (

                                             <button onClick={()=>handleAddToCart(item)}
                                              className="text-blue-600 outline-1 rounded-3xl p-2">

                                                 Add to Cart
                                      </button>
                                        ):
                                        
                                        
                                         <div className="flex items-center justify-center gap-5">

                                            <button
                                            onClick={()=>dispatch(decreaseQuantity(item.id))}
                                            className="border rounded px-3 py-1"
                                            >
                                                -

                                            </button>
                                             <span>{getCartItem(item.id).quantity}</span>
                                              <button
                                            onClick={()=>dispatch(increaseQuantity(item.id))}
                                            className="border rounded px-3 py-1"
                                            >
                                                +

                                            </button>

                                            </div>


                                    }
                                   

                            </div>

                        ))

                    ) : (

                        <p>No products found</p>

                    )}

                </div>
            )}
         {!loading && !error &&(
             <div className='flex justify-center gap-5'>
             <button
             onClick={handlePrevious}
             disabled={currentPage===1}
              className='text-blue-600 disabled:text-gray-400 disabled:opacity-40'>
                Previous
             </button>
             <span>Page {currentPage} of {totalPage}</span>
              <button 
              onClick={handleNext}
              disabled={currentPage === totalPage}
              className='text-blue-600 disabled:text-gray-400 disabled:opacity-40'>
                Next
             </button>

        </div>


         )}
       
            

        
      
      
     </section>


      
    </div>
  )
}

export default ProductSearch
