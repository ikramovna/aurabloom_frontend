import React, { useEffect, useState } from "react";
import {   Tabs,  } from "antd";
import {  Eye, Heart, ShoppingCart } from "lucide-react";
import { Typography, Box, Grid, Button, Container, } from "@mui/material";
import './testui.css'
import { Link, useParams } from "react-router-dom";
import innisfreevideo from "../../assets/Innisfree.mp4";
import royalfern from "../../assets/royalfern.mp4"
// import "../shop/components/products.css"

 

type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  image1?: string | null;
  image2?: string | null;
  image3?: string | null;
  availability: boolean;
  video?: string | null;
  view: number;
  contact_number?: string | null;
  additional_info?: string | null;
  title: string;
  additional_item: {
    brand?: string;
    weight?: string | null;
    size?: string | null;
    grams?: string | null;
    color?: string | null;
    title?: string;
  };
};

type RelatedProduct = {
  id: any;
  view: any;
  name: string;
  price: string;
  image: string;
  title?: string;
};

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);


  const toggleLike = async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
  
      const newLikeStatus = !isLiked;
      setIsLiked(newLikeStatus);
  
      // Save the updated like status in localStorage
      localStorage.setItem(`liked-${id}`, newLikeStatus.toString());
  
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access")}`,
        };
  
        const response = await fetch(`https://aurabloom.ikramovna.me/api/v1/shop/favorite`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            product: id,
            like: newLikeStatus,
          }),
        });
  
        if (response.status !== 200) {
          console.error("Failed to toggle like status");
          // If the API fails, revert the local state
          setIsLiked(!newLikeStatus);
        }
      } catch (error) {
        console.error("Error while toggling like status:", error);
      }
    };
  
    // Handle add to cart (saved status)
    const handleAddToCart = async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
  
      const newSavedStatus = !isInCart;
      setIsInCart(newSavedStatus);
  
      // Save the updated saved status in localStorage
      localStorage.setItem(`saved-${id}`, newSavedStatus.toString());
  
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access")}`,
        };
  
        const response = await fetch(`https://aurabloom.ikramovna.me/api/v1/shop/saved`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            product: id,
            saved: newSavedStatus,
          }),
        });
  
        if (response.status === 204) {
          // If the server responds with 204, it means saved was successfully set to false.
          if (!newSavedStatus) {
            // Update saved status to false (if it's set to false from the backend)
            setIsInCart(false);
          }
        } else if (response.status !== 200) {
          console.error("Failed to update saved status");
          // If the API fails, revert the local state
          setIsInCart(!newSavedStatus);
        }
      } catch (error) {
        console.error("Error updating saved status:", error);
      }
    };
  useEffect(() => {
    fetch(`https://aurabloom.ikramovna.me/api/v1/shop/${id}`)
      .then((response) => response.json())
      .then((data: Product) => {
        setProduct(data);
      });
  }, []);

  useEffect(() => {
    fetch(`https://aurabloom.ikramovna.me/api/v1/shop`)
      .then((response) => response.json())
      .then((data: Product[]) => {
        // Asosiy productni topish
        const mainProduct = data.find((item) => item.id.toString() === id);
        setProduct(mainProduct || null);
  
        // Related productlar (asosiy productni chiqarib tashlash)
        const related = data.filter((item) => item.id.toString() !== id);
        setRelatedProducts(related);
      });
  }, [id]);
  
  console.log(product?.description,'description is coming');
  
  if (!product) return <Typography>Loading...</Typography>;

  const Infofields = [
    { label:"Price", value: `$${product.price}` },
    { label:"Additional Info", value: product.additional_info || "N/A" },
    { label:"Contact Number", value: product.contact_number || "N/A" },
    { label:"View", value: product.view.toString() },
    { label:"Brand", value: product.additional_item?.brand || "N/A" },
  { label:"Weight", value: product.additional_item?.weight || "N/A" },
  { label:"Size", value: product.additional_item?.size || "N/A" },
  { label:"Grams", value: product.additional_item?.grams || "N/A" },
  { label:"Color", value: product.additional_item?.color || "N/A" },
  ]
  return (
    <Box sx={{  margin: "auto", padding: "24px", backgroundColor:"white"}}>
      <Container>
      <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
  <img 
    src={selectedImage || product.image} 
    alt={product.name} 
    style={{ borderRadius: "8px", width: "100%", height: "400px", objectFit: "cover" }} 
  />
  <Grid container spacing={2} sx={{ marginTop: "10px",marginBottom:'20px' }}>
    {[
      ...(selectedImage && selectedImage !== product.image ? [product.image] : []), // Oldingi tanlangan rasmni kichik rasmlar orasiga qo'shish
      product.image1, 
      product.image2, 
      product.image3
    ]
      .filter((img): img is string => img !== selectedImage && !!img) // Tanlangan rasmni kichik rasmlar orasidan chiqarib tashlash
      .map((img, index) => (
        <Grid item xs={4} key={index} sx={{ height: "150px" }}>
          <img 
            src={img} 
            alt={product.name} 
            style={{ borderRadius: "8px", height: "100%", width: "100%", cursor: "pointer", objectFit: "cover" }} 
            onClick={() => setSelectedImage(img)} 
          />
        </Grid>
      ))}
  </Grid>
  <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Description",
            children: (
              <Typography variant="body1">{product?.description ? product.description : "No description available."}</Typography>
            ),
          },
          {
            key: "2",
            label: "Video",
            children: product?.description ? (
              product.description.includes("Royal Fern") ? (
                <video width="100%" height="315" controls style={{ borderRadius: "8px" }}>
                  <source src={royalfern} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : product.description.includes("Innisfree") ? (
                <video width="100%" height="315" controls style={{ borderRadius: "8px" }}>
                  <source src={innisfreevideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : product.video ? (
                <iframe
                  width="100%"
                  height="315"
                  src={product.video}
                  title="Product Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: "8px" }}
                />
              ) : (
                <Typography variant="body1">
                  No additional information available.
                </Typography>
              )
            ) : (
              <Typography variant="body1">
                No description available.
              </Typography>
            ),
          }
          
          
        ]}
        tabBarStyle={{
          display: "flex",
          justifyContent: "center",
          borderBottom: "none",
          gap: "8px",
        }}
        renderTabBar={(props, DefaultTabBar) => (
          <DefaultTabBar {...props} className="flex gap-2" />
        )}
      />
</Grid>
<Grid item xs={12} md={6} sx={{ p: 2 }}>
      {/* Product Title */}
      <Typography variant="h5" fontWeight="bold" sx={{ color: "#3d2c1e" }}>
        {product?.name}
      </Typography>
      <Typography marginTop={"5px"} color="#3d2c1e">{product?.description ? product.description : "No description available."}</Typography>

      {/* Detail Info Collapse */}
      <Box mt={2}>
        {/* <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => setOpen(!open)}
          sx={{ mb: 1, textTransform: "none", fontWeight: "bold", 
            backgroundColor: "#c39c75",
            color: "white",
            "&:hover": { backgroundColor: "#b38765" }, }}
        >
          {open ? "Hide Details" : "Show Details"}
        </Button> */}

<Typography variant="h6" fontWeight="bold" color="#c39c75">
        Detail Info
      </Typography>
      {Infofields.map((field, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 1,
            borderBottom: index !== Infofields.length - 1 ? "1px solid #c39c75" : "none",
          }}
        >
          <Typography variant="body1" fontWeight="bold" color="#3d2c1e">
            {field.label}:
          </Typography>
          <Typography variant="body1" color="#3d2c1e">
            {field.value}
          </Typography>
        </Box>
      ))}
            
          
        
      </Box>

      {/* Add to Bag Button */}
      <Button
        fullWidth
        variant="contained"
        startIcon={<ShoppingCart />}
        sx={{
          mt: 2,
          backgroundColor: "#c39c75",
          color: "white",
          "&:hover": { backgroundColor: "#b38765" },
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Add to Bag
      </Button>
    </Grid>
      </Grid>

      

      <Typography variant="h5" sx={{ marginTop: "40px" }}>Related Products</Typography>
      {/* <Grid container spacing={2} sx={{ marginTop: "16px" }}>
        {relatedProducts.map((item, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Card cover={<img src={item.image} alt={item.name} style={{ borderRadius: "8px", width: "100%" }} />}>
              <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px"}}>
              <Typography  variant="subtitle1" fontWeight="medium">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">{item.price}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid> */}
      {
        <Grid container spacing={2} sx={{ marginTop: "16px" }}>
       { relatedProducts.map((item,index)=>(<Grid item xs={6} md={3} key={index}  >
        <Link to={`/product/${item.id}`} className="shop-card">
      <div className="shop-card-image">
              <img src={item.image} alt={item.title} />
              <div className="shop-card-overlay" style={{zIndex:'100'}}>
                <button
                  onClick={toggleLike}
                  className={`shop-card-button ${isLiked ? 'liked' : ''}`}
                  style={{marginRight:'0px !important',cursor:"pointer"}}
                >
                  <Heart className={`shop-card-icon ${isLiked ? 'liked' : 'default'}`} />
                </button>
                <button
                  onClick={handleAddToCart}
                  className={`shop-card-button ${isInCart ? 'in-cart' : ''}`}
                  style={{marginLeft: '0px !important',cursor:"pointer"}}
                >
                  <ShoppingCart className={`shop-card-icon ${isInCart ? 'in-cart' : 'default'}`} />
                </button>
              </div>
            </div>
            <div className="shop-card-content">
              <h4 className="shop-card-title">{item.title}</h4>
              <div  style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:2}}>
                <span className="shop-card-price">{item.price}</span>
                <div className="shop-card-views">
                  <Eye className="shop-card-views-icon" />
                  <span>{item.view}</span>
                </div>
              </div>
            </div>
            </Link>
</Grid>))}
        </Grid>
      }
      </Container>
    </Box>
  );
};

export default ProductPage;
