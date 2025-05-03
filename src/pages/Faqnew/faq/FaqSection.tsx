import
//  React, 
{ useState } from 'react';
import { FaqItem } from './FaqItem';
import styles from '../styles/faq.module.css';

const faqData = [
  {
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of beauty services including facials, massages, manicures, pedicures, hair styling, makeup application, and specialized skin treatments."
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment through our online booking system, by calling us directly, or by filling out the contact form below. We'll get back to you within 24 hours to confirm your booking."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We require at least 24 hours notice for cancellations. Late cancellations or no-shows may be subject to a cancellation fee."
  },
  {
    question: "Do you offer gift cards?",
    answer: "Yes! We offer digital and physical gift cards in various denominations. They can be purchased in-store or through our website."
  },
  {
    question: "What precautions do you take for hygiene?",
    answer: "We maintain the highest standards of hygiene and sanitization. All our tools are sterilized between clients, and our treatment rooms are thoroughly cleaned and sanitized regularly."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.sectionTitle}>
        Frequently Asked Questions
      </h2>
      <div className={styles.faqList}>
        {faqData.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}