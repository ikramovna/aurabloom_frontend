import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import logoAura from "../../assets/logoAura.webp"
export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Umumiy loading muddati (4 sekund)
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!hide && (
        <Box
          component={motion.div}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: loading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          onAnimationComplete={() => {
            if (!loading) {
              setHide(true);
            }
          }}
        >
          {/* Logo animatsiya bilan */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: loading ? 1 : 0, y: loading ? 0 : -20 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              width: 200,
              height: 200,
              marginBottom: 20,
              backgroundImage: `url(${logoAura})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: loading ? 1 : 0, y: loading ? 0 : -20 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <Typography sx={{ fontSize: "18px", color: "#666" }}>
             created by Zokirjonova Muslima
            </Typography>
          </motion.div>
        </Box>
      )}
    </AnimatePresence>
  );
}
