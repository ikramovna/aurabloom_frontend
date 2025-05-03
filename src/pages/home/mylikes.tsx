/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "@mui/system";
import { FunctionComponent, useEffect, useState } from "react";
import navbarbackIcon from "../../assets/navbarbackIcon.svg"
import {
    Typography,
    // Avatar,
    CardActions,
    CardContent,
    CardMedia,
    CardHeader,
    Card,
  } from "@mui/material";
  // import logouser from "../../assets/user.png";
import liked from "../../assets/liked.svg";
import '../shop/components/products.css';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

   


import { Link, useNavigate } from "react-router-dom";
import { Api, Types } from "../../modules/auth";
import Grid from "@mui/system/Unstable_Grid";
import { getCategory } from "../../api/api";
import axios from "axios";
import {
  //  Bookmark, 
   Eye, Heart, User } from "lucide-react";
import { Product } from "../services/types/product";
import Booking from "./booking/booking";
import dislike from "../../assets/dislike.png"


interface MylikesProps {
    
}
 
// interface LikedProduct {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
// }

const Mylikes: FunctionComponent<MylikesProps> = () => {

    const navigate = useNavigate()

    const [likes,setLiked] = useState<Types.IForm.getLikesPosts[]>([])
    const [posts,setPost] = useState<Types.IForm.PostsApi[]>([])
    const [showMore, setShowMore] = useState(false);
    const [likedProducts, setLikedProducts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
 
    useEffect(()=>{
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
    };
      const getLikedPost = async() => {
        try {
            const {data} = await Api.getLikes()
            console.log(data);
            setLiked(data)
        } catch (error) {
            console.log(error);
            
        }
      }
      const getLikedProducts = async () => {
        try {
          const { data } = await axios.get("https://aurabloom.ikramovna.me/api/v1/shop");
          setProducts(data); // Mahsulotlar ro'yxatini o'rnatish
        } catch (error) {
          console.error("Error fetching liked products:", error);
        }
      };
      const getLikedProduct = async () => {
        try {
          const { data } = await axios.get("https://aurabloom.ikramovna.me/api/v1/shop/favorite",{headers});
          setLikedProducts(data)  
        } catch (error) {
          console.log(error);
          
        }
      }
      getLikedProduct()
      getLikedProducts();
      getLikedPost()
    },[])
    console.log(products,likedProducts,"12345");
    
    // useEffect(() => {
    //   // Mahsulotlar ichidan like_count > 0 bo'lganlarini ajratib olish
    //   const likedProductList = products.filter((product) => product.like_count > 0);
    //   setLikedProducts(likedProductList);
    // }, [products]);

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
    console.log(liked,'salomwe',);
    

    return ( 
        <Box sx={{width:"100%"}}>
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
        style={{ cursor: "pointer", marginLeft: "0px",marginRight:"42%" }}
        height={32}
        src={navbarbackIcon}
        alt="backicon"
      />
      {
        likedProducts.length > 0 ? (<Typography></Typography>):(<Typography
          sx={{
            color: "#000",
            fontFamily: "Inter,sans-serif",
            fontSize: "25px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
          }}
        >
          Liked Services
        </Typography>)
      }
      
      
      </Box>
      <Box>
      {
        likedProducts.length > 0 ? (<Box>
          <Box sx={{ width: "100%", display: "flex", alignItems: "center", paddingLeft: "40px", paddingRight: "40px", marginTop: "32px", marginBottom: "31px" }}>
        {/* <img width={32} onClick={() => navigate(-1)} style={{ cursor: "pointer", marginLeft: "0px", marginRight: "42%" }} height={32} src={navbarbackIcon} alt="backicon" /> */}
        <Typography sx={{ color: "#000",width:"100%", fontFamily: "Inter,sans-serif", fontSize: "25px", fontWeight: 500, lineHeight: "normal",textAlign:"center" }}>
          Liked Products
        </Typography>
      </Box>
     
      {likedProducts.length === 0 ? (
        <Box>
        <Typography sx={{width:"100%",textAlign:"center",marginBottom:"40px"}}><Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
          {/* <img src={dislike} height={"100px"} alt="" /> */}
          <DotLottieReact
  src="https://lottie.host/8891bdd9-4669-42d8-8bca-7003f925d73d/n5W78nMgAA.lottie"
  loop
  autoplay
  style={{ width: "300px", height: "300px" }} 
/>
        </Box><Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
          {/* <img src={dislike} height={"100px"} alt="" /> */}
          <DotLottieReact
  src="https://lottie.host/8891bdd9-4669-42d8-8bca-7003f925d73d/n5W78nMgAA.lottie"
  loop
  autoplay
  style={{ width: "300px", height: "300px" }} 
/>
        </Box><Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
          {/* <img src={dislike} height={"100px"} alt="" /> */}
          <DotLottieReact
  src="https://lottie.host/8891bdd9-4669-42d8-8bca-7003f925d73d/n5W78nMgAA.lottie"
  loop
  autoplay
  style={{ width: "300px", height: "300px" }} 
/>
        </Box></Typography>
        <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
          <img src={dislike} height={"100px"} alt="" />
        </Box>
        </Box>
      ) : (
        // <ul>
        <Box sx={{marginBottom:"30px"}}>
          <Grid container spacing={2} padding={2} sx={{margin:"0 0 0px 0"}}>

          
          {likedProducts.map((product) => {
            const productMatch = products.find((savedProduct) => savedProduct.id === product.product);
            if (productMatch) {
              return (
  //               <Grid  key={productMatch.id} xs={12} sm={6} md={4} lg={4} spacing={0} container>
  //             <Card  sx={{ width: "100%", boxShadow: "none" }}>
  //               <CardMedia
  //   sx={{
  //     objectFit: "cover", // Ensures the image fits the area
  //     borderRadius: "20px",
  //     width: "100%", // Full width of the card
  //     height: "300px", // Fixed height
  //   }}
  //   component="img"
  //   image={productMatch.image}
  //   alt={productMatch.title}
  // />
  //               <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
  //                 <Box sx={{ display: "flex", alignItems: "center", marginLeft: "0px" }}>
  //                   {/* <img src={liked} style={{ marginRight: "10px", marginLeft: "0px" }} alt="likes" /> */}
  //                   {/* <Heart style={{ marginRight: "10px", marginLeft: "0px",color:"rgb(195, 156, 117)" }}/> */}
  //                   <Heart className={`shop-card-icon  liked `} />
  //                 </Box>
  //               </CardActions>
  //               <CardContent sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
  //                 <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>{product.title}</Typography>
  //               </CardContent>
  //               <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
  //                 <Typography className="shop-card-views">
  //                 <Eye className="shop-card-views-icon" />
  //                 {/* <span>{product.view.toLocaleString()}</span> */}
  //                 <span>{productMatch.view}</span>
  //                 </Typography>
  //                 <Typography sx={{ fontSize: "22px", fontWeight: 700, color: "rgb(195, 156, 117)" }}>
  //   {new Intl.NumberFormat().format(Number(productMatch.price))} <span style={{ color: "rgb(195, 156, 117)" }}>$</span>
  // </Typography>
  //               </CardContent>
  //             </Card>
  //             </Grid>
  <Grid  key={productMatch.id} xs={12} sm={6} md={4} lg={3} spacing={0} container>
  <Link to={`/product/${productMatch.id}`} className="shop-card">
      <div className="shop-card-image">
        <img src={productMatch.image} alt={productMatch.title} />
        <div className="shop-card-overlay" style={{zIndex:'100'}}>
          <button
            // onClick={toggleLike}
            className={`shop-card-button  liked`}
            style={{marginRight:'0px !important',cursor:"pointer"}}
          >
            <Heart className={`shop-card-icon liked`} />
          </button>
          {/* <button
            onClick={handleAddToCart}
            className={`shop-card-button ${isInCart ? 'in-cart' : ''}`}
            style={{marginLeft: '0px !important',cursor:"pointer"}}
          >
            <ShoppingCart className={`shop-card-icon ${isInCart ? 'in-cart' : 'default'}`} />
          </button> */}
        </div>
      </div>
      <div className="shop-card-content">
        <h4 className="shop-card-title">{productMatch.title}</h4>
        <div  style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:2}}>
          <span className="shop-card-price">{new Intl.NumberFormat().format(Number(productMatch.price))} <span style={{ color: "rgb(195, 156, 117)" }}>$</span></span>
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
            <Box>
            <Typography
          sx={{
            color: "#000",
            fontFamily: "Inter,sans-serif",
            fontSize: "25px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            textAlign:"center"
          }}
        >
          Liked Services
        </Typography>
      <Grid container spacing={2} padding={2} sx={{margin:"0px"}}>
      { likes.length > 0 ? (likes.map(({ service }) => {
  const likedPost = posts.find((post) => post.id === service);
  if (likedPost) {
    return (
      <Grid  key={likedPost.id} xs={12} sm={6} md={4} lg={2.4} spacing={0} container>
      <Card sx={{ width: "100%", boxShadow: "none",borderRadius:"20px",position:"relative" }}>
        <CardMedia sx={{ objectFit: "cover", borderTopLeftRadius:'20px',borderTopRightRadius:'20px' }} component="img" height="300" image={likedPost.image} alt="Paella dish" />
        <Box sx={{display:"flex"}}>
        <CardHeader
          sx={{ paddingLeft: "10px", paddingRight: "5px",marginLeft:"0px",paddingTop:'10px' }}
          avatar={
            // <Avatar aria-label="recipe">
            //   <img src={likedPost.user.image === null ? logouser : likedPost.user.image} width={40} height={40} alt="" />
            // </Avatar>
            <Box>
            {likedPost.user.image === null ? <User style={{width:"40px",height:"40px",color:"rgb(195, 156, 117)"}}/>:<img src={likedPost.user.image } style={{borderRadius:'50px'}} width={40} height={40} alt="" /> }
            
            </Box>
          }
          title={likedPost.user.full_name} 
        />
        <CardActions disableSpacing sx={{ justifyContent: "space-between",marginRight:"0px" }}>
          <Box sx={{ display: "flex", position:'absolute', top:'10px',right:"0", alignItems: "center", marginLeft: "0px" }}>
          <img
              src={liked}
              style={{ marginRight: "10px", marginLeft: "0px" }}
              alt="likes"
            />
          </Box>
        </CardActions>
        </Box>
       <CardContent sx={{ paddingTop: "0px",paddingBottom:"0px",paddingInline:'0px !important'}}>
          {likedPost.description && (
<CardContent sx={{ paddingTop: "0px",paddingInline:"10px !important",paddingBottom:'10px !important' }}>
  <Typography variant="body2" sx={{ fontSize: "14px", height: showMore ? "auto" : "34px", overflow: "hidden" }} color="text.secondary">
    {likedPost.description}
  </Typography>
  {likedPost.description.length > 10 && (
    <Typography onClick={() => setShowMore(!showMore)} sx={{ cursor: "pointer", color: "black" }}>
      {showMore ? "short" : "..."}
    </Typography>
  )}
</CardContent>
)}
          </CardContent>
        <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between",paddingTop:'0px !important',paddingInline:'10px !important' }}>
          <Typography
            sx={{
              padding: "12px 14px",
              borderRadius: "100px",
              background: "#F5EFE1",
              whiteSpace: "nowrap",
              fontFamily: "Inter,sans-serif",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
            color="text.secondary"
          >
            {likedPost.category.name}
          </Typography>
          
        </CardContent>
        <Box sx={{paddingBottom:"20px",paddingInline:'10px',display:"flex",alignItems:"center"}}>
        <Typography sx={{ width:"50%", fontSize: "22px", fontWeight: 700, color: "rgb(195, 156, 117)"}}>
            {new Intl.NumberFormat().format(parseFloat(likedPost.price) * 1)} <span style={{ color: "rgb(195, 156, 117)" }}>$</span>
          </Typography>
          <Box sx={{width:"50%",textAlign:"end"}}>

          <Booking id={likedPost.user.id} serviceName={likedPost.category.name} price={new Intl.NumberFormat().format(parseFloat(likedPost.price) * 1)}  duration={likedPost.category.duration}/>
          </Box>
        </Box>
      </Card>
    </Grid>
    );
  }
        return null;
      })):(<Box><Typography sx={{fontSize:"25px",textAlign:"center"}}></Typography>
      <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
          {/* <img src={dislike} height={"100px"} alt="" /> */}
          <DotLottieReact
  src="https://lottie.host/8891bdd9-4669-42d8-8bca-7003f925d73d/n5W78nMgAA.lottie"
  loop
  autoplay
  style={{ width: "300px", height: "300px" }} 
/>
        </Box>
      </Box>)}
      </Grid>
      </Box>
        </Box>):(<Box>
          <Box>
      <Grid container spacing={2} padding={2} sx={{margin:"0px"}}>
      { likes.length > 0 ? (likes.map(({ service }) => {
  const likedPost = posts.find((post) => post.id === service);
  if (likedPost) {
    return (
      <Grid  key={likedPost.id} xs={12} sm={6} md={4} lg={2.4} spacing={0} container>
        <Card sx={{ width: "100%", boxShadow: "none",borderRadius:"20px",position:"relative" }}>
          <CardMedia sx={{ objectFit: "cover", borderTopLeftRadius:'20px',borderTopRightRadius:'20px' }} component="img" height="300" image={likedPost.image} alt="Paella dish" />
          <Box sx={{display:"flex"}}>
          <CardHeader
            sx={{ paddingLeft: "10px", paddingRight: "5px",marginLeft:"0px",paddingTop:'10px' }}
            avatar={
              // <Avatar aria-label="recipe">
              //   <img src={likedPost.user.image === null ? logouser : likedPost.user.image} width={40} height={40} alt="" />
              // </Avatar>
              <Box>
              {likedPost.user.image === null ? <User style={{width:"40px",height:"40px",color:"rgb(195, 156, 117)"}}/>:<img src={likedPost.user.image } style={{borderRadius:'50px'}} width={40} height={40} alt="" /> }
              
              </Box>
            }
            title={likedPost.user.full_name} 
          />
          <CardActions disableSpacing sx={{ justifyContent: "space-between",marginRight:"0px" }}>
            <Box sx={{ display: "flex", position:'absolute', top:'10px',right:"0", alignItems: "center", marginLeft: "0px" }}>
            <img
                src={liked}
                style={{ marginRight: "10px", marginLeft: "0px" }}
                alt="likes"
              />
            </Box>
          </CardActions>
          </Box>
         <CardContent sx={{ paddingTop: "0px",paddingBottom:"0px",paddingInline:'0px !important'}}>
            {likedPost.description && (
  <CardContent sx={{ paddingTop: "0px",paddingInline:"10px !important",paddingBottom:'10px !important' }}>
    <Typography variant="body2" sx={{ fontSize: "14px", height: showMore ? "auto" : "34px", overflow: "hidden" }} color="text.secondary">
      {likedPost.description}
    </Typography>
    {likedPost.description.length > 10 && (
      <Typography onClick={() => setShowMore(!showMore)} sx={{ cursor: "pointer", color: "black" }}>
        {showMore ? "short" : "..."}
      </Typography>
    )}
  </CardContent>
)}
            </CardContent>
          <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between",paddingTop:'0px !important',paddingInline:'10px !important' }}>
            <Typography
              sx={{
                padding: "12px 14px",
                borderRadius: "100px",
                background: "#F5EFE1",
                whiteSpace: "nowrap",
                fontFamily: "Inter,sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
              color="text.secondary"
            >
              {likedPost.category.name}
            </Typography>
            
          </CardContent>
          <Box sx={{paddingBottom:"20px",paddingInline:'10px',display:"flex",alignItems:"center"}}>
          <Typography sx={{ width:"50%", fontSize: "22px", fontWeight: 700, color: "rgb(195, 156, 117)"}}>
              {new Intl.NumberFormat().format(parseFloat(likedPost.price) * 1)} <span style={{ color: "rgb(195, 156, 117)" }}>$</span>
            </Typography>
            <Box sx={{width:"50%",textAlign:"end"}}>

            <Booking id={likedPost.user.id} serviceName={likedPost.category.name} price={new Intl.NumberFormat().format(parseFloat(likedPost.price) * 1)}  duration={likedPost.category.duration}/>
            </Box>
          </Box>
        </Card>
      </Grid>
    );
  }
        return null;
      })):(<Box>
        {/* <Typography sx={{fontSize:"25px",textAlign:"center"}}>You don't have liked services</Typography> */}
      <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
          {/* <img src={dislike} height={"100px"} alt="" /> */}
          <DotLottieReact
  src="https://lottie.host/8891bdd9-4669-42d8-8bca-7003f925d73d/n5W78nMgAA.lottie"
  loop
  autoplay
  style={{ width: "300px", height: "300px" }} 
/>
        </Box>
      </Box>)}
      </Grid>
      </Box>
      <Box sx={{ width: "100%", display: "flex", alignItems: "center", paddingLeft: "40px", paddingRight: "40px", marginTop: "32px", marginBottom: "31px" }}>
        {/* <img width={32} onClick={() => navigate(-1)} style={{ cursor: "pointer", marginLeft: "0px", marginRight: "42%" }} height={32} src={navbarbackIcon} alt="backicon" /> */}
        <Typography sx={{ color: "#000",width:"100%", fontFamily: "Inter,sans-serif", fontSize: "25px", fontWeight: 500, lineHeight: "normal",textAlign:"center" }}>
          Liked Products
        </Typography>
      </Box>
     
      {likedProducts.length === 0 ? (
        <Box>
        <Typography sx={{fontSize:"25px",width:"100%",textAlign:"center",marginBottom:"40px"}}></Typography>
        <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
        <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
          {/* <img src={dislike} height={"100px"} alt="" /> */}
          <DotLottieReact
  src="https://lottie.host/8891bdd9-4669-42d8-8bca-7003f925d73d/n5W78nMgAA.lottie"
  loop
  autoplay
  style={{ width: "300px", height: "300px" }} 
/>
        </Box>
        </Box>
        </Box>
      ) : (
        // <ul>
        <Box sx={{marginBottom:"30px"}}>
          <Grid container spacing={2} padding={2} sx={{margin:"0 0 0px 0"}}>

          
          {likedProducts.map((product) => {
            const productMatch = products.find((savedProduct) => savedProduct.id === product.product);
            if (productMatch) {
              return (
  //               <Grid  key={productMatch.id} xs={12} sm={6} md={4} lg={4} spacing={0} container>
  //             <Card  sx={{ width: "100%", boxShadow: "none" }}>
  //               <CardMedia
  //   sx={{
  //     objectFit: "cover", // Ensures the image fits the area
  //     borderRadius: "20px",
  //     width: "100%", // Full width of the card
  //     height: "300px", // Fixed height
  //   }}
  //   component="img"
  //   image={productMatch.image}
  //   alt={productMatch.title}
  // />
  //               <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
  //                 <Box sx={{ display: "flex", alignItems: "center", marginLeft: "0px" }}>
  //                   {/* <img src={liked} style={{ marginRight: "10px", marginLeft: "0px" }} alt="likes" /> */}
  //                   {/* <Heart style={{ marginRight: "10px", marginLeft: "0px",color:"rgb(195, 156, 117)" }}/> */}
  //                   <Heart className={`shop-card-icon  liked `} />
  //                 </Box>
  //               </CardActions>
  //               <CardContent sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
  //                 <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>{product.title}</Typography>
  //               </CardContent>
  //               <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
  //                 <Typography className="shop-card-views">
  //                 <Eye className="shop-card-views-icon" />
  //                 {/* <span>{product.view.toLocaleString()}</span> */}
  //                 <span>{productMatch.view}</span>
  //                 </Typography>
  //                 <Typography sx={{ fontSize: "22px", fontWeight: 700, color: "rgb(195, 156, 117)" }}>
  //   {new Intl.NumberFormat().format(Number(productMatch.price))} <span style={{ color: "rgb(195, 156, 117)" }}>$</span>
  // </Typography>
  //               </CardContent>
  //             </Card>
  //             </Grid>
  <Grid  key={productMatch.id} xs={12} sm={6} md={4} lg={2.4} spacing={0} container>
  <Link to={`/product/${productMatch.id}`} className="shop-card">
      <div className="shop-card-image">
        <img src={productMatch.image} alt={productMatch.title} />
        <div className="shop-card-overlay" style={{zIndex:'100'}}>
          <button
            // onClick={toggleLike}
            className={`shop-card-button  liked`}
            style={{marginRight:'0px !important',cursor:"pointer"}}
          >
            <Heart className={`shop-card-icon liked`} />
          </button>
          {/* <button
            onClick={handleAddToCart}
            className={`shop-card-button ${isInCart ? 'in-cart' : ''}`}
            style={{marginLeft: '0px !important',cursor:"pointer"}}
          >
            <ShoppingCart className={`shop-card-icon ${isInCart ? 'in-cart' : 'default'}`} />
          </button> */}
        </div>
      </div>
      <div className="shop-card-content">
        <h4 className="shop-card-title">{productMatch.title}</h4>
        <div  style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:2}}>
          <span className="shop-card-price">{new Intl.NumberFormat().format(Number(productMatch.price))} <span style={{ color: "rgb(195, 156, 117)" }}>$</span></span>
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
        </Box>)
      }
      </Box>
      
      
        </Box>
     );
}
 
export default Mylikes;