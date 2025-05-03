import { Box } from "@mui/system";
import { FunctionComponent,  useEffect, useState } from "react";
import { Api } from "../../../modules/auth";
import navbarbackIcon from "../../../assets/navbarbackIcon.svg";
import Typography from "@mui/material/Typography";
import { IEntity } from "../../../modules/auth/types";
// import like from "../../../assets/LikeNavbar.svg";
// import bookmark from "../../../assets/BookmarkNavbar.svg";
// import settingsnavbar from "../../../assets/settingsnavbar.svg";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditModal from "./editModal";
import EditModalMaster from "./editModalMaster";
import editProfileIcon from "../../../assets/editprofileIcon.svg";
import logoutIcon from "../../../assets/logouteditIcon.svg"
import clockIcon from "../../../assets/clockeditIcon.svg"
import serviceIcon from "../../../assets/serviceeditIcon.svg"
import WorkingTimes from "../service/workingtimes";
import { Bookmark, Heart, Settings } from "lucide-react";
// import bookingIconss from "../assets/booking.png"
import bookingIconss from "../../../assets/booking.png"

interface NavbarprofileProps {}

const Navbarprofile: FunctionComponent<NavbarprofileProps> = () => {
  const [userdata, setUserdata] = useState<IEntity.User>();
  const navigate = useNavigate();
  // const roles = localStorage.getItem("roles");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUser,setIsModalOpenUser] = useState(false)
  const [workingModal, setWorkingModal] = useState(false)
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setAnchorEl(null);
  };
  const handleOpenModalUser = () => {
    setIsModalOpenUser(true)
    setAnchorEl(null)
  }
  const handleCloseModalUser = () => {
    setIsModalOpenUser(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalOpenUser(false)
  };

  const handleOpenModalWork = () => {
    setWorkingModal(true);
    setAnchorEl(null);
  };

  const handleCloseModalWork = () => {
    setWorkingModal(false);
  };
  // const cardAdd = () => {
  //   navigate("/addcard")
  // }

  useEffect(() => {
    const getUserdata = async () => {
      try {
        const { data } = await Api.UserProfil();
        setUserdata(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserdata();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-100">
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "40px",
        paddingRight: "40px",
        marginTop: "32px",
        marginBottom: "31px",
      }}
    >
      <img
        width={32}
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer", marginLeft: "0px" }}
        height={32}
        src={navbarbackIcon}
        alt="backicon"
      />
      <Typography
        sx={{
          color: "#000",
          fontFamily: "Inter,sans-serif",
          fontSize: "25px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        {userdata?.username}
      </Typography>
      <Box
        sx={{
          width: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: "0px",
        }}
      >
        <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
       
        sx={{minWidth:"30px",padding:"2px",transition:"0.3s linear","@media (max-width:450px)":{padding:"0px"},':hover': {
          bgcolor:'transparent', // theme.palette.primary.main
        '& .heart-icon': {
        color: '#c39c75 !important', // Change icon color to white on hover
      }},}}
        onClick={()=>navigate("mylikes")}
      >
       {/* <img src={like} style={{marginLeft:"0px",marginRight:"0px"}} width={"100%"} height={"100%"} /> */}
       <Heart className="heart-icon" style={{width:"100%",height:"100%",color:"gray"}} />
      </Button>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        
        sx={{marginLeft:"10px",minWidth:"30px",padding:"2px","@media (max-width:450px)":{padding:"0px",marginLeft:'10px'},':hover': {
          bgcolor:'transparent', // theme.palette.primary.main
        '& .bookmark-icon': {
        color: '#c39c75 !important', // Change icon color to white on hover
      }},}}
        onClick={()=>navigate("mysaved")}
      >
       {/* <img src={bookmark} width={"100%"} height={"100%"} /> */}
       <Bookmark className="bookmark-icon" style={{width:"100%",height:"100%",color:'gray'}}/>
      </Button>
          <Box>
            <Button
              id="demo-positioned-button"
              aria-controls={anchorEl ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={anchorEl ? "true" : undefined}
              onClick={handleClick}
              sx={{marginLeft:"10px",minWidth:"30px",padding:"2px","@media (max-width:450px)":{padding:"0px",marginLeft:'10px'},
                ":hover": {
                  bgcolor: "transparent", 
                  '& .settings-icon': {
              color: '#c39c75 !important', // Change icon color to white on hover
              }},
              }}
            >
              {/* <img
                src={settingsnavbar}
                style={{ cursor: "pointer" }}
                width={32}
                height={32}
                alt="settingsprofile"
              /> */}
              <Settings className="settings-icon" style={{width:"100%",height:"100%",color:'gray'}}/>
            </Button>
            <Menu
              id="demo-positioned-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{ top: "50px" }}
            >
              {!userdata?.is_master ? (
                <Box>
                  <MenuItem
                      onClick={handleOpenModalUser}
                      sx={{
                        color: "#000",
                        fontFamily: "Inter,sans-serif",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                        height:"40px"
                      }}
                    >
                      <img
                        width={30}
                        height={30}
                        style={{ marginLeft: "0px", marginRight: "3px" }}
                        src={editProfileIcon}
                        alt="editIcon"
                      />
                      Edit Profile
                    </MenuItem>
                    {/* <MenuItem
                      onClick={cardAdd}
                      sx={{
                        color: "#000",
                        fontFamily: "Inter,sans-serif",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                        height:"40px"
                      }}
                    >
                      <img
                        width={30}
                        height={30}
                        style={{ marginLeft: "0px", marginRight: "3px" }}
                        src={editProfileIcon}
                        alt="editIcon"
                      />
                      Add Cards
                    </MenuItem> */}
                    <MenuItem onClick={()=> {navigate("/mybooking");handleClose();}} sx={{
                        color: "#000",
                        fontFamily: "Inter,sans-serif",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                        height:"40px",
                        display:"flex",
                        alignItems:"center"
                      }}><img
                      style={{ marginLeft: "3px", marginRight: "6px" }}
                      src={bookingIconss}
                      alt="editIcon"
                    /> Booking</MenuItem>
                    <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleClose();
                    }}
                    sx={{
                      color: "#FF005C",
                      fontFamily: "Inter,sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      height:"40px"
                    }}
                  >
                     <img
                        width={30}
                        height={30}
                        style={{ marginLeft: "0px", marginRight: "3px" }}
                        src={logoutIcon}
                        alt="logouticon"
                      />
                    Logout
                  </MenuItem>
                </Box>
              ) : (
                <Box>
                  
                    <MenuItem
                      onClick={handleOpenModal}
                      sx={{
                        color: "#000",
                        fontFamily: "Inter,sans-serif",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                        height:"40px"
                      }}
                    >
                      <img
                        width={30}
                        height={30}
                        style={{ marginLeft: "0px", marginRight: "3px" }}
                        src={editProfileIcon}
                        alt="editIcon"
                      />
                      Edit Profile
                    </MenuItem>
                    <MenuItem
                    sx={{
                      color: "#000",
                      fontFamily: "Inter,sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      height:"40px"
                    }}
                    onClick={()=>navigate("/profile/service")}
                  >
                     <img
                        width={30}
                        height={30}
                        style={{ marginLeft: "0px", marginRight: "3px" }}
                        src={serviceIcon}
                        alt="serviceicon"
                      />
                   Your services
                  </MenuItem>
                  <MenuItem
                    sx={{
                      color: "#000",
                      fontFamily: "Inter,sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      height:"40px"
                    }}
                    onClick={handleOpenModalWork}
                  >
                     <img
                        width={30}
                        height={30}
                        style={{ marginLeft: "0px", marginRight: "3px" }}
                        src={clockIcon}
                        alt="editworkinghours"
                      />
                    Edit Working Hours
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleClose();
                    }}
                    sx={{
                      color: "#FF005C",
                      fontFamily: "Inter,sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      height:"40px"
                    }}
                  >
                     <img
                        width={30}
                        height={30}
                        style={{ marginLeft: "0px", marginRight: "3px" }}
                        src={logoutIcon}
                        alt="logouticon"
                      />
                    Logout
                  </MenuItem>
                </Box>
              )}
            </Menu>
            {!userdata?.is_master ? (
              <EditModal
                open={isModalOpenUser}
                handleOpen={handleOpenModalUser}
                handleClose={handleCloseModalUser}
                setIsModalOpen={setIsModalOpenUser}
              />
            ) : (
              <EditModalMaster
                open={isModalOpen}
                handleOpen={handleOpenModal}
                handleClose={handleCloseModal}
                setIsModalOpen={setIsModalOpen}
              />
            )}
          </Box>
       
        <WorkingTimes open={workingModal} setIsModalOpen={setWorkingModal} handleOpen={handleOpenModalWork} handleClose={handleCloseModalWork}/>
      </Box>
    </Box>
    </div>
  );
};

export default Navbarprofile;
