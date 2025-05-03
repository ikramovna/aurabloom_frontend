import React from 'react';
import { Space, Typography, Row, Col, Button } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Product } from '../types/product';
import { formatPrice } from '../utils/formatters';
import { Box } from '@mui/material';

const { Text } = Typography;

interface CardActionsProps {
  product: Product;
  onLikeToggle: (id: string) => void;
  onBookNow?: (id: string) => void;
}

export const CardActions: React.FC<CardActionsProps> = ({ product, onLikeToggle,onBookNow }) => {
  return (<Box>
    <Row justify="space-between" align="middle" style={{ width: '100%', padding: '0 24px' }}>
      <Col>
        <div onClick={() => onLikeToggle(product.id)} style={{ cursor: 'pointer' }}>
          <Space>
            {product.is_like ? (
              <HeartFilled style={{ color: '#ff4d4f', fontSize: '18px' }} />
            ) : (
              <HeartOutlined style={{ fontSize: '18px' }} />
            )}
            <Text strong>{product.like_count}</Text>
          </Space>
        </div>
      </Col>
      <Col>
        <Text strong style={{ fontSize: '16px', color: '#c39c75' }}>
          {formatPrice(product.price)}
        </Text>
      </Col>
    </Row>
    <Box >
    <Button
        type="primary"
        block
        
        onClick={() => onBookNow?.(product.id)}
        style={{
          width:"90%",
          height: '48px',
          fontSize: '16px',
          borderRadius: '24px',
          marginTop: '8px',
          background: 'linear-gradient(45deg, #c39c75, #d4b595)',
          border: 'none',
        }}
      >
        Book Appointment
      </Button>
      </Box>
    </Box>
  );
};