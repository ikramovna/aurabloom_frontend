import { Box, Grid, Typography,  
} from '@mui/material';
import
{FunctionComponent, useEffect, useState} from 'react';

import "./stylesss.css"
import { useParams } from 'react-router-dom';
import logouser from '../../assets/user.png';
import ProductCard from './ProductCard';
import { Product } from './types/product';
import nooreder from "../../assets/no-order.png"

interface ServicesProps {
    // search:string;
    // post:any;
  }
const Services: FunctionComponent<ServicesProps> = (

) =>{
    const { id } = useParams<{ id: any }>();
    const [posts, setPosts] = useState<Product[]>([]);
    
    useEffect(() => {
        const getPosts = async () => {
            try {
              const apiUrl = `https://aurabloom.ikramovna.me/api/v1/category/service?category_id=${id}`;
              const response = await fetch(apiUrl, {
                method: 'GET',
                
              });
              const data = await response.json();
        
              if (response.ok) {
                console.log(data, 'Fetched posts successfully');
                setPosts(
                    Array.isArray(data)
                      ? data.map(post => ({
                          ...post,
                          user: {
                            id: post.user?.id ?? null, 
                            full_name: post.user?.full_name ?? '', 
                            address: {
                              id: post.user?.address?.id ?? null,
                              region: post.user?.address?.region ?? '',
                              district: post.user?.address?.district ?? '',
                              mahalla: post.user?.address?.mahalla ?? '',
                              house: post.user?.address?.house ?? ''
                            },
                            image: post.user?.image ?? '', 
                          },
                        
                          imagePost: post.image || logouser, 
                        }))
                      : []
                  );
              } else {
                console.error('Failed to fetch posts:', data);
              }
            } catch (error) {
              console.error('Error fetching posts:', error);
            }
          };
        getPosts();
        console.log('salommmmm');
        
    }, [id]); 

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [id]);
    
  return (
    <Box  sx={{height: {
      xs: 'max-content',    // Mobile screens
      sm: 'max-content',    // Tablet screens
      md: '100vh',          // Desktop screens (900px and up)
    },backgroundColor:"white"}}>
      <Box sx={{maxWidth:"1440px",padding:"0 20px 0 20px",}}>
{posts.length <= 0 ? (
        <Box 
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "50px"
          }}
        >
          <Typography 
            sx={{
              fontSize: "25px",
              textAlign: "center"
            }}
          >
            This category doesn't have posts.
          </Typography>
          <Box>
            <img src={nooreder} height="200px" alt="No orders" />
          </Box>
        </Box>
      ) : (
        <Grid 
          container 
          spacing={2}
          sx={{
            margin: '0px',
            width: '100%'
          }}
        >
          {posts.map(post => (
            <Grid 
              item 
              xs={12}        // 2 items per row on mobile (xs)
              sm={6}        // 3 items per row on tablet (sm)
              lg={3}        // 4 items per row on desktop (lg)
              key={post.id}
              
            >
              <ProductCard
                favorites_count={post.like_count}
                {...post}
                onBookNow={() => console.log('Booked:', post.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
</Box>
    </Box>
  );
};

export default Services;
