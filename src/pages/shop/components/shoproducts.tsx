import React, { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import './products.css'; // Link to the CSS file
// import axios from 'axios';
// import {Product} from "./products"

// type ShopCardProps = Product;
interface Product {
    id: number; // Ensure this matches the API response
    title: string;
    price: number;
    image: string;
    description?: string; 
    view:number;// Optional description
    // like:boolean;
    // saved:boolean;  
  }

export default function ShopCard({ id, title, price, image, view
    // description
 }: Product) {
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked-${id}`) === 'true'; // Get the 'liked' status from localStorage
    const savedStatus = localStorage.getItem(`saved-${id}`) === 'true'; // Get the 'saved' status from localStorage

    setIsLiked(likedStatus);
    setIsInCart(savedStatus);
  }, [id]);
  // console.log(like,saved,'liked');
  
//   const [views] = useState(() => Math.floor(Math.random() * 1000) + 100);
  const roles = localStorage.getItem("roles")  
  console.log(roles,'salomms');
  console.log(id,'ssssss');
  
  const toggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);

    // Save the updated like status in localStorage
    localStorage.setItem(`liked-${id}`, newLikeStatus.toString());

    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
      };

      const response = await fetch(`https://aurabloom.ikramovna.me/api/v1/shop/favorite`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          product: id,
          like: newLikeStatus,
        }),
      });

      if (response.status !== 200) {
        console.error("Failed to toggle like status");
        // If the API fails, revert the local state
        setIsLiked(!newLikeStatus);
      }
    } catch (error) {
      console.error("Error while toggling like status:", error);
    }
  };

  // Handle add to cart (saved status)
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newSavedStatus = !isInCart;
    setIsInCart(newSavedStatus);

    // Save the updated saved status in localStorage
    localStorage.setItem(`saved-${id}`, newSavedStatus.toString());

    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
      };

      const response = await fetch(`https://aurabloom.ikramovna.me/api/v1/shop/saved`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          product: id,
          saved: newSavedStatus,
        }),
      });

      if (response.status === 204) {
        // If the server responds with 204, it means saved was successfully set to false.
        if (!newSavedStatus) {
          // Update saved status to false (if it's set to false from the backend)
          setIsInCart(false);
        }
      } else if (response.status !== 200) {
        console.error("Failed to update saved status");
        // If the API fails, revert the local state
        setIsInCart(!newSavedStatus);
      }
    } catch (error) {
      console.error("Error updating saved status:", error);
    }
  };
  const formattedPrice = Number(price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // No decimals
    maximumFractionDigits: 0, // No decimals
  });
  

  return (
    <Link to={`/product/${id}`} className="shop-card">
      <div className="shop-card-image">
        <img src={image} alt={title} />
        <div className="shop-card-overlay" style={{zIndex:'100'}}>
          <button
            onClick={toggleLike}
            className={`shop-card-button ${isLiked ? 'liked' : ''}`}
            style={{marginRight:'0px !important',cursor:"pointer"}}
          >
            <Heart className={`shop-card-icon ${isLiked ? 'liked' : 'default'}`} />
          </button>
          <button
            onClick={handleAddToCart}
            className={`shop-card-button ${isInCart ? 'in-cart' : ''}`}
            style={{marginLeft: '0px !important',cursor:"pointer"}}
          >
            <ShoppingCart className={`shop-card-icon ${isInCart ? 'in-cart' : 'default'}`} />
          </button>
        </div>
      </div>
      <div className="shop-card-content">
        <h4 className="shop-card-title">{title}</h4>
        <div  style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:2}}>
          <span className="shop-card-price">{formattedPrice}</span>
          <div className="shop-card-views">
            <Eye className="shop-card-views-icon" />
            <span>{view.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
