/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useState } from "react";
import { Api, Types } from "../../../modules/auth";
import { CalendarClockIcon } from "lucide-react";
import Button from '@mui/material/Button';
import {   Modal } from "antd";
import DateServiceModal from "./dateservicemodal";
import BookModal from "./bookmodal";
import shoppingcart from "../../../assets/shopping-bag.png"
import toast from "react-hot-toast";
import "./booking.css"
interface BookingProps {
    id:any;
    serviceName:string;
    price:string;
    duration:string;
}
 
const Booking: FunctionComponent<BookingProps> = ({id,serviceName,price,duration}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState<Types.IForm.PostsApi[]>([]);
  const [isDate, setDate] = useState(true);
  const [isBook, setBook] = useState(false);
  const role = localStorage.getItem("access");
  const isServiceDetail = window.location.pathname.includes("/service-detail/");
  console.log(isBook,serviceName,duration);
  
  const getMasterServices = async () => {
    try {
      const { data } = await Api.Userservices(id);
      setServices(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(services,'service23');
  

  const handleOpenModal = () => {
    if (role) {
      setIsModalOpen(true);
      getMasterServices();
      setDate(true);
      setBook(false);
    } else {
      toast("You need to login or register", {
        icon: "⚠️",
        style: {
          border: "1px solid #facc15",
          padding: "16px",
          color: "#f59e0b",
          background: "#fef3c7",
        },
      });
    }
  };

  const handleCloseModal = () => {
    localStorage.removeItem("serviceid");
    localStorage.removeItem("totalAmount");
    localStorage.removeItem("selectTime");
    localStorage.removeItem("selectedDate");
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    setDate(false);
    setBook(false);
  };

  const handleRegister = () => {
    setDate(false);
    setBook(true);
  };

  const handleForgot = () => {
    setDate(true);
    setBook(false);
  };



    return ( <>
          <Button
      onClick={handleOpenModal}
     
      sx={{
        padding: isServiceDetail ? "10px 25px" : "5px",
        background: "white",
        color: isServiceDetail ? "#c39c75" : "white",
        border: isServiceDetail ? "1px solid #c39c75" : "1px solid #000",
        borderRadius: isServiceDetail ? "5px" : "24px",
        marginTop: isServiceDetail ? "15px":"",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
        ":hover": {
          backgroundColor: "#c39c75",
          color: "white",
          "& .calendar-icon": {
            color: "white !important",
            transform: "scale(1.1)", 
          },
        },
      }}
    >
      {isServiceDetail ? (
        <span className="icon-container">
          <CalendarClockIcon className="calendar-icon" style={{color:"red !important"}}/>
          Booking
        </span>
      ) : (
        <img src={shoppingcart} width={20} height={20} alt="Shopping Cart" />
      )}
    </Button>
        <Modal
        centered
        open={role ? isModalOpen:false}
        onCancel={() => handleCloseModal()}
        footer={null}
        width={500}
        style={{ maxWidth: "300px auto" }}
        >
      { isDate ? (
    <DateServiceModal 
        handleLogin={handleLogin} 
        handleRegister={handleRegister} 
        
        id={id} 
    />
) : (
    <BookModal 
        handleCloseModal={handleCloseModal} 
        handleLogin={handleLogin} 
        handleForgot={handleForgot} 
        price={price}
        // serviceName={serviceName}
        services={services}
        id={id} 
    />
)}
        </Modal>
    </> );
}
 
export default Booking;