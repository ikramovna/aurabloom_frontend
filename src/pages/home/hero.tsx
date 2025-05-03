import { useEffect, useState } from 'react';
import { Crown } from 'lucide-react';
import heroimage from "../../assets/heroimage1.jpg";
import heroimage2 from "../../assets/heroimage2.jpg";
import heroimage3 from "../../assets/heroimage3.jpg";
import heroimage4 from "../../assets/heroimage4.jpg";
import heroimage5 from "../../assets/heroimage5.jpg";
import heroimage6 from "../../assets/heroimage6.jpg";
import heroimage7 from "../../assets/heroimage7.jpg";
import heroimage8 from "../../assets/heroimage8.jpg";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import rightIcon from "../../assets/right-arrow.png";

const Hero = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const images = [
    [heroimage, heroimage3, heroimage6],
    [heroimage2, heroimage5, heroimage8],
    [heroimage4, heroimage7, heroimage],
  ];

  const singleImageHeight = 300;
  const gap = 16;
  const imagesPerColumn = images[0].length;
  const columnHeight = imagesPerColumn * (singleImageHeight + gap) - gap;

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const newPosition = prev + 1;
        if (newPosition >= columnHeight) return 0;
        return newPosition;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [columnHeight]);

  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: 'flex', justifyContent: "center" }}>
      <div style={{
        width: "100%",
        maxWidth: "1200px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "0 20px",
        display: "flex",
        flexDirection: window.innerWidth < 768 ? "column" : "row", // 💥 mobile: column
        alignItems: "center",
        gap: "2rem",
        // paddingTop: "40px",
        // paddingBottom: "40px",
      }}>
        
        {/* Left Side */}
        <div style={{
          width: window.innerWidth < 768 ? "100%" : "50%", // 💥 mobile: 100%
          display: "flex",
          flexDirection: "column",
          alignItems: window.innerWidth < 768 ? "center" : "flex-start",
          textAlign: window.innerWidth < 768 ? "center" : "left",
          gap: "1.5rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#c39c75" }}>
            <Crown style={{ width: "1.5rem", height: "1.5rem" }} />
            <span style={{ fontSize: "0.875rem", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Premium Beauty Salon
            </span>
          </div>

          <h1 style={{
            fontSize: window.innerWidth < 768 ? "28px" : "34px",
            lineHeight: "1.2",
            fontWeight: "700",
            color: "#111827"
          }}>
            Discover Your
            <span style={{ color: "#c39c75" }}> Natural </span>
            Beauty
          </h1>

          <p style={{
            fontSize: "1rem",
            color: "#4b5563",
            maxWidth: "500px",
          }}>
            Experience luxury beauty treatments that enhance your natural radiance. Our expert stylists are dedicated to making you look and feel extraordinary.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "10px" }}>
            <Link to={"/contact-us"}>
              <Button
                sx={{
                  backgroundColor: "#c39c75",
                  color: "white",
                  borderRadius: "50px",
                  paddingBlock: "8px",
                  paddingInline: "15px",
                  "&:hover": { backgroundColor: "#a98260" },
                  textTransform: "none",
                }}
              >
                Contact us{" "}
                <img src={rightIcon} style={{ marginLeft: "10px" }} width={20} height={20} alt="right-Icon" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side - Carousel */}
        <div style={{
          width: window.innerWidth < 768 ? "100%" : "50%", // 💥 mobile: 100%
          marginTop: window.innerWidth < 768 ? "40px" : "0",
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}>
          <div style={{
            position: "absolute",
            inset: "0",
            display: "flex",
            gap: "1rem",
          }}>
            {/* Column 1 */}
            <div style={{
              width: "33.3333%",
              position: "relative",
              transform: `translateY(-${scrollPosition}px)`,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[...images[0], ...images[0], ...images[0]].map((src, i) => (
                  <img key={i} src={src} alt={`Beauty ${i}`} style={{
                    width: "100%",
                    height: `${singleImageHeight}px`,
                    objectFit: "cover",
                    borderRadius: "1rem",
                    boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                  }} />
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div style={{
              width: "33.3333%",
              position: "relative",
              transform: `translateY(${scrollPosition}px)`,
              marginTop: `-${columnHeight}px`,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[...images[1], ...images[1], ...images[1]].map((src, i) => (
                  <img key={i} src={src} alt={`Beauty ${i}`} style={{
                    width: "100%",
                    height: `${singleImageHeight}px`,
                    objectFit: "cover",
                    borderRadius: "1rem",
                    boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                  }} />
                ))}
              </div>
            </div>

            {/* Column 3 */}
            <div style={{
              width: "33.3333%",
              position: "relative",
              transform: `translateY(-${scrollPosition}px)`,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[...images[2], ...images[2], ...images[2]].map((src, i) => (
                  <img key={i} src={src} alt={`Beauty ${i}`} style={{
                    width: "100%",
                    height: `${singleImageHeight}px`,
                    objectFit: "cover",
                    borderRadius: "1rem",
                    boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                  }} />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero;
