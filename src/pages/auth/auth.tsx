/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
import { FunctionComponent,  useState } from "react";
import "./index.css";
import masterIcon from "../../assets/mastericon.png";
import clientIcon from "../../assets/clienticons.svg";
// import Register1step from "./components/register";
import {  Link, useNavigate } from "react-router-dom";
// import Register2steps from "./components/register2step";
import loginImage from "../../assets/loginImage.png";
// import Grid from "@mui/system/Unstable_Grid";
import { Container, Grid } from "@mui/material";
import logoAura from "../../assets/logoAura.svg"

interface AuthProps {
  // search: string;
}

const Auth: FunctionComponent<AuthProps> = () => {
  

  
 
  // const [nextStep, setNextStep] = useState(false);
  const [selectRole, setSelectRole] = useState(0);
  const [roles, setRoles] = useState(false);
  
  const navigate = useNavigate();

  
  
  

  const selectedRole = (id: number) => {
    let roleString: string;
    if (id === 1) {
        roleString = "true";
    } else {
        roleString = "false";
    }
    localStorage.setItem("roles", roleString);
    navigate("/register");
};

  
  
  

  
  
  

  return (
    <>
      {!roles ? (
        <Box
        sx={{ display: "flex", height: "100vh", width: "100vw",  }}
      >
        <Grid
          // container
          container sx={{ flex: 1, }}
        >
       {/* <Container
            component="main"
            sx={{ width: "100%", height: "100%", alignItems: "center" }}
          > */}
            {/* <Box
             
              sx={{
                width: "100%",
                // height: "564px",
                // boxShadow: "0px 0px 100px 0px rgba(0, 0, 0, 0.10)",
                // borderRadius: "30px",
                margin: "0 auto",
                display: "flex",
                height: "100%",
              }}
            > */}
              
              <Grid item
      xs={12}
      md={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
        backgroundColor: "#f7f3f0",
        position: "relative",
      }}>
        <Box
        height={68}
        width={168}
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top:  { xs: "0px", sm: "20px" }, // Adjust distance from the top
          left: "50%",
          transform: "translateX(-50%)", // Center horizontally
        }}
      >
        <Link to={"/"}>
          <img src={logoAura} style={{ width: "100%", height: "100%" }} alt="" />
        </Link>
      </Box>
              {/* <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "50%",
                    height: "100%",
                    // borderRadius: "30px",
                    background: "#FFF",
                    // maxWidth: "500px",

                    // boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.10)",
                    padding: "10px 100px 20px 100px",
                  }}
                  className={"box-signin"}
                > */}
                  <Container maxWidth="xs">
                  {/* <Box   sx={{ marginTop: "30px",color: "#000",
                  fontFamily: "Inter,sans-serif",
                  fontSize: "40px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal" }}> 
                  Sign Up
                  </Box> */}
                  <Typography
          variant="h4"
          sx={{
            fontWeight: "700",
            color: "#4b4b4b",
            marginBottom: "10px",
            textAlign: "center",
            fontSize:{ xs: "25px", sm: "30px" }
          }}
        >
          Sign Up
        </Typography>
                  {/* <Box sx={{marginTop:"20px",textAlign:"center"}}> */}
                    <Typography sx={{fontSize: "23px",width:"100%",textAlign:"center",fontWeight:"500",color:"#B5B5B5"}}>
                    Select an account type
                    </Typography>
                  {/* </Box> */}
            <Box component="form" sx={{ marginTop: "12px" }}>
                <Box onClick={()=> selectedRole(0)} marginTop={2}>
                  <Box onClick={() => setRoles(true)}>
                    <Box
                      sx={
                        selectRole === 0
                          ? {
                              width: "100%",
                              
                              border: "1px solid #c29a76",
                              padding: "20px",
                              cursor: "pointer",
                              borderRadius: "12px",
                            }
                          : {
                              width: "100%",
                              
                              border: "1px solid #B5B5B5",
                              padding: "20px",
                              cursor: "pointer",
                              borderRadius: "12px",
                            }
                      }
                      onClick={() => setSelectRole(0)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: "20%",
                          alignItems: "center",
                          marginBottom:"10px",
                          marginLeft:"0px"
                        }}
                      >
                        <img
                          src={clientIcon}
                          width="42px"
                          height="42px"
                          alt="client"
                        />
                        <Typography sx={{fontSize: "22px",marginLeft:"10px"}}>Client</Typography>
                      </Box>
                      <Typography sx={{fontSize:"18px",color:"#B5B5B5"}}>
                      As a client, you will be able to find the right specialists and register with them online.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box onClick={()=>selectedRole(1)}>
                  <Box onClick={() => setRoles(true)}>
                    <Box
                      sx={
                        selectRole === 1
                          ? {
                            width: "100%",
                            border: "1px solid #c29a76",
                            padding: "20px",
                            cursor: "pointer",
                            borderRadius: "12px",
                            marginTop:"10px"
                            }
                          : {
                            width: "100%",
                            border: "1px solid #B5B5B5",
                            padding: "20px",
                            cursor: "pointer",
                            borderRadius: "12px",
                            marginTop:"10px"
                            }
                      }
                      onClick={() => setSelectRole(1)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: "20%",
                          alignItems: "center",
                          marginBottom:"10px",
                          marginLeft:"0px"
                        }}
                      >
                        <img
                          src={masterIcon}
                          width="42px"
                          height="42px"
                          alt="client"
                        />
                        <Typography sx={{fontSize: "22px",marginLeft:"10px"}}>Master</Typography>
                      </Box>
                      <Typography sx={{fontSize:"18px",color:"#B5B5B5"}}>
                      As a master, you use working tools to set your schedule, price list.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
             
             <Box   sx={{ marginTop: "20px",color: "#B5B5B5",
                  fontFamily: "Inter,sans-serif",
                  fontSize: "22px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                  textAlign:"center",
                  alignItems:"center"
                   }}> 
                  Have an account?{" "}
                  <span
                        onClick={() => navigate("/login")}
                        style={{
                          color: "#c29a76",
                          cursor:"pointer"
                        }}
                      >
                        Log in here
                      </span>
                  </Box>
             
            
            </Box>
            </Container>
          {/* </Box> */}
          </Grid>

          {/* <Grid
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "55px 0 55px 0",
                  "@media (max-width:450px)":{display:"none"}
                }}
              > */}
             <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundImage: `url(${loginImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "0 12px 12px 0",
          }}
        />
              {/* </Grid> */}
          {/* </Box> */}
        {/* </Container> */}
        </Grid>
      </Box>
        
      ) : ("")}
    </>
  );
};

export default Auth;
