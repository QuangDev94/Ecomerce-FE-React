import { Col, Image, InputNumber, Rate, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import imageProduct from '../../assets/products/product1.png'
import imageProductSmall1 from '../../assets/productsSmall/productSmall1.png'
import imageProductSmall2 from '../../assets/productsSmall/productSmall2.png'
import imageProductSmall3 from '../../assets/productsSmall/productSmall3.png'
import imageProductSmall4 from '../../assets/productsSmall/productSmall4.png'
import { WrapperAddress, WrapperNameProduct, WrapperPictureSmall, WrapperProducQuality, WrapperProductPrice, WrapperTextPrice, WrapperTextSolded } from './style'
import { StarFilled,PlusOutlined,MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../Button/ButtonComponent'
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import Loading from "../Loading/Loading.jsx";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProductDetailComponent = ({idProduct}) => {
    const user = useSelector((state) => state.user);
    let rating;
    const navigate = useNavigate();
    const fetchDetailsProduct = async (id) => {
        const res = await ProductService.getDetailsProduct(id);
        return res;
    };
    const {isLoading, data: productDetails} = useQuery({
        queryKey: ['products', idProduct],
        queryFn: () => fetchDetailsProduct(idProduct),
        retry: 3,
        retryDelay: 1000
    });
    useEffect(() => {
        rating = productDetails?.data?.rating
        console.log(rating)
    },[productDetails?.data?.rating]);
    return (
        <Loading spinning={isLoading}>
            <Row style={{background: '#fff', borderRadius: '4px', padding: '10px'}}>
                <Col span={10}>
                    <Image src={productDetails?.data?.image} alt='image product main' preview={false} style={{border: '1px solid #ccc', borderRadius: '5px'}}/>
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
                    <WrapperNameProduct>{productDetails?.data?.name}</WrapperNameProduct>
                    <WrapperTextSolded>
                        <Rate disabled value={productDetails?.data?.rating}/>
                        <span> | Solded 1000+</span>
                    </WrapperTextSolded>
                    <WrapperProductPrice>
                        <WrapperTextPrice>{productDetails?.data?.price.toLocaleString()} $</WrapperTextPrice>
                    </WrapperProductPrice>
                    <WrapperAddress>
                        <span>Send To </span>
                        <span className='address'>{user?.address}</span>
                        -   <span 
                                className='change-address'
                                onClick={() => navigate('/profile-user')}
                                style={{cursor: 'pointer'}}
                            >
                                Change address
                            </span>
                    </WrapperAddress>
                    <WrapperProducQuality>
                        <div style={{marginTop: '10px'}}>Quality: </div>
                        <div style={{margin: '10px 0'}}>
                            {/* <PlusOutlined style={{fontSize: '10px'}}/> */}
                            <InputNumber 
                                min={1} 
                                max={productDetails?.data?.countInStock} 
                                defaultValue={1}
                            />
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
                            styleTextButton={{color: 'rgb(13,92,182)',fontSize: '15px', fontWeight: '700'}}
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
        </Loading>
    )
}

export default ProductDetailComponent