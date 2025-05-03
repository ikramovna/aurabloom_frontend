/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box } from "@mui/system";
import { Modal } from "antd";
import { Dispatch, FunctionComponent, SetStateAction,useEffect,useState, } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Api, Types } from "../../../modules/auth";
import { Controller, useForm } from "react-hook-form";
import { ICategory } from "../../../interface";
import {
    MenuItem,
    Select,
    SelectChangeEvent,
    InputAdornment,
    OutlinedInput,
    Typography,
    Button
  } from "@mui/material";
  import "./index.css";
import toast from "react-hot-toast";
import { objectToFormDataAddService } from "../../../formdata/formdataprofile";
import imageicon from "../../../assets/selectImage.svg"



interface EditModalServiceProps {
    open: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    handleOpen: () => void;
    handleClose: () => void;
    service?: Types.IForm.PostsApi;
    id: number | null;
    name?: string;
    parent: number | null;
    data?: undefined;
    success: boolean;
    category: number | null;
    price:string;
}

const schema = yup.object().shape({
    duration: yup.string(),
    category: yup.mixed(),
    name: yup.string(),
    price: yup.string(),
    description:yup.string()
    // image: yup.mixed().required("Image is required"),
  });
 
const EditModalService: FunctionComponent<EditModalServiceProps> = ({
    open,
    setIsModalOpen,
    handleClose,
    service,
    price
  }) => {

    const [file, setFile] = useState(null);
    const [category, setCategory] = useState<ICategory[]>([]); // Initialize as an empty array
    const [defaultcategory, setDefaultCategory] = useState("");
    const [selectedTime, setSelectedTime] = useState<any>("");
    const [selectedCategory, setSelectedCategory] = useState<number>(0)
// console.log(defaultcategory);


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
    
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile: any = event.target.files?.[0];
        if (selectedFile) {
          setFile(selectedFile);
        } else {
          setFile(null); // Fayl tanlanmagan holatda null qo'yamiz
        }
      };

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

    console.log(service);
    

    const onSubmit = async (values: any) => {
          const fullData = {
            ...values,
            category:selectedCategory === 0 ? service?.category:selectedCategory,
            image: file === null ? "":file,
            duration:selectedTime === "" ? service?.duration:selectedTime
          };
          
          const datas = objectToFormDataAddService(fullData);
          try {
            
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
            const { data } = await Api.UpdateService(datas,service?.id);
            setIsModalOpen(false)
            reset()
            toast.success(data?"Your service is updated":"");
          } catch (error) {
            console.log(error);
          }
        //   setDefaultCategory("")
             
        
    }
    const handleCategory = (event:any) => {
        setDefaultCategory(event.target.value);
      };
      const SelectCategory = (id:any) =>{
         setSelectedCategory(id)
      }
    const filterdata = category.filter(item => item.id === service?.category)
    

      useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await Api.getallCategory();
                console.log(data);
                setCategory(data);
                // console.log(filteredCategory);
                
            } catch (error) {
                console.log(error);
            }
        }
    
        getCategories();
    }, [setIsModalOpen]);

    const parsedPrice = typeof price === 'string' ? parseFloat(price) : price;
    console.log(parsedPrice.toFixed(0));
    console.log(typeof price);
    
    console.log(service,'servicesss');
    console.log(defaultcategory,'default category');
    
    useEffect(() => {
      if (service) {
          reset({
              name: service.name,
              price: service.price,
              description: service.description,
              duration: service.duration,
          });
          setSelectedTime(service.duration || "");
          setSelectedCategory(service.category || 0);
          setFile(null); // Faylni tozalash
          // setDefaultCategory(service.category ? String(service.category) : "");
      }
  }, [service, reset]);
  


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
          Edit Service
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
                      marginBottom: "5px",
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
                    <MenuItem value="" sx={{ textAlign: "left",}}>
                    {filterdata.map((item)=>item.name)}
                    </MenuItem>
                    {category.map(({ id, name }: ICategory) => (
                      <MenuItem value={name} onClick={()=>SelectCategory(id)} key={id} >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            />
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
              defaultValue={service?.name}
              type="text"
              placeholder="Name"
              style={{
                width: "100%",
                padding: "10px 10px",
                marginBottom: "5px",
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
          <div style={{ position: "relative", marginTop: "10px",}}>
            <OutlinedInput
              {...register("price", {
                required: "Price is required",
                minLength: {
                  value: 4,
                  message: "price must be at least 4 number",
                },
              })}
              type="number"
              defaultValue={parseFloat(price).toFixed(0)}
              placeholder="Price"
              style={{
                width: "100%",
                marginBottom: "5px",
                borderRadius: "12px",
                marginLeft: "0px",
                marginRight: "0px",
                fontSize: "18px",
                minHeight:"30px",
                height:"45px"
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
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      marginBottom: "5px",
                      marginTop: "0px",
                      borderRadius: "12px",
                    }}
                    // placeholder="Select a Category"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    value={selectedTime} // Corrected here
                    defaultValue={service?.duration}
                    // error={!!errors.category?.message}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange(e);
                    }}
                  >
                    <MenuItem value="" sx={{ textAlign: "left" }}>
                     {service?.duration}
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
                  height:"45px"
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
                  Change image
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
                  Changed Image
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
                marginTop: "15px",
                padding: "14px 22px",
                height: "100px",
              }}
              defaultValue={service?.description}
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
            marginTop: "30px",
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
          Update
        </Button>
        
      </Modal>
    </div>
    );
}
 
export default EditModalService;