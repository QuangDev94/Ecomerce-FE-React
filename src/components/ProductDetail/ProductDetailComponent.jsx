import { Col, Image, InputNumber, Row } from 'antd'
import React from 'react'
import imageProduct from '../../assets/products/product1.png'
import imageProductSmall1 from '../../assets/productsSmall/productSmall1.png'
import imageProductSmall2 from '../../assets/productsSmall/productSmall2.png'
import imageProductSmall3 from '../../assets/productsSmall/productSmall3.png'
import imageProductSmall4 from '../../assets/productsSmall/productSmall4.png'
import { WrapperAddress, WrapperNameProduct, WrapperPictureSmall, WrapperProducQuality, WrapperProductPrice, WrapperTextPrice, WrapperTextSolded } from './style'
import { StarFilled,PlusOutlined,MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../Button/ButtonComponent'

const ProductDetailComponent = () => {
  return (
    <Row style={{background: '#fff', borderRadius: '4px', padding: '10px'}}>
        <Col span={10}>
            <Image src={imageProduct} alt='image product main' preview={false} style={{border: '1px solid #ccc', borderRadius: '5px'}}/>
            <Row style={{paddingTop: '10px'}}>
                <Col span={4}>
                    <WrapperPictureSmall src={imageProductSmall1} alt='image product main' preview={false} />
                </Col>
                <Col span={4}>
                    <WrapperPictureSmall src={imageProductSmall2} alt='image product main' preview={false} />
                </Col>
                <Col span={4}>
                    <WrapperPictureSmall src={imageProductSmall3} alt='image product main' preview={false} />
                </Col>
                <Col span={4}>
                    <WrapperPictureSmall src={imageProductSmall4} alt='image product main' preview={false} />
                </Col>
                <Col span={4}>
                    <WrapperPictureSmall src={imageProductSmall1} alt='image product main' preview={false} />
                </Col>
                <Col span={4}>
                    <WrapperPictureSmall src={imageProductSmall2} alt='image product main' preview={false} />
                </Col>
            </Row>
        </Col>
        <Col span={14} style={{padding: '0 20px'}}>
            <WrapperNameProduct>Máy đọc sách Boox Palma - Hàng Chính Hãng</WrapperNameProduct>
            <WrapperTextSolded>
                <StarFilled style={{fontSize: '14px', color: 'rgb(253,216,54)'}}/>
                <StarFilled style={{fontSize: '14px', color: 'rgb(253,216,54)'}}/>
                <StarFilled style={{fontSize: '14px', color: 'rgb(253,216,54)'}}/>
                <span> | Solded 1000+</span>
            </WrapperTextSolded>
            <WrapperProductPrice>
                <WrapperTextPrice>200.000 VND</WrapperTextPrice>
            </WrapperProductPrice>
            <WrapperAddress>
                <span>Send To </span>
                <span className='address'>Q. 1, P. Ben Nghe, Ho Chi Minh </span>
                - <span className='change-address'>Change address</span>
            </WrapperAddress>
            <WrapperProducQuality>
                <div style={{marginTop: '10px'}}>Quality: </div>
                <div style={{margin: '10px 0'}}>
                    {/* <PlusOutlined style={{fontSize: '10px'}}/> */}
                    <InputNumber min={1} max={10} defaultValue={3} />
                    {/* <MinusOutlined style={{fontSize: '10px'}}/> */}
                </div>
            </WrapperProducQuality>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px'}}>
                <ButtonComponent 
                    size={20}
                    styleButton={{
                        background: 'rgb(255,57,69)',
                        height: '48px',
                        width: '220px',
                        border: 'none',
                        borderRadius: '4px'
                    }}
                    textButton='Buy'
                    styleTextButton={{color: '#fff',fontSize: '15px', fontWeight: '700'}}
                />
                <ButtonComponent 
                    size={20}
                    styleButton={{
                        background: '#fff',
                        height: '48px',
                        width: '220px',
                        border: '1px solid rgb(13,92,182)',
                        borderRadius: '4px'
                    }}
                    textButton='Buy Price Affter'
                    styleTextButton={{color: 'rgb(13,92,182)', fontSize: '15px'}}
                />
            </div>
        </Col>
    </Row>
  )
}

export default ProductDetailComponent