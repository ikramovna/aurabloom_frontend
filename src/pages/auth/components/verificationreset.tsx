/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container } from "@mui/system";
import { FunctionComponent, useState } from "react";
import Typography from "@mui/material/Typography";
import forgotPasswordemail from "../../../assets/mail.png"
import toast from "react-hot-toast";
import { Api } from "../../../modules/auth";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
// import Grid from "@mui/system/Unstable_Grid";
import loginImage from "../../../assets/loginImage.png"; 
import { Link, useNavigate } from "react-router-dom";
// import logo from "../../../assets/logo.png";
import logoAura from "../../../assets/logoAura.svg"


interface VerificationresetProps {
    
}
 
const Verificationreset: FunctionComponent<VerificationresetProps> = () => {

    const [emailreset, setEmailreset] = useState("")
    const navigate = useNavigate()       

    const postEmailReset = async () => {
        try {
            const {data} = await Api.ResetPassword({email:emailreset})
            toast.success(data?"Password reset code sent to your email.":"");
            localStorage.setItem("emailreset",emailreset)
            navigate("/forgotpassword")
        } catch (error:any) {
            const errorsaxios = await error.response.data.detail;
            toast.error(errorsaxios ? errorsaxios:"Email "+error.response.data.email[0])
            console.log(error);
            
            
        }
      }

    return ( 
        <Box
        sx={{ display: "flex", height: "100vh", width: "100vw",  }}>
        {/* <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%",height: "100%",}}
      > */}
        {/* <Container component="main" sx={{ width: "100%", height: "100%", alignItems: "center" }}> */}
        <Grid
            container sx={{ flex: 1, }}
          >
            
            <Grid item xs={12} sm={6} sx={{
              display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
        backgroundColor: "#f7f3f0",
        position: "relative",}}>
            <Box
        height={68}
        width={168}
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: "20px", // Adjust distance from the top
          left: "50%",
          transform: "translateX(-50%)",
          zIndex:100 // Center horizontally
        }}
      >
        <Link to={"/"}>
          <img src={logoAura} style={{ width: "100%", height: "100%" }} alt="" />
        </Link>
      </Box>
      <Container maxWidth="xs">
            {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent:"center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            borderRadius: "30px",
            background: "#FFF",
            // boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.10)",
            padding: "50px 80px 20px 80px",
          }}
          className={"box-signin"}
        > */}
            {/* <Box>
                  <img
                    src={logo}
                    style={{ paddingTop: "0px" }}
                    width={157}
                    height={37}
                    alt=""
                  />
                </Box> */}

                {/* <Box   sx={{ marginTop: "50px",color: "#000",
                fontFamily: "Inter,sans-serif",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal" }}> 
                
                </Box> */}
                <Typography
          variant="h4"
          sx={{
            fontWeight: "700",
            color: "#4b4b4b",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
         Forgot Password
        </Typography>
                {/* <Box sx={{ marginTop: "24px",padding:"0 60px 0 60px" }}> */}
                  <Typography sx={{ color: "#6d6d6d", marginBottom: "30px" }}>
                    Enter your email for the verification process, we will send a four digit code
                    </Typography>
                    <input
                    className="login-form"
                    type="text"
                    placeholder="Email"
                    style={{
                      width: "100%",
                      padding: "16px 45px",
                      marginBottom: "10px",
                      borderRadius: "12px",
                      border: "1px solid #B5B5B5",
                      backgroundImage: `url('${forgotPasswordemail}')`,
                      backgroundRepeat: "no-repeat",
                      fontSize: "18px",
                      backgroundSize: "22px 22px",
                      backgroundPosition: "10px 15px",
                      alignItems: "center",
                    }}
                    onChange={(e)=>setEmailreset(e.target.value)}
                  />
                
                <Button
                  
                fullWidth
                variant="contained"
                sx={{
                  height: "50px",
                  backgroundColor: "#c39c75",
                  color: "#fff",
                  marginTop: "20px",
                  fontWeight: "600",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#a98260",
                  },
                }}
                onClick={postEmailReset}
                >
                  Reset Email
                  </Button> 
                  {/* </Box> */}
                  </Container>
                  {/* </Box> */}
                  </Grid>
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
                  {/* </Container> */}
                  </Grid>
    </Box> 
     );
}
 
export default Verificationreset;