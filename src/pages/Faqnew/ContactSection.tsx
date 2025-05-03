// import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { ContactForm } from './ContactForm';
import styles from './styles/contact.module.css';

export function ContactSection() {
  return (
    <section className={styles.contactSection}>
      <h2 className={styles.sectionTitle}>Contact Us</h2>
      <div className={styles.grid}>
        <div>
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <MapPin className={styles.icon} />
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>Location</h3>
                <p className={styles.infoText}>
                  123 Beauty Lane<br />
                  New York, NY 10001
                </p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Phone className={styles.icon} />
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>Phone</h3>
                <p className={styles.infoText}>(555) 123-4567</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Mail className={styles.icon} />
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>Email</h3>
                <p className={styles.infoText}>info@beautysalon.com</p>
              </div>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1000"
            alt="Salon interior"
            className={styles.image}
          />
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}