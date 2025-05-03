import { useState } from 'react';
import { message } from 'antd';
import { Product } from '../types/product';


export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleLikeToggle = (id: string) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          is_like: !product.is_like,
          like_count: product.is_like ? product.like_count - 1 : product.like_count + 1,
        };
      }
      return product;
    }));
  };

  const handleSaveToggle = (id: string) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          is_saved: !product.is_saved,
        };
      }
      return product;
    }));
  };

  const handleBookNow = (id: string) => {
    const product = products.find(p => p.id === id);
    message.success(`Booking initiated for ${product?.name}`);
  };

  return {
    products,
    handleLikeToggle,
    handleSaveToggle,
    handleBookNow,
  };
};