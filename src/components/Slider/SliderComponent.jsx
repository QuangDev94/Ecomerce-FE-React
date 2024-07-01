import React from "react";
import Slider from "react-slick";
import { Image } from "antd";
import { WrapperImage } from "./style";
import { useViewport } from "../../hooks/useViewport";

const SliderComponent = ({ arrImage }) => {
  const viewPort = useViewport();
  const showPicNumber = viewPort.width < 1180 ? 1 : 2;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: showPicNumber,
    slidesToScroll: showPicNumber,
    autoplay: true,
    focusOnSelect: false,
  };
  return (
    <Slider {...settings}>
      {arrImage.map((image) => {
        return (
          <WrapperImage
            key={image}
            src={image}
            alt="slider"
            preview={false}
            width="100%"
            height={500}
            style={{ padding: "10px" }}
          />
        );
      })}
    </Slider>
  );
};

export default SliderComponent;
