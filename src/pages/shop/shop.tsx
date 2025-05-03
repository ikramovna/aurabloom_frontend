import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ShopCard from './components/shoproducts';
import "./shoproducts.css";

// Define the Product type
interface Product {
  id: number; // Ensure this matches the API response
  title: string;
  price: number;
  image: string;
  description?: string;
  view:number; // Optional description
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]); // Use the corrected Product type
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState<string | null>(null); // Error state
  

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get<Product[]>("https://aurabloom.ikramovna.me/api/v1/shop");
        setProducts(data); // Update state with the fetched data
        setLoading(false); // Set loading to false when data is fetched
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products.");
        setLoading(false); // Stop loading even if there's an error
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  return (
    <Box sx={{backgroundColor:"rgba(243, 244, 246, 0.5)",width:"100%"}}>
      <div className="container" >
        <div className="container-inner" style={{maxWidth:"1200px"}}>
          <div className="header">
            <h1 className="header-title">Feature Products</h1>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ShopCard  key={product.id} {...product} /> // Access the `id` property safely
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Shop;