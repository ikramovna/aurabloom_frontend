// import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import styles from './Contact.module.css'; // Import the CSS file

function ContactUspage() {
  return (
    <div className={styles.container} style={{maxWidth:"1200px"}}>
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Contact Us</h1>
        
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.title}>Send Us a Message</h2>
          <ContactForm />
        </div>

        <div className={styles.card}>
          <ContactInfo />
        </div>
      </div>

      <div className={styles.mapContainer}>
        {/* <div className={`${styles.card} ${styles.map}`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1647043099272!5m2!1sen!2s"
            className={styles.mapFrame}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="salon-location"
          />
        </div> */}
      </div>
    </div>
  </div>
  );
}

export default ContactUspage;
