import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import Accordion from "../Accordion";

const Section = styled.section`
  min-height: 100vh;
  height: auto;
  width: 100vw;
  background-color: ${(props) => props.theme.text};
  position: relative;
  color: ${(props) => props.theme.body};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxl};
  text-transformation: uppercase;
  color: ${(props) => props.theme.body};

  margin: 1rem auto;
  border-bottom: 2px solid ${(props) => props.theme.cauroselColor};
  width: fit-content;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Container = styled.div`
  width: 75%;
  margin: 2rem auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 64em) {
    width: 80%;
  }

  @media (max-width: 48em) {
    width: 90%;
    flex-direction: column;
  }

  & > *::last-child {
    & > *::first-child {
      margin-top: 0;
    }
  }
`;

const Box = styled.div`
  width: 45%;

  @media (max-width: 64em) {
    width: 90%;
    align-self: center;
  }
`;

const Faq = () => {
  const ref = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  useLayoutEffect(() => {
    let element = ref.current;

    ScrollTrigger.create({
      trigger: element,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: true,
      // markers: true,
    });

    return () => {
      ScrollTrigger.kill();
    };
  }, []);

  return (
<Section ref={ref} id="faq">
  <Title>FAQ</Title>
  <Container>
    <Box>
      <Accordion title="Apa itu Program Adiwiyata?">
        Adiwiyata adalah program sekolah berwawasan lingkungan yang bertujuan
        menciptakan warga sekolah peduli dan berbudaya lingkungan. Program ini
        menjadikan sekolah sebagai tempat belajar yang ramah, sehat, dan
        berkelanjutan.
      </Accordion>
      <Accordion title="Mengapa Adiwiyata Penting?">
        Karena melalui Adiwiyata, siswa tidak hanya belajar di kelas, tetapi
        juga belajar bagaimana menjaga alam, mengelola sampah, dan menggunakan
        sumber daya secara bijak. Tujuannya agar terbentuk generasi yang peduli
        bumi.
      </Accordion>
      <Accordion title="Apa peran siswa dalam program Adiwiyata?">
        Siswa diharapkan aktif menjaga kebersihan lingkungan sekolah, ikut serta
        dalam kegiatan penghijauan, mengurangi sampah plastik, serta menjadi
        agen perubahan dalam gaya hidup ramah lingkungan.
      </Accordion>
    </Box>
    <Box>
      <Accordion title="Apa sih benefit yang didapatkan dari program Adiwiyata?">
  Dengan ikut serta dalam Adiwiyata, sekolah dan siswa dapat merasakan banyak
  benefit, antara lain:
  <ul>
    <li>Sekolah jadi lebih bersih, sehat, dan hijau.</li>
    <li>Siswa terbiasa disiplin dalam menjaga kebersihan dan lingkungan.</li>
    <li>Meningkatkan citra sekolah sebagai sekolah peduli lingkungan.</li>
    <li>Memupuk rasa tanggung jawab generasi muda terhadap bumi.</li>
    <li>Memberi pengalaman nyata tentang gaya hidup berkelanjutan.</li>
  </ul>
</Accordion>
      <Accordion title="Apa manfaat Adiwiyata bagi sekolah?">
        Sekolah menjadi lebih hijau, bersih, sehat, dan nyaman. Selain itu,
        sekolah juga membentuk karakter siswa yang disiplin, bertanggung jawab,
        dan peduli terhadap lingkungan.
      </Accordion>
      <Accordion title="Bagaimana cara berpartisipasi?">
        Setiap siswa, guru, maupun warga sekolah bisa ikut berpartisipasi dengan
        hal-hal sederhana seperti hemat energi, menanam pohon, hingga ikut serta
        dalam program lingkungan yang diadakan di sekolah.
      </Accordion>
    </Box>
  </Container>
</Section>

  );
};

export default Faq;
