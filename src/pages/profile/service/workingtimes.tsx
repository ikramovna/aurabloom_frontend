/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Typography, Button, Checkbox } from "@mui/material";
import { Select } from "antd";
import { Api, Types } from "../../../modules/auth";
import { Box } from "@mui/system";
import toast from "react-hot-toast";

interface WorkingTimesProps {
  open: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
}

const WorkingTimes: FunctionComponent<WorkingTimesProps> = ({
  open,
  setIsModalOpen,
  handleClose,
}) => {
  // const [startTime, setStartTime] = useState("09:00");
  // const [endTime, setEndTime] = useState("18:00");
  const [checked, setChecked] = useState<any>([]);
  const [checkedupdate, setCheckedupdate] = useState<any>([]);
  // const [changeid,setChangeid] = useState<any>(0)
  // const [check, setCheck] = useState(false);
  
  

  const handleChange = (event: any, id: any) => {
    const isChecked = event.target.checked;
    // setChangeid(id)
    setChecked((prev: any[]) => {
      if (isChecked) {
        // setCheck(true); 
        return [...prev, { day: id,start_time:"09:00",end_time:"18:00"}];
      } else {
        // setCheck(false);
        return prev.filter((item) => item.day !== id);
      }
    });
  };
  
  
  const handleChangeStartTime = async (value: any, id: any) => {
  // Item ID ni solishtiramiz
  const item = checked.find((item: any) => item.day === id);

  // Item topilsa
  if (item) {
    // Qiymatni o'zgartiramiz
    // setStartTime(value);
    // Yangilangan qiymatni ro'yxatga o'zgartiramiz
    setChecked((prev: any) =>
      prev.map((prevItem: any) =>
        prevItem.day === id ? { ...prevItem, start_time: value } : prevItem
      )
    );

    try {
      // Assuming 'Api.UpdateTimes' is a valid function for making API calls
     const {data} =  await Api.UpdateTimes(
        {
          day: item.day,
          start_time: value,
          end_time: item.end_time // You might need to adjust this depending on your API
          
        },
        item.id // Passing 'item.id' as the second argument
      );
      toast.success(data?"Successfully edit start time":"")
      
    } catch (error) {
      console.log(error);
      // Handle errors accordingly
    }

    // Call handleChange function with id parameter
    handleChange(value, id);
  }
};

  
  
  const handleChangeEndTime = async(value: any, id: any) => {
    // Item ID ni solishtiramiz
    const item = checked.find((item: any) => item.day === id);
    // console.log(item);
    // console.log(id);
    
    // Item topilsa
    if (item) {
      // Qiymatni o'zgartiramiz
      // setEndTime(value);
      // Yangilangan qiymatni ro'yxatga o'zgartiramiz
      setChecked((prev: any) => prev.map((prevItem: any) => prevItem.day === id ? { ...prevItem, end_time: value } : prevItem));

      try {
        // Assuming 'Api.UpdateTimes' is a valid function for making API calls
       const {data} =  await Api.UpdateTimes(
          {
            day: item.day,
            start_time: item.start_time,
            end_time: value // You might need to adjust this depending on your API
          },
          item.id // Passing 'item.id' as the second argument
        );
        toast.success(data?"Successfully edit end time":"")
        
      } catch (error) {
        console.log(error);
        // Handle errors accordingly
      }
      handleChange(value, id);
    }
  };
  // console.log(checked);
  


  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = Array.from({ length: 4 }, (_, i) =>
    String(i * 15).padStart(2, "0")
  );
  const options = hours.flatMap((hour) =>
    minutes.map((minute) => `${hour}:${minute}`)
  );

  const [days, setDays] = useState<Types.IForm.WorkingTime[]>([]);

  const postWorkingTimes = async() => {
    try {
      const newData = checked.filter((item:any) => !checkedupdate.find((updateItem:any) => updateItem.day === item.day));
      const { data } = await Api.PostUserWorkingTimes(newData);
      toast.success(data?"Created new day and time":"")
      setIsModalOpen(false)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => { 
    const getDays = async () => {
      try {
        const { data } = await Api.UserWorkingDay();
        
        setDays(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDays();
    
  }, []);

  useEffect(()=>{
    const getUpdatedDays = async () => {
      try {
        const { data } = await Api.getUpdatedTimes()
        
        setChecked(data.map((item) => ({
          day: item.day,
          start_time: item.start_time,
          end_time: item.end_time,
          id:item.id
        })));
        setCheckedupdate(data)
      } catch (error) {
        console.log(error);
      }
    };
    getUpdatedDays()
    
  },[])
  // console.log(checked);
  // console.log(checkedupdate);
  

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
            fontSize: "23px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            textAlign: "center",
          }}
        >
          Edit Working Times
        </Typography>
        <Box sx={{marginTop:"20px"}}>
          {days && days.map((item) => (
            <Box
              key={item.id}
              display={"flex"}
              sx={{ position: "relative", alignItems: "center",paddingBlock:"5px" }}
            >
              <Checkbox
              onChange={(event) => handleChange(event, item.id)}
              checked={checked.some((checkedItem: Types.IForm.WorkingTime) => +checkedItem.day === item.id)}
              inputProps={{ "aria-label": "controlled" }}
               />

              <Typography>{item.day}</Typography>
              {checked.some((checkedItem: Types.IForm.WorkingTime) => +checkedItem.day === item.id) ? (
                <Box
                  display={"flex"}
                  sx={{
                    alignItems: "center",
                    position: "absolute",
                    right: "0px",
                  }}
                >
                  <Select
                  // defaultValue={item.start_time?item.start_time:"09:00"}
                  value={checked.find((checkedItem:any) => checkedItem.day === item.id)?.start_time || "09:00"}
                  style={{ width: 90, fontSize: 18 }}
                  onChange={(value) => handleChangeStartTime(value, item.id)}
                  >
                    {options.map((option) => (
                      <Select.Option key={option} value={option}>
                        <p style={{ fontSize: "18px" }}>{option}</p>
                      </Select.Option>
                    ))}
                  </Select>
                  <span style={{width:"10px",marginLeft:"5px",marginRight:"5px",height:"2px",background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #B5B5B5",display:"block"}}></span>
                  <Select
                  // defaultValue={"18:00"}   
                  value={checked.find((checkedItem:any) => checkedItem.day === item.id)?.end_time || "18:00"}
  style={{ width: 90 }}
  onChange={(value) => handleChangeEndTime(value, item.id)}
>
                    {options.map((option) => (
                      <Select.Option key={option} value={option}>
                        <p style={{ fontSize: "18px" }}>{option}</p>
                      </Select.Option>
                    ))}
                  </Select>
                </Box>
              ) : (
                ""
              )}
            </Box>
          ))}
        </Box>
{
  checked.length <= 7 ? (
<Button
          fullWidth
          //   disabled={isSubmitting}
          variant="contained"
          form="login"
          onClick={postWorkingTimes}
          sx={{
            marginTop: "36px",
            mb: 2,
            paddingBlock:"10px",
            background: "rgb(195, 156, 117)",
            boxShadow: "none",
            color: "white",
            fontWeight: "600",
            fontSize: "15px",
            fontStyle: "normal",
            lineHeight: "normal",
            fontFamily: "Inter, sans-serif",
            "&:hover": {
              background: "#a98260",
              boxShadow: "none",
            },
          }}
        >
          Create
        </Button>
  ):("")
}
        
      </Modal>
    </div>
  );
};

export default WorkingTimes;
