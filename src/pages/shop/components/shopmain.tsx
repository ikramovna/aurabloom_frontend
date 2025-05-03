// import React from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent,IconButton, Button  } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import { Favorite, Bookmark, FavoriteBorder, BookmarkBorder } from "@mui/icons-material";
import { useState } from "react";// Import useNavigate for navigation
import "./shopageswiper.css";

// Example Data for Products
const products1: Product[] = [
  {
    id: 1,
    name: "Wrist Watches",
    price: "$70.00",
    image: "https://via.placeholder.com/200x200",
    view: 100, // Example view count
    like_count: 50, // Example like count
  },
  {
    id: 2,
    name: "Polaroid Camera",
    price: "$78.00",
    image: "https://via.placeholder.com/200x200",
    view: 200,
    like_count: 80,
  },
  // Add other products with similar structure...
];

interface Product {
  id: number;
  name: string;
  price: string;
  discount?: string;
  view:number; // Optional property
  image: string;
  like_count: number;
}

const ShopPage = ({products}:any) => {
  const navigate = useNavigate(); // Hook to navigate between pages

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`); // Navigate to Product Detail Page
  };
  // const [isLiked, setIsLiked] = useState(false); // State for like
  const [isSaved, setIsSaved] = useState<{[key:number]:boolean}>({});
  const [likedProducts, setLikedProducts] = useState<{ [key: number]: boolean }>({});

  const toggleLike = (id: number) => {
    setLikedProducts((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the liked status for the product with the given ID
    }));
  };
  const toggleSave = (id:number) => {
    setIsSaved((prev) => ({
     ...prev,
      [id]:!prev[id], // Toggle the saved status for the product with the given ID
    }));
  };
  return (
    <Box sx={{ padding: "20px", backgroundColor: "#FFF" }}>
      {/* Products Section */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          New Arrivals
        </Typography>
        <Typography variant="body1" sx={{ color: "#757575" }}>
          Explore our latest collection of products at affordable prices.
        </Typography>
      </Box>

      <Grid container spacing={4}>
      {products.length === 0 ? products1.map((product: Product) => (
  <Grid item xs={12} sm={6} md={3} key={product.id}>
    <Card
      sx={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        overflow: "hidden",
        transition: "transform 0.3s ease",
        cursor: "pointer", // Add pointer cursor for better UX
        "&:hover": { transform: "scale(1.05)" },
        position:"relative",
      }}
       // Handle click event
    >
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          display: "flex",
          gap: "10px",
        }}
      >
        <IconButton
                  onClick={() => toggleLike(product.id)}
                  sx={{ color: likedProducts[product.id] ? "red" : "gray" }}
                >
                  {likedProducts[product.id] ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <IconButton onClick={()=>toggleSave(product.id)} sx={{ color: isSaved[product.id] ? "blue" : "gray" }}>
          {isSaved[product.id] ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      </Box>
      <CardMedia
        component="img"
        height="300"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {product.name}
        </Typography>
        <Typography variant="body1" sx={{ color: "#c39c75" }}>
          {product.price}
          {product.discount && (
            <Typography
              component="span"
              sx={{
                textDecoration: "line-through",
                color: "#757575",
                marginLeft: "8px",
              }}
            >
              {product.discount}
            </Typography>
          )}
        </Typography>
        <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => handleProductClick(product.id)}
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  Read More
                </Button>
      </CardContent>
    </Card>
  </Grid>
)) : products.map((product: Product) => (
  <Grid item xs={12} sm={6} md={3} key={product.id}>
    <Card
      sx={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        overflow: "hidden",
        transition: "transform 0.3s ease",
        cursor: "pointer", // Add pointer cursor for better UX
        "&:hover": { transform: "scale(1.05)" },
      }}
       // Handle click event
    >
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          display: "flex",
          gap: "10px",
        }}
      >
        <IconButton
                  onClick={() => toggleLike(product.id)}
                  sx={{ color: likedProducts[product.id] ? "red" : "gray" }}
                >
                  {likedProducts[product.id] ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <IconButton onClick={()=>toggleSave(product.id)} sx={{ color: isSaved[product.id] ? "blue" : "gray" }}>
          {isSaved[product.id] ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      </Box>
      <CardMedia
        component="img"
        height="300"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {product.name}
        </Typography>
        <Typography variant="body1" sx={{ color: "#c39c75" }}>
          {product.price}
          {product.discount && (
            <Typography
              component="span"
              sx={{
                textDecoration: "line-through",
                color: "#757575",
                marginLeft: "8px",
              }}
            >
              {product.discount}
            </Typography>
          )}
        </Typography>
        <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => handleProductClick(product.id)}
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  Read More
                </Button>
      </CardContent>
    </Card>
  </Grid>
))}
                
      </Grid>
    </Box>
  );
};

export default ShopPage;
