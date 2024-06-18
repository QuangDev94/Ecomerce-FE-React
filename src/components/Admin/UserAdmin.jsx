import React, { useState } from 'react'
import { WrapperHeaderUser } from './style'
import { Button, Modal } from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import TableComponent from '../Table/TableComponent';

const UserAdmin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
        <div>
            <WrapperHeaderUser>User Manager</WrapperHeaderUser>
            <div style={{ marginTop: '10px' }}>
                <Button style={{
                    height: '150px',
                    width: '150px',
                    borderRadius: '6px',
                    borderStyle: 'dashed',
                }} onClick={showModal}>
                    <PlusOutlined style={{fontSize: '50px'}}/>
                </Button>
            </div>
            <TableComponent />
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default UserAdmin