import { CSSProperties } from 'react';

export const cardStyles = {
  card: {
    margin: '16px 16px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  } as CSSProperties,
  
  imageContainer: {
    position: 'relative',
    height: 280,
  } as CSSProperties,
  
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  } as CSSProperties,
  
  bookmarkButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '50%',
    padding: 4,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  } as CSSProperties,
  
  contentWrapper: {
    padding: '16px',
  } as CSSProperties,
  
  priceTag: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '8px 12px',
    borderRadius: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  } as CSSProperties,
};
