import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import styles from './ImageSlider.module.css';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: Array<{
    url: string;
    alt: string;
  }>;
}

export function ImageSlider({ images }: ImageSliderProps) {
  return (
    <div style={{width:"40%",}} 
    // className={styles.container}
    >
      <Swiper
        modules={[Navigation, Pagination,Autoplay]}
        pagination={{ clickable: true }}
        // autoplay={{
        //    delay: 3000,
        //    disableOnInteraction: false,
        // }}
        style={{height:"500px"}}
        // className={styles.swiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.url} alt={image.alt} style={{width: '100%',height:"100%",objectFit:"cover"}} 
            // className={styles.image}
             />
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
}
