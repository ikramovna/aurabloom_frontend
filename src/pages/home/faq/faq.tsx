import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, 
    // Divider
 } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = () => {
  // Example FAQ data
  const faqData = [
    {
      id: 1,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on all products. Items must be returned in their original condition with proof of purchase.",
    },
    {
      id: 2,
      question: "Do you offer international shipping?",
      answer: "Yes, we offer worldwide shipping. Shipping costs and delivery times may vary depending on the destination.",
    },
    {
      id: 3,
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your order on our website.",
    },
    {
      id: 4,
      question: "How do I contact customer support?",
      answer: "You can contact our customer support team via email at support@example.com or by calling our hotline at +123 456 7890.",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        padding: "60px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          marginBottom: "40px",
          fontWeight: 700,
          color: "#333",
          textTransform: "uppercase",
        }}
      >
        Frequently Asked Questions
      </Typography>

      <Box
        sx={{
          maxWidth: "800px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {faqData.map((faq, index) => (
          <Accordion
            key={faq.id}
            disableGutters
            elevation={0}
            sx={{
              "&:before": {
                display: "none",
              },
              borderBottom: index !== faqData.length - 1 ? "1px solid #e0e0e0" : "none",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#666" }} />}
              aria-controls={`panel${faq.id}-content`}
              id={`panel${faq.id}-header`}
              sx={{
                padding: "16px",
                "& .MuiAccordionSummary-content": {
                  margin: 0,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#444",
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: "#fafafa",
                padding: "16px",
              }}
            >
              <Typography variant="body1" sx={{ color: "#666" }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default Faq;
