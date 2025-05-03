import 
// React,
 { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Hero } from "./components/Hero";
import { Content } from "./components/Content";
import { ImageSlider } from "./components/imageSlider";

interface BlogData {
  image2: any;
//   image2: { url: string; alt?: string }[]; // image2 should be an array
  image1: string;
  id: number;
  title: string;
  heroImage: string;
  description: string;
//   galleryImages: string[]; // image gallery
  image3: string; // Single image
  image4: string; // Single image
}

function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get<BlogData>(`https://aurabloom.ikramovna.me/api/v1/blog/${id}`);
        setBlogData(response.data);
      } catch (err) {
        setError("Failed to fetch blog data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
        <Typography variant="body1" color="text.secondary">
          Loading blog details...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!blogData) return null;

  // Collect image2, image3, and image4 into a single array
  const imageArray = [
    { url: blogData.image2, alt: "Image 2" }, // image2 as an object with URL and alt
    { url: blogData.image3, alt: "Image 3" }, // image3 as an object with URL and alt
    { url: blogData.image4, alt: "Image 4" }  // image4 as an object with URL and alt
  ];
  console.log(imageArray,'asasd23');
  
  return (
    <div style={{minHeight: "100vh",
  backgroundColor: "white"}}>
      <Box key={blogData.id}>
        {/* Hero Component */}
        <Hero title={blogData.title} imageUrl={blogData.image1} />
        <div style={{ maxWidth: "90rem",margin: "0 auto",padding: "4rem 1rem",display:"flex",flexDirection: "row",gap: "2rem",alignItems: "flex-start"}}>
        {/* Content Component */}
        <Content content={blogData.description} />
        
        {/* Image Slider Component */}
        <ImageSlider images={imageArray} /> {/* Pass the imageArray to the slider */}
        </div>
      </Box>
    </div>
  );
}

export default BlogDetailPage;
