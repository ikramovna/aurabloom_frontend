import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Define the expected structure of blog posts
interface BlogPost {
  id: number;
  title: string;
  description: string;
  image1?: string;
}

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]); // Explicitly typed

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const { data } = await axios.get<BlogPost[]>("https://aurabloom.ikramovna.me/api/v1/blog");
        setBlogs(Array.isArray(data) ? data : []);
        console.log(data, 'success');
      } catch (error) {
        console.log(error);
      }
    };
    getBlogs();
  }, []);

  if (blogs.length === 0) return null; // If no blogs, render nothing

  return (
    <Box sx={{ backgroundColor: "white", padding: { md: "0 90px 20px 90px", xs: "0px" } }}>
      <Grid container spacing={2}>
        {blogs.map((post) => (
          <Grid item xs={12} sm={blogs.length === 1 ? 12 : 6} 
          md={blogs.length === 1 ? 12 : 3}  key={post.id}  >
            <Card
              sx={{
                paddingTop: "0px",
                maxWidth: 345,
                width: "100%",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={post.image1 || ""}
                alt={post.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  color="text.secondary"
                  sx={{ marginBottom: "20px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {post.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#c39c75", color: "white", "&:hover": { backgroundColor: "#c39c75" } }}
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Blog;
