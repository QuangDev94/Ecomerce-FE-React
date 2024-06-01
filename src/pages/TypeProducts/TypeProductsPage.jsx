import React from 'react'
import NavbarComponent from '../../components/Navbar/NavbarComponent'
import CardComponent from '../../components/Card/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProductsType } from './style'

const TypeProductsPage = () => {
  return (
    <Row style={{padding: '0 120px',background: '#efefef', flexWrap: 'nowrap', paddingTop: '10px'}}>
        <WrapperNavbar span={4}>
            <NavbarComponent />
        </WrapperNavbar>
        <Col span={20}>
            <WrapperProductsType>
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
            </WrapperProductsType>
            <Pagination defaultCurrent={1} total={50} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}/>
        </Col>
    </Row>
  )
}

export default TypeProductsPage