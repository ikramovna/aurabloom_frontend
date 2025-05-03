/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useEffect, useState } from "react";
import { useForm, Controller,SubmitHandler, FieldValues  } from "react-hook-form";
import { Api, Types } from "../../../modules/auth";
import { getRegions,getDistrict, getMahalla, } from "../../../api/api";
import { Box, } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";
import {MenuItem, OutlinedInput,Container,Grid, FormHelperText, Select,SelectChangeEvent, FormControlLabel, Checkbox, Modal, IconButton} from "@mui/material"
import "../index.css"
import { Link, useNavigate } from "react-router-dom";
// import Grid from "@mui/system/Unstable_Grid";
import loginImage from "../../../assets/loginImage.png"
import logoAura from "../../../assets/logoAura.svg"
import CloseIcon from '@mui/icons-material/Close';

interface Register2stepsProps {
    phone: string,
    gender: string,
    region?: number | undefined,
    district?: number | undefined,
    mahalla?: number | undefined,
    house: string,
}
 
const Register2steps: FunctionComponent<Register2stepsProps> = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        // reset,
      } = useForm<Register2stepsProps>();

      useEffect(() => {
        (async () => {
          const { data, success } = await getRegions();
          success && setRegions(data);
        })();
      }, []);
    

      const [selectGenders, setSelectGenders] = useState(0);
      const [selectGender, setSelectGender] = useState("");
      const [regionId, setRegionId] = useState<number | undefined>(undefined);
      const [districtId, setDistrictId] = useState<number | undefined>(undefined);
      const [mahallasId, setMahallaId] = useState<number | undefined>(undefined);
      const navigate = useNavigate();

      const [regions, setRegions] = useState<Types.IForm.Region[] | undefined>(
        undefined
      );
      const [districts, setDistricts] = useState<Types.IForm.Region[] | undefined>(
        undefined
      );
      const [mahallas, setMahallas] = useState<Types.IForm.Region[] | undefined>(
        undefined
      );

      const chooseGenders = (value: any) => {
        if (value === 0) {
          setSelectGender("female");
        } else {
          setSelectGender("male");
        }
      };

      const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [mahalla, setMahalla] = useState("");

  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false); 
  const [notificationShown, setNotificationShown] = useState(false)

  const handleRegion = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
  
  };
  const handleDistrict = (event: SelectChangeEvent) => {
    setDistrict(event.target.value);
  };
  const handleMahalla = (event: SelectChangeEvent) => {
    setMahalla(event.target.value);
  };

  const handlePrivacyPolicyClick = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };


  const onsubmits: SubmitHandler<FieldValues> = async (values) => {
    if (!privacyPolicyChecked && !notificationShown) {
      toast.error("Please read and accept the Privacy Policy before submitting.");
      setNotificationShown(true); 
      return; 
    }
   
      console.log(values.house);
      
    if(selectGender === ""){
      setSelectGender("female")
    }    
    try {
      const { data } = await Api.Register2step({
        phone: values.phone,
        gender: selectGender,
        address: {
          region: regionId,
          district: districtId,
          mahalla: mahallasId,
          house: values.house,
        },
      });
     toast.success(data?"Register process is completed":"")
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  const selectDistrict = async (id: any) => {
    console.log(id);
    setRegionId(id);
    try {
      const { data, success } = await getDistrict(id);
      success && setDistricts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectMahalla = async (id: any) => {
    console.log(id);
    setDistrictId(id);
    try {
      const { data, success } = await getMahalla(id);
      success && setMahallas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMahallaid = (id: any) => {
    setMahallaId(id);
    console.log(id);
  };

    return ( 
        <>
         <Box
        sx={{ display: "flex", height: "100vh", width: "100vw",  }}>
          
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
          top: { xs: "0px", sm: "0px" }, 
          left: "50%",
          transform: "translateX(-50%)",
          zIndex:100 
        }}
      >
        <Link to={"/"}>
          <img src={logoAura} style={{ width: "100%", height: "100%" }} alt="" />
        </Link>
      </Box>
      <Container maxWidth="xs">
           
              <Typography  variant="h4"
                    sx={{
                      fontWeight: "700",
                      color: "#4b4b4b",
                      marginTop:"30px",
                      marginBottom: "10px",
                      textAlign: "center",
                      fontSize: { xs: "20px", sm: "30px" }
                    }}>
              Sign Up
              </Typography>
              
              <form  onSubmit={handleSubmit(onsubmits)} id="register" >
               
              <InputMask
  {...register("phone", {
    required: "Phone number is required",
    pattern: {
      value: /^(\+\d{3})?\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/,
      message: "Invalid phone number format",
    },
  })}
  mask="+99999 999 99 99" 
  className="input-mask"
  defaultValue="+998"
  maskChar=" "
/>
{errors.phone && (
  <p style={{ color: "red" }}>{errors.phone.message}</p>
)}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                >
                  <Box
                    onClick={() => setSelectGenders(1)}
                    sx={{ margin: "0px",width: "49%"}}
                  >
                    <Box
                      sx={
                        selectGenders === 1
                          ? {
                              width: "100%",
                              padding: { xs: "9px 40px", sm: "12px 40px" },
                              marginRight: "0px",
                              alignItems: "center",
                              textAlign: "center",
                              border: "1px solid #c39c75",
                              borderRadius: "8px",
                            }
                          : {
                              width: "100%",
                              padding: { xs: "9px 40px", sm: "12px 40px" },
                              marginRight: "0px",
                              alignItems: "center",
                              textAlign: "center",
                              border: "1px solid #B5B5B5 ",
                              borderRadius: "8px",
                            }
                      }
                      onClick={() => chooseGenders(1)}
                    >
                      <Typography
                        sx={
                          selectGenders === 1
                            ? { color: "#c39c75" }
                            : { color: "#B5B5B5" }
                        }
                      >
                        Male
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    onClick={() => setSelectGenders(0)}
                    sx={{ margin: "0px",width: "49%"}}
                  >
                    <Box
                      sx={
                        selectGenders === 0
                          ? {
                              width: "100%",
                              padding: { xs: "9px 40px", sm: "12px 40px" },
                              alignItems: "center",
                              textAlign: "center",
                              border: "1px solid #c39c75",
                              borderRadius: "8px",
                            }
                          : {
                              width: "100%",
                              padding: { xs: "9px 40px", sm: "12px 40px" },
                              alignItems: "center",
                              textAlign: "center",
                              border: "1px solid #B5B5B5 ",
                              borderRadius: "8px",
                            }
                      }
                      onClick={() => chooseGenders(0)}
                    >
                      <Typography
                        sx={
                          selectGenders === 0
                            ? { color: "#c39c75", marginLeft: "0px" }
                            : { color: "#B5B5B5", marginLeft: "0px" }
                        }
                      >
                        Female
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Controller
                    name="region"
                    control={control}
                    rules={{ required: "Select Region is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          sx={{
                            width: "100%",
                            textAlign: "left",
                            marginBottom: "10px",
                            borderRadius: "8px",
                            
                          }}
                          placeholder="Region"
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          value={region}
                          error={!!errors.region?.message}
                          onChange={(e) => {
                            field.onChange(e);
                            handleRegion(e); 
                          }}
                        >
                          <MenuItem value="" sx={{ textAlign: "left" }}>
                            <em
                              style={{
                                paddingLeft: "10px",
                                fontFamily: "Inter, sans-serif",
                                fontStyle: "normal",
                                color: "#7d7d7d",
                              }}
                            >
                              Region
                            </em>
                          </MenuItem>
                          {regions?.map(({ id, name }: Types.IForm.Region) => (
                            <MenuItem
                              onClick={() => selectDistrict(id)}
                              value={name}
                              key={id}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText sx={{ color: "red", marginTop: "0px" }}>
                          {errors.region?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Box>
                <Box>
                  <Controller
                    name="district"
                    control={control}
                    rules={{ required: "Select District is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          sx={{
                            width: "100%",
                            textAlign: "left",
                            marginBottom: "10px",
                            borderRadius: "8px",
                          }}
                          placeholder="District"
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          value={district}
                          error={!!errors.district?.message}
                          onChange={(e) => {
                            field.onChange(e);
                            handleDistrict(e); 
                          }}
                        >
                          <MenuItem value="" sx={{ textAlign: "left" }}>
                            <em
                              style={{
                                paddingLeft: "10px",
                                fontFamily: "Inter, sans-serif",
                                fontStyle: "normal",
                                color: "#7d7d7d",
                              }}
                            >
                              District
                            </em>
                          </MenuItem>
                          {districts?.map(
                            ({ id, name }: Types.IForm.Region) => (
                              <MenuItem
                                onClick={() => selectMahalla(id)}
                                value={name}
                                key={id}
                              >
                                {name}
                              </MenuItem>
                            )
                          )}
                        </Select>
                        <FormHelperText sx={{ color: "red", marginTop: "0px" }}>
                          {errors.district?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Box>
                <Box>
                  <Controller
                    name="mahalla"
                    control={control}
                    rules={{ required: "Select Neighborhood is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          sx={{
                            width: "100%",
                            textAlign: "left",
                            marginBottom: "10px",
                            borderRadius: "8px",
                          }}
                          placeholder="Neighborhood"
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          value={mahalla}
                          error={!!errors.mahalla?.message}
                          onChange={(e) => {
                            field.onChange(e);
                            handleMahalla(e); 
                          }}
                        >
                          <MenuItem value="" sx={{ textAlign: "left" }}>
                            <em
                              style={{
                                paddingLeft: "10px",
                                fontFamily: "Inter, sans-serif",
                                fontStyle: "normal",
                                color: "#7d7d7d",
                              }}
                            >
                              Neighborhood 
                            </em>
                          </MenuItem>
                          {mahallas?.map(({ id, name }: Types.IForm.Region) => (
                            <MenuItem
                              value={name}
                              key={id}
                              onClick={() => getMahallaid(id)}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText sx={{ color: "red", marginTop: "0px" }}>
                          {errors.mahalla?.message}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <OutlinedInput
                    {...register("house", {
                      required: "House is required"
                    })}
                    className="login-form"
                    type="text"
                    fullWidth
                    placeholder="House"
                    sx={{
                      marginBottom: "5px",
                      width: "100%",
                      borderRadius: "8px",
                      border:"none",
                      fontSize: "16px",
                      padding:"0px 0 0 10px"
                    }}
                  />
                </Box>
                <Box sx={{display:'flex',alignItems:"center"}}>
                <FormHelperText sx={{ color: "red", marginTop: "0px" }}>
                  {errors.house?.message}
                </FormHelperText>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={privacyPolicyChecked}
                      onChange={() => setPrivacyPolicyChecked(!privacyPolicyChecked)}
                      name="privacyPolicy"
                    />
                  }
                  label="I agree to the Privacy Policy"
                  sx={{ marginTop: "0px", marginBottom: "0px" }}
                />
               
                <a
                  onClick={handlePrivacyPolicyClick}
                  style={{
                    fontSize: "14px",
                    color: "#c39c75",
                    cursor: "pointer",
                  }}
                >
                  Read Privacy Policy
                </a>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  form="register"
                  variant="contained"
                  sx={{
                    marginTop: "16px",
                    mb: 3,
                    height: "50px",
                    background: "#c39c75",
                  boxShadow:"none",
                  color:"#FFF",
                  fontWeight:"600",
                  fontSize:"15px",
                  fontStyle: "normal",
                  lineHeight: "normal",
                  fontFamily:"Inter, sans-serif",
                  // transition:"0.3s linear",
                  borderRadius:"8px",
                  "&:hover": {
                    background: "#a98260",
                    // opacity:"0.8",
                    boxShadow:"none",
                  }
                  }}
                  onClick={onsubmits}
                >
                  Save
                </Button>
              </form>
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
          <Modal
          open={openModal}
          onClose={closeModal}
          aria-labelledby="privacy-policy-title"
          aria-describedby="privacy-policy-description"
        >
          <Box sx={{display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      position: "absolute", 
      flexDirection:'column',
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",width: { xs: "90%", sm: "450px" }, height: { xs: "auto", sm: "400px" }, padding: "20px", backgroundColor: "white", borderRadius: "10px","&:focus-visible": {
              outline: "none", 
            } }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",marginLeft:"0px",marginRight:"0px",width:"100%",marginBottom:"10px" }}>
              <Typography variant="h6" id="privacy-policy-title" sx={{ fontWeight: "bold", marginBottom: "0px" }}>
                Privacy Policy
              </Typography>
              <IconButton onClick={closeModal}>
                <CloseIcon sx={{ color: "#333" }} /> 
              </IconButton>
            </Box>
            <Box sx={{height: "250px",overflowY: "auto"}}>
            <Typography variant="body2" id="privacy-policy-description" sx={{ fontSize: "14px", color: "#333", lineHeight: "1.6" }}>
  <strong>Privacy Policy</strong>
  <p>
    At Aura Bloom, we respect and protect your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal data when you interact with our website, services, or products.
  </p>
  
  <h3>1. Information We Collect</h3>
  <p>
    We collect personal information that you voluntarily provide when you register on our site, fill out forms, or make a purchase. This may include your name, email address, phone number, payment details, and other relevant information necessary to provide our services.
  </p>

  <h3>2. How We Use Your Information</h3>
  <p>
    We use the information we collect to process transactions, deliver products or services, communicate with you about your orders, and improve the quality of our offerings. We may also use your information to send you marketing communications, but only if you opt-in to receive them.
  </p>

  <h3>3. Sharing Your Information</h3>
  <p>
    We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted service providers who assist us in operating our website or conducting our business, as long as those parties agree to keep this information confidential.
  </p>

  <h3>4. Data Security</h3>
  <p>
    We implement a variety of security measures to ensure the safety of your personal information. All sensitive data is encrypted using Secure Socket Layer (SSL) technology to prevent unauthorized access.
  </p>

  <h3>5. Your Rights</h3>
  <p>
    You have the right to access, correct, or delete your personal data at any time. If you would like to exercise any of these rights, please contact us at <strong>aurabloomtmci@gmail.com.</strong>
  </p>

  <h3>6. Changes to This Privacy Policy</h3>
  <p>
    We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the "Last Updated" date will be revised accordingly.
  </p>

  <h3>7. Contact Us</h3>
  <p>
    If you have any questions or concerns about this Privacy Policy, please do not hesitate to contact us at <strong>aurabloomtmci@gmail.com.</strong>
  </p>

  <p style={{fontWeight:"bold"}}>Effective Date: May 3, 2025</p>
</Typography>
</Box>
            <Button
              onClick={closeModal}
              sx={{
                marginTop: "15px",
                backgroundColor: "#c39c75",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#a98260",
                }
              }}
            >
               Close
            </Button>
          </Box>
        </Modal>
        </Box>
        </>
     );
}
 
export default Register2steps;