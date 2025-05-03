import  { useEffect, useState } from "react";
import { Card, Divider, Input, Button } from "antd";
import {  PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Box, Typography, Paper } from "@mui/material";
import axios from "axios";

interface SavedProduct {
  brand: string;
  name: string;
  quantity: number;
  view: any;
  product: any;
  id: number;
  title: string;
  price: number;
  image: string;
}

const ShoppingCart = () => {
  const [savedData, setSavedData] = useState<SavedProduct[]>([]);
  const [savedProduct, setSavedProduct] = useState<SavedProduct[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };

    const getSavedProduct = async () => {
      try {
        const { data } = await axios.get(
          "https://aurabloom.ikramovna.me/api/v1/shop/saved",
          { headers }
        );
        setSavedData(data);

        const initialQuantities: { [key: number]: number } = {};
        data.forEach((item: SavedProduct) => {
          initialQuantities[item.id] = item.quantity;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching saved data:", error);
      }
    };

    const getShopProducts = async () => {
      try {
        const { data } = await axios.get(
          "https://aurabloom.ikramovna.me/api/v1/shop"
        );
        setSavedProduct(data);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
    };

    getShopProducts();
    getSavedProduct();
  }, []);

  useEffect(() => {
    const initialQuantities = savedData.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {} as { [key: number]: number });

    setQuantities(initialQuantities);
  }, [savedData]);

  const updateQuantity = (productId: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change),
    }));
  };

  const subtotal = savedData.reduce((acc, item) => {
    const productMatch = savedProduct.find((p) => p.id === item.product);
    return acc + (productMatch ? productMatch.price * (quantities[item.id] || item.quantity) : 0);
  }, 0);

  const tax = subtotal * 0.12; // 12% NDS
  const total = subtotal + tax;

  return (
    <Box sx={{ display:'flex',justifyContent:"center",alignItems:"center",marginInline:"0px",width:"100%",minHeight:"80vh",  padding: 4 }}>
      <Card style={{maxWidth:"1200px",width:"100%", padding: 0, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 2, p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6">Order Items</Typography>
            </Box>

            {savedData.map((product) => {
              const productMatch = savedProduct.find((savedProductItem) => savedProductItem.id === product.product);
              if (!productMatch) return null;

              const currentQuantity = quantities[product.id] ?? 0;
              const totalPrice = currentQuantity * productMatch.price;
              
              return (
                <Box key={product.id} sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
                  <img
                    src={productMatch.image}
                    alt={productMatch.name}
                    style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" style={{color:"#c39c75"}}>{productMatch.name}</Typography>
                    <Typography color="text.secondary">Brand: {productMatch.brand}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Button 
                        
                        icon={<MinusOutlined />} 
                        onClick={() => updateQuantity(product.id, -1)} 
                        disabled={currentQuantity === 0} 
                        style={{ marginRight: '10px',marginLeft:'0px',backgroundColor: "#c39c75", borderColor: "#c39c75", color: "white" }}
                      />
                      <Typography>{currentQuantity}</Typography>
                      <Button 
                       
                        icon={<PlusOutlined />} 
                        onClick={() => updateQuantity(product.id, 1)} 
                        style={{ marginLeft: '10px',backgroundColor: "#c39c75", borderColor: "#c39c75", color: "white" }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="h6">{totalPrice.toFixed(2)}$</Typography>
                  </Box>
                </Box>
              );
            })}

            <Box sx={{ mt: 3 }}>
            <Input.Search
            placeholder="Have discount code? Click to enter it"
            enterButton={<Button style={{ backgroundColor: "#c39c75", borderColor: "#c39c75", color: "white" }}>Apply</Button>}
            size="large"
            />
            </Box>
          </Box>

          <Paper sx={{ flex: 1, p: 3, backgroundColor: "#f8f9fa" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Summary
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              The total cost includes a 12% tax (NDS).
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Subtotal</Typography>
              <Typography>{subtotal.toFixed(2)}$</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Tax (12% NDS)</Typography>
              <Typography>{tax.toFixed(2)}$</Typography>
            </Box>

            <Divider />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h6">TOTAL:</Typography>
              <Typography variant="h6">{total.toFixed(2)}$</Typography>
            </Box>

            <Button style={{ backgroundColor: "#c39c75", borderColor: "#c39c75", color: "white" }}  block size="large">
              Next step
            </Button>
          </Paper>
        </Box>
      </Card>
    </Box>
  );
};

export default ShoppingCart;
