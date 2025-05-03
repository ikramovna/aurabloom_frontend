import 
// React, 
{ useRef, useEffect, useState } from 'react';
import { ChevronDown, 
    // ChevronUp
 } from 'lucide-react';
// import styles from '../../styles/faq.module.css';
import styles from "../styles/faq.module.css"
interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (answerRef.current) {
      const scrollHeight = answerRef.current.scrollHeight;
      setHeight(isOpen ? scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className={styles.faqItem}>
      <button 
        className={styles.questionButton} 
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={styles.question}>{question}</span>
        <span 
          style={{ 
            transform: isOpen ? 'rotate(-180deg)' : 'rotate(0)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ChevronDown className={styles.icon} />
        </span>
      </button>
      <div 
        className={`${styles.answerWrapper} ${isOpen ? styles.open : ''}`}
        style={{ height: `${height}px` }}
        role="region"
        aria-hidden={!isOpen}
      >
        <div ref={answerRef} className={styles.answer}>
          {answer}
        </div>
      </div>
    </div>
  );
}