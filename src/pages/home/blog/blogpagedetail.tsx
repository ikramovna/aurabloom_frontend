// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Typography, CircularProgress, Box, Card, Divider } from "@mui/material";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import axios from "axios";

// const BlogDetailPage = () => {
//   const { id } = useParams();
//   const [blogData, setBlogData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlogData = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/v1/blog/${id}`);
//         setBlogData(response.data);
//       } catch (err) {
//         setError("Failed to fetch blog data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogData();
//   }, [id]);

//   if (loading) {
//     return (
//       <Box textAlign="center" mt={4}>
//         <CircularProgress />
//         <Typography variant="body1" color="text.secondary">
//           Loading blog details...
//         </Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box textAlign="center" mt={4}>
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       </Box>
//     );
//   }

//   if (!blogData) return null;

//   const { title, description, image1, image2, image3, image4, created_at, view_count } =
//     blogData;

//   return (
//     <div style={{ padding: "2rem" }}>
//       {/* Hero Section */}
//       <Box mb={4}>
//         <img
//           src={image1 || "https://via.placeholder.com/1200x500?text=Hero+Image"}
//           alt="Hero"
//           style={{ width: "100%", borderRadius: "8px", objectFit: "cover",height:"300px" }}
//         />
//       </Box>

//       {/* Middle Section */}
//       <Card style={{ padding: "2rem", marginBottom: "2rem" }}>
//         <Typography variant="h4" gutterBottom>
//           {title}
//         </Typography>
//         <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//           Published: {new Date(created_at).toLocaleDateString()}
//         </Typography>
//         <Divider style={{ margin: "1rem 0" }} />
//         <Typography variant="body1" paragraph>
//           {description}
//         </Typography>
//       </Card>

//       {/* Bottom Section */}
//       <Box>
//         <Typography variant="subtitle1" color="text.secondary" gutterBottom>
//           Total Views: {view_count}
//         </Typography>

//         {/* Image Swiper */}
//         <Swiper spaceBetween={16} slidesPerView={3}>
//           {image2 && (
//             <SwiperSlide>
//               <img
//                 src={image2}
//                 alt="Image 2"
//                 style={{
//                   width: "100%",
//                   height: "200px",
//                   objectFit: "cover",
//                   borderRadius: "8px",
//                 }}
//               />
//             </SwiperSlide>
//           )}
//           {image3 && (
//             <SwiperSlide>
//               <img
//                 src={image3}
//                 alt="Image 3"
//                 style={{
//                   width: "100%",
//                   height: "200px",
//                   objectFit: "cover",
//                   borderRadius: "8px",
//                 }}
//               />
//             </SwiperSlide>
//           )}
//           {image4 && (
//             <SwiperSlide>
//               <img
//                 src={image4}
//                 alt="Image 4"
//                 style={{
//                   width: "100%",
//                   height: "200px",
//                   objectFit: "cover",
//                   borderRadius: "8px",
//                 }}
//               />
//             </SwiperSlide>
//           )}
//         </Swiper>
//       </Box>
//     </div>
//   );
// };

// export default BlogDetailPage;
