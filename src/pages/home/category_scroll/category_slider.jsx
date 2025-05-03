import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './swiper.css';
import { EffectCoverflow, Pagination,Navigation,Autoplay  } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Box } from "@mui/system";

const CarouselImage = ({category}) => {
return(
<Box sx={{ maxWidth: "100%",position:"relative",paddingBlock:"20px" }}>
    <Swiper
     
            effect="coverflow"
            centeredSlides={true}
            initialSlide={5}
            modules={[EffectCoverflow, Pagination, Navigation,Autoplay]}
            className="mySwiper"
            slidesPerView={4}
            // loopAdditionalSlides={4}
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
            pagination={{
                el: ".swiper-pagination",
                clickable: true,
              }}
    >
        {
            category.map((item)=><SwiperSlide>
                <img src={item.image} alt="" />
            </SwiperSlide>)
        }
    </Swiper>
    <div className="swiper-pagination"></div>
</Box>
)


}

export default CarouselImage;