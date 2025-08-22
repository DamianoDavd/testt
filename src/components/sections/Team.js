import React from "react";
import styled from "styled-components";

const Section = styled.section`
  width: 100vw;
  background-color: ${(props) => props.theme.body};
  position: relative;
  padding: 3rem 0;
  min-height: auto;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  color: ${(props) => props.theme.text};
  text-align: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid ${(props) => props.theme.text};
  width: fit-content;
  padding-bottom: 0.5rem;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Description = styled.p`
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => `rgba(${props.theme.textRgba}, 0.8)`};
  text-align: center;
  max-width: 80%;
  margin: 1rem auto 2rem auto;
  line-height: 1.7;
`;

const VideoContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  aspect-ratio: 16 / 9;
  background: #000;

  @media (max-width: 64em) {
    width: 70%;
  }

  @media (max-width: 48em) {
    width: 85%;
  }
`;

const VideoIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const Team = () => {
  // Fixed YouTube embed URL
  const videoId = "yOb9Xaug35M";
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <Section id="team">
      <Title>Dokumentasi</Title>
      <Description>
        Berikut adalah dokumentasi kegiatan Adiwiyata yang telah dilaksanakan. 
        Silakan tonton video di bawah ini untuk melihat lebih detail tentang 
        kegiatan tersebut.
      </Description>
      <VideoContainer>
        <VideoIframe
          src={embedUrl}
          title="Dokumentasi Adiwiyata"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </VideoContainer>
    </Section>
  );
};

export default Team;