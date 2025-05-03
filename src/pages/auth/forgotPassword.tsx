/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
// import { Container } from "@mui/system";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Api } from "../../modules/auth";
import {toast} from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/loginImage.png"; 
// import logo from "../../assets/logo.png";
// import Grid from "@mui/system/Unstable_Grid";
import {OutlinedInput, InputAdornment,IconButton, Typography,Grid} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
// import passwordImg from "../../assets/loginPasswordImage.svg";
import passwordIcon from "../../assets/passwordicon.svg";
import logoAura from "../../assets/logoAura.svg";
import Activationcode from "../../assets/activationicon.png"

interface ForgotPasswordProps {
  // Define props here if any
}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  
 
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    getValues
  } = useForm({
    mode: "onBlur"
  });
  const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  // const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onsubmit = async (values: any) => {

    const emailreset = localStorage.getItem("emailreset")
    
    try {
        const {data} = await Api.ResetPasswordConfirm({
          ...values,
          email:emailreset,
        })
        if(values.activation_code || values.password){
          navigate("/login") 
        }
  
        toast.success(data.detail)
        
    } catch (error:any) {
        toast.error(error.response.data.detail)
    }
  }
  

  return (
    <Box
    sx={{ display: "flex", height: "100vh", width: "100vw",  }}
  >
    <Grid
      container sx={{ flex: 1, }}
    >
      {/* <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "30px",
          margin: "0 auto",
        }}
      > */}
        {/* Left Section */}
        
  
        {/* Right Section */}
        <Grid
        item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 40px",
            backgroundColor: "#f7f3f0",
            position: "relative",
          }}
        >
          {/* Centered Logo */}
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
          transform: "translateX(-50%)", // Center horizontally
        }}
      >
        <Link to={"/"}>
          <img src={logoAura} style={{ width: "100%", height: "100%" }} alt="" />
        </Link>
      </Box>
  
          {/* Form Section */}
          <Container maxWidth="xs">
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent:"center",
              width: "100%",
              height: "100%",
              borderRadius: "30px",
              background: "#FFF",
              // padding: "50px 20px 20px 20px",
              paddingInline:"100px",
              "@media (max-width:450px)": { padding: "50px 0px" },
            }}
            className="box-signin"
          > */}
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
            {/* <Box sx={{ marginTop: "24px", padding: "0 30px 0 30px" }}> */}
              <form
                className="form-group resume-box"
                onSubmit={handleSubmit(onsubmit)}
                id="resetPassword"
              >
                {/* Form Fields */}
                <Box sx={{ marginTop: "10px" }}>
                <OutlinedInput
  {...register("activation_code", {
    required: "Activation code is required",
    minLength: {
      value: 4,
      message: "Activation code must be at least 4 characters",
    },
    maxLength: {
      value: 10,
      message: "Activation code must not exceed 10 characters",
    },
  })}
  placeholder="Activation Code"
  type="number"
  inputProps={{
    maxLength: 10, // Limits the number of characters to 10
  }}
  sx={{
    marginBottom: "10px",
    width: "100%",
    padding: "0px 0px 0 35px",
    borderRadius: "8px",
    // border: "1px solid #B5B5B5",
    fontSize: "18px",
    backgroundImage: `url(${Activationcode})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "10px center",
              backgroundSize: "20px",
  }}
 
/>
{errors.activation_code && (
  <p style={{ color: "red",fontSize:"14px",marginBottom:"10px" }}>{`${errors.activation_code.message}`}</p>
)}
                  {/* Password Fields */}
                  <OutlinedInput
                    {...register("new_password", {
                      required: "Password required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Password must not exceed 20 characters",
                      },
                    })}
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Password"
                    sx={{
                      marginBottom: "10px",
                      width: "100%",
                      padding: "0px 20px 0px 35px",
                      borderRadius: "8px",
                      // border: "1px solid #B5B5B5",
                      fontSize: "18px",
                      backgroundImage: `url(${passwordIcon})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "10px center",
              backgroundSize: "20px",
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errors.new_password && (
                    <p style={{ color: "red",fontSize:"14px",marginBottom:"10px" }}>{`${errors.new_password.message}`}</p>
                  )}
                  <OutlinedInput
    {...register("confirm_password", {
      required: "Confirm password is required",
      validate: (value) =>
        value === getValues("new_password") || "Passwords do not match",
    })}
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm Password"
    sx={{
      marginBottom: "10px",
      width: "100%",
      padding: "0px 20px 0px 35px",
      borderRadius: "8px",
      // border: "1px solid #B5B5B5",
      fontSize: "18px",
      backgroundImage: `url(${passwordIcon})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "10px center",
      backgroundSize: "20px",
    }}
    endAdornment={
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowConfirmPassword}
          edge="end"
        >
          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    }
  />
  {errors.confirm_password && (
    <p style={{ color: "red" }}>{`${errors.confirm_password.message}`}</p>
  )}
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  form="resetPassword"
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
                >
                  Change Password
                </Button>
              </form>
            {/* </Box> */}
          {/* </Box> */}
            </Container>
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
    </Grid>
  </Box>
  );
};

export default ForgotPassword;
