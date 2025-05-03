import React from 'react';
import { Row, Col } from 'antd';
import { ProductCard } from '../card/ProductCard';
import { Product } from '../types/product';

interface ProductGridProps {
  products: Product[];
  onLikeToggle: (id: string) => void;
  onSaveToggle: (id: string) => void;
  onBookNow?: (id: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onLikeToggle,
  onBookNow,
}) => {
  return (
    <Row  justify="center">
    {products.map((product) => (
      <Col 
        key={product.id} 
        xs={24}  // Full width on extra-small screens
        sm={12}  // Two cards per row on small screens
        md={4}   // Three cards per row on medium screens
        lg={6}   // Four cards per row on large screens
      >
        <ProductCard
          product={product}
          onLikeToggle={onLikeToggle}
          onBookNow={onBookNow}
        />
      </Col>
    ))}
  </Row>
  );
};