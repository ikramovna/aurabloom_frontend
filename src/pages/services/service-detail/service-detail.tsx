import {
  Typography,
  Container,
  Grid,
  CircularProgress,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Modal, notification } from "antd";
import Booking from "../../home/booking/booking";
import { Share2 } from "lucide-react";
import copylink from "../../../assets/link.png";
import telegram from "../../../assets/telegram.png";
import instagram from "../../../assets/instagram.png";
import "./service-detail.css"

const ServiceDetailPage = () => {
  const { id } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  console.log(isSaved);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const copyToClipboard = () => {
    const currentUrl = window.location.href; 
    navigator.clipboard.writeText(currentUrl);
    alert("Link copied!");
  };

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(
          `https://aurabloom.ikramovna.me/api/v1/service/list?id=${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch service details.");
        }
        const data = await response.json();
        setIsLiked(data.is_like);
        setIsSaved(data.is_saved);
        setService(data);
      } catch (err) {
        setError("Error fetching service details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchServiceDetails();
  }, [id]);
  console.log(service, "service details");
  const [isLikes, setIsLikes] = useState<Record<number, boolean>>({});
  const [favoritesCounts, setFavoritesCounts] = useState<
    Record<number, number>
  >({});
  const isUserLoggedIn = () => {
    return Boolean(localStorage.getItem("access")); // Adjust based on your auth logic
  };
  const handleLikeToggle = async (id: number) => {
    if (!isUserLoggedIn()) {
      notification.warning({
        message: "Please Log In",
        description: "You need to log in to like this item.",
        duration: 3,
      });
      return;
    }

    setIsLikes((prev) => {
      const newIsLike = !prev[id];
      return { ...prev, [id]: newIsLike };
    });

    setFavoritesCounts((prev) => {
      const newFavoritesCount = isLikes[id]
        ? (prev[id] || 0) - 1
        : (prev[id] || 0) + 1;
      return { ...prev, [id]: newFavoritesCount };
    });

    localStorage.setItem(`like-${id}`, JSON.stringify(!isLikes[id]));
    localStorage.setItem(
      `favorites-count-${id}`,
      JSON.stringify(favoritesCounts[id] || 0)
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
            service: +id,
            like: !isLikes[id],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle like");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      setIsLikes((prev) => ({ ...prev, isLikes }));
      setFavoritesCounts((prev) => ({
        ...prev,
        [id]: favoritesCounts[id] || 0,
      }));
    }
  };
  console.log(isLikes, isLiked, favoritesCounts, "likes count");
  const user_status = localStorage.getItem('userStatus')

  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white", // Light overlay effect
          zIndex: 9999,
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container style={{ textAlign: "center", paddingTop: "20px" }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: "white",height:"auto",maxWidth:"1200px",paddingInline:"40px",paddingBlock:"40px" }}>
        <Box sx={{height:"100%",display:"flex",alignItems:"center",maxWidth:"1200px"}}>
          {service.map((item: any) => (
            <Grid container spacing={3} key={item.id}>
              <Grid item xs={12} md={6}>
                <img
                  src={item?.image}
                  alt="Service"
                  style={{
                    width: "100%",
                    
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  className={"responsive-image"}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Box mt={1} mb={1} display="flex" alignItems="center">
                  <img
                    src={item?.user?.image || "/path/to/default-user.jpg"}
                    alt={item?.user?.full_name || "User"}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      marginRight: 10,
                      marginLeft: "0px",
                    }}
                  />
                  <Typography variant="body1">
                    {item?.user?.full_name || "Unknown Provider"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    {item?.name}
                  </Typography>

                  <Box display="flex" alignItems="center">
                    {/* Like Button */}
                    <div
                      onClick={() => handleLikeToggle(item?.id)}
                      style={{
                        cursor: "pointer",
                        width: "25px",
                        height: "25px",
                        display: "flex",
                        alignItems: "center",
                        marginRight: 8,
                      }}
                    >
                      {isLikes[item?.id] ? (
                        <HeartFilled
                          style={{ color: "#ff4d4f", fontSize: "22px" }}
                        />
                      ) : (
                        <HeartOutlined style={{ fontSize: "22px" }} />
                      )}
                    </div>
                    <IconButton onClick={handleOpen}>
                      <Share2 />
                    </IconButton>
                    <Modal
                      open={isModalOpen}
                      onCancel={handleClose}
                      style={{ textAlign: "center" }}
                      width={350}
                      footer={[,]}
                    >
                      <Typography variant="h6" mt={3} mb={2}>
                        Share {item.name}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        <Button onClick={() => copyToClipboard()} sx={{height:"60px"}} className="copy-button">
                          <img
                            style={{ width: "40px", height: "40px" }}
                            src={copylink}
                            alt=""
                            className="copy-icon"
                          />
                        </Button>
                        <Button
                          href={`https://t.me/share/url?url=${encodeURIComponent(
                            item.link
                          )}`}
                          className="copy-button"
                          sx={{height:"60px"}}
                          target="_blank"
                        >
                          <img
                            style={{ width: "40px", height: "40px" }}
                            src={telegram}
                            alt=""
                            className="copy-icon"
                          />
                        </Button>
                        <Button
                        className="copy-button"
                          href="https://www.instagram.com/"
                          target="_blank"
                        sx={{height:"60px"}}>
                          <img
                            style={{ width: "40px", height: "40px" }}
                            src={instagram}
                            alt=""
                             className="copy-icon"  
                          />
                        </Button>
                      </div>
                    </Modal>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  maxWidth={"60%"}
                  marginLeft={0}
                  justifyContent={"space-between"}
                  alignItems="center"
                  mt={1}
                >
                  <Typography textAlign={"start"} fontSize={"20px"}>
                    Price
                  </Typography>
                  <Typography variant="h6" style={{ fontWeight: "800",color:"#c39c75" }}>
                    {item?.price}$
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  maxWidth={"60%"}
                  marginLeft={0}
                  justifyContent={"space-between"}
                  alignItems="center"
                  
                >
                  <Typography textAlign={"start"} fontSize={"20px"}>
                    Duration
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "800", marginBottom: "10px",color:"#c39c75" }}
                  >
                    {item?.duration}
                  </Typography>
                </Box>
                <Typography>{item?.description}</Typography>
             
               {
                user_status === "user" ?<Booking
                id={item?.id}
                serviceName={item?.name}
                price={item?.price}
                duration={item?.duration}
              />:""
               }
                

             
              </Grid>
            </Grid>
          ))}
      </Box>
    </div>
  );
};

export default ServiceDetailPage;
