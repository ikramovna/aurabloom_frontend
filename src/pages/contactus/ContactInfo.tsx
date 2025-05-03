// import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook,  } from 'lucide-react';
import styles from './ContactInfo.module.css';
import { Twitter } from '@mui/icons-material';
import { Box } from '@mui/system';

export default function ContactInfo() {
  return (
    <>
        <h3 className={styles.title} style={{fontSize:"2rem",marginBottom:"0px"}}>Visit Our Salon</h3>
    <Box className={styles.containers} sx={{padding:{xs:"1.3rem",md:""}}}>
      <div className={styles.section}>
        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <MapPin className={styles.icon} />
            <div className={styles.infoContent}>
              <p className={styles.infoLabel}>Location</p>
              <a
                href="https://maps.google.com/?q=123+Beauty+Street+Tashkent"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoText}
              >
                123 Beauty Street, Tashkent
              </a>
            </div>
          </div>
          <div className={styles.infoItem}>
            <Phone className={styles.icon} />
            <div className={styles.infoContent}>
              <p className={styles.infoLabel}>Phone</p>
              <a href="tel:+9986323828" className={styles.infoText}>(+998) 632-38-28</a>
            </div>
          </div>
          <div className={styles.infoItem}>
            <Mail className={styles.icon} />
            <div className={styles.infoContent}>
              <p className={styles.infoLabel}>Email</p>
              <a href="mailto:info@aurablom.uz" className={styles.infoText}>info@aurablom.uz</a>
            </div>
          </div>
          <div className={styles.infoItem}>
            <Clock className={styles.icon} />
            <div className={styles.infoContent}>
              <p className={styles.infoLabel}>Hours</p>
              <p className={styles.infoText}>Monday - Friday: 9am - 8pm</p>
              <p className={styles.infoText}>Saturday: 10am - 6pm</p>
              <p className={styles.infoText}>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.section}>
        <div className={styles.socialLinks}>
          <div style={{marginLeft:"0px",marginRight:"0px"}}>

        <h3 className={styles.title} style={{textAlign:"start",fontSize:"1.25rem"}}>Follow Us</h3>
          </div>
        <div style={{display:"flex",gap:"20px"}}>
          <a href="https://www.instagram.com/" className={styles.socialLink}>
            <Instagram className={styles.socialIcon} />
          </a>
          <a href="https://www.facebook.com" className={styles.socialLink}>
            <Facebook className={styles.socialIcon} />
          </a>
          <a href="https://twitter.com/x/migrate?tok=7b2265223a222f222c2274223a313733353430373936397dbb4239c27164421d54117e183aeceb54" className={styles.socialLink}>
            <Twitter className={styles.socialIcon} />
          </a>
        </div>
        </div>
      </div>
    </Box>
    </>
  );
}
