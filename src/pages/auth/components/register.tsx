import { Box, Grid, Typography, Button, Container,  } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Api } from "../../../modules/auth";
import { ActiveCode } from "../../../modules/auth/api";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../../assets/loginImage.png";
import logoAura from "../../../assets/logoAura.svg";
import "../index.css";

interface Register1stepProps {}

const Register1step: FunctionComponent<Register1stepProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [email, setEmail] = useState("");
  const [activeCodes, setactiveCodes] = useState<number | undefined>(undefined);
  const [emailverification, setemailverification] = useState(false);
  const navigate = useNavigate();

  const onsubmit = async (values: any) => {
    const selectedRoles = localStorage.getItem("roles");
    try {
      toast.success("Activation code sent to your email");
      if (values.email) {
        const { data } = await Api.Register({
          ...values,
          is_master: selectedRoles,
        });

        toast.success(data ? "Register 1 step is completed" : "");
        setEmail(values.email);
        setemailverification(true);
      }
    } catch (error: any) {
      setemailverification(false);
      const email = error.response.data?.email;
      const username = error.response.data?.username;
      if (email) {
        toast.error(email);
      }
      if (username) {
        toast.error(username);
      }
      console.log(error);
    }
    setactiveCodes(values.activate_code);
  };

  const activeCode = async () => {
    const activatsiyacode = activeCodes;
    try {
      const { data } = await ActiveCode({
        email,
        activate_code: activatsiyacode,
      });
      console.log(data);
      if (data) {
        localStorage.setItem("access", data.access_token);
        navigate("/register2step");
        reset();
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, height: "100vh", width: "100%" }}>
      <Grid container sx={{ flex: 1 }}>
        <Grid
          xs={12}
          sm={6}
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 20px",
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
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 100,
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
                marginBottom: "20px",
                textAlign: "center",
                fontSize: { xs: "28px", sm: "34px" }, // Adjust font size for smaller screens
              }}
            >
              Sign Up
            </Typography>

            <form onSubmit={handleSubmit(onsubmit)} id="register">
              <input
                className="login-form"
                type="text"
                {...register("full_name", {
                  required: "Full Name is required",
                  minLength: {
                    value: 2,
                    message: "Full name must be at least 2 characters",
                  },
                })}
                placeholder="Full Name"
                style={{ width: "100%" }}
              />
              {errors.full_name && (
                <p style={{ color: "red" }}>{`${errors.full_name.message}`}</p>
              )}

              <input
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 8,
                    message: "Email must be at least 8 characters",
                  },
                })}
                className="login-form"
                type="email"
                placeholder="Email"
                style={{ width: "100%" }}
              />
              {errors.email && (
                <p style={{ color: "red" }}>{`${errors.email.message}`}</p>
              )}

              <input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters",
                  },
                })}
                className="login-form"
                type="text"
                placeholder="Username"
                style={{ width: "100%" }}
              />
              {errors.username && (
                <p style={{ color: "red" }}>{`${errors.username.message}`}</p>
              )}

              <div style={{ position: "relative" }}>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding: "16px 22px",
                    borderRadius: "8px",
                    backgroundColor: "transparent",
                    border: "1px solid #B5B5B5",
                    fontSize: "14px",
                    paddingRight: "40px",
                    outline: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "47%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </div>
              </div>
              {errors.password && (
                <p style={{ color: "red" }}>{`${errors.password.message}`}</p>
              )}

              {emailverification && (
                <input
                  {...register("activate_code", {
                    required: "Activation code is required",
                    minLength: {
                      value: 6,
                      message: "Activation code must be at least 6 characters",
                    },
                  })}
                  onChange={(e) => setactiveCodes(parseInt(e.target.value))}
                  style={{
                    background: "#FFF",
                    marginTop: "14px",
                    width: "100%",
                    padding: "16px 22px",
                    borderRadius: "8px",
                    border: "1px solid #B5B5B5",
                  }}
                  type="number"
                  placeholder="Activation Code"
                />
              )}
            </form>

            {emailverification ? (
              <Button
                fullWidth
                variant="contained"
                sx={{
                  marginTop: "30px",
                  height: "50px",
                  background: "#c39c75",
                  color: "#FFF",
                  boxShadow: "none",
                  fontWeight: "600",
                  fontSize: "15px",
                  borderRadius: "8px",
                  "&:hover": {
                    background: "#a98260",
                    boxShadow: "none",
                  },
                }}
                onClick={activeCode}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                form="register"
                variant="contained"
                sx={{
                  marginTop: "30px",
                  height: "50px",
                  background: "#c39c75",
                  color: "#FFF",
                  boxShadow: "none",
                  fontWeight: "600",
                  fontSize: "15px",
                  borderRadius: "8px",
                  "&:hover": {
                    background: "#a98260",
                    boxShadow: "none",
                  },
                }}
              >
                Verify Email
              </Button>
            )}

            <Box sx={{ marginTop: "20px", color: "#B5B5B5", textAlign: "center" }}>
              Have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{ color: "#c39c75", cursor: "pointer" }}
              >
                Log in here
              </span>
            </Box>
          </Container>
        </Grid>

        <Grid item xs={12} md={6} sx={{ backgroundImage: `url(${loginImage})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: "0 12px 12px 0" }} />
      </Grid>
    </Box>
  );
};

export default Register1step;
