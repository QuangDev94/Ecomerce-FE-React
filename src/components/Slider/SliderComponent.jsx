import React from 'react'
import Slider from "react-slick";
import {Image} from 'antd';

const SliderComponent = ({arrImage}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
      };
  return (
    <div className="slider-container">
        <Slider {...settings}>
            {
                arrImage.map((image) => {
                    return <Image src={image} alt="slider" preview={false} style={{padding: "10px"}}/>
                })
            }
        </Slider>
    </div>
  )
}

export default SliderComponent