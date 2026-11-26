import React from 'react'
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Heart, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge } from "flowbite-react";

function Header() {

    const cartItems = useSelector((state)=>state.cart.items)
    const wishlistItems = useSelector((state)=>state.wishlist.items)

  
    
    const totalQuantity = cartItems.reduce((total,item)=> total+ item.quantity,0)

    const totalWishlist =wishlistItems.length

  return (
    <div>

         <Navbar fluid rounded>
      <NavbarBrand href="/">
     
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Shoppy</span>
      </NavbarBrand>
      <div className="flex gap-3 md:order-2">
       <Link to={'/wishlist'}>
        <Badge color="failure" size="sm" className="ml-5 ">
    {totalWishlist}
  </Badge>
         <Heart className='text-amber-700  ' size={24}/>
       
       </Link>
      
        <Link to='/cart'>
        <Badge color="failure" size="sm" className="ml-5 ">
    {totalQuantity}
  </Badge>
           <ShoppingCart className='text-white ' size={24}/>
            
          
           
            
        </Link>
     
       
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>



      
    </div>
  )
}

export default Header
