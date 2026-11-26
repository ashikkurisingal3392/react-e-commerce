import { createSlice } from "@reduxjs/toolkit";



const savedWishlist = localStorage.getItem("wishlistItems")

const initialState={

    items:savedWishlist?JSON.parse(savedWishlist):[]
}


const wishlistSlice = createSlice({

    name:"wishlist",
    initialState,
    reducers:{

        addToFavorite:(state,action)=>{

            const existingItem = state.items.find((item)=>item.id === action.payload.id)

            if(!existingItem){

                state.items.push(action.payload)
                
                

            }

        },
        removFromFavorite:(state,action)=>{

           state.items = state.items.filter((item)=>item.id !== action.payload)

               
        }
    }
})


export const {addToFavorite,removFromFavorite} = wishlistSlice.actions

export default wishlistSlice.reducer