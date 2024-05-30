import React from 'react'
import TypeProductComponent from '../../components/TypeProduct/TypeProductComponent'
import { WrapperTypeProduct } from './style'
import SliderComponent from '../../components/Slider/SliderComponent'
import slider1 from '../../assets/images/slider1.webp';
import slider2 from '../../assets/images/slider2.jpg';
import slider3 from '../../assets/images/slider3.jpg';
import slider4 from '../../assets/images/slider4.jpg';

const HomePage = () => {
  const arr = ['Iphone','Ipad','SamSung']
  return (
    <>
      <div style={{padding: '0 120px'}}>
        <WrapperTypeProduct>
          {
            arr.map((item) => {
              return (
                <TypeProductComponent name={item}/>
              )
            })
          }
        </WrapperTypeProduct>
      </div>
      <div style={{padding: '0 120px',backgroundColor: "#efefef"}}>
        <SliderComponent arrImage={[slider1,slider2,slider3,slider4]}/>
      </div>
    </>
  )
}

export default HomePage