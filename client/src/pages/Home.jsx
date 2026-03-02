import React from "react";
import Header from "../components/Header";
import Steps from "../components/Steps";
import BGSlider from "../components/BGSlider";
import Testimonial from "../components/Testimonial";
import Upload from "../components/Upload";
const Home = () => {
  return (
    <>
      <Header />
      <Steps />
      <BGSlider />
      <Testimonial />
      <Upload />
    </>
  );
};

export default Home;
