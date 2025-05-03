import React, {
 
  useState,
} from "react";
import { Card, Col, Row, Space, Typography } from "antd";
import { IconButton } from "@mui/material";

import {
  ClockCircleOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";

import { cardStyles } from "./card/styles";

import "./stylesss.css";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import shoppingcart from "../../assets/shopping-bag.png";

const { Title, Text } = Typography;

interface ProductCardProps {
  id: string | number;
  image: string;
  name: string;
  // profession: string;
  duration: string;
  description: string;
  is_like: boolean;
  is_saved: boolean;
  user: {
    name: string; // Assuming you're passing name instead of full_name
    avatar: string;
    id?: number | null;
    full_name?: string;
    address?: {
      id?: number | null;
      region?: string;
      district?: string;
      mahalla?: string;
      house?: string;
    };
    image?: string;
  };
  favorites_count: number | string;
  price: string | number;
  // onLikeToggle: () => void;
  // onSaveToggle: () => void;
  onBookNow: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  duration,
  description,
  is_like: initialIsLike,
  is_saved: initialIsSaved,
  favorites_count: initialFavoritesCount,
  price,
  user,
}) => {
  

  const navigate = useNavigate();
  
  const isUserLoggedIn = () => {
    return Boolean(localStorage.getItem("access")); // Adjust based on your auth logic
  };

  const [is_like, setIsLike] = useState<boolean>(() => {
    const storedLike = localStorage.getItem(`like-${id}`);
    return storedLike ? JSON.parse(storedLike) : initialIsLike;
  });

  const [is_saved, setIsSaved] = useState<boolean>(() => {
    const storedSaved = localStorage.getItem(`saved-${id}`);
    return storedSaved ? JSON.parse(storedSaved) : initialIsSaved;
  });

  // Initialize favorites_count with value from localStorage or initial prop
  const [favorites_count, setFavoritesCount] = useState<number>(() => {
    const storedFavoritesCount = localStorage.getItem(`favorites-count-${id}`);
    return storedFavoritesCount
      ? JSON.parse(storedFavoritesCount)
      : Number(initialFavoritesCount);
  });

  const [showMore, setShowMore] = useState<boolean>(false);

  // Handle like toggle
  const handleLikeToggle = async (id: any) => {
    if (!isUserLoggedIn()) {
      notification.warning({
        message: "Please Log In",
        description: "You need to log in to like this item.",
        duration: 3, 
      });
      return;
    }

    const newIsLike = !is_like;
    const newFavoritesCount = newIsLike
      ? favorites_count + 1
      : favorites_count - 1;

 
    setIsLike(newIsLike);
    setFavoritesCount(newFavoritesCount);

  
    localStorage.setItem(`like-${id}`, JSON.stringify(newIsLike));
    localStorage.setItem(
      `favorites-count-${id}`,
      JSON.stringify(newFavoritesCount)
    );

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      };

      const response = await fetch(
        `https://aurabloom.ikramovna.me/api/v1/favorite`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            service: id,
            like: newIsLike,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle like");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      
      setIsLike(is_like);
      setFavoritesCount(favorites_count);
    }
  };

 
  const handleSaveToggle = async (
    id: any,
    productImage: string,
    productTitle: string
  ) => {
    if (!isUserLoggedIn()) {
      notification.warning({
        message: "Please Log In",
        description: "You need to log in to save this item.",
        duration: 3,
        placement: "top",
      });
      return;
    }

    const newIsSaved = !is_saved;
    setIsSaved(newIsSaved);
    localStorage.setItem(`saved-${id}`, JSON.stringify(newIsSaved));

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      };

      const response = await fetch(
        `https://aurabloom.ikramovna.me/api/v1/saved`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            service: id,
            saved: newIsSaved,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle saved");
      }

    
      if (newIsSaved) {
        notification.success({
          message: "Item Added to Cart",
          description: (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={productImage}
                alt={productTitle}
                style={{
                  width: 50,
                  height: 50,
                  marginInlineStart: "0px !important",
                  marginRight: 10,
                  borderRadius: 5,
                }}
              />
              <div>
                <strong>{productTitle}</strong>
               
              </div>
            </div>
          ),
          placement: "top",
          duration: 3,
        });
      } else {
        notification.error({
          message: "Item deleted to Cart",
          description: (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={productImage}
                alt={productTitle}
                style={{
                  width: 50,
                  height: 50,
                  marginInlineStart: "0px !important",
                  marginRight: 10,
                  borderRadius: 5,
                }}
              />
              <div>
                <strong>{productTitle}</strong>
              
              </div>
            </div>
          ),
          placement: "top",
          duration: 3,
        });
      }
      //  setDisabled(true)
    } catch (error) {
      console.error("Error toggling saved:", error);
      setIsSaved(is_saved);
    }
  };
  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const navigateDetailPage = (navigateid: any) => {
    navigate(`/service-detail/${navigateid}`);
  };

  return (
    <Card
      hoverable
      style={cardStyles.card}
      styles={{
        body: cardStyles.contentWrapper,
      }}
      cover={
        <div style={cardStyles.imageContainer}>
          <img
            alt={name}
            src={image}
            style={cardStyles.image}
            onClick={() => navigateDetailPage(id)}
          />
          <div style={cardStyles.bookmarkButton}>
            <div
              onClick={() => handleLikeToggle(id)}
              style={{
                cursor: "pointer",
                width: "25px",
                height: "25px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {is_like ? (
                <HeartFilled style={{ color: "#ff4d4f", fontSize: "22px" }} />
              ) : (
                <HeartOutlined style={{ fontSize: "22px" }} />
              )}
            </div>
          </div>
        </div>
      }
    >
      <div style={{ padding: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px",
          }}
          onClick={() => navigateDetailPage(id)}
        >
          <img
            src={user.image}
            alt={name}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              marginLeft: "0px",
              marginRight: "0px",
              display: "block",
            }}
          />
          <div style={{ marginLeft: "0px" }}>
            <Title
              level={5}
              style={{
                margin: "0 0 0 0px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "210px",
              }}
              onClick={() => navigateDetailPage(id)}
            >
              {name}
            </Title>
            <Text
              type="secondary"
              style={{
                fontSize: "14px",
                display: "felex",
                gap: "10px",
                marginTop: "4px",
              }}
            >
              <ClockCircleOutlined
                style={{ color: "#c39c75", marginInline: "5px" }}
              />
              <Text type="secondary">{duration}</Text>
            </Text>
          </div>
        </div>
        {description && (
          <Text
            style={{
              paddingTop: "0px",
              display: "block",
              paddingBottom: "10px",
            }}
            onClick={() => navigateDetailPage(id)}
          >
            <div
              style={{
                fontSize: "16px",
                height: showMore ? "auto" : "27px",
                overflow: "hidden",
                lineHeight: "1.5",
              }}
            >
              {description}
            </div>
            {description.length > 20 && (
              <Typography
                onClick={toggleShowMore}
                style={{ cursor: "pointer", color: "#c39c75" }}
              >
                {showMore ? "Show Less" : "Show More"}
              </Typography>
            )}
          </Text>
        )}
        <Row
          justify="space-between"
          align="middle"
          style={{ width: "100%", padding: "0px", marginLeft: "0px" }}
        >
          <Col>
            <Space>
              <IconButton
                size="small"
                onClick={() => handleSaveToggle(id, image, name)}
                style={{
                  color: is_saved ? "#c39c75" : "rgba(0, 0, 0, 0.45)",
                  border: "1px solid black",
                }}
              >
                <img src={shoppingcart} width={20} height={20} alt="" />
              </IconButton>
            </Space>
          </Col>
          <Col>
            <Text strong style={{ fontSize: "20px", color: "#c39c75" }}>
              <span>$</span>
              {new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0, 
              }).format(
                parseFloat(
                  String(price).replace(/[^0-9.-]+/g, "") 
                )
              )}
            </Text>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default ProductCard;
