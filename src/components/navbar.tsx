import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Box, Container } from "@mui/system";
import Button from '@mui/material/Button';
import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Link as ScrollLink } from "react-scroll";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import userimg from '../assets/user.png';
// import like from '../assets/LikeNavbar.svg';
// import bookmark from '../assets/BookmarkNavbar.svg';
import usericon from "../assets/usericonnavbar.svg";
import bookingIcon from "../assets/serviceeditIcon.svg";
import logouticon from "../assets/logouteditIcon.svg";
import { Api, Types } from "../modules/auth";
import { IEntity } from "../modules/auth/types";
// import { Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
// import { motion } from 'framer-motion';
import logoAura from "../assets/logoAura.svg"
import { Heart,User, ShoppingCart} from 'lucide-react';
import bookingIconss from "../assets/booking.png"
import {  Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, styled } from '@mui/material';
import axios from "axios";

// import { IconButton } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import ContactMailIcon from "@mui/icons-material/ContactMail";

interface NavbarProps {
  // onSearch: (value: string) => void;
}
interface SavedProduct {
  view: any;
  product: any;
  id: number;
  title: string;
  price: number;
  image: string;
}

interface SearchResult {
  id: number;
  title: string;
  image: string;
  name: string;  
  // Add other properties that your API returns
}
const Navbar: FunctionComponent<NavbarProps> = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("access");
  const [userdata, setuserdata] = useState<IEntity.User>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const [showInput, setShowInput] = useState(false);
  // const [isSticky, setIsSticky] = useState(false); // For sticky effect
  const location = useLocation(); 
  const [showInput, setShowInput] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null); 
  const [fadeOut, setFadeOut] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // searchTerm state qo'shildi
  const [save,setSave] = useState<Types.IForm.getLikesPosts[]>([])
  const [savedData, setSavedData] = useState<SavedProduct[]>([]);
      const [savedProduct,setSavedProduct] = useState<SavedProduct[]>([]);
console.log(savedData,savedProduct);

  const handleSearchIconClick = () => {
    setShowInput(true);
  };

  useEffect(()=>{
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem("access")}`,
  };
      const getSavedPost = async() => {
        try {
            const {data} = await Api.getSave()
            console.log(data);
            setSave(data)
        } catch (error) {
            console.log(error);
        }
      }
      const getSavedProduct = async () => {
        try {
          const { data } = await axios.get("https://aurabloom.ikramovna.me/api/v1/shop/saved",{ headers });
          console.log("Fetched saved data:", data);
          setSavedData(data); // Update state with fetched data
        } catch (error) {
          console.error("Error fetching saved data:", error);
        }
      };
      const getShopProducts = async () => {
        try {
          const { data } = await axios.get("https://aurabloom.ikramovna.me/api/v1/shop");
          setSavedProduct(data)
        } catch (error) {
          console.error("Error fetching saved data:", error);
        }
      }

      getShopProducts();
      getSavedProduct();
      getSavedPost()

    },[])
    console.log(save,'save');
    
  // const handleMouseLeave = () => {
  //   if (!document.activeElement.tagName === 'INPUT') {
  //     setShowInput(false);
  //   }
  // };
  const StyledPaper = styled(Paper)(({ theme }) => ({
    position: 'absolute',
    top: '75%',
    right: "10%",
    marginTop: theme.spacing(1),
    width: '25%',
    maxHeight: '480px',
    overflowY: 'auto',
    backgroundColor: 'white',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    borderRadius: theme.spacing(1),
    zIndex: 50,
    opacity: fadeOut ? 0 : 1, // Opacity bilan silliq animatsiya
    transition: "opacity 0.3s ease-in-out",
  }));
  
  const StyledListItem = styled(ListItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    borderBottom: '1px solid #333',
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#c39c75',
      cursor: 'pointer',
    },
    '&:hover .MuiTypography-root': {
      color: '#fff', // Hover bo'lganda matn rangi oq bo'ladi
    },
  }));
  
  const StyledListItemText = styled(ListItemText)(() => ({
    '& .MuiTypography-root': {
      color: '#c39c75', // Default rang
      fontSize: '0.875rem',
      transition: 'color 0.3s ease-in-out', // Rang silliq o'tish bilan o'zgaradi
    },
  }));
  
  const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 40,
    height: 40,
    borderRadius: theme.spacing(1),
  }));

  const onSearch = async (searchTerm: any) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
   console.log(searchTerm,' searchTerm');
   
    try {
      const response = await fetch(`https://aurabloom.ikramovna.me/api/v1/service/list?search=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setFadeOut(true); 
        setTimeout(() => {
          setShowInput(false);
          setShowResults(false);
        }, 300); 
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const getUserdata = async () => {
      try {
        const { data } = await Api.UserProfil();
        setuserdata(data);
        console.log(data,'user');

         if (data.is_master === true) {
        localStorage.setItem("userStatus", "master");
      } else {
        localStorage.setItem("userStatus", "user");
      }
      } catch (error) {
        console.log(error);
      }
    };
    getUserdata();

    // Handle scroll event
    // const handleScroll = () => {
    //   if (window.scrollY > 80) {
    //     setIsSticky(true);
    //   } else {
    //     setIsSticky(false);
    //   }
    // };

    // window.addEventListener('scroll', handleScroll);
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  }, []);

  const uptohome = () => {
    if(location.pathname === "/"){
           console.log('salom');
           window.scrollTo({
            top: 0, // Sahifaning yuqoriga scroll qilinish koordinatasi
            behavior: "smooth" // Smooth animatsiya uchun
        });
    }else{
    console.log("hayr");
    
    }
  }

  const shouldRenderNavbar = ![
    "/login", 
    "/register", 
    "/forgotpassword", 
    "/auth", 
    "/register2step", 
    "/verificationemail", 
    "/profile", 
    "/mylikes", 
    
  ].includes(location.pathname);
  // const isActive = (path: string) => location.pathname === path;
  const isActive = (path: string) => {
    if (path.startsWith("/#")) {
      return location.hash === path.substring(1); // Compare the hash
    }
    return location.pathname === path; // Compare the pathname
  };
  console.log(shouldRenderNavbar,location.pathname, "navbar");
  

  return (
    <Box sx={{position:"sticky",top:0,zIndex:"100",boxShadow:" 0 -1px 3px rgba(0, 0, 0, 0.3)",marginInline:"0px !important",backdropFilter: "blur(10px)" ,}}>
    <Container >
      {window.location.pathname.split("/")[1] === "login" || window.location.pathname.split("/")[1] === "register" || window.location.pathname.split("/")[1] === "forgotpassword" || window.location.pathname.split("/")[1] === "auth" || window.location.pathname.split("/")[1] === "register2step" || window.location.pathname.split("/")[1] === "verificationemail" || window.location.pathname.split("/")[1] === "profile" || window.location.pathname.split("/")[1] === "mylikes"  ? <Box></Box> : <>
        
          <Box
  sx={{
    width: "100%",
    position:  "relative",
    backgroundColor: "none ",
    zIndex: 1000,
    backdropFilter: "blur(10px)" ,
    // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // top: isSticky ? 0 : "auto",
    left: 0,
    right: 0,
    "@media (max-width: 450px)": {
      position: "fixed", // Mobil qurilmalarda doimiy ko'rinadi
      bottom: 0, // Pastki qismda joylashadi
      top: "auto", // Yuqori joylashuvni olib tashlash
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Oq va biroz shaffof
      boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)", // Pastga soya
    },
  }}
>
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "1440px", // Limit inner content width
      width: "100%",
      // padding: "20px 34px",
    }}
  >          
            <Box onClick={uptohome} sx={{ width: "168px", height: "68px",paddingTop:"10px", cursor:"pointer", marginLeft: "0px", "@media (max-width:450px)": { width: "150px",marginTop:'-60px', height: "0px" } }}>
              {/* <Typography sx={{ fontWeight: "500", fontSize: "24px" }} className="logo-text">Aura Bloom</Typography> */}
             <Link to="/"> <img src={logoAura} style={{width:"100%",height:"100%"}}  alt="" /></Link>
            </Box>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '0%',
              width: '90%',
              '@media (max-width:450px)': { display: 'none' },
            }}>
              <Box sx={{ marginRight: "10px" }}>
              <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
  <li>
    {/* <a href="/" data-link-alt="Home" className={isActive("/") ? "active-navbar" : ""}>
      <span className="title-navbar">Home</span>
    </a> */}
  </li>
  <li>
    <a href="/#about-us" className={isActive("/#about-us") ? "active-navbar":""} data-link-alt="About Us">
      <span className="title-navbar">About Us</span>
    </a>
  </li>
  <li>
    <a href="/#services-gallery" className={isActive("/#services-gallery") ? "active-navbar":""} data-link-alt="Service & Gallery">
      <span className="title-navbar">Service & Gallery</span>
    </a>
  </li>
  <li>
    <a href="/#blog" className={isActive("/#blog") ? "active-navbar":""} data-link-alt="Blog">
      <span className="title-navbar">Blog</span>
    </a>
  </li>
  <li>
    <a href="/shop" className={isActive("/shop") ? "active-navbar" : ""} data-link-alt="Shop">
      <span className="title-navbar">Shop</span>
    </a>
  </li>
  <li>
    <a href="/faq" className={isActive("/faq") ? "active-navbar" : ""} data-link-alt="Faq">
      <span className="title-navbar">Faq</span>
    </a>
  </li>
  <li>
    <a href="/contact-us" className={isActive("/contact-us") ? "active-navbar" : ""} data-link-alt="Contact Us">
      <span className="title-navbar">Contact Us</span>
    </a>
  </li>
</ul>
              </Box>
             <div ref={searchRef} style={{  display: "inline-block",marginLeft: "10px", }}>
               
              <form
  action=""
  style={{
    height: '32px',
    borderRadius: '100px',
    border: showInput ? '1px solid #B5B5B5' : "none",
    alignItems: 'center',
    padding: '3px',
    display: 'flex',
    transition: 'width 0.5s ease-in-out',
    width: showInput ? '95%' : '35px',
    overflow: 'hidden',
    marginLeft: "10px",
    position: "relative",
  }}
>
  <SearchIcon
    onClick={handleSearchIconClick}
    sx={{ 
      cursor: 'pointer', 
      width: "25px", 
      marginRight: showInput ? '8px' : '8px', 
      marginLeft: showInput ? "10px" : "0px" 
    }}
  />
<input
  value={searchTerm} // searchTerm ni inputga bog'lash
  onChange={(e) => {
    const value = e.target.value;
    setSearchTerm(value); // searchTerm yangilash
   console.log('where is your search term: ', value);
   
    if (!value.trim()) {
      setSearchResults([]); 
      setShowResults(false);
      
    } else {
      onSearch(value.trim());
    }
  }}
  onFocus={() => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
    setFadeOut(false);
  }}
  placeholder="Search service..."
  type="text"
  style={{
    width: '100%',
    fontSize: '15px',
    marginLeft: '0px',
    padding: '0px 10px 0 4px',
    border: '0px solid white',
    backgroundColor: "transparent",
    borderRadius: '100px',
    outline: 'none',
    display: showInput ? 'block' : 'none',
    transition: "opacity 0.3s ease-in-out",
    opacity: fadeOut ? 0 : 1,
  }}
/>


</form>

{showResults && searchResults.length > 0 && (
  <StyledPaper elevation={0}>
    <List sx={{ padding: 0 }}>
      {searchResults.map((result) => (
        <StyledListItem key={result.id} onClick={()=>navigate(`/service-detail/${result.id}`)}>
          <ListItemAvatar>
            <StyledAvatar
              src={result.image || '/placeholder.png'}
              alt={result.title}
              variant="square"
            />
          </ListItemAvatar>
          <StyledListItemText 
            primary={result.title}
            secondary={result.name}  // Added service name as secondary text
          />
          <StyledListItemText primary={result.title} />
        </StyledListItem>
      ))}
    </List>
  </StyledPaper>
)}
</div>
            </Box>
            <Box
    sx={{
      display: "none",
      "@media (max-width:450px)": { display: "flex", gap: "15px", alignItems: "center" },
    }}
  >
   
  </Box>
            <Box sx={{"@media (max-width:450px)":{marginRight:"0px"}}}>
          {user ? <Box sx={{display:"flex"}}>
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
        
        sx={{marginLeft:"20px",minWidth:"30px",padding:"2px","@media (max-width:450px)":{padding:"0px",marginLeft:'20px'},':hover': {
          bgcolor:'transparent', // theme.palette.primary.main
        '& .bookmark-icon': {
        color: '#c39c75 !important', // Change icon color to white on hover
      }},}}
        onClick={()=>navigate("mysaved")}
      >
       {/* <img src={bookmark} width={"100%"} height={"100%"} /> */}
       <ShoppingCart className="bookmark-icon" style={{width:"100%",height:"100%",color:'gray'}}/>
      </Button>
             <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{marginLeft:"20px",minWidth:"30px",padding:"2px","@media (max-width:450px)":{padding:"0px ",marginLeft:"20px"},':hover': {
          bgcolor: 'transparent',
          '& .user-icon': {
        color: '#c39c75 !important', // Change icon color to white on hover
      }},}}
      >
       {/* <img src={userimg} width={"30px"} height={"30px"} /> */}
       <User className="user-icon" style={{width:'100%',height:'100%',color:"gray"}}/>
      </Button>
      {
        userdata?.is_master ? (
          <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{top:"50px"}}
      >
        <MenuItem onClick={()=> {navigate("/profile");handleClose();}} sx={{
                        color: "#000",
                        fontFamily: "Inter,sans-serif",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                        height:"40px",
                        display:"flex",
                        alignItems:"center"
                      }}><User className="user-icon" style={{width:'24px',height:'24px',color:"black",marginLeft:'0px',marginRight:'5px'}}/> Profile</MenuItem>
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
                      style={{ marginLeft: "0px", marginRight: "3px" }}
                      src={bookingIconss}
                      alt="editIcon"
                    /> Booking</MenuItem>
        <MenuItem onClick={() => { handleLogout(); handleClose();}} sx={{
                      color: "#FF005C",
                      fontFamily: "Inter,sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      height:"40px"
                    }}><img
                    width={30}
                    height={30}
                    style={{ marginLeft: "0px", marginRight: "3px" }}
                    src={logouticon}
                    alt="logouticon"
                  /> Logout</MenuItem>
      </Menu>
        ):(
          <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{top:"50px"}}
      >
        <MenuItem onClick={()=> {navigate("/profile");handleClose();}} sx={{
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
                      style={{ marginLeft: "0px", marginRight: "3px" }}
                      src={usericon}
                      alt="editIcon"
                    /> Profile</MenuItem>
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
                      style={{ marginLeft: "0px", marginRight: "3px",width:"32px ",height:'100%' }}
                      src={bookingIcon}
                      alt="editIcon"
                     
                    /> Booking</MenuItem>
        <MenuItem onClick={() => { handleLogout(); handleClose();}} sx={{
                      color: "#FF005C",
                      fontFamily: "Inter,sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      height:"40px"
                    }}><img
                    width={30}
                    height={30}
                    style={{ marginLeft: "0px", marginRight: "3px" }}
                    src={logouticon}
                    alt="logouticon"
                  /> Logout</MenuItem>
      </Menu>
        )
      }
      
      
      </Box>:<Button sx={{fontSize:"15px",padding:"8px 34px",borderRadius:"20px",backgroundColor:"#c39c75",color:"white","&:hover": {
         backgroundColor:"#c39c75"
    }}} variant="contained" onClick={()=>navigate("/login")}>Login</Button>}
        </Box>
          </Box>
          
          </Box>
        
      </>
    }
    </Container>
    </Box>
  );
};

export default Navbar;
