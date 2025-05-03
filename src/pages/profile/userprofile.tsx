import { Box } from "@mui/system";
import { FunctionComponent, useEffect, useState } from "react";
import Navbarprofile from "./components/navbarprofile";
import { IEntity } from "../../modules/auth/types";
import { Api, Types } from "../../modules/auth";
// import Typography from "@mui/material/Typography";
import { Spin } from "antd";
import { Card, Avatar, Button } from "antd";
import {  Mail, MapPin, Phone } from "lucide-react";
import { Stack, Typography } from "@mui/material";
// import axios from "axios";
// import { Product } from "../services/types/product";
import { getCategory } from "../../api/api";
import { Link } from "react-router-dom";

interface UserProfileProps {}

const UserProfile: FunctionComponent<UserProfileProps> = () => {
  const [userdata, setUserdata] = useState<IEntity.User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserdata = async () => {
      try {
        const { data } = await Api.UserProfil();
        setUserdata(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUserdata();
  }, []);

    const [likes,setLiked] = useState<Types.IForm.getLikesPosts[]>([])
      const [posts,setPost] = useState<Types.IForm.PostsApi[]>([])
      // const [showMore, setShowMore] = useState(false);
      // const [likedProducts, setLikedProducts] = useState<Product[]>([]);
      // const [products, setProducts] = useState<Product[]>([]);
   
      useEffect(()=>{
      //   const headers = {
      //     'Authorization': `Bearer ${localStorage.getItem("access")}`,
      // };
        const getLikedPost = async() => {
          try {
              const {data} = await Api.getLikes()
              console.log(data);
              setLiked(data)
          } catch (error) {
              console.log(error);
              
          }
        }
        // const getLikedProducts = async () => {
        //   try {
        //     const { data } = await axios.get("https://aurabloom.ikramovna.me/api/v1/shop");
        //     setProducts(data); // Mahsulotlar ro'yxatini o'rnatish
        //   } catch (error) {
        //     console.error("Error fetching liked products:", error);
        //   }
        // };
        // const getLikedProduct = async () => {
        //   try {
        //     const { data } = await axios.get("https://aurabloom.ikramovna.me/api/v1/shop/favorite",{headers});
        //     setLikedProducts(data)  
        //   } catch (error) {
        //     console.log(error);
            
        //   }
        // }
        // getLikedProduct()
        // getLikedProducts();
        getLikedPost()
      },[])
        useEffect(()=> {
              const fetchData = async () => {
                  try {
                   const { data: categoryData } = await getCategory();
           
                   const { data: postData } = await Api.NewPostss();
                   const filteredPosts = postData.map(post => ({
                     ...post,
                     category: categoryData.find((cat: any) => cat.id === post.category)
                   }));
                  //  const productResponse = await axios.get('http://127.0.0.1:8000/api/v1/shop');
                
           
                   // Mahsulotlar va postlarni birlashtirish
                   setPost(filteredPosts); // products state-ni yangilash
                  } catch (error) {
                   console.log(error);
                  }
              }
              
              fetchData()   
          },[])

  function getInitials(fullName: string): string {
    const names: string[] = fullName.split(' ');
    const initials: string[] = names.map(name => name.charAt(0));
    return initials.join('').toUpperCase();
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </Box>
    );
  }

  const initials: string = getInitials(userdata?.full_name || "");
  console.log(userdata,'username');
  const [lastName = "", firstName = ""] = userdata?.full_name ? userdata.full_name.split(" ") : ["", ""];
  
  return (
    <Box sx={{width:"100%"}}>
      <Navbarprofile />
      <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(3, 1fr)" }} gap={4} p={4}>
      {/* Profile Card */}
      <Card style={{ textAlign: "center", padding: "16px" }}>
      {userdata?.image ? (
        <img
          src={userdata.image}
          width={200}
          height={200}
          style={{ borderRadius: "30px" }}
          alt=""
        />
      ) : (
        <Avatar
          style={{
            backgroundColor: "gray",
            color: "white",
            fontSize: "2rem",
            width: 200,
            height: 200,
            borderRadius: "30px",
            
          }}
        >
          {initials}
        </Avatar>
      )}
        <Typography variant="h6" sx={{ mt: 2 }}>
          {userdata?.full_name}
        </Typography>
        <Button  style={{ marginTop: "8px",backgroundColor:"#c39c75",color:"white" }}>
          Balance: 0$
        </Button>
        <Stack spacing={1} sx={{ mt: 2, alignItems: "center" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <MapPin size={18} /> {userdata?.address?.region} {userdata?.address?.district} {userdata?.address?.mahalla} {userdata?.address?.house}
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Mail size={18} /> {userdata?.email}
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Phone size={18} /> {userdata?.phone}
          </Box>
        </Stack>
      </Card>
      
      {/* Account Details */}
      <Card title="Account Details" >
      <Box sx={{padding:"20px"}}>
      <Typography sx={{width:'100%',display:'flex',justifyContent:'space-between'}} color={"#767676"}>First Name:<strong style={{marginRight:"0px"}}> {firstName}</strong></Typography>
      <Typography sx={{width:'100%',display:'flex',justifyContent:'space-between'}} color={"#767676"}>Last Name:<strong style={{marginRight:"0px"}}> {lastName}</strong></Typography>
      <Typography sx={{width:'100%',display:'flex',justifyContent:'space-between'}} color={"#767676"}>Gender:<strong style={{marginRight:"0px",}}> {userdata?.gender}</strong></Typography>
      <Typography sx={{width:'100%',display:'flex',justifyContent:'space-between'}} color={"#767676"}>Username:<strong style={{marginRight:"0px"}}> {userdata?.username}</strong></Typography>
      <Box
        sx={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h6" color={"#333"} sx={{ marginBottom: "10px" }}>
          Bio
        </Typography>
        <Typography color={"#767676"}>
          {userdata?.bio ? userdata.bio : "No bio available"}
        </Typography>
      </Box>

      {/* Social Media Links */}
      <Box
        sx={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h6" color={"#333"} sx={{ marginBottom: "10px" }}>
          Social Media
        </Typography>
        <Typography color={"#767676"}>
          Telegram: {userdata?.telegram || "Not provided"}
        </Typography>
        <Typography color={"#767676"}>
          Instagram: {userdata?.instagram || "Not provided"}
        </Typography>
        <Typography color={"#767676"}>
          Facebook: {userdata?.facebook || "Not provided"}
        </Typography>
      </Box>
      </Box>
      </Card>
      
      <Card
  title="Liked Services"
  extra={
   <Link to={"/profile/mylikes"}> <Typography
      color={"#c39c75"}
      sx={{
        cursor: "pointer",
        transition: "color 0.3s ease",
        "&:hover": { color: "#a67c52" },
      }}
      
    >
      View all
    </Typography>
    </Link>
  }
>
  <Box sx={{padding:'10px'}}>
  {likes.length > 0 ? (
    likes
      .slice(0, 3) // Faqat 3 ta elementni olish
      .map(({ service }) => {
        const likedPost = posts.find((post) => post.id === service);
        return likedPost ? (
          <Link to={`/service-detail/${likedPost.id}`}>
          <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "8px",
                transition: "background 0.3s ease, transform 0.2s ease",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  transform: "scale(1.02)",
                },
              }}
            >
            <img src={likedPost.image} width={100} height={100} alt="" style={{ borderRadius: "8px",marginLeft:'0px',marginRight:'0px',objectFit:'cover' }} />
            {/* <Typography>{likedPost.title}</Typography> */}
            <div style={{marginLeft:'0px'}}>
            <Typography>
                <span style={{ color: "#333", fontWeight: "bold" }}>Name:</span>{" "}
                <span style={{ color: "#c39c75", fontWeight: "bold" }}>{likedPost.name}</span>
              </Typography>
              <Typography>
                <span style={{ color: "#333", fontWeight: "bold" }}>Category:</span>{" "}
                <span style={{ color: "#c39c75", fontWeight: "bold" }}>{likedPost.category?.name}</span>
              </Typography>
              <Typography>
                <span style={{ color: "#333", fontWeight: "bold" }}>Price:</span>{" "}
                <span style={{ color: "#c39c75", fontWeight: "bold" }}>${likedPost.price}</span>
              </Typography>
              {/* <Typography>{likedPost.location?.region} {likedPost.location?.district} {likedPost.location?.mahalla} {likedPost.location?.house}</Typography> */}
              {/* <Typography>{likedPost.description}</Typography> */}
              {/* <Button  style={{ marginTop: "8px",backgroundColor:"#c39c75",color:'white' }}>
                Buy Now
              </Button> */}
            </div>
          </Box>
          </Link>
        ) : null;
      })
  ) : (
    <p>No liked services</p>
  )}
  </Box>
</Card>

      {/* Payment Methods */}
      {/* <Card title="Payment Methods" extra={<Edit2 size={18} />}>
        <img
          src="https://via.placeholder.com/150"
          alt="Visa Card"
          style={{ width: "100%", borderRadius: "8px" }}
        />
        <Typography><strong>Card Type:</strong> VISA</Typography>
        <Typography><strong>Card Holder:</strong> Mark Anderson</Typography>
        <Typography><strong>Expire:</strong> 12/31</Typography>
        <Typography><strong>Card Number:</strong> 0123 4567 8910 1112</Typography>
        <Typography><strong>Balance:</strong> $1,000,000</Typography>
      </Card> */}
      
   
      
    </Box>
    </Box>
  );
};

export default UserProfile;
