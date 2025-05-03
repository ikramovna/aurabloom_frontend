// import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import aboutus from "../../../assets/aboutus.webp"
import aboutus1 from "../../../assets/aboutus1.jpeg"
import aboutus2 from "../../../assets/aboutus2.jpeg"
import aboutus3 from "../../../assets/aboutus3.jpeg"
import aboutus4 from "../../../assets/aboutus4.jpeg"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";

const AboutUs = () => {

   const [
    about
    ,setAbout] = useState([]) 
    console.log(about);
    

useEffect(()=>{
 document.body.style.backgroundColor = "#f9f9f9"
 const getAboutUs = async () =>{
    try {
      const { data } = await axios.get("https://aurabloom.ikramovna.me/api/v1/about");
      setAbout(data);  
    } catch (error) {
      console.log(error);
    }
 }
 getAboutUs();
},[])

const images = [aboutus,aboutus1, aboutus2, aboutus3,aboutus4];

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 20px",
        borderRadius: "18px",
        width: "100%",
        maxWidth:"1200px"
        // border: "1px solid #B5B5B5",
      }}
    >
      <Grid
  container
  spacing={4}
  alignItems="center"
  sx={{ maxWidth: "1400px", margin: "0 auto" }}
>
  {/* Left Text Section */}
  <Grid item xs={12} md={6}>
    <Typography
      sx={{
        fontWeight: "bold",
        color: "#343434",
        marginBottom: "16px",
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: { md: "35px", xs: "25px" },
      }}
      className="main-text"
    >
      About Us
    </Typography>
    <Typography
      sx={{
        color: "#555",
        fontSize: { md: "21px", xs: "14px" },
        lineHeight: "1.6",
        marginBottom: "20px",
      }}
    >
      Welcome to Aura Bloom, your destination for beauty and relaxation.
      Our expert team provides a wide range of beauty services tailored to
      your needs. Whether you're here for a haircut, skincare, or a spa
      day, our mission is to ensure you leave feeling refreshed and
      glowing.
    </Typography>
    <Typography
      sx={{
        color: "#555",
        fontSize: { md: "21px", xs: "14px" },
        lineHeight: "1.6",
        marginBottom: "20px",
      }}
    >
      At Aura Bloom, we prioritize quality, professionalism, and customer
      satisfaction. We use only the finest products and stay up-to-date
      with the latest beauty trends to offer you an unparalleled
      experience.
    </Typography>
    <Typography
      sx={{
        color: "#343434",
        fontSize: { md: "19px", xs: "14px" },
        fontWeight: "bold",
      }}
    >
      Join us on your journey to beauty and confidence!
    </Typography>
  </Grid>

  {/* Right Image Section */}
  <Grid item xs={12} md={6}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: { md: "500px", xs: "400px" },
        paddingRight:"30px"
      }}
    >
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={800}
        loop={true}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          paddingBlock: "0px !important",
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} style={{ paddingTop: "0px !important" }}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "16px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  </Grid>
</Grid>

    </Box>
  );
};

export default AboutUs;
