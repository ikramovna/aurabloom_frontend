/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Modal } from "antd";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { IEntity } from "../../../modules/auth/types";
import { Api } from "../../../modules/auth";
// import editmodaluploadImage from "../../../assets/editmodaluploadImage.png";
import { useForm } from "react-hook-form";
import "../../auth/index.css";
import Button from "@mui/material/Button";
import { objectToFormData } from "../../../formdata/formdataprofile";
import telegramIcon from "../../../assets/telegramIconmaster.svg"
import instagramIcon from "../../../assets/instagramIconmaster.svg"
import facebookIcon from "../../../assets/facebookIconmaster.svg"
import toast from "react-hot-toast";
import { Download } from "lucide-react";
interface EditModalMasterProps {
  open: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
}

const EditModalMaster: FunctionComponent<EditModalMasterProps> = ({
  open,
  setIsModalOpen,
  handleClose,
}) => {
  const [userdata, setUserdata] = useState<IEntity.User>();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectGender, setSelectGender] = useState<string | undefined>();
  useEffect(() => {
    const getUserdata = async () => {
      try {
        const { data } = await Api.UserProfil();
        setSelectGender(data.gender);
        setUserdata(data);
      } catch (error: any) {
        console.log(error.response.data.username);
      }
    };
    getUserdata();
  }, []);
console.log(isUpdating);

  const chooseGenders = (gender: string) => {
    if (gender === selectGender) {
      setSelectGender("");
    } else {
      setSelectGender(gender);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const refreshPage = () => {
    setIsUpdating(true);
    // toast.success("Updated Information", {
    //   duration: 2000,
    //   position: "top-center",
    // });
    
    // Wait for the toast to be visible before refreshing
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const onsubmit = async (values: any) => {
    const fullData = {
      ...values,
      image: values.image.length === 0 ? userdata?.image : values.image[0],
      gender: selectGender,
      is_master:userdata?.is_master
    };
    console.log(values,'values',fullData,userdata);
    
    const datas = await objectToFormData(fullData);
    console.log(datas,'fullData');
    

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    
      const { data } = await Api.UserUpdateProfile(datas);
      toast.success(data ? "Profile edited successfully" : "");
      setIsModalOpen(false);
      reset();
      refreshPage();
    } catch (error) {
      console.log(error);
    }
  };

  function getInitials(fullName: string): string {
    const names: string[] = fullName.split(" ");
    const initials: string[] = names.map((name) => name.charAt(0));
    return initials.join("").toUpperCase();
  }
  const initials: string = getInitials(userdata?.full_name || "");

  return (
    <div>
      <Modal
        centered
        open={open}
        onCancel={() => handleClose()}
        footer={null}
        width={400}
        style={{ maxWidth: "300px auto" }}
      >
        <Box>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div
              style={
                userdata?.image === null
                  ? {
                      width: "100px",
                      height: "100px",
                      padding: "15px",
                      backgroundColor: "#B5B5B5",
                      borderRadius: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      marginTop: "30px",
                    }
                  : {
                      width: "100px",
                      height: "100px",
                      padding: "0px",
                      backgroundColor: "#B5B5B5",
                      borderRadius: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      marginTop: "30px",
                    }
              }
              onClick={() => document.getElementById("upload-input")?.click()}
            >
              {userdata?.image === null ? (
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    color: "#FFFFFF",
                    fontSize: "38px",
                  }}
                >
                  {initials}
                </Typography>
              ) : (
                <img src={userdata?.image} width="100%" height="100%" />
              )}

              <input
                id="upload-input"
                type="file"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  opacity: 0,
                  pointerEvents: "none",
                }}
                {...register("image")}
              />
              {/* <img
                width={30}
                height={30}
                src={editmodaluploadImage}
                alt="Upload Image"
                style={{ position: "absolute", top: "75px", right: "0px" }}
              /> */}
              <Download style={{width:"30px",height:"30px",position:"absolute",top:"75px",right:"0px",color:"rgb(195, 156, 117)"}}/>
            </div>
            <div style={{ position: "relative", marginTop: "40px" }}>
              <input
                {...register("full_name", {
                  required: "Fullname is required",
                  minLength: {
                    value: 4,
                    message: "Fullname must be at least 4 characters",
                  },
                })}
                defaultValue={userdata?.full_name}
                className="login-form"
                type="text"
                placeholder="Fullname"
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  marginBottom: "10px",
                  borderRadius: "12px",
                  border: "1px solid #B5B5B5",
                  fontSize: "18px",
                  alignItems: "center",
                }}
              />
            </div>
            {errors.fullname && (
              <p
                style={{ color: "red", marginBottom: "20px" }}
              >{`${errors.fullname.message}`}</p>
            )}
            <div style={{ position: "relative" }}>
              <input
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 4,
                    message: "Email must be at least 4 characters",
                  },
                })}
                defaultValue={userdata?.email}
                className="login-form"
                type="email"
                placeholder="Email"
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  marginBottom: "10px",
                  borderRadius: "12px",
                  border: "1px solid #B5B5B5",
                  fontSize: "18px",
                  alignItems: "center",
                }}
              />
            </div>
            {errors.email && (
              <p
                style={{ color: "red", marginBottom: "20px" }}
              >{`${errors.email.message}`}</p>
            )}
            <div style={{ position: "relative" }}>
              <input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters",
                  },
                })}
                defaultValue={userdata?.username}
                className="login-form"
                type="text"
                placeholder="Username"
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  marginBottom: "10px",
                  borderRadius: "12px",
                  border: "1px solid #B5B5B5",
                  fontSize: "18px",
                  alignItems: "center",
                }}
              />
            </div>
            {errors.username && (
              <p
                style={{ color: "red", marginBottom: "20px" }}
              >{`${errors.username.message}`}</p>
            )}
            <div style={{ position: "relative" }}>
              <textarea
                placeholder="About me"
                style={{
                  width: "100%",
                  border: "1px solid #B5B5B5",
                  borderRadius: "12px",
                  color: "#B5B5B5",
                  fontFamily: "Inter,sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                  padding: "15px",
                }}
                id=""
                cols={30}
                rows={5}
              ></textarea>
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <Box
                onClick={() => chooseGenders("male")}
                sx={{
                  margin: "0px",
                  border:
                    selectGender === "male"
                      ? "3px solid rgb(195, 156, 117)"
                      : "1px solid #B5B5B5",
                  borderRadius: "12px",
                  padding: "12px 45px",
                  width: "100%",
                  marginRight: "10px",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    color: selectGender === "male" ? "rgb(195, 156, 117)" : "#B5B5B5",
                  }}
                >
                  Male
                </Typography>
              </Box>
              <Box
                onClick={() => chooseGenders("female")}
                sx={{
                  margin: "0px",
                  border:
                    selectGender === "female"
                      ? "3px solid rgb(195, 156, 117)"
                      : "1px solid #B5B5B5",
                  borderRadius: "12px",
                  padding: "12px 50px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    color: selectGender === "female" ? "rgb(195, 156, 117)" : "#B5B5B5",
                    marginLeft: "0px",
                  }}
                >
                  Female
                </Typography>
              </Box>
            </Box>
            
              <Typography
                sx={{
                  color: "#B5B5B5",
                  fontFamily: "Inter,sans-serif",
                  fontSize: "17px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
              >Social Messengers</Typography>
              <div style={{position:"relative",border: "1px solid #B5B5B5",marginBottom:"10px",borderRadius:"12px",display:"flex",overflow:"hidden",alignItems:"center"}}>
                <img src={telegramIcon} style={{height:"25px",paddingLeft:"10px"}} alt="" />
              <input type="text"
              placeholder="Telegram" 
              {...register("telegram")}
              style={{
                width: "100%",
                padding: "16px 10px",
                marginBottom: "0px",
                border:"none",
                borderRadius: "12px",
                marginTop:"0px",
                // border: "1px solid #B5B5B5",
                // backgroundImage: `url('${telegramIcon}')`,
                // backgroundRepeat: "no-repeat",
                fontSize: "18px",
                // backgroundSize: "23px 23px",
                // backgroundPosition: "8px",
                alignItems: "center",
              }}
              onFocus={(e) => e.target.style.outline = "none"}
              />
              </div>
              <div style={{position:"relative",border: "1px solid #B5B5B5",marginBottom:"10px",borderRadius:"12px",display:"flex"}}>
                <img src={instagramIcon} style={{paddingLeft:"10px"}} alt="" />
              <input type="text"
              placeholder="Instagram" 
              {...register("instagram")}
              style={{
                width: "100%",
                padding: "16px 10px",
                // marginBottom: "16px",
                marginTop:"0px",
                border:"none",
                borderRadius: "12px",
                // border: "1px solid #B5B5B5",
                // backgroundImage: `url('${instagramIcon}')`,
                // backgroundRepeat: "no-repeat",
                fontSize: "18px",
                // backgroundSize: "23px 23px",
                // backgroundPosition: "8px",
                alignItems: "center",
              }}
              onFocus={(e) => e.target.style.outline = "none"}
              />
              </div>
              <div style={{position:"relative",border: "1px solid #B5B5B5",marginBottom:"10px",borderRadius:"12px",display:"flex"}}>
                <img src={facebookIcon} style={{paddingLeft:"10px"}} alt="" />
              <input type="text"
              placeholder="Facebook" 
              {...register("facebook")}
              style={{
                width: "100%",
                padding: "16px 10px",
                // marginBottom: "10px",
                marginTop:"0px",
                borderRadius: "12px",
                // border: "1px solid #B5B5B5",
                border:"none",
                // backgroundImage: `url('${facebookIcon}')`,
                // backgroundRepeat: "no-repeat",
                fontSize: "18px",
                // backgroundSize: "23px 23px",
                backgroundPosition: "8px",
                alignItems: "center",
              }}
              onFocus={(e) => e.target.style.outline = "none"}
              />
              </div>
          </form>
        </Box>
        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting}
          variant="contained"
          form="login"
          onClick={handleSubmit(onsubmit)}
          sx={{
            marginTop: "36px",
            mb: 2,
            height: "50px",
            background: "#F5EFE1",
            boxShadow: "none",
            color: "#000",
            fontWeight: "600",
            fontSize: "15px",
            fontStyle: "normal",
            lineHeight: "normal",
            fontFamily: "Inter, sans-serif",
            "&:hover": {
              background: "#F5EFE1",
              boxShadow: "none",
            },
          }}
        >
          Save
        </Button>
      </Modal>
    </div>
  );
};

export default EditModalMaster;
