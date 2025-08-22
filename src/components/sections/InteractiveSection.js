// src/components/sections/InteractiveSection.js
import React from "react";
import Showcase from "./Showcase";
import CommentsSection from "./CommentsSection";

const InteractiveSection = () => {
  const styles = {
    container: {
      width: "100vw",
      padding: "2rem 1rem",
      backgroundColor: "#f8fafc",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1.5rem",
      maxWidth: "1800px",
      margin: "0 auto",
      height: "85vh",
    },
    panel: {
      background: "white",
      borderRadius: "24px",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08)",
      overflow: "hidden",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    "@media (max-width: 768px)": {
      grid: { gridTemplateColumns: "1fr", height: "auto" },
      panel: { height: "60vh" },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        <div style={styles.panel}>
          <Showcase />
        </div>
        <div style={styles.panel}>
          <CommentsSection />
        </div>
      </div>
    </div>
  );
};

export default InteractiveSection;