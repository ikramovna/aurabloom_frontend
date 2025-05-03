/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card,CardMedia,
  // Avatar
  Box,CardContent,CardActions,Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { Api } from "../../../modules/auth";
// import logouser from "../../../assets/user.png";
import like from "../../../assets/likes.svg";
import liked from "../../../assets/liked.svg";
import bookmark from "../../../assets/Bookmark.svg";
import bookmarked from "../../../assets/Bookmarked.svg";
// import { User } from "lucide-react";

interface MasterPostProps {
    name: string;
    id: number | null;
    description: string;
    categoryPosition: {
      name: string;
    };
    imagePost: string;
    user: {
      id: number | null;
      full_name: string;
      address: {
        id: number | null;
        region: string;
        district: string;
        mahalla: string;
        house: string;
      };
      image: string;
    };
    price: string;
    posts: any;
      is_like: any;
      is_bookmark: any;
      favorites_count:number | null;
      // setRefetch:(value:boolean)=>void;
      fetchData:()=>void;
}
 
const MasterPost: FunctionComponent<MasterPostProps> = ({
    is_bookmark,
    is_like,
    id,
    description,
    categoryPosition,
    imagePost,
    // user,
    price,
    favorites_count,
    // setRefetch,
    fetchData
}) => {

     console.log(is_like);
     

    const LikesPost = async () => {
        
        
          if(is_like){
            try {
              await Api.Like({
                service: id,
                like: !is_like, 
              });
              fetchData()
              console.log(is_like);
            } catch (error) {
              console.log(error);
              
            }         
            
          }else if(is_like === false){
            try {
              await Api.Like({
                service: id,
                like: !is_like, 
              });
              fetchData()
            } catch (error) {
              console.log(error);
              
            }    
  
          }else{
            try {
              await Api.Like({
                service:id,
                like:false
              })
              fetchData()
            } catch (error) {
              console.log(error);
              
            }
          }
          
          // Increment or decrement favorites_count based on the current state of likes
          // Update the state of likes and favorites_count
        
      };
      const SavedPost = async() => {
        if(is_bookmark){
          try {
            await Api.Bookmarks({
              service: id,
              saved: false, 
            });
            fetchData()
            
          } catch (error) {
            console.log(error);
            
          }         
          
        }else if(is_bookmark === false){
          try {
            await Api.Bookmarks({
              service: id,
              saved: !is_bookmark, 
            });
            fetchData()
          } catch (error) {
            console.log(error);
            
          }    
  
        }else{
          try {
            await Api.Bookmarks({
              service:id,
              saved:false
            })
            fetchData()
          } catch (error) {
            console.log(error);
            
          }
        }
    }


    const [showMore, setShowMore] = useState(false);
    return ( 
        
        <Card sx={{ width: "100%", boxShadow: "none",borderTopLeftRadius:"20px",borderTopRightRadius:"20px" }}>
            
            <CardMedia sx={{ objectFit: "cover", borderRadius: "20px" }} component="img" height="300" image={imagePost} alt="Paella dish" />
            <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
            <Box
                          onClick={LikesPost}
                          sx={{ display: "flex", alignItems: "center", marginLeft: "0px" }}
                        >
                          {is_like ? (
                            <img
                              src={liked}
                              style={{ marginRight: "10px", marginLeft: "0px" }}
                              alt="likes"
                            />
                          ) : (
                            <img
                              src={like}
                              style={{ marginRight: "10px", marginLeft: "0px" }}
                              alt="like"
                            />
                          )}
                          <Typography
                            sx={{
                              color: "#000",
                              fontFamily: "Inter,sans-serif",
                              fontSize: "28px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "normal",
                            }}
                          >
                            {favorites_count}
                          </Typography>
                        </Box>
                        <Box
                          onClick={SavedPost}
                          sx={{ display: "flex", alignItems: "center", marginRight: "0px" }}
                        >
                          {is_bookmark ? (
                            <img
                              src={bookmarked}
                              alt="bookmarked"
                              width={31}
                              height={31}
                              style={{ marginRight: "0px", marginLeft: "0px" }}
                            />
                          ) : (
                            <img
                              src={bookmark}
                              width={36}
                              height={36}
                              style={{ marginRight: "0px", marginLeft: "0px" }}
                              alt="bookmark"
                            />
                          )}
                        </Box>
            </CardActions>
            <CardContent sx={{ paddingTop: "0px",paddingBottom:"0px"}}>
            {description && (
  <CardContent sx={{ paddingTop: "0px" }}>
    <Typography variant="body2" sx={{ fontSize: "18px", height: showMore ? "auto" : "30px", overflow: "hidden" }} color="text.secondary">
      {description}
    </Typography>
    {description.length > 40 && (
      <Typography onClick={() => setShowMore(!showMore)} sx={{ cursor: "pointer", color: "rgb(195, 156, 117)" }}>
        {showMore ? "Show Less" : "Show More"}
      </Typography>
    )}
  </CardContent>
)}
            </CardContent>
            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
                {categoryPosition?.name}
              </Typography>
              <Typography sx={{ fontSize: "22px", fontWeight: 700, color: "rgb(195, 156, 117)" }}>
                {new Intl.NumberFormat().format(parseFloat(price) * 1)} <span style={{ color: "rgb(195, 156, 117)" }}>$</span>
              </Typography>
            </CardContent>
          </Card>
        
     );
}
 
export default MasterPost;