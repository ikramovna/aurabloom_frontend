import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  // Rating,
  Stack,
  // Modal,
  // Chip,
  // Card,
  // CardMedia,
  // CardContent,
  // CardActions,
  // IconButton,
} from "@mui/material";
import { 
  // Button,
   Modal, 
  // Typography,
   Space } from "antd";
// import { Select } from "antd";
import { 
  // Heart, Share2, 
  ShoppingCart,Eye, 
  Heart} from "lucide-react";
import axios from "axios";
import './products.css';
import { Link, useParams } from "react-router-dom";
import paymelogo from "../../../assets/Paymeuz_logo.png"
import clickuz from "../../../assets/Click-uz.png"

interface Product {
  id: number;
  name: string;
  title:string;
  price: string;
  image: string;
  view: number;
}

// const { Option } = Select;

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  // Ensure hooks are consistent
  const [productDetail, setProductDetail] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // const [size, setSize] = useState("S");
  // const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  // const handleAddToCart = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsInCart(!isInCart);
  // };
   console.log(id);
   
  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const { data } = await axios.get(`https://aurabloom.ikramovna.me/api/v1/shop/${id}`);
        setProductDetail(data);
        setSelectedImage(data.image || null); // Default to the main image
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details.");
        setLoading(false);
      }
    };
    const getRelatedProducts = async () => {
      try {
        const { data } = await axios.get<Product[]>("https://aurabloom.ikramovna.me/api/v1/shop");
        const filteredProducts = data.filter((product) => product.id !== numericId); // Exclude current product
        setRelatedProducts(filteredProducts.slice(0, 3)); // Limit to 3 related products
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    };
    getRelatedProducts();
    getProductDetail();
  }, [id]);
  useEffect(() => {
    // const likedStatus = localStorage.getItem(`liked-${id}`) === 'true'; // Get the 'liked' status from localStorage
    const savedStatus = localStorage.getItem(`saved-${id}`) === 'true'; // Get the 'saved' status from localStorage

    // setIsLiked(likedStatus);
    setIsInCart(savedStatus);
  }, [id]);

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
  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // const handleSizeChange = (value: string) => {
  //   setSize(value);
  // };

  // const handleQuantityChange = (value: number) => {
  //   setQuantity(value);
  // };

  return (
    <Container maxWidth="xl" sx={{ py: "50px", px: "85px !important" }}>
      <Grid container spacing={6}>
        {/* Left Column - Images */}
        <Grid item xs={12} md={7}>
          <Box sx={{ position: "relative", display: "flex",width:"100%" }}>
            <Stack
              direction="row"
              spacing={0}
              sx={{  flexDirection: "column", alignItems: "start", gap: "10px",width:"20%" }}
            >
              {[productDetail.image, productDetail.image1, productDetail.image2, productDetail.image3]
                .filter(Boolean) // Filter out null or undefined images
                .map((img: string, index: number) => (
                  <Box
                    key={index}
                    component="img"
                    src={img}
                    alt={`Product view ${index + 1}`}
                    onClick={() => setSelectedImage(img)}
                    sx={{
                      width: 130,
                      height: 100,
                      borderRadius: 1,
                      marginInline: "10px",
                      objectFit:'cover',
                      cursor: "pointer",
                      opacity: selectedImage === img ? 1 : 0.6,
                      transition: "all 0.2s",
                      "&:hover": { opacity: 1 },
                    }}
                  />
                ))}
            </Stack>
            <Box
              component="img"
              src={selectedImage || ""}
              alt="Product"
              sx={{
                width: "80%",
                height: "450px",
                objectFit:"fill",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </Box>
        </Grid>

        {/* Right Column - Product Details */}
        <Grid item xs={12} md={5}>
          <Box sx={{ position: "sticky", top: 20,height:"100%" }}>
            <Stack style={{position:"relative",height:"100%"}} spacing={3}>
              <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                  {productDetail.name} {productDetail.brand || "Unknown"}
                </Typography>
                <Box
                  sx={{
                    maxHeight: "300px", // Fixed height for description
                    overflowY: "auto", // Enable vertical scrolling
                    marginBottom: "15px",
                    padding: "10px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#f1f1f1",
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#c39c75",
                      borderRadius: "4px",
                      "&:hover": {
                        background: "#a98260",
                      },
                    },
                  }}
                >
                  <Typography color="text.secondary">
                    Description: {productDetail.description || "No description available."}
                  </Typography>
                </Box>
              <Typography sx={{ marginTop: '10px' }} variant="h5" color="#111111" gutterBottom> <span>$ </span>
  {new Intl.NumberFormat("en-US", {
   
    minimumFractionDigits: 0, // No decimals
    maximumFractionDigits: 0, // No decimals
  }).format(parseFloat(productDetail.price.replace(/[^0-9.-]+/g, "")))}
</Typography>
                <Stack direction="row"  spacing={1} alignItems="center">
                  {/* <Rating value={4.5} precision={0.5} readOnly /> */}
                  {/* <Typography color="#111111" sx={{display:"flex",alignItems:"center",gap:"5px"}}> <Eye className="shop-card-views-icon" /> {productDetail.view}</Typography> */}
                </Stack>
              </Box>

             

            
              {/* <Stack spacing={3}>
                <div style={{ maxWidth: "200px", margin: "10px 0" }}>
                  <label
                    style={{
                      display: "block",
                      fontWeight: "bold",
                      color: "#757575",
                      marginBottom: "8px",
                    }}
                  >
                    Size
                  </label>
                  <Select
                    value={size}
                    onChange={handleSizeChange}
                    options={[
                      { value: "S", label: "Small (38mm)" },
                      { value: "M", label: "Medium (40mm)" },
                      { value: "L", label: "Large (42mm)" },
                    ]}
                    style={{ width: "100%", borderRadius: "4px" }}
                    dropdownStyle={{ borderRadius: "8px" }}
                  />
                </div>

                <div style={{ maxWidth: "200px", margin: "10px 0" }}>
                  <label
                    style={{
                      display: "block",
                      fontWeight: "bold",
                      color: "#757575",
                      marginBottom: "8px",
                    }}
                  >
                    Quantity
                  </label>
                  <Select
                    value={quantity}
                    onChange={handleQuantityChange}
                    style={{
                      width: "100%",
                      borderRadius: "4px",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Option key={num} value={num}>
                        {num}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Stack> */}

              <Stack direction="row"  spacing={2}>
              <Button
  variant="contained"
  size="large"
  // onClick={handleAddToCart}
  startIcon={<ShoppingCart />}
  onClick={showModal}
  // fullWidth
  disabled={!productDetail.availability} // Agar availability false bo'lsa, tugma o'chiriladi
  sx={{
    position:"absolute",
    bottom:"0",
    bgcolor: productDetail.availability ? "#c39c75" : "gray", // Faol tugma qora, o'chirilgan tugma kulrang
    "&:hover": {
      bgcolor: productDetail.availability ? "#a98260" : "gray", // O'chirilgan tugma hover qilinmaydi
    },
    color: productDetail.availability ? "white" : "lightgray", // Matn rangi shartli
    py: 1.1,
    px:5.1,
    cursor: productDetail.availability ? "pointer" : "not-allowed", // O'chirilgan tugma uchun kursor
  }}
>
  {productDetail.availability ? "Add to Cart" : "Out of Stock"} {/* Tugma matni shartli */}
</Button>
                {/* <IconButton sx={{ border: "1px solid #e0e0e0" }}>
                  <Heart />
                </IconButton>
                <IconButton sx={{ border: "1px solid #e0e0e0" }}>
                  <Share2 />
                </IconButton> */}
              </Stack>

              {/* <Stack direction="row" spacing={1}>
                <Chip label="Free Shipping" color="primary" variant="outlined" />
                <Chip
                  label={productDetail.availability ? "In Stock" : "Out of Stock"}
                  color={productDetail.availability ? "success" : "error"}
                  variant="outlined"
                />
                <Chip label="2 Year Warranty" variant="outlined" />
              </Stack> */}
               <Modal
        // title={productDetail.name}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        {/* <Card
          // title={productDetail.name}
          bordered={false}
          style={{ width: "100%" }}
        > */}
          {/* <Typography.Paragraph>
            {productDetail.description || "No description available."}
          </Typography.Paragraph>
          <Typography.Title level={5}>
            $ {new Intl.NumberFormat("en-US").format(
              parseFloat(productDetail.price.replace(/[^0-9.-]+/g, ""))
            )}
          </Typography.Title> */}

          <Space style={{ marginTop: "20px", justifyContent: "center", display: "flex" }}>
            <Button
              // variant="contained"
              onClick={() => {
                alert("Click option selected");
                handleCancel();
              }}
            >
              {/* Click */}
              <img width="200px" height="100px" style={{objectFit:"cover"}} src={clickuz} alt="" />
            </Button>
            <Button
              // variant="contained"
              onClick={() => {
                alert("Payme option selected");
                handleCancel();
              }}
            >
              <img width="200px" height="100px" style={{objectFit:'cover'}} src={paymelogo} alt="" />
             
            </Button>
          </Space>
        {/* </Card> */}
      </Modal>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Box mt={11}>
        <Typography variant="h5" sx={{textAlign:"left",marginBottom:"20px",fontWeight:"600"}} gutterBottom>
          Related Products
        </Typography>
        <Grid container spacing={4}>
          {relatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Link to={`/product/${product.id}`}  className="shop-card">
      <div className="shop-card-image">
        <img src={product.image} alt={product.title} />
        <div className="shop-card-overlay">
          <button
            onClick={toggleLike}
            className={`shop-card-button ${isLiked ? 'liked' : ''}`}
            style={{marginRight:'0px !important'}}
          >
            <Heart className={`shop-card-icon ${isLiked ? 'liked' : 'default'}`} />
          </button>
          <button
            onClick={handleAddToCart}
            className={`shop-card-button ${isInCart ? 'in-cart' : ''}`}
            style={{marginLeft: '0px !important'}}
          >
            <ShoppingCart className={`shop-card-icon ${isInCart ? 'in-cart' : 'default'}`} />
          </button>
        </div>
      </div>
      <div className="shop-card-content">
        <h4 className="shop-card-title">{product.title}</h4>
        <div  style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:2}}>
          <span className="shop-card-price"><Typography
                  sx={{ marginTop: "10px" }}
                  variant="h5"
                  color="#111111"
                  gutterBottom
                >
                  <span>$ </span>
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(parseFloat(product.price.replace(/[^0-9.-]+/g, "")))}
                </Typography></span>
          <div className="shop-card-views">
            <Eye className="shop-card-views-icon" />
            <span>{product.view.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default ProductDetail;
