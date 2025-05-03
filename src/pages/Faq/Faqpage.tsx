import { Box, Grid, Typography,
  //  CardContent
   } from "@mui/material";
import { Modal, Input, Form, notification } from "antd";
// import sparkless from "../../assets/sparkless.png";
import FaqItem from "./FaqItem";
import "./Faq.css";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";


interface FAQ {
  question: string;
  answer: string;
}
// FAQ data
// const faqs = [
//   {
//     question: "What services do you offer?",
//     answer:
//       "We offer a comprehensive range of beauty services including facial treatments, massage therapy, hair styling and coloring, nail care, waxing, makeup application, and specialized skin treatments. Each service is customized to meet your individual needs and preferences.",
//   },
//   {
//     question: "How should I prepare for my appointment?",
//     answer:
//       "We recommend arriving 10-15 minutes before your scheduled appointment. For spa treatments, come with clean skin and comfortable clothing. For hair services, please ensure your hair is in its natural state. If you're having a color treatment, it's best to come with unwashed hair.",
//   },
//   {
//     question: "What is your cancellation policy?",
//     answer:
//       "We require 24 hours notice for cancellations or rescheduling. Late cancellations or no-shows may result in a charge of 50% of the service price. We understand emergencies happen and will handle these situations on a case-by-case basis.",
//   },
// ];
const API_URL = "https://aurabloom.ikramovna.me/api/v1/faq";
export default function FAQPage() {
  useEffect(() => {}, []);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }
        const data = await response.json();
        setFaqs(data); // Assuming the API response is an array
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form Submitted:", values);

        // Show success notification
        notification.success({
          message: "Success",
          description: "Your information has been sent successfully!",
          duration: 3, // Notification duration in seconds
        });

        setIsModalOpen(false); // Close the modal
        form.resetFields(); // Reset form fields
      })
      .catch((info) => {
        console.error("Validation Failed:", info);
      });
  };

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   // Add form submission logic here
  //   setIsModalOpen(false);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <Box sx={{ backgroundColor: "white", pt: 2 ,pb:4 }}>
      <Grid
        container
        spacing={4}
        sx={{
          maxWidth: {md:"900px",xs:"100%"},
          marginInline: "auto",
          // height: "100vh",
          
        }}
      >
        {/* FAQ Section */}
        <Grid item xs={12}>
          <Box
            sx={{
              borderRadius: "15px",
              // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              padding: 3,
              // backgroundColor: "#f9f9f9",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                {/* <img src={sparkless} alt="Sparkles" style={{ width: "30px", height: "30px" }} /> */}
                <Sparkles  style={{ width: "30px", height: "30px" ,color:"#c39c75"}}/>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Common Questions
                </Typography>
                <Sparkles  style={{ width: "30px", height: "30px" ,color:"#c39c75"}}/>
              </Box>
            </Box>
            <Grid container spacing={2}>
            {faqs.map((faq, index) => (
                <Grid item xs={12} key={index}>
                  <FaqItem question={faq.question} answer={faq.answer} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Contact Us Section */}
        {/* <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button
  variant="contained"
  sx={{
    backgroundColor: "#c39c75",
    "&:hover": {
      backgroundColor: "#c39c75", // Keeps the same color on hover
    },
  }}
  onClick={showModal}
>
  Contact Us
</Button>
        </Grid> */}
      {/* </Grid> */}

      {/* Contact Us Modal */}
      <Modal
        title="Contact Us"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
        okButtonProps={{
          className: "custom-modal-button",
        }}
        cancelButtonProps={{
          className: "custom-modal-button",
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Please enter your phone number!" }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Form>
      </Modal>
      </Grid>
      </Box>
    // </Box>
  );
}
