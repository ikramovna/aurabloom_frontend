/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect, useState } from "react";
import NavbarService from "./navbarservice";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import plusIcon from "../../../assets/plusserviceIcon.svg";
import clockIcon from "../../../assets/serviceClock.svg";
import serviceedit from "../../../assets/serviceedit.svg"
import servicedelete from "../../../assets/servicedeleteicon.svg"
import AddServiceModal from "./addservicemodal";  
import { Api, Types } from "../../../modules/auth";
import { IEntity } from "../../../modules/auth/types";
import "./index.css";
import EditModalService from "./editmodalservice";
import toast from "react-hot-toast";
import noservice from "../../../assets/no-order.png"
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface MasterServiceProps {}

const MasterService: FunctionComponent<MasterServiceProps> = () => {
  const [userID, setUserID] = useState<IEntity.User | null>(null);
  const [services, setServices] = useState<Types.IForm.PostsApi[]>([]);
  const [service,setService] = useState<Types.IForm.PostsApi>()
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [editModalOpen,setEditModalOpen] = useState(false)
  const [deleteServices,setDeleteServices] = useState(false)
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await Api.UserProfil();
        setUserID(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [isModalOpen,editModalOpen]);
  
  const deleteService = async(id:any) => {
     const {data}:any = await Api.DeleteService(id)
      toast.success(data?"Your service deleted":"")
      setDeleteServices(true) 
     
    }
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [serviceToDelete, setServiceToDelete] = useState<Types.IForm.PostsApi | null>(null);

const confirmDeleteService = (service: Types.IForm.PostsApi) => {
  setServiceToDelete(service);
  setDeleteModalOpen(true);
};

    useEffect(() => {
      if (userID) {
      const userServices = async () => {
        try {
          const { data } = await Api.Userservices(userID.id);
          setServices(data);
        } catch (error) {
          console.log(error);
        }
      };

      userServices();
    }
  }, [userID,deleteServices]);
  const handleEditOpenModal = () => {
    setEditModalOpen(true);
  };
  console.log(service?.price);
  const price: string = service?.price ?? "";


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const getService = (item:any) => {
    setEditModalOpen(true)
    setService(item)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleEditCloseModal = () => {
    setEditModalOpen(false);
  };
  const toggleDescription = (id: any) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <NavbarService />
      <span
        style={{
          display: "block",
          width: "95%",
          height: "1px",
          color: "#B5B5B5",
          backgroundColor: "#B5B5B5",
          margin: "0 auto",
        }}
      ></span>
      <Box sx={{ width: "100%", alignItems: "center", textAlign: "center" }}>
        {services   ? (    
          <Box sx={{ padding: "20px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  color: "#000",
                  fontFamily: "Inter,sans-serif",
                  fontSize: "24px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                }}
              >
                Services
              </Typography>
              <Box sx={{ marginRight: "0px" }}>
                <Button
                  sx={{
                    color: "rgb(195, 156, 117)",
                    fontFamily: "Inter,sans-serif",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    padding: "0px",
                    borderRadius: "12px",
                    textTransform:"initial",
                    marginTop: "0px",
                    marginRight: "0px",
                  }}
                  onClick={handleOpenModal}
                >
                  <img src={plusIcon} width={20} height={20} alt="" />
                  Add a service
                </Button>
                <AddServiceModal
                  open={isModalOpen}
                  handleOpen={handleOpenModal}
                  handleClose={handleCloseModal}
                  setIsModalOpen={setIsModalOpen}
                  id={null}
                  parent={null}
                  success={false}
                  category={null}
                />
              </Box>
            </Box>
            <Box 
  sx={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns
    gap: '20px', // Gap between grid items
    marginTop: '30px',
  }}
>
  {services.map((item) => (
    <Box
      key={item.id}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderRadius: "12px",
        border: "1px solid #B5B5B5",
        background: "#F7F7F7",
        padding: "15px",
        width:"100%",
        position: "relative",
      }}
    >
      <Box sx={{ marginLeft: "0px", width: "100%", marginRight: "0px" }}>
        <Typography
          className="text-service"
          sx={{ fontSize: "24px", color: "#000", textAlign: "start" }}
        >
          {item.name}
        </Typography>
        {item.id !== null && item.description && (
  <>
    <Typography
      sx={{
        fontSize: "20px",
        color: "#B5B5B5",
        textAlign: "start",
        // maxHeight: expandedDescriptions[item.id] ? "none" : "60px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: expandedDescriptions[item.id] ? "unset" : 2,
        maxHeight: expandedDescriptions[item.id] ? "500px" : "60px",
        transition: "max-height 0.5s ease-in-out",
      }}
    >
      {item.description}
    </Typography>
    {item.description.length > 60 && (
      <Typography
        onClick={() => toggleDescription(item.id)}
        sx={{ cursor: "pointer", color: "rgb(195, 156, 117)",
          transition:"color 0.3s ease","&:hover":{
            color: "rgb(195, 156, 117)",
          },marginBottom:"20px" }}
      >
        {expandedDescriptions[item.id] ? "Show Less" : "Show More"}
      </Typography>
    )}
  </>
)}
        <Box sx={{ position:"absolute",bottom:"10px", marginTop: "10px",width:"90%" }}>
          <Box sx={{display: "flex", justifyContent:"space-between", alignItems: "center",width:"100%"}}>
          <Typography
            className="text-service"
            sx={{ fontSize: "22px", color: "#000",display: "flex",alignItems: "center"}}
          >
          <img
            src={clockIcon}
            width={24}
            height={24}
            alt="clockIcon"
            style={{ marginLeft: "0px", marginRight: "10px" }}
          />
            {item.duration}
          </Typography>
          <Typography
          className="text-service"
          sx={{
            color: "rgb(195, 156, 117)",
            fontSize: "22px",
            fontWeight: 700,
            
          }}
        >
          {new Intl.NumberFormat().format(parseFloat(item.price) * 1)}
          <span
            className="text-service"
            style={{
              marginLeft: "3px",
              color: "rgb(195, 156, 117)",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            $
          </span>
        </Typography>
        </Box>
        </Box>
      </Box>
      <Box sx={{ marginRight: "0px", position: "relative" }}>
        <Box
          sx={{
            marginRight: "0px",
            width: "100%",
            textAlign: "end",
            marginTop: "5px",
            display: "flex",
          }}
        >
          <img
            width={24}
            height={24}
            style={{
              marginLeft: "0px",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={() => getService(item)}
            src={serviceedit}
            alt="editIcon"
          />
          <img
            width={24}
            height={24}
            style={{ marginLeft: "0px", cursor: "pointer" }}
            onClick={() => confirmDeleteService(item)}
            src={servicedelete}
            alt="deleteIcon"
          />
        </Box>
        
      </Box>
    </Box>
  ))}
</Box>

            <EditModalService open={editModalOpen}
            handleOpen={handleEditOpenModal}
            handleClose={handleEditCloseModal}
            setIsModalOpen={setEditModalOpen}
            service={service} price={price} id={null} parent={null} success={false} category={null}/>
          </Box>
        ) : (
          <Box>
            <Typography
              sx={{
                color: "#000",
                fontFamily: "Inter,sans-serif",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                margin: "0 auto",
                width: "100%",
                marginTop: "36px",
              }}
            >
              You do not have services
            </Typography>
            <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      marginTop: "24px",
    }}
  >
    <img
      src={noservice} // Replace with the actual path to your illustration
      alt="No services illustration"
      style={{ width: "200px", height: "auto" }} // Adjust size as needed
    />
  </Box>
            <Button
              sx={{
                color: "rgb(195, 156, 117)",
                fontFamily: "Inter,sans-serif",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                padding: "16px 24px",
                borderRadius: "12px",
                border: "1.5px dashed rgb(195, 156, 117)",
                marginTop: "32px",
              }}
              onClick={handleOpenModal}
            >
              <img src={plusIcon} width={20} height={20} alt="" />
              Add a service
            </Button>
            <AddServiceModal
              open={isModalOpen}
              handleOpen={handleOpenModal}
              handleClose={handleCloseModal}
              setIsModalOpen={setIsModalOpen}
              id={null}
              parent={null}
              success={false}
              category={null}
            />
          </Box>
        )}
      </Box>
      <Dialog
  open={deleteModalOpen}
  onClose={() => setDeleteModalOpen(false)}
>
  <DialogTitle>Confirm Delete</DialogTitle>
  <DialogContent>
    Are you sure you want to delete the service: 
    <strong> {serviceToDelete?.name}?</strong>
  </DialogContent>
  <DialogActions>
   
    <Button
      onClick={async () => {
        if (serviceToDelete) {
          await deleteService(serviceToDelete.id);
          setDeleteModalOpen(false);
          setServiceToDelete(null);
        }
      }}
      color="error"
      sx={{border:"1px solid rgb(195, 156, 117)",borderRadius:"12px", transition: "background-color 0.3s, color 0.3s", // Smooth transition
    "&:hover": {
      backgroundColor: "red",
      color: "white",
    },}}
    >
      Delete
    </Button>
     <Button onClick={() => setDeleteModalOpen(false)}  sx={{background:"transparent",color:"rgb(195, 156, 117)",border:"1px solid rgb(195, 156, 117)",borderRadius:"12px", transition: "background-color 0.3s, color 0.3s", // Smooth transition
    "&:hover": {
      backgroundColor: "rgb(195, 156, 117)",
      color: "white",
    },}}>
      Cancel
    </Button>
  </DialogActions>
</Dialog>
    </>
  );
};

export default MasterService;
