import React, { useState } from 'react'
import { WrapperHeaderUser } from './style'
import { Button, Modal } from 'antd'
import TableComponent from '../Table/TableComponent'
import * as UserService from '../../services/UserService';
import { useQuery } from '@tanstack/react-query';
import { UploadOutlined,DeleteOutlined, EditOutlined,SearchOutlined } from '@ant-design/icons';

const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{color: 'red',padding: '5px',cursor: 'pointer',marginRight: '3px',fontSize: '18px'}}/>
        <EditOutlined  style={{color: 'green',padding: '5px',cursor: 'pointer',marginLeft: '3px',fontSize: '18px'}}/>
      </div>
    );
};

const UserAdmin = () => {
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
        {
          title: 'Admin',
          dataIndex: 'isAdmin'
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction
        },
    ];
    // Get all user
    const fetchAllUser = async () => {
        let access_token = localStorage.getItem("access_token");
        access_token = JSON.parse(access_token);
        const res = await UserService.getAllUser(access_token);
        return res;
    };

    const {isLoading: isLoadingFetchUser, data: allUser,refetch} = useQuery({
        queryKey: ['allUser'],
        queryFn: fetchAllUser,
        retry: 3,
        retryDelay: 1000,
        refetchInterval: 0,
        refetchOnWindowFocus: true,
    });

    const dataTable = allUser?.data?.length && 
    allUser?.data?.map((user) => {
        return {...user,key: user._id,isAdmin: user.isAdmin.toString()}
    });

    return (
        <div>
            <WrapperHeaderUser>User Manager</WrapperHeaderUser>
            
            <TableComponent 
                data={dataTable} 
                columns={columns} 
                isLoading={isLoadingFetchUser}
            />
           
        </div>
    )
}

export default UserAdmin