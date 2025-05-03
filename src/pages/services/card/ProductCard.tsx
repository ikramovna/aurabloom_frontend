import React from 'react';
import { Card, 
} from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Product } from '../types/product';
import { cardStyles } from './styles';
import { CardActions } from './CardActions';
import { CardContent } from './CardContent';



interface ProductCardProps {
  product: Product;
  onLikeToggle: (id: string) => void;
  onBookNow?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onLikeToggle,
  onBookNow,
}) => {
  return (
    <Card
      hoverable
      style={cardStyles.card}
      styles={{
        body: cardStyles.contentWrapper
      }}
      cover={
        <div style={cardStyles.imageContainer}>
          <img
            alt={product.name}
            src={product.image}
            style={cardStyles.image}
          />
          <div style={cardStyles.bookmarkButton}>
            {product.is_like ? (
              <HeartFilled style={{ color: '#ff4d4f', fontSize: '18px' }} />
            ) : (
              <HeartOutlined style={{ fontSize: '18px' }} />
            )}
          </div>
        </div>
      }
      actions={[
        <CardActions
          key="actions"
          product={product}
          onLikeToggle={onLikeToggle}
          onBookNow={onBookNow}
        />
      ]}
    >
      <CardContent
        product={product}
        onBookNow={onBookNow}
      />
    </Card>
  );
};