import { Box, Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import { FunctionComponent, useEffect, useState } from "react";
import { Api, Types } from "../../../modules/auth";
import locationIcon from "../../../assets/locationIconProfile.svg";
import clockIcon from "../../../assets/clockIconProfile.svg";
import EditStatusModal from "./editStatusbooking";
import { Button } from "@mui/material";
import { format } from 'date-fns'

interface MyBookingProps {}
const MyBooking: FunctionComponent<MyBookingProps> = () => {
    const [activeButton, setActiveButton] = useState<number | null>(0);
    const [bookings, setBookings] = useState<Types.IForm.BookingUserMaster[]>([]);
    const [bookingStatus, setBookingStatus] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined);

    useEffect(() => {
        const getAllBookings = async () => {
            try {
                const { data } = await Api.BookingsUserMaster(
                    bookingStatus === "" ? { status: "" } : { status: bookingStatus }
                );
                setBookings(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                // Burada kullanıcıya uygun bir hata mesajı gösterebilirsiniz.
            }
        };
        getAllBookings();
    }, [bookingStatus,isModalOpen]);

    const getInitials = (fullName: string): string => {
        const names: string[] = fullName.split(' ');
        const initials: string[] = names.map(name => name.charAt(0));
        return initials.join('').toUpperCase();
    };

    const filterBooking = async (index: number, text: string) => {
      if(text === "all"){
        setBookingStatus("")
      }else if(text === "accepted"){
          setBookingStatus("approved")
      }
      else if(text === "rejected"){
        setBookingStatus("rejected")
    }
      else{
        setBookingStatus(text);
      }
        setActiveButton(index);
    };

    return (
        <Container sx={{height:"auto"}}>
        <Box sx={{  height: bookings.length !== 0 ? "auto" : "100vh"}}>
            <Box>
                <Typography sx={{ fontSize: "1.5rem", lineHeight: "1.75rem", fontWeight: "700", color: "#000" }}>
                    My bookings
                </Typography>
            </Box>
            <Box>
                <Box
                    className={"chippers"}
                    sx={{
                        overflow: "scroll",
                        overflowY: "hidden",
                        display: "flex",
                        flexWrap: "nowrap",
                        alignItems: "center",
                        width: "100%",
                        padding: "0px 0px",
                        marginTop: "20px"
                    }}
                >
                    {['all', 'pending','accepted', 'rejected', ].map((text, index) => (
                        <button
                            key={index}
                            className={activeButton === index ? "activeddButton" : "activedButton"}
                            style={{ whiteSpace: "nowrap", margin: "0 5px", textTransform: "capitalize" }}
                            onClick={() => filterBooking(index, text)}>
                            {text}
                        </button>
                    ))}
                </Box>
                <Box>
                    {bookings.length > 0 ? (
                        bookings.map((item, index) => (
                            <Box key={index} sx={{ border: "1px solid #B5B5B5", borderRadius: "1rem", marginBlock: "20px",backgroundColor:"white" }}>
                                <Box display={"flex"} sx={{ padding: "20px 15px", alignItems: "center" }}>
                                    {item.user.image ? (
                                        <img
                                            src={"https://aurabloom.ikramovna.me" + item.user.image}
                                            alt="userimage"
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "100px",
                                                marginTop: "0px",
                                                marginRight: "10px",
                                                marginLeft: "0px"
                                            }}
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                backgroundColor: "#B5B5B5",
                                                borderRadius: "50%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginTop: "0px",
                                                marginRight: "10px",
                                                marginLeft: "0px"
                                            }}
                                        >
                                            <Typography
                                                variant="h3"
                                                component="div"
                                                sx={{
                                                    color: "#FFFFFF",
                                                    fontSize: "15px",
                                                }}
                                            >
                                                {getInitials(item.user.full_name || "")}
                                            </Typography>
                                        </div>
                                    )}
                                    <Box sx={{ marginLeft: "0px" }}>
                                        <Typography sx={{ fontSize: "16px", lineHeight: "1.5rem", fontWeight: 700 }}>{item.user.full_name}</Typography>
                                    </Box>
                                    <Box sx={{ marginRight: "0px",display:'flex',flexDirection: { xs: "column", sm: "row" },gap: { xs: "5px", sm: "0px" } }}>
                                        {
                                            item.user.is_master === true ? (""):(<Button
                                                sx={{
                                                    border: "1px solid #c39c75",
                                                    borderRadius: "100px",
                                                    color: "#c39c75",
                                                    backgroundColor: "white",
                                                    padding: "12px 10px",
                                                    fontSize: "13px",
                                                    ":hover": {
                                                        bgcolor: "#c39c75",
                                                        color: "white", 
                                                    },
                                                }}
                                                className="activedButton"
                                                onClick={() => {
                                                    setSelectedItemId(item.id.toString());
                                                    setIsModalOpen(true);
                                                }}
                                            >
                                                View Status
                                            </Button>)
                                        }
                                        
                                        <Typography
                                            className={"activedButton"}
                                            style={{ cursor: "default", whiteSpace: "nowrap", margin: "0 5px", color: "#c39c75", backgroundColor: "#F7F7F7", textTransform: "capitalize" }}>
                                            {item.status}
                                        </Typography>
                                    </Box>
                                </Box>
                                <span style={{ width: "100%", height: "1px", backgroundColor: "#B5B5B5", display: "block" }}></span>
                                <Box sx={{ padding: "0 15px" }}>
                                    <Box sx={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                                        <img src={locationIcon} style={{ marginLeft: "0px", marginRight: "0px" }} width={30} height={30} alt="locationIcon" />
                                        <Typography>{item.user?.address?.region} {item.user?.address?.district}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", gap: "20px" }}>
                                        <img src={clockIcon} style={{ marginLeft: "0px", marginRight: "0px" }} width={30} height={30} alt="clockIcon" />
                                        
                                        <Typography>{format(new Date(item.date), 'MMMM dd')} /{item.time}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px", padding: "0 15px 15px 15px" }}>
                                    <Box sx={{ marginLeft: "0px" }}>
                                        <Typography sx={{ fontSize: ".95rem", lineHeight: "1.25rem", color: "#171717" }}>{item.service.map(item => item.name)}</Typography>
                                        <Typography sx={{ fontSize: "14px", color: "#B5B5B5" }}>{item.service.map(item => item.duration)}</Typography>
                                    </Box>
                                    <Typography sx={{ fontSize: "15px", color: "#c39c75", fontFamily: "Inter,sans-serif", fontWeight: "600" }}>
                                        {(new Intl.NumberFormat().format(item.service.reduce((total, serviceItem) => total + parseInt(serviceItem.price), 0) * 1))}
                                        <span style={{ marginLeft: "3px", color: "#000", fontFamily: "Inter,sans-serif", fontWeight: "600" }}>$</span>
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    ) : (<Box sx={{height:"49vh"}}>
                        <Typography sx={{ marginTop: "20px", fontSize: "25px" }}>
                            Your Booking is not yet
                        </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
            {/* EditStatusModal'ı burada çağırın */}
            <EditStatusModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} id={selectedItemId} />
        </Box>
        </Container>
    );
};

export default MyBooking;
