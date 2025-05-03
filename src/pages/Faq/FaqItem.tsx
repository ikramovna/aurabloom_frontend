import 
// React,
 { useState } from 'react';
import { Collapse, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./Faq.css"

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-pink-100" style={{borderBottom:"1px solid #c39c75"}}>
      <button 
        
        className="buttonstyles"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Typography variant="h6" className="faq-question">
          {question}
        </Typography>
        <ExpandMoreIcon
          className={`faq-chevron ${isOpen ? 'open' : ''}`} // Toggle 'open' class based on the state
        />
      </button>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
      <div className="mb-6" style={{marginBottom:"10px"}}>
          <Typography variant="body2" className="faq-answer">
            {answer}
          </Typography>
        </div>
      </Collapse>
    </div>
  );
}
