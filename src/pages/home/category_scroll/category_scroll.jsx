import React from 'react';
import { Box } from '@mui/material';
import SwiperCore from "swiper"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './swiper.css';
import { EffectCoverflow, Pagination,Navigation,Autoplay  } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';


const Carousel = ({category}) => {
  const navigate = useNavigate();
  SwiperCore.use([Autoplay]);

  
  const handleSlideClick = (id) => {

    navigate(`services/${id}`);
    
   
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <Box sx={{ maxWidth: "100%",position:"relative",paddingBlock:"20px" }}>
      <Swiper 
        effect="coverflow"
        centeredSlides={true}
        initialSlide={5}
        slidesPerView={"auto"}
        speed={600}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1.5,
          slideShadows: false,
        }}
        loop={true}
        autoplay={{
          delay: 3000, // Adjust the delay (in ms) as needed
          disableOnInteraction: false, // Continue autoplay after interaction
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.4, 
            spaceBetween: 8,
          },
          328: {
            slidesPerView: 2.2, 
          },
          769:{
            slidesPerView:4
          }
        }}
        onSwiper={(swiper) => {
          console.log("Swiper initialized:", swiper);
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation,Autoplay]}
        className="mySwiper"
      >
        {category?.map((slide, index) => (
          <SwiperSlide key={index}>
              <div onClick={() => handleSlideClick(slide.id)} style={{ display: 'block',height:"100%" }}>
              
              <img  src={slide.image} alt="" />
              <div className="title">
                <span>{slide.name}</span>
              </div>
             
          </div>
            </SwiperSlide>
        ))}
      </Swiper>
        <div className="swiper-pagination"></div>
    </Box>
  );
};

export default Carousel;
