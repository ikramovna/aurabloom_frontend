export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    description: string;
  }
  
  export const products: Product[] = [
    {
      id: '1',
      title: 'Premium Leather Backpack',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      description: 'Handcrafted from genuine leather, this versatile backpack features multiple compartments and a timeless design perfect for both work and travel.'
    },
    {
      id: '2',
      title: 'Wireless Noise-Canceling Headphones',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      description: 'Premium sound quality with active noise cancellation, offering up to 30 hours of battery life and supreme comfort.'
    },
    {
      id: '3',
      title: 'Smart Fitness Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800',
      description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and water resistance.'
    },
    {
      id: '4',
      title: 'Minimalist Desk Lamp',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800',
      description: 'Modern LED desk lamp with adjustable brightness levels and color temperatures, perfect for your workspace.'
    }
  ];