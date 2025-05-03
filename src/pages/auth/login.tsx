import { Box, Container, Typography, Grid,  InputAdornment, IconButton, Button, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';  
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FunctionComponent, useState } from "react";
import { Api } from "../../modules/auth";
import toast from "react-hot-toast";
import loginImage from "../../assets/loginImage.png"; 
// import usernameImg from "../../assets/loginUsernameImg.svg";
import usernameIcon from "../../assets/usericon.svg"
import passwordIcon from "../../assets/passwordicon.svg"
import "./index.css"
import logoAura from "../../assets/logoAura.svg"
// import passwordImg from "../../assets/loginPasswordImage.svg";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); 
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onsubmit = async (values: any) => {
    try {
      const { data } = await Api.Login(values);
      if (data) {
        localStorage.setItem("access", data.access);
        navigate("/");
      }
    } catch (error) {
      toast.error("Login or password is wrong");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw",  }}>
      {/* Left Section - Form */}
      <Grid container sx={{ flex: 1, }}>
      <Grid
      item
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
      }}
    >
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
      <Container maxWidth="xs">
        <Typography
          variant="h4"
          sx={{
            fontWeight: "700",
            color: "#4b4b4b",
            marginBottom: "30px",
            textAlign: "center",
            fontSize: { xs: "25px", sm: "30px" }
          }}
        >
          Sign In
        </Typography>
        <Typography sx={{ color: "#6d6d6d", marginBottom: "30px",textAlign:"center" }}>
          Get access to the biggest brands.<br /> Become a member today.
        </Typography>

        <form onSubmit={handleSubmit(onsubmit)}>
          {/* Email Input */}
          <Box 
  sx={{ 
    position: 'relative', 
    marginBottom: '10px' 
  }}
>
  <TextField
    {...register("username", {
      required: "Username is required",
      minLength: { value: 4, message: "Must be at least 4 characters" },
    })}
    placeholder="Username"
    variant="outlined"
    fullWidth
    error={!!errors.username}
    helperText={errors.username ? String(errors.username.message) : ''}
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        paddingLeft: '40px',
      },
    }}
  />
  <Box 
    component="img"
    src={usernameIcon}
    alt="username icon"
    sx={{
      position: 'absolute',
      top: errors.username ? '35%' : '50%', // Adjust position based on error
      left: '10px',
      transform: 'translateY(-50%)',
      width: '20px',
      height: '20px',
      pointerEvents: 'none', // Ensures no interference with user interaction
      transition: 'top 0.2s ease-in-out', // Smooth transition for position change
    }}
  />
</Box>




          {/* Password Input */}
          <Box 
  sx={{ 
    position: 'relative', 
    marginBottom: '10px' 
  }}
>
  <TextField
    {...register("password", {
      required: "Password is required",
      minLength: { value: 8, message: "Must be at least 8 characters" },
    })}
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    variant="outlined"
    fullWidth
    error={!!errors.password}
    helperText={errors.password ? String(errors.password.message) : ''}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={handleClickShowPassword} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        paddingLeft: '40px',
      },
    }}
  />
  <Box 
    component="img"
    src={passwordIcon}
    alt="password icon"
    sx={{
      position: 'absolute',
      top: errors.password ? '35%' : '50%', // Adjust position dynamically based on helperText
      left: '10px',
      transform: 'translateY(-50%)',
      width: '20px',
      height: '20px',
      pointerEvents: 'none', // Prevent interference with user interaction
      transition: 'top 0.2s ease-in-out', // Smooth animation for position changes
    }}
  />
</Box>


          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
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
            Login
          </Button>
          <Typography
            sx={{
              marginTop: "15px",
              color: "#a2a2a2",
              textAlign: "center",
            }}
          >
            <Link to="/auth">Sign up?</Link>
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: "#a2a2a2",
              textAlign: "center",
            }}
          >
            <Link to="/verificationemail">Forgot your password?</Link>
          </Typography>
        </form>
      </Container>
    </Grid>


        {/* Right Section - Image */}
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
      </Grid>
    </Box>
  );
};

export default Login;
