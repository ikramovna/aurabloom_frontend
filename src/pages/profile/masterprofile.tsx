import { Box } from "@mui/system";
import { FunctionComponent, useEffect, useState } from "react";
import Navbarprofile from "./components/navbarprofile";
import { IEntity } from "../../modules/auth/types";
import { Api } from "../../modules/auth";
import Typography from "@mui/material/Typography";
import MasterService from "./components/masterservice";
import postsIcon from "../../assets/postsmasterprofile.svg"
import inactivepostsicon from "../../assets/postsmasterinactive.svg"
import calendarIcon from "../../assets/calendaticonmaster.svg"
import inactivecalendaricon from "../../assets/calendariconmaster.svg"
import Grid from "@mui/system/Unstable_Grid";
import MasterCalendar from "./components/mastercalendar";
import MasterPosts from "./components/masterposts";
  interface MasterProfileProps {
    
}
 
const MasterProfile: FunctionComponent<MasterProfileProps> = () => {
    const [userdata, setUserdata] = useState<IEntity.User>();
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

    const [content, setcontent] = useState(false);
    
  
    function getInitials(fullName: string): string {
      const names: string[] = fullName.split(' ');
      const initials: string[] = names.map(name => name.charAt(0));
      return initials.join('').toUpperCase();
  }
  const initials: string = getInitials(userdata?.full_name || "");
    
    return ( <Box>
        <Navbarprofile/>
        <span
        style={{
          display: "block",
          width: "94%",
          height: "1px",
          color: "#B5B5B5",
          backgroundColor: "#B5B5B5",
          margin:"0 auto"
        }}
      ></span>
        <Box sx={{width: "100%", display: "flex", alignItems: "center",marginTop:"20px"}}>
        <Box
          sx={
            userdata?.image === null
              ? {
                  width: "120px",
                  height: "120px",
                  marginTop: "30px",
                  marginLeft: "110px",
                  marginRight: "24px",
                  "@media (max-width:450px)":{marginLeft:"20px"}
                }
              : {width: "120px", height: "120px",marginRight:"24px",marginLeft:"110px","@media (max-width:450px)":{marginLeft:"20px"}}
          }
        >
          {userdata?.image === null ? (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "15px",
        backgroundColor: "#B5B5B5",
        borderRadius: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <Typography
        variant="h3"
        component="div"
        sx={{
          color: "#FFFFFF",
          fontSize: "48px",
        }}
      >
        {initials}
      </Typography>
    </div>
  ) : (
    <img
      src={userdata?.image}
      alt="userimage"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "100px",
      }}
    />
  )}
        </Box>
        <Box sx={{ marginLeft: "0px" }}>
          <Typography
            sx={{
              color: "#000",
              fontFamily: "Inter,sans-serif",
              fontSize: "32px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              marginTop:"10px",
              "@media (max-width:450px)":{fontSize:'25px'}
            }}
          >
            {userdata?.full_name}
          </Typography>
          {
  userdata?.address === null ? (
    <Typography>Salom</Typography>
  ) : (
    
    <Typography
      sx={{
        color: "#B5B5B5",
        fontFamily: "Inter",
        fontSize: "22px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "normal",
        marginTop: "10px"
      }}
    >
      {`${userdata?.address.region || ""} ${userdata?.address.district || ""} ${userdata?.address.mahalla || ""} ${userdata?.address.house || ""}`}
    </Typography>
  )
}
        </Box>
      </Box>
      <MasterService />
      <Box>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <Grid width="100%" container padding={4}>
      <Grid   xs={12} sm={12} md={6} lg={6}>
        <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",borderBottom:content ? "1px solid #FFF":"1px solid #EED0AC"}} onClick={()=>setcontent(false)}>
        {content ? <img src={inactivepostsicon} alt="inactivepost"/>:<img src={postsIcon}  alt="activepost" />}
        </Box>
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={6}>
      <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",borderBottom:!content ? "1px solid #FFF":"1px solid #EED0AC"}} onClick={()=>setcontent(true)}>
       {!content ? <img src={calendarIcon} alt="activecalendar"/>:<img src={inactivecalendaricon}  alt="inactivecalendar" />}
       </Box>
      </Grid>
      </Grid>
      { 
        content ? <MasterCalendar/>:<MasterPosts/>
      }
    </Box>
      </Box> 
        </Box>
    );
}
 
export default MasterProfile;