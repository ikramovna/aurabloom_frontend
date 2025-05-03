import React, { FunctionComponent, useState } from "react";
import { Checkbox, Button } from "@mui/material";
import { Types } from "../../../modules/auth";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import line from "../../../assets/linemaster.svg";
import toast from "react-hot-toast";
import "../index.css";
import { ClockCircleOutlined } from '@ant-design/icons';

interface SelectServiceModalProps {
  services: Types.IForm.PostsApi[];
  handleRegister: () => void;
  handleForgot: () => void;
  service: string;
  priceService: string;
  serviceDuration: string;
  selectedServiceId: any;
}

const SelectServiceModal: FunctionComponent<SelectServiceModalProps> = ({
  handleForgot,
  service,
  priceService,
  serviceDuration,
  services,
  selectedServiceId
}) => {
  const [checked, setChecked] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
    price: string
  ) => {
    const isChecked = event.target.checked;
    const formattedPrice = parseFloat(price);

    setChecked((prev) => {
      if (isChecked) {
        setTotalPrice((prevPrice) => prevPrice + formattedPrice);
        return [...prev, id];
      } else {
        setTotalPrice((prevPrice) => prevPrice - formattedPrice);
        return prev.filter((item) => item !== id);
      }
    });
  };
console.log(services,'service',selectedServiceId);

  const handleArray = () => {
    const checkedString = JSON.stringify(checked);
    console.log(checked,services,'string');
    
    localStorage.setItem("serviceid", checkedString);
    localStorage.setItem("totalAmount", totalPrice.toString());
    handleForgot();
  };

  const handleEmptyArray = () => {
    toast.error("Select Service is required");
  };

  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          color: "#000",
          fontFamily: "Inter,sans-serif",
          fontSize: "26px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
        }}
      >
        Select Services
      </Typography>
      <Box
        sx={{
          marginTop: "10px",
          padding: "0px",
          height: "400px",
          overflow: "scroll",
          overflowX: "hidden",
        }}
        className="chippers"
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              onChange={(event) => handleChange(event, selectedServiceId, priceService)}
              checked={checked.includes(selectedServiceId)}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Box
              sx={{
                marginLeft: "0px",
                alignItems: "center",
                marginTop: "15px",
                flex: 1,
              }}
            >
              <Typography
                sx={{
                  color: "#000",
                  fontFamily: "Inter,sans-serif",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginBottom: '10px'
                }}
              >
                {service}
              </Typography>
              <Typography
                sx={{
                  color: "#B5B5B5",
                  fontFamily: "Inter,sans-serif",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginBottom: '5px'
                }}
              >
                <ClockCircleOutlined style={{ color: '#c39c75', margin: "0 1px 0 0" }} /> {serviceDuration}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "#c39c75",
                fontFamily: "Inter,sans-serif",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
              }}
            >
              {parseFloat(priceService).toLocaleString()}
              <span style={{ marginLeft: "3px" }}>$</span>
            </Typography>
          </Box>
          <img src={line} width="100%" height={1} alt="line" />
        </Box>
      </Box>

      <Box>
        <span
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#B5B5B5",
            display: "block",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            marginBottom: "12px",
          }}
        >
          <Typography
            sx={{
              color: "#000",
              fontFamily: "Inter,sans-serif",
              fontSize: "22px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
            }}
          >
            Total Amounts
          </Typography>
          <Typography
            sx={{
              color: "#000",
              fontFamily: "Inter,sans-serif",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              alignItems: "center",
            }}
          >
            {totalPrice === 0 ? (
              <span
                style={{
                  color: "#c39c75",
                  fontFamily: "Inter,sans-serif",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                  marginRight: "3px",
                }}
              >
                --
              </span>
            ) : (
              <span style={{ color: "#c39c75",}}>{totalPrice.toLocaleString()}</span>
            )}
            <span style={{color:"#c39c75"}}>$</span>
          </Typography>
        </Box>
      </Box>
      <div style={{ textAlign: "center" }}>
        <Button
          sx={{
            width: "100%",
            backgroundColor: "#c39c75",
            color: "white",
            border: "1px solid #c39c75",
            ":hover": {
              bgcolor: "#a98260",
              border: "1px solid #a98260",
              color: "white",
              transition: "0.4s",
            },
          }}
          onClick={checked.length === 0 ? handleEmptyArray : handleArray}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

export default SelectServiceModal;