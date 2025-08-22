import React from "react";
import styled from "styled-components";
import GIF from "../assets/home.png"; // Ini gambar, bukan video

const ImageContainer = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: 64em) {
    min-width: 40vh;
  }
`;

const CoverVideo = () => {
  return (
    <ImageContainer>
      <img src={GIF} alt="Home cover" />
    </ImageContainer>
  );
};

export default CoverVideo;