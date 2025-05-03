import { Box } from "@mui/system";
import { FunctionComponent } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import navbarbackIcon from "../../../assets/navbarbackIcon.svg"


interface NavbarServiceProps {
    
}
 
const NavbarService: FunctionComponent<NavbarServiceProps> = () => {

   
    const navigate = useNavigate();

    return ( 
        <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        
        paddingLeft: "40px",
        paddingRight: "40px",
        marginTop: "32px",
        marginBottom: "31px",
      }}
    >
      <img
        width={32}
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer", marginLeft: "0px",marginRight:"42%" }}
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
        Your services
      </Typography>
      
      </Box>
     );
}
 
export default NavbarService;