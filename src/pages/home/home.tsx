/* eslint-disable no-prototype-builtins */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/system";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import "./index.css";
import { getCategory } from "../../api/api";
import { Api, Types } from "../../modules/auth";
import Hero from "./hero.js"
import Joyride, { Step } from 'react-joyride';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/autoplay';
import  Typography  from '@mui/material/Typography';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CategoryScroll from './category_scroll/category_scroll.jsx';
// @ts-ignore
import CarouselImage from './category_scroll/category_slider.jsx';

import AboutUs from "./about_us/About_us.js";
import Blog from "./blog/blog.js";
import LoadingScreen from "../../components/loading/LoadingScreen.js";
import { Modal } from "antd";


const Home: FunctionComponent = () => {
  
  
  const [posts, setPosts] = useState<Types.IForm.PostsApi[]>([]);
  const blogRef = useRef<HTMLDivElement | null>(null);
  const aboutUsRef = useRef<HTMLDivElement | null>(null);
  const serviceRef = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);
const [showIntroModal, setShowIntroModal] = useState(false);
  const steps: Step[] = [
    {
      target: '#services-gallery',
      content: 'Discover a wide range of categories tailored for you! Pick the one you like and explore all the services it offers.',
      placement: 'top', 
      disableBeacon: true,
    },
    {
      target: '#about-us',
      content: 'Learn more about us in this section.',
      placement: 'top',
      disableBeacon: true,
    },
    {
      target: '#blog',
      content: 'Find our latest blog posts here!',
      placement: 'top',
      disableBeacon: true,
    },
  ];

  const handleStartTour = () => {
    localStorage.setItem('userIntroduction', 'true');
    setShowIntroModal(false);
    setRun(true); 
  };
  
 
  const handleSkipTour = () => {
    localStorage.setItem('userIntroduction', 'true');
    setShowIntroModal(false);
  };
  

  useEffect(() => {
    const userIntro = localStorage.getItem('userIntroduction');
    if (userIntro !== 'true') {
      setShowIntroModal(true); 
    }
  }, []);
  const handleCloseModal = () => {
    localStorage.setItem('userIntroduction', 'true'); 
    setShowIntroModal(false); 
  };

  useEffect(() => {
    if (window.location.hash === '#blog' && blogRef.current) {
      blogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (window.location.hash === '#about-us' && aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (window.location.hash === '#services-gallery' && serviceRef.current) {
      serviceRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  const [category, setCategory] = useState([])
  

  useEffect(() => {
    const getPosts = async () => {
        try {
            const { data } = await Api.NewPostss();
           
             setPosts(Array.isArray(data) ? data : []);
             console.log(data,'success');
             
        } catch (error) {
            console.log(error);
        }
    }
    getPosts();
}, []); 

const fetchData = async () => {
  try {
   
    const { data: categoryData, success } = await getCategory();
    
    if (success) {
      console.log(categoryData,"category");
     
      setCategory(categoryData)
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
  useEffect(() => {
    document.body.style.backgroundColor = "#FFF"
    
    fetchData();
  }, []);

  useEffect(() => {
   
      fetchData();
     
    }, []);

 console.log(posts);
 
 
  

  return (
    <>
     <LoadingScreen/>
     <Joyride
  steps={steps}
  run={run}
  showSkipButton
  showProgress
  continuous
  scrollToFirstStep
  disableOverlayClose
  spotlightClicks
  styles={{
    options: { zIndex: 2147483647 },
    tooltip: { zIndex: 2147483647 },
    overlay: { zIndex: 2147483646, backgroundColor: 'rgba(0,0,0,0.5)' },
    buttonNext: { backgroundColor: '#c39c75', color: '#fff' },
    buttonBack: { color: '#c39c75' },
    buttonSkip: { color: '#c39c75' },
  }}
/>
      <Modal
  open={showIntroModal} 
  title="Welcome to Aura Bloom!"
  onCancel={handleCloseModal}
  footer={null}
  centered
  width={400}
  destroyOnClose
 
  style={{
    borderRadius: '10px',
    background: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  }}
>
  <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '18px' }}>
    🌟 Discover exclusive beauty services, carefully curated just for you! 🌟
  </Typography>
  <Typography variant="body2" sx={{ marginBottom: '20px', fontSize: '16px' }}>
    Start your journey with Aura Bloom now and experience premium services for a radiant you!
  </Typography>
  <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
    <button
      onClick={handleStartTour}
      style={{
        backgroundColor: '#c39c75',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Yes, Show Me!
    </button>
    <button
      onClick={handleSkipTour}
      style={{
        backgroundColor: '#eee',
        color: '#333',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Maybe Later
    </button>
  </Box>
</Modal>

      <Box sx={{width:"100%"}}>
       
        <Box sx={{width:"100% !important"}}>
       
      <Hero/>
    
<Box sx={{ backgroundColor: "white !important",
   height:"auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",}}  ref={aboutUsRef} id="about-us2">
      
 <AboutUs/>
</Box>
<Box
  sx={{
    backgroundColor: "white !important",
    
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }} ref={serviceRef} id="services-gallery"
>
  <Typography
    color={"#343434"}
    sx={{
      textTransform: "uppercase",
      textAlign: "center",
      fontSize: {md:"35px",xs:"25px"},
      marginTop:'40px',
      marginBottom: {md:"30px",xs:'0px'},
    }}
    className="main-text "
  >
    Beauty Studio 
     <span style={{marginInline:'10px'}}>
       "Aura Bloom" 
      </span> 
       Services
  </Typography>
  <Box
  
    sx={{
      maxWidth: "1440px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    }}
     className="service-text"
  >
    <CategoryScroll category={category}/>
     {/* <CarouselImage category={category}/> */}
  </Box>
</Box>
<Box sx={{
  backgroundColor: "white !important",
  // height: "100vh",
  height: 'auto',
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom:"50px",
  paddingTop:{md:"110px",xs:"50px"}
}} ref={blogRef} id="blog">
  <Typography
      
      sx={{
        textTransform: "uppercase",
        textAlign: "center",
        marginBottom: {md:"80px",xs:'20px'},
        fontWeight: "bold",
        marginTop: "0px !important",
        fontSize:{md:"35px",xs:"25px"},
      }}
      className="main-text"
    >
      Blog
    </Typography>
<Blog/>
</Box>

</Box>
        
        
      </Box>
    </>
  );
};

export default Home;
