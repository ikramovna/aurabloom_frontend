import React from 'react';
import { Typography, Space, 
   Avatar, 
} from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Product } from '../types/product';

const { Text, Title } = Typography;

interface CardContentProps {
  product: Product;
  onBookNow?: (id: string) => void;
}

export const CardContent: React.FC<CardContentProps> = ({ product, 
 }) => {
  return (
    <Space direction="vertical" size={12} style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <Avatar src={product.user.avatar} alt={product.user.name} size={48} />
        <div style={{ flex: 1 }}>
          <Title level={4} style={{ margin: 0, fontSize: '20px' }}>{product.name}</Title>
          <Text type="secondary" style={{ fontSize: '14px', display: 'felex',gap:"10px", marginTop: '4px' }}>
            {product.category}
                <ClockCircleOutlined style={{ color: '#c39c75',marginInline:"5px" }} />
                <Text type="secondary">{product.duration}</Text>
            
          </Text>
          
        </div>
      </div>

      <Text style={{ fontSize: '14px', lineHeight: '1.6' }}>{product.description}</Text>
      
     
    </Space>
  );
};