import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPinterestP, faLinkedin, faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';
import { Box } from '@mui/system';
import logoAura from "../assets/logoAura.svg"

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation(); 
  
  const shouldRenderNavbar = ![
    "/login", 
    "/register", 
    "/forgotpassword", 
    "/auth", 
    "/register2step", 
    "/verificationemail", 
    "/profile", 
    "/mylikes", 
   
  ].includes(location.pathname);
  console.log(shouldRenderNavbar);
  
  
  return (
    <>
    {window.location.pathname.split("/")[1] === "login" || window.location.pathname.split("/")[1] === "register" || window.location.pathname.split("/")[1] === "forgotpassword" || window.location.pathname.split("/")[1] === "auth" || window.location.pathname.split("/")[1] === "register2step" || window.location.pathname.split("/")[1] === "verificationemail" || window.location.pathname.split("/")[1] === "profile" || window.location.pathname.split("/")[1] === "mylikes"  ? <Box></Box> : <>
      <footer className={styles.footer} >
      <div className={styles.container} style={{maxWidth:"1200px",paddingInline:"0px"}}>
        <div className={styles.content}>
          <div className={styles.branding}>
            <div className={styles.logo}>
              <Link to="/">
              <img src={logoAura} width={132} height={45} alt="" />
              </Link>
            </div>
            <p className={styles.copyright}>
              Copyright © {currentYear} All rights reserved
            </p>
          </div>

          <div className={styles.sections}>
            <div className={styles.section}>
              {/* <h3 className={styles.sectionTitle}>About</h3> */}
              <ul className={styles.sectionList}>
                <li className={styles.sectionItem}><Link to="/#about-us">About</Link></li>
                <li className={styles.sectionItem}><Link to="/#services-gallery">Service & Gallery</Link></li>
                <li className={styles.sectionItem}><Link to="/#blog">Blog</Link></li>
              </ul>
            </div>

            <div className={styles.section}>
              {/* <h3 className={styles.sectionTitle}>Resources</h3> */}
              <ul className={styles.sectionList}>
                <li className={styles.sectionItem}><Link to="/shop">Shop</Link></li>
                <li className={styles.sectionItem}><Link to="/faq">Faq</Link></li>
                <li className={styles.sectionItem}><Link to="/contact-us">Contact-Us</Link></li>
              </ul>
            </div>
          </div>

          <div className={styles.social}>
            <Link to="https://gitlab.com/ikramovna" aria-label="Gitlab">
              <FontAwesomeIcon icon={faGitlab} className={styles.socialIcon} />
              {/* <FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} /> */}
            </Link>
            <Link to="https://www.pinterest.com/muslimazokirjonova2004" aria-label="Pinterest">
              <FontAwesomeIcon icon={faPinterestP} className={styles.socialIcon} />
            </Link>
            <a href="https://www.linkedin.com/in/muslima-zokirjonova-a45694279/" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} className={styles.socialIcon} />
            </a>
            <a href="https://github.com/ikramovna" target='_blank' aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>
    </footer>
      </>}
      </>
  );
};

export default Footer;
