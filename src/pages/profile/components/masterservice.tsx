/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid";
import { FunctionComponent, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
// import masterprofile from "../../../assets/masterProfile.svg";
import line from "../../../assets/linemaster.svg";
import gender from "../../../assets/gender.svg";
import { IEntity } from "../../../modules/auth/types";
import { Api, Types } from "../../../modules/auth";
import locationIcon from "../../../assets/locationIconProfile.svg";
import phoneIcon from "../../../assets/phoneIconProfile.svg";
import serviceIcon from "../../../assets/serviceIconProfile.svg";
// import clockIcon from "../../../assets/clockIconProfile.svg";
import telegramIcon from "../../../assets/telegramIconmaster.svg";
import instagramIcon from "../../../assets/instagramIconmaster.svg";
import facebookIcon from "../../../assets/facebookIconmaster.svg";
import { ClockCircleOutlined } from '@ant-design/icons';
import { User } from "lucide-react";
import "./index.css";

interface MasterServiceProps {}

const MasterService: FunctionComponent<MasterServiceProps> = () => {
  const [userdata, setUserdata] = useState<IEntity.User>();

  const [posts, setPosts] = useState<Types.IForm.PostsApi[]>([
    {
      id: null,
      name: "",
      price: "",
      description: "",
      category: undefined,
      duration: "",
      image: "",
      user: {
        id:null,
        full_name: "",
        address: {
          id: null,
          region: "",
          district: "",
          mahalla: "",
          house: "",
        },
        image: "",
      },
      is_like: "",
      is_saved: "",
      data: undefined,
      filteredPosts: undefined,
      favorites_count:null,
    },
  ]);

  useEffect(() => {
    const getUserdata = async () => {
      try {
        const { data } = await Api.UserProfil();
        setUserdata(data);
        const { data: postData } = await Api.Userservices(data.id);
        setPosts(postData);
      } catch (error) {
        console.log(error);
      }
    };
    getUserdata();
  }, []);

  
  // const floatNumbers = stringnumber.map((str) => parseInt(str));
  

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "36px",
        marginBottom: "36px",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Container
          component="main"
          sx={{ width: "100%", height: "100%", alignItems: "center" }}
        >
          <Grid
            container
            sx={{
              width: "100%",
              borderRadius: "30px",
              margin: "0 auto",
            }}
            spacing={2}
          >
            <Grid xs={12} sm={6}>
              <Box
                sx={{
                  width: "100%",
                  padding: "20px",
                  borderRadius: "18px",
                  height:"331px",
                  border: "1px solid #B5B5B5",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "12px",
                    border: "1px solid #B5B5B5",
                  }}
                >
                  <User style={{ width:"27px",height:"27px",color: '#c39c75',margin:"0 6px 0 0" }}/>
                  {/* <img
                    src={masterprofile}
                    width={27}
                    height={27}
                    style={{ marginRight: "6px", marginLeft: "0px" }}
                    alt=""
                  /> */}
                  <Typography
                    sx={{
                      color: "#000",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "22px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    About me
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    marginTop: "20px",
                  }}
                >
                  <img
                    src={gender}
                    width={24}
                    height={24}
                    style={{ marginLeft: "0px", marginRight: "8px" }}
                    alt="gender"
                  />
                  <Typography
                    sx={{
                      color: "#000",
                      fontFamily: "Inter,sans-serif",
                      fontSize: "22px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    {userdata?.gender}
                  </Typography>
                </Box>
                <Box>
                  <img src={line} width="100%" height={1} alt="line" />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    marginTop: "20px",
                  }}
                >
                  <img
                    src={locationIcon}
                    width={24}
                    height={24}
                    style={{ marginLeft: "0px", marginRight: "8px" }}
                    alt="gender"
                  />
                  {
                    userdata?.address === null ? (
                      <Typography>Salom</Typography>
                    ):(<Typography
                      sx={{
                        color: "#000",
                        fontFamily: "Inter,sans-serif",
                        fontSize: "22px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      
                      {userdata?.address.region}
                    </Typography>)
                  }
                  
                </Box>
                <Box>
                  <img src={line} width="100%" height={1} alt="line" />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    marginTop: "20px",
                  }}
                >
                  <img
                    src={phoneIcon}
                    width={24}
                    height={24}
                    style={{ marginLeft: "0px", marginRight: "8px" }}
                    alt="gender"
                  />
                  <Typography
                    sx={{
                      color: "#000",
                      fontFamily: "Inter,sans-serif",
                      fontSize: "22px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    {userdata?.phone}
                  </Typography>
                </Box>
                <Box>
                  <img src={line} width="100%" height={1} alt="line" />
                </Box>
                <Box sx={{ marginTop: "10px" }}>
                  <Typography
                    sx={{
                      color: "#B5B5B5",
                      fontFamily: "Inter,sans-serif",
                      fontSize: "17px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                   {userdata?.instagram || userdata?.telegram || userdata?.facebook === null ? "":"Social Messengers"}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    {userdata?.telegram && userdata.telegram && (
                      <a
                        href={`https://t.me/${userdata.telegram}`}
                        target="_blank"
                        style={{ marginLeft: "0px", marginRight: "15px" }}
                      >
                        <img
                          width={30}
                          height={30}
                          src={telegramIcon}
                          alt="telegram"
                        />
                      </a>
                    )}
                    {userdata?.instagram && userdata.instagram && (
                      <a
                        href={`https://www.instagram.com/${userdata.instagram}`}
                        target="_blank"
                        style={{ marginLeft: "0px", marginRight: "15px" }}
                      >
                        <img
                          width={30}
                          height={30}
                          src={instagramIcon}
                          alt="telegram"
                        />
                      </a>
                    )}
                    {userdata?.facebook && userdata.facebook && (
                      <a
                        href={`https://www.facebook.com/${userdata.facebook}`}
                        target="_blank"
                        style={{ marginLeft: "0px", marginRight: "15px" }}
                      >
                        <img
                          width={30}
                          height={30}
                          src={facebookIcon}
                          alt="telegram"
                        />
                      </a>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} sm={6}>
              <Box
                sx={{
                  width: "100%",
                  padding: "20px 20px 0px 20px",
                  borderRadius: "18px",
                  border: "1px solid #B5B5B5",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgb(195, 156, 117)",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "12px",
                  }}
                >
                  <img
                    src={serviceIcon}
                    width={27}
                    height={27}
                    style={{ marginRight: "6px", marginLeft: "0px" }}
                    alt=""
                  />
                  <Typography
                    sx={{
                      color: "#FFF",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "22px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    Service Information
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "212px",
                    overflow: "scroll",
                    overflowX: "hidden",
                    marginTop: "10px",
                    marginBottom:"40px"
                  }}
                  className={"services"}
                >
                  {posts.length > 0 ? (posts.map(
                    ({
                     
                      duration,
                      name,
                      price,
                      id,
                    }: Types.IForm.PostsApi) => (
                      <Box key={id} sx={{ height:"max-content",marginTop:"5px",
                      marginBottom:"30px"  }}>
                        <Box
                          key={id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                           
                          }}
                        >
                          <Box sx={{ marginLeft: "0px",marginRight:"0px", width: "100%" }}>
                            <Typography
                              sx={{
                                color: "#000",
                                fontFamily: "Inter,sans-serif",
                                fontSize: "20px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "normal",
                              }}
                            >
                              {name}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex" ,alignItems:"center",width:"100%",textAlign:"center",marginRight:"0px",justifyContent:"center"}}>
                          <ClockCircleOutlined style={{ color: '#c39c75',margin:"0 10px 0 0" }} />
                            <Typography sx={{fontSize:"22px",marginRight:"0px",textAlign:"center"}}>{duration}</Typography>
                          </Box>
                          <Typography
                            sx={{
                              color: "rgb(195, 156, 117)",
                              fontFamily: "Inter,sans-serif",
                              fontSize: "22px",
                              fontStyle: "normal",
                              fontWeight: 700,
                              lineHeight: "normal",
                              width:"100%",
                              textAlign:"end"
                            }}
                          >
                            {new Intl.NumberFormat().format(parseFloat(price)*1)}
                            <span
                              style={{
                                color: "rgb(195, 156, 117)",
                                fontFamily: "Inter,sans-serif",
                                fontSize: "22px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "normal",
                                marginLeft: "5px",
                              }}
                            >
                              $
                            </span>
                          </Typography>
                        </Box>
                        <Box>
                          <img src={line} width="100%" height={1} alt="line" />
                        </Box>
                      </Box>
                    )
                  )):(
                    <Box>
                    <Typography sx={{textAlign:"center",fontSize:"24px",marginTop:"10px"}}>
                      You Don't have Service
                    </Typography>
                    </Box>
                  )}
                </Box>
                
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Box>
  );
};

export default MasterService;
{
  /* <Box
    sx={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      
      height: "100vh",
    }}
  >
        <Grid container justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
  <Container component="main" sx={{ width: "100%", height: "100%", alignItems: "center" }}>
  <Grid container spacing={2} sx={{ width: "100%", margin: "0 auto" }}>
  <Grid
      container
     
      xs={12} // Take up full width on extra-small screens
      sm={6}  // Take up half of the width on small screens
      sx={{
        width: "100%",
        height: "277px",
        boxShadow: "0px 0px 100px 0px rgba(0, 0, 0, 0.10)",
        borderRadius: "30px",
        margin: "0 auto",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            width: "100%",
            padding: "13px 237px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#000",
            fontFamily: "Inter",
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            border: "1px solid #B5B5B5",
          }}
        >
          <img src={masterprofile} width={27} height={27} alt="" />
          About me
        </Typography>
        <Box>
          <img src={gender} width={24} height={24} alt="gender" />
          <Typography>{userdata?.gender}</Typography>
        </Box>
        <Box>
          <img src={line} width="100%" height={1} alt="line" />
        </Box>
      </Box>
    </Grid>
    <Grid
      container
  
      xs={12} // Take up full width on extra-small screens
      sm={6}  // Take up half of the width on small screens
      sx={{
        width: "100%",
        height: "277px",
        boxShadow: "0px 0px 100px 0px rgba(0, 0, 0, 0.10)",
        borderRadius: "30px",
        margin: "0 auto",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            width: "100%",
            padding: "13px 237px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#000",
            fontFamily: "Inter",
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            border: "1px solid #B5B5B5",
          }}
        >
          <img src={masterprofile} width={27} height={27} alt="" />
          About me
        </Typography>
        <Box>
          <img src={gender} width={24} height={24} alt="gender" />
          <Typography>{userdata?.gender}</Typography>
        </Box>
        <Box>
          <img src={line} width="100%" height={1} alt="line" />
        </Box>
      </Box>
    </Grid>
    </Grid>
   

    
  </Container>
</Grid>
</Box> */
}
