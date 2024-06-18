import React, { useState } from 'react'
import { WrapperHeaderUser } from './style'
import { Button } from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import TableComponent from '../Table/TableComponent';

const ProductAdmin = () => {

    return (
        <div>
            <WrapperHeaderUser>Product Manager</WrapperHeaderUser>
            <div style={{ marginTop: '10px' }}>
                <Button style={{
                    height: '150px',
                    width: '150px',
                    borderRadius: '6px',
                    borderStyle: 'dashed',
                }}>
                    <PlusOutlined style={{fontSize: '50px'}}/>
                </Button>
            </div>
            <TableComponent />
        </div>
    )
}

export default ProductAdmin;