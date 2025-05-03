export interface Product {
    like: string;
    product: string;
    view: any;
    title: string;
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    duration: string;
    description: string;
    like_count: number;
    is_like: boolean;
    is_saved: boolean;
    user: {
      name: string;
      avatar: string;
    };
  }