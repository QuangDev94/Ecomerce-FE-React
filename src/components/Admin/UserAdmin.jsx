import React, { useEffect, useState } from 'react'
import { WrapperHeaderUser } from './style'
import { Button, Form, Input, Modal } from 'antd'
import TableComponent from '../Table/TableComponent'
import * as UserService from '../../services/UserService';
import { useQuery } from '@tanstack/react-query';
import { UploadOutlined,DeleteOutlined, EditOutlined,SearchOutlined } from '@ant-design/icons';
import DrawerComponent from '../Drawer/DrawerComponent';
import Loading from '../Loading/Loading';
import { WrapperUploadFile } from '../../pages/Profile/style';
import { getBase64 } from '../../utils';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message';

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
    // End Get all user

    // Update user
        // Render Logic when change stateUserDetails
    const [isOpenDrawer,setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate,setIsLoadingUpdate] = useState(false);
    const [updateForm] = Form.useForm();
    const [stateUserDetails,setStateUserDetails] = useState({
        id: '',
        name: '',
        email: '',
        address: '',
        phone: '',
        password: '',
        admin: '',
        avatar: '',
    });
    useEffect(() => {
        updateForm.setFieldsValue(stateUserDetails);
        setIsLoadingUpdate(false);
    },[stateUserDetails,updateForm]);

        // Interactive Logic when change input update form
    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name] : e.target.value
        });
    }
    const handleOnChangeImageDetails = async ({fileList}) => {
        const file = fileList[0];
        if (!file?.url && !file?.preview) {
            file.preview = await getBase64(file?.originFileObj);
            setStateUserDetails({
              ...stateUserDetails,
              avatar: file.preview
            })
        }
    }

        // Interactive Logic when click update button
    const mutationUpdate = useMutationHooks(
        async (data) => {
          const { id,stateUserDetails,access_token} = data;
          const res = await UserService.updateUser(
            id,stateUserDetails,access_token
          );
          return res;
        }
    );
    
    const {
    data:dataUpdated,
    isPending: isPendingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated
    } = mutationUpdate;

    const onUpdateFinish = (values) => {
        let access_token = localStorage.getItem("access_token");
        access_token = JSON.parse(access_token);
        mutationUpdate.mutate({id: stateUserDetails.id,stateUserDetails,access_token});
        console.log('mutationUpdate: ',mutationUpdate)
    };

    const onUpdateFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
        // Render Logic when updated
    useEffect(() => {
        if(isSuccessUpdated && dataUpdated?.status === "OK") {
          message.success();
          setIsOpenDrawer(false);
          refetch();
        }
        if(isErrorUpdated) {
          message.error();
        }
      },[isSuccessUpdated,isErrorUpdated]);
    // End Update user

    // Delete User
    const [idDeleteProduct,setIdDeleteProduct] = useState();
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const mutationDeleted = useMutationHooks(
        async (data) => {
            const { id,access_token} = data;
            const res = await UserService.deleteUser(
                id,access_token
            );
            return res;
        }
    );

    const {
        data:dataDeleted,
        isSuccess: isSuccessDeleted,
        isError: isErrorDeleted,
        isPending: isPendingDeleted,
    } = mutationDeleted;

    const handleDeleteOk = () => {
        let access_token = localStorage.getItem("access_token");
        access_token = JSON.parse(access_token);
        mutationDeleted.mutate({id: idDeleteProduct,access_token});
    }

    useEffect(() => {
        if(isSuccessUpdated && dataDeleted?.status === "OK") {
            message.success();
            setIsModalDeleteOpen(false);
            refetch();
        }
        if(isErrorDeleted) {
            message.error();
        }
    },[isSuccessDeleted,isErrorDeleted]);

    // End Delete User
    return (
        <div>
            <WrapperHeaderUser>User Manager</WrapperHeaderUser>
            <TableComponent 
                data={dataTable} 
                columns={columns} 
                isLoading={isLoadingFetchUser}
                onRow={
                    (record,rowIndex) => {
                      return {
                        onClick: async event => {
                          if (
                            event.target.parentElement.classList['value'] === 'anticon anticon-edit' ||
                            event.target.parentElement.classList['value'] === 'anticon anticon-edit' ||
                            event.target.parentElement.getAttribute("data-icon") === 'edit'
                          ) {
                            setIsLoadingUpdate(true);
                            setIsOpenDrawer(true);
                            let access_token = localStorage.getItem("access_token");
                            access_token = JSON.parse(access_token);
                            const res = await UserService.getDetailsUser(record._id,access_token);
                            setStateUserDetails({
                              id: res?.data?._id,
                              name: res?.data?.name,
                              email: res?.data?.email,
                              address: res?.data?.address,
                              phone: res?.data?.phone,
                              password: res?.data?.password,
                              admin: res?.data?.isAdmin,
                              avatar: res?.data?.avatar,
                            });
                          }
                          if(
                            event.target.parentElement.classList['value'] === 'anticon anticon-delete' ||
                            event.target.parentElement.classList['value'] === 'anticon anticon-delete' ||
                            event.target.parentElement.getAttribute("data-icon") === 'delete'
                          ) {
                            setIdDeleteProduct(record._id);
                            setIsModalDeleteOpen(true);
                          }
                        }
                      }
                    }
                }
            />
            <DrawerComponent forceRender title='Update User' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="60%" height="fit-content">
                <Loading spinning={isLoadingUpdate || isPendingUpdated}>
                    <Form
                        form={updateForm}
                        name="update form"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 22,
                        }}
                        style={{
                            maxWidth: 800,
                        }}
                        onFinish={onUpdateFinish}
                        onFinishFailed={onUpdateFinishFailed}
                        autoComplete="on"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name user!',
                                },
                            ]}
                        >
                            <Input value={stateUserDetails.name} name='name' onChange={handleOnChangeDetails}/>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email user!',
                                },
                            ]}
                        >
                            <Input value={stateUserDetails.email} name='email' onChange={handleOnChangeDetails}/>
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your address user!',
                                },
                            ]}
                        >
                            <Input value={stateUserDetails.address} name='address' onChange={handleOnChangeDetails}/>
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone user!',
                                },
                            ]}
                        >
                            <Input value={stateUserDetails.phone} name='phone' onChange={handleOnChangeDetails}/>
                        </Form.Item>
                        <Form.Item
                            label="password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password user!',
                                },
                            ]}
                        >
                            <Input value={stateUserDetails.password} name='password' onChange={handleOnChangeDetails}/>
                        </Form.Item>
                        <Form.Item
                            label="Admin"
                            name="admin"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your admin user!',
                            },
                            ]}
                        >
                            <Input value={stateUserDetails.admin} name='admin' onChange={handleOnChangeDetails}/>
                        </Form.Item>
                        <Form.Item
                            label="Avatar"
                            name="avatar"
                        >
                            <WrapperUploadFile onChange={handleOnChangeImageDetails} name="avatar">
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </WrapperUploadFile>
                            {
                                stateUserDetails?.avatar && (
                                    <img src={stateUserDetails?.avatar} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '5px',
                                        objectFit: 'cover',
                                        marginTop: '5px'
                                    }} alt='image product'/>
                                )
                            }
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                            offset: 12,
                            span: 4,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <Modal title="Delete Product" open={isModalDeleteOpen} onOk={handleDeleteOk} onCancel={() => setIsModalDeleteOpen(false)}>
                <Loading spinning={isPendingDeleted}>
                    <p>Are you sure delete this account ?</p>
                </Loading>
            </Modal>
        </div>
    )
}

export default UserAdmin