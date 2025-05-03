/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useEffect, useState } from "react";
import navbarbackIcon from "../../assets/navbarbackIcon.svg";
import { Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/system/Unstable_Grid";
import axios from "axios";
import { Eye, ShoppingCart } from "lucide-react";
import nobookmark from "../../assets/nobookmark.png";

interface MysavedProps {}

interface SavedProduct {
  view: any;
  product: any;
  id: number;
  title: string;
  price: number;
  image: string;
}

const Mysaved: FunctionComponent<MysavedProps> = () => {
  const navigate = useNavigate();
  const [savedData, setSavedData] = useState<SavedProduct[]>([]);
  const [savedProduct, setSavedProduct] = useState<SavedProduct[]>([]);

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
        console.log("Fetched saved data:", data);
        setSavedData(data);
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

  const handleAddToCart = async (productId: number) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      };

      const body = {
        product: productId,
        saved: false, // Mahsulotni saqlanganlardan o‘chirish
      };

      await axios.post(
        "https://aurabloom.ikramovna.me/api/v1/shop/saved",
        body,
        { headers }
      );

      console.log(`Product ${productId} removed from saved items.`);
    } catch (error) {
      console.error("Error updating saved product:", error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          paddingLeft: "40px",
          paddingRight: "40px",
          marginTop: "32px",
          marginBottom: "31px",
        }}
      >
        <img
          width={32}
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer", marginLeft: "0px", marginRight: "42%" }}
          height={32}
          src={navbarbackIcon}
          alt="backicon"
        />
        <Typography
          sx={{
            color: "#000",
            fontFamily: "Inter,sans-serif",
            fontSize: "25px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
          }}
        >
          Saved Products
        </Typography>
      </Box>

      {savedData.length < 1 ? (
        <Box>
          <Typography
            sx={{
              width: "100%",
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "40px",
              fontSize: "25px",
            }}
          >
            You don't have saved products.
          </Typography>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <img src={nobookmark} height={"100px"} alt="No saved products" />
          </Box>
        </Box>
      ) : (
        <Box>
          <Grid container spacing={2} padding={2} sx={{ margin: "0px" }}>
            {savedData.map((product) => {
              const productMatch = savedProduct.find(
                (savedProduct) => savedProduct.id === product.product
              );
              if (productMatch) {
                return (
                  <Grid
                    key={productMatch.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    spacing={0}
                    container
                  >
                    <Link
                      to={`/product/${productMatch.id}`}
                      className="shop-card"
                    >
                      <div className="shop-card-image">
                        <img
                          src={productMatch.image}
                          alt={productMatch.title}
                        />
                        <div
                          className="shop-card-overlay"
                          style={{ zIndex: "100" }}
                        >
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(productMatch.id);
                            }}
                            className="shop-card-button in-cart"
                            style={{ cursor: "pointer" }}
                          >
                            <ShoppingCart className="shop-card-icon in-cart" />
                          </button>
                        </div>
                      </div>
                      <div className="shop-card-content">
                        <h4 className="shop-card-title">
                          {productMatch.title}
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                          }}
                        >
                          <span className="shop-card-price">
                            {new Intl.NumberFormat().format(
                              Number(productMatch.price)
                            )}{" "}
                            <span style={{ color: "rgb(195, 156, 117)" }}>
                              $
                            </span>
                          </span>
                          <div className="shop-card-views">
                            <Eye className="shop-card-views-icon" />
                            <span>{productMatch.view}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Grid>
                );
              }
              return null;
            })}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Mysaved;
