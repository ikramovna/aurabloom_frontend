/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  format,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isEqual,
  isSameMonth,
  startOfToday,
  parse,
  add,
  getDay,
} from "date-fns"; // isPast funksiyasini olib tashlab qo'yildi
import { isPast } from "date-fns"; // isPast funksiyasini import qilindi
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Box } from "@mui/system";
import { Api, Types } from "../../../modules/auth";


interface Calendar {}
const Calendar: React.FC = () => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState<Date>(today);
  const [selectDays, setSelectDays] = useState<any>("");
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const [bookinglist, setBookinglist] = useState<Types.IForm.BookingsMy[]>([]);

  const handleDayClick = async (day: Date) => {
    if (!isPast(day) || isEqual(day, today)) {
      setSelectedDay(day);
      const formattedDays = format(day, "MMMM dd");
      setSelectDays(formattedDays)
      try {
        const formattedDay = format(day, "yyyy-MM-dd");
        const { data } = await Api.BookingMy(formattedDay); // day o'zgaruvchisini BookingsMy turiga o'zgartiring
        setBookinglist(data); 
      } catch (error) {
        console.log(error);
        
      }
    }
  };
 
  

  const colStartClasses = ["", "2", "3", "4", "5", "6", "7"];

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div style={{ padding: "0px 45px 0px 45px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0px 45px 0 65px",
          "@media (max-width:450px)":{paddingLeft:"10px",paddingRight:"10px"}
        }}
      >
        <Typography sx={{ flex: "auto", fontWeight: "bold", color: "gray",fontSize:"30px","@media (max-width:450px)":{fontSize:"16px",marginLeft:"0px"} }}>
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </Typography>
        <div style={{ display: "flex" }}>
          <Button
            type="button"
            onClick={previousMonth}
            sx={{
              marginY: "1.5",
              flex: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5px",
              color: "gray",
              "&:hover": {
                color: "gray-500",
              },
            }}
          >
            <ChevronLeftIcon
              style={{ width: "40px", height: "40px" }}
              aria-hidden="true"
            />
          </Button>

          <Button
            type="button"
            onClick={nextMonth}
            sx={{
              marginY: "1.5",
              marginRight: "1.5",
              marginLeft: "2",
              flex: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5px",
              color: "gray",
              "&:hover": {
                color: "gray-500",
              },
            }}
          >
            <ChevronRightIcon
              style={{ width: "40px", height: "40px" }}
              aria-hidden="true"
            />
          </Button>
        </div>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginTop: "10px",
          fontSize: "xs",
          lineHeight: "6",
          textAlign: "center",
          color: "gray-500",
        }}
      >
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 0,
        }}
      >
        {days.map((day, index) => (
          <Box
            key={index}
            sx={{
              padding: "0.5rem",
              ...(index === 0 &&
                colStartClasses[getDay(day)] && {
                  gridColumnStart: colStartClasses[getDay(day)],
                }),
                "@media (max-width:450px)":{padding:"10px 0"} 
            }}
          >
            <Button
              onClick={() => handleDayClick(day)}
              sx={{
                ...(!isEqual(day, selectedDay) || (isPast(day) && isToday(day))
                  ? { color: "black", backgroundColor: "white" }
                  : { color: "white", backgroundColor: "rgb(195, 156, 117)" }),
                // ...(!isEqual(day, selectedDay) && isToday(day) && { color: 'red', backgroundColor: 'yellow' }),
                ...(!isEqual(day, selectedDay) && {
                  backgroundColor:
                    isPast(day) && isToday(day) ? "#a98260" : "white",
                  color: isPast(day) && !isToday(day) ? "#B5B5B5" : "white",
                }), // Tekshir past kunlarini
                ...(!isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isPast(day) &&
                  isSameMonth(day, firstDayCurrentMonth) && {
                    color: "black",
                    backgroundColor: "white",
                  }),
                ...(!isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth) && {
                    color: "gray",
                    backgroundColor: "lightgray",
                  }),
                borderRadius: "10px",
                border: "1px solid #B5B5B5",
                width: "100%",
                display: "flex",
                height:"10px",
                padding: "20px 20px",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                cursor:
                  isPast(day) && !isToday(day) ? "not-allowed" : "pointer",
                  ":hover": {
                    bgcolor: isPast(day) && !isToday(day) ? "white":"rgb(195, 156, 117)",
                     color: isPast(day) && !isToday(day) ? "#gray":"white",
                     
                   },
                   "@media (max-width:450px)":{padding:"10px",width:"80%",marginLeft:"0px",marginRight:'0px',minWidth:"20px"}   
              }}
            >
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                style={{ margin: "0px", fontSize: "15px" }}
              >
                {format(day, "d")}
              </time>
            </Button>
          </Box>
        ))}
      </Box>
      <hr />
      <Box>
        <Typography
          sx={{
            color: "#000",
            fontFamily: "Inter,sans-serif",
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            marginTop:"20px"
          }}
        >
        {selectDays}
        </Typography>
        <Box sx={{marginTop:"20px"}}>
          {
            bookinglist?.map((item) => (
              <Box key={item.id} sx={{display:"flex",alignItems:"center",marginBlock:"10px"}}>
                <Typography sx={{marginRight:"0px"}}>{item.time}</Typography>
                <span style={{width:"3px",height:"18px",backgroundColor:
            item.status === "approved" ? "green" :
            item.status === "rejected" ? "red" :
            item.status === "pending" ? "yellow" : "",marginLeft:"10px",marginRight:"10px" }}></span>
                <Typography>{item.user.full_name}</Typography>
              </Box>
            ))
            }
        </Box>
      </Box>
    </div>
  );
};

export default Calendar;
