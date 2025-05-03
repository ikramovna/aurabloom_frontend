/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { Modal } from "antd";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { IEntity } from "../../../modules/auth/types";
import { Api } from "../../../modules/auth";
import { useForm } from "react-hook-form";
import "../../auth/index.css";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import imageupload from "../../../assets/imageupload.png"


interface EditModalProps {
  open: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
}

const EditModal: FunctionComponent<EditModalProps> = ({
  open,
  setIsModalOpen,
  handleClose
}) => {
  const [userdata, setUserdata] = useState<IEntity.User>();
  const [previewImage, setPreviewImage] = useState(userdata?.image || "");

  const handleImageChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
  
      setUserdata((prev) => {
        if (!prev) return undefined; // Agar `prev` mavjud bo'lmasa, `undefined` qaytaramiz
  
        return {
          ...prev,
          image: imageUrl, // Faqat `image` maydonini yangilaymiz
        };
      });
    }
  };
  

  const [selectGender, setSelectGender] = useState<string | undefined>();
  useEffect(() => {
    const getUserdata = async () => {
      try {
        const { data } = await Api.UserProfil();
        
        setSelectGender(data.gender)
        setUserdata(data);

      } catch (error:any) {
        console.log(error.response.data.username);
       
      }
    };
    getUserdata();
    

  }, []);
  
  

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

  const onsubmit = async (values:any) => {
    console.log(values, "values");
  
    const formData = new FormData();
  
    // Rasmni qo'shish (bo'lsa)
    if (values.image && values.image.length > 0 && values.image[0] instanceof File) {
      formData.append("image", values.image[0]);
    } else {
      formData.append("image", "");
    }
  
    // Qo'shimcha maydonlarni qo'shish
    if (selectGender !== undefined && selectGender !== null) {
      formData.append("gender", selectGender);
    }
    if (userdata?.is_master !== undefined && userdata?.is_master !== null) {
      formData.append("is_master", String(userdata.is_master));
    }
  
    // Barcha boshqa maydonlarni qo'shish
    Object.keys(values).forEach((key) => {
      if (key !== "image" && values[key] !== undefined && values[key] !== null) {
        formData.append(key, String(values[key]));
      }
    });
  
    try {
      const { data } = await Api.UserUpdateProfile(formData);
      toast.success(data ? "Profile Updated successfully" : "");
      setIsModalOpen(false);
      reset();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
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
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "#B5B5B5",
        borderRadius: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        marginTop: "30px",
        cursor: "pointer",
        overflow: "hidden",
      }}
      onClick={() => document.getElementById("upload-input")?.click()}
    >
      {previewImage ? (
        <>
          <img
            src={previewImage}
            width="100%"
            height="100%"
            style={{ objectFit: "cover", borderRadius: "100px" }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPreviewImage("");
              setUserdata((prev) => (prev ? { ...prev, image: "" } : undefined));
            }}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </>
      ) : (
        <img src={imageupload} style={{width:"40px",height:"40px"}} alt="" />
      )}
      <input
        id="upload-input"
        type="file"
        accept="image/*"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
        {...register("image")}
        onChange={handleImageChange}
      />
    </div>
            <div style={{ position: "relative",marginTop:"40px" }}>
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
                  padding: "16px 35px",
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
                  padding: "16px 35px",
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
                  padding: "16px 35px",
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
                  border: selectGender === "male" ? "3px solid rgb(195, 156, 117)" : "1px solid #B5B5B5",
                  borderRadius: "12px",
                  padding: "12px 45px",
                  width: "100%",
                  marginRight:"10px",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{ color: selectGender === 'male' ? "rgb(195, 156, 117)" : "#B5B5B5" }}
                >
                  Male
                </Typography>
              </Box>
              <Box
                onClick={() => chooseGenders("female")}
                sx={{
                  margin: "0px",
                  border: selectGender === "female" ? "3px solid rgb(195, 156, 117)" : "1px solid #B5B5B5",
                  borderRadius: "12px",
                  padding: "12px 50px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    color: selectGender === 'female' ? "rgb(195, 156, 117)" : "#B5B5B5",
                    marginLeft: "0px"
                  }}
                >
                  Female
                </Typography>
              </Box>
                </Box>
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

export default EditModal;
