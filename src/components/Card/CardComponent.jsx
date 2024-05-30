import React from 'react'
import { Card } from 'antd'
import { StarFilled } from '@ant-design/icons'
import { WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style';
import tick from '../../assets/ticks/tick.png';
import iphonePicture from '../../assets/products/iphone1.png';

const CardComponent = () => {
  const { Meta } = Card;
  return (
    <Card
      hoverable
      style={{
        width: 200,
      }}
      bodyStyle={{padding: '10px'}}
      cover={<img alt="example" src={iphonePicture} style={{height: 200}}/>}
    >
      <img src={tick} style={{width: 68, height: 14, position: "absolute", top: 183, left: 0}} alt='tick'/>
      <Meta title="Iphone"/>
      <WrapperReportText>
        <span>4.5</span> <StarFilled style={{fontSize: '10px', color: 'yellow'}}/>
        <span style={{padding: '0 3px'}}>|</span> <span>Solded 1000+</span>
      </WrapperReportText>
      <WrapperPriceText>
        1.000.000
        <WrapperDiscountText>-5%</WrapperDiscountText>
      </WrapperPriceText>
    </Card>
  )
}

export default CardComponent