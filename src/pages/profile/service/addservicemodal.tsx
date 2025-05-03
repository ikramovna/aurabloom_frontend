/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/system";
import { Modal } from "antd";
import Typography from "@mui/material/Typography";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {  objectToFormDataAddService } from "../../../formdata/formdataprofile";
import { Controller, useForm } from "react-hook-form";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Api } from "../../../modules/auth";
import { ICategory } from "../../../interface";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import imageicon from "../../../assets/selectImage.svg";
import "./index.css";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

interface AddServiceModalProps {
  open: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
  id: number | null;
  name?: string;
  parent: number | null;
  data?: undefined;
  success: boolean;
  category: number | null;
}
const schema = yup.object().shape({
  duration: yup.string().required("This field is required"),
  category: yup.mixed().required("This Category is required"),
  name: yup.string().required("This field is required"),
  price: yup.string().required("This field is required"),
  description:yup.string()
  // image: yup.mixed().required("Image is required"),
});

const AddServiceModal: FunctionComponent<AddServiceModalProps> = ({
  open,
  setIsModalOpen,
  handleClose,
}) => {
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await Api.getallCategory();
        setCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile: any = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null); // Fayl tanlanmagan holatda null qo'yamiz
    }
  };

  const [category, setCategory] = useState<ICategory[]>([]); // Initialize as an empty array
  const [defaultcategory, setDefaultCategory] = useState("");
  const [selectedTime, setSelectedTime] = useState<string>("00:15");
  const [selectedCategory, setSelectedCategory] = useState<number>(0)
   
  

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTime(event.target.value);
  };

  const hours = Array.from({ length: 6 }, (_, i) => String(i).padStart(2, "0"));
  const minutes = Array.from({ length: 4 }, (_, i) =>
    String(i * 15).padStart(2, "0")
  ); // 0, 15, 30, 45, 60
  const options = hours.flatMap((hour) =>
    minutes.map((minute) => `${hour}:${minute}`)
  );

  const onSubmit = async (values: any) => {
    if (file === null) {
      toast.error("Image is required");
    } else {
      const fullData = {
        ...values,
        category:selectedCategory,
        image: file,
      };
      const datas = objectToFormDataAddService(fullData);
      try {
        
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
        const { data } = await Api.AddService(datas);  
        setIsModalOpen(false)
        reset()
      } catch (error) {
        console.log(error);
      }
      setIsModalOpen(false);
      setDefaultCategory("")
      reset();

      toast.success("Your service is added");
    }
  };
    
  const handleCategory = (event:any) => {
    setDefaultCategory(event.target.value);
  };
  const SelectCategory = (id:any) =>{
     setSelectedCategory(id)
  }

  return (
    <Box>
      <Modal
        centered
        open={open}
        onCancel={() => handleClose()}
        footer={null}
        width={400}
        style={{
          maxWidth: "300px auto",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: "#000",
            fontFamily: "Inter,sans-serif",
            fontSize: "28px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
          }}
        >
          Add a service
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      marginBottom: "10px",
                      marginTop: "10px",
                      borderRadius: "12px",
                    }}
                    placeholder="Select a Category"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    value={defaultcategory} // Corrected here
                    // error={!!errors.category?.message}
                    onChange={(e) => {
                      field.onChange(e);
                      handleCategory(e);
                    }}
                  >
                    <MenuItem value="" sx={{ textAlign: "left" }}>
                      <em
                        style={{
                          paddingLeft: "0px",
                          fontFamily: "Inter, sans-serif",
                          fontStyle: "normal",
                          color: "#b3b3b3",
                        }}
                      >
                        Select a category...
                      </em>
                    </MenuItem>
                    {category.map(({ id, name }: ICategory) => (
                      <MenuItem value={name} onClick={()=>SelectCategory(id)} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            />
            {errors.category && (
              <p style={{ color: "red", textAlign: "start" }}>
                {errors.category.message}
              </p>
            )}
          </Box>
          <div style={{ position: "relative", marginTop: "10px" }}>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className="login-form"
              type="text"
              placeholder="Name"
              style={{
                width: "100%",
                padding: "16px 10px",
                marginBottom: "10px",
                borderRadius: "12px",
                border: "1px solid #B5B5B5",
                fontSize: "18px",
                alignItems: "center",
              }}
            />
          </div>
          {file === "" && errors.name && (
            <p
              style={{ color: "red", textAlign: "start" }}
            >{`${errors.name.message}`}</p>
          )}
          <div style={{ position: "relative", marginTop: "10px" }}>
            <OutlinedInput
              {...register("price", {
                required: "Price is required",
                minLength: {
                  value: 4,
                  message: "price must be at least 4 number",
                },
              })}
              type="number"
              placeholder="Price"
              style={{
                width: "100%",
                marginBottom: "10px",
                borderRadius: "12px",
                marginLeft: "0px",
                marginRight: "0px",
                fontSize: "18px",
              }}
              endAdornment={
                <InputAdornment position="end" sx={{ color: "rgb(195, 156, 117)" }}>
                  <p>$</p>
                </InputAdornment>
              }
            />
          </div>
          {errors.price && (
            <p
              style={{ color: "red", textAlign: "start" }}
            >{`${errors.price.message}`}</p>
          )}

          <div style={{ position: "relative", marginTop: "10px" }}>
            <Controller
              name="duration"
              control={control}
              rules={{ required: "Select Duration is required" }}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      marginBottom: "10px",
                      marginTop: "0px",
                      borderRadius: "12px",
                    }}
                    // placeholder="Select a Category"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    value={selectedTime} // Corrected here
                    defaultValue="00:15"
                    // error={!!errors.category?.message}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange(e);
                    }}
                  >
                    <MenuItem value="" sx={{ textAlign: "left" }}>
                      <em
                        style={{
                          paddingLeft: "0px",
                          fontFamily: "Inter, sans-serif",
                          fontStyle: "normal",
                          color: "#b3b3b3",
                        }}
                      >
                        {selectedTime}
                      </em>
                    </MenuItem>
                    {options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {file === null ? (
              <Box
                className=" select-image"
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #B5B5B5",
                  borderRadius: "12px",
                  marginTop: "10px   ",
                }}
              >
                <img
                  src={imageicon}
                  width={24}
                  height={24}
                  style={{ marginTop: "0px", marginRight: "0px" }}
                  alt="imageicon"
                />
                <label
                  htmlFor="file-input"
                  style={{
                    padding: "16px 8px",
                    borderRadius: "12px",
                    fontSize: "18px",
                    alignItems: "center",
                    marginLeft: "0px",

                    cursor: "pointer",
                  }}
                >
                  Select Image
                </label>
                <input
                  id="file-input"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  required
                />
              </Box>
            ) : (
              <Box
                sx={{
                  backgroundColor: "rgb(195, 156, 117)",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #B5B5B5",
                  borderRadius: "12px",
                }}
              >
                <img
                  src={imageicon}
                  width={24}
                  height={24}
                  style={{ marginTop: "0px", marginRight: "0px" }}
                  alt="imageicon"
                />
                <label
                  htmlFor="file-input"
                  style={{
                    padding: "16px 8px",
                    borderRadius: "12px",
                    fontSize: "18px",
                    alignItems: "center",
                    marginLeft: "0px",
                    color: "#FFF",
                    cursor: "not-allowed",
                  }}
                >
                  Selected Image
                </label>
              </Box>
            )}
          </div>
          <div style={{ position: "relative" }}>
            <textarea
              {...register("description", {
              })}
              style={{
                width: "100%",
                borderRadius: "12px",
                borderColor: "B5B5B5",
                marginTop: "20px",
                padding: "14px 22px",
                height: "150px",
              }}
              placeholder="Write more about your service. For example, “A haircut with styling includes cutting and styling hair.”"
              rows={9}
            ></textarea>
          </div>
        </form>
        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting}
          variant="contained"
          form="login"
          onClick={handleSubmit(onSubmit)}
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
          Create
        </Button>
      </Modal>
    </Box>
  );
};

export default AddServiceModal;
