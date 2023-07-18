"use client";

import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Slider.module.css";
import Card from "../card/Card";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const CustomArrows: React.FC = () => {
  const slider = React.useRef<Slider | null>(null);

  const settings: Settings = {
    arrows: false,
    dots: false,
    variableWidth: true,
    // adaptiveHeight: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToScroll: 1,
    speed: 900,

    className: "center",
    centerMode: true,
    centerPadding: "60px",
  };

  return (
    <div className={styles.container}>
      <KeyboardArrowLeftIcon
        style={{
          color: "#ffdb10",
          width: "3rem",
          height: "3rem",
          cursor: "pointer",
        }}
        onClick={() => slider?.current?.slickPrev()}
      >
        Prev
      </KeyboardArrowLeftIcon>
      <Slider ref={slider} {...settings} className={styles.slider}>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </Slider>
      <KeyboardArrowRightIcon
        onClick={() => slider?.current?.slickNext()}
        style={{
          color: "#ffdb10",
          width: "3rem",
          height: "3rem",
          cursor: "pointer",
        }}
      >
        Next
      </KeyboardArrowRightIcon>
    </div>
  );
};

export default CustomArrows;
