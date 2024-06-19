import React, { useEffect, useState } from 'react'
import { WrapperHeaderUser } from './style'
import { Button, Form, Input, Modal } from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import TableComponent from '../Table/TableComponent';
import { UploadOutlined,DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { WrapperUploadFile } from '../../pages/Profile/style';
import { getBase64 } from '../../utils';
import * as ProductService from '../../services/ProductService';
import {useMutationHooks} from '../../hooks/useMutationHook';
import Loading from '../Loading/Loading';
import * as message from '../../components/Message/Message';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../Drawer/DrawerComponent';

const renderAction = () => {
  return (
    <div>
      <DeleteOutlined style={{color: 'red',padding: '5px',cursor: 'pointer',marginRight: '3px',fontSize: '18px'}}/>
      <EditOutlined  style={{color: 'green',padding: '5px',cursor: 'pointer',marginLeft: '3px',fontSize: '18px'}}/>
    </div>
  );
};
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: renderAction
  },
];

const ProductAdmin = () => {
  // Fetch all product
  const fetchAllProduct = async () => {
    const res = await ProductService.getAllProduct();

    return res;
  };
  const {isLoading: isLoadingFetchProduct, data: allProduct,refetch} = useQuery({
    queryKey: ['allProduct'],
    queryFn: fetchAllProduct,
    retry: 3,
    retryDelay: 1000,
    refetchInterval: 0,
    refetchOnWindowFocus: true,
  });
  const dataTable = allProduct?.response?.data?.length && 
  allProduct?.response?.data?.map((product) => {
    return {...product,key: product._id}
  });
  

    const [isLoadingUpdate,setIsLoadingUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateProduct,setStateProduct] = useState({
      name: '',
      type: '',
      price: '',
      rating: '',
      countInStock: '',
      description: '',
      image: '',
    });
    const [stateProductDetails,setStateProductDetails] = useState({
      id: '',
      name: '',
      type: '',
      price: '',
      rating: '',
      countInStock: '',
      description: '',
      image: '',
    });
    const [isOpenDrawer,setIsOpenDrawer] = useState(false);

    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
  
    const mutation = useMutationHooks(
      async (data) => {
        const { access_token,stateProduct} = data;
        const res = await ProductService.createProduct(
          stateProduct,access_token
        );
        return res;
      }
    );
    const {data,isPending,isSuccess,isError} = mutation;

    const mutationUpdate = useMutationHooks(
      async (data) => {
        const { id,access_token,stateProductDetails} = data;
        const res = await ProductService.updateProduct(
          id,stateProductDetails,access_token
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

    useEffect(() => {
      if(isSuccess && data?.status === "OK") {
        message.success();
        setStateProduct({
          name: '',
          type: '',
          price: '',
          rating: '',
          countInStock: '',
          description: '',
          image: '',
        });
        createForm.resetFields();
        handleCancel();
      }
      if(isError) {
        message.error();
      }
    },[isSuccess,isError])

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

    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const onFinish = (values) => {
      let access_token = localStorage.getItem("access_token");
      access_token = JSON.parse(access_token);
      mutation.mutate({stateProduct,access_token});
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    const onUpdateFinish = (values) => {
      let access_token = localStorage.getItem("access_token");
      access_token = JSON.parse(access_token);
      mutationUpdate.mutate({id: stateProductDetails.id,stateProductDetails,access_token});
    };
    const onUpdateFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    const handleOnChange = (e) => {
      setStateProduct({
        ...stateProduct,
        [e.target.name] : e.target.value
      });
    }
    const handleOnChangeDetails = (e) => {
      setStateProductDetails({
        ...stateProductDetails,
        [e.target.name] : e.target.value
      });
    }
    const handleOnChangeImage = async ({fileList}) => {
      const file = fileList[0];
      if (!file?.url && !file?.preview) {
          file.preview = await getBase64(file?.originFileObj);
          setStateProduct({
            ...stateProduct,
            image: file.preview
          })
      }
    };

    const handleOnChangeImageDetails = async ({fileList}) => {
      const file = fileList[0];
      if (!file?.url && !file?.preview) {
          file.preview = await getBase64(file?.originFileObj);
          setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
          })
      }
    };

    
    // Update Product
    useEffect(() => {
      updateForm.setFieldsValue(stateProductDetails);
      setIsLoadingUpdate(false);
  
    },[updateForm,stateProductDetails]);
    return (
        <div>
            <WrapperHeaderUser>Product Manager</WrapperHeaderUser>
            <div style={{ marginTop: '10px' }}>
                <Button style={{
                    height: '150px',
                    width: '150px',
                    borderRadius: '6px',
                    borderStyle: 'dashed',
                }}  onClick={showModal}>
                    <PlusOutlined style={{fontSize: '50px'}}/>
                </Button>
            </div>
            <TableComponent 
              products={dataTable} 
              columns={columns} 
              isLoading={isLoadingFetchProduct}
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
                        const res = await ProductService.getDetailsProduct(record._id);
                        setStateProductDetails({
                          id: res?.data?._id,
                          name: res?.data?.name,
                          price: res?.data?.price,
                          description: res?.data?.description,
                          type: res?.data?.type,
                          rating: res?.data?.rating,
                          countInStock: res?.data?.countInStock,
                          image: res?.data?.image,
                        });
                        // updateForm.setFieldsValue(res.data);
                      }
                    }
                  }
                }
              }
            />
            <Modal title="Create New Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
              <Loading spinning={isPending}>
                  <Form
                    form={createForm}
                    name="create form"
                    labelCol={{
                      span: 6,
                    }}
                    wrapperCol={{
                      span: 18,
                    }}
                    style={{
                      maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                  >
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your name product!',
                        },
                      ]}
                    >
                      <Input value={stateProduct.name} name='name' onChange={handleOnChange}/>
                    </Form.Item>
                    <Form.Item
                      label="Type"
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your type product!',
                        },
                      ]}
                    >
                      <Input value={stateProduct.type} name='type' onChange={handleOnChange}/>
                    </Form.Item>
                    <Form.Item
                      label="Price"
                      name="price"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your price product!',
                        },
                      ]}
                    >
                      <Input value={stateProduct.price} name='price' onChange={handleOnChange}/>
                    </Form.Item>
                    <Form.Item
                      label="Rating"
                      name="rating"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your rating product!',
                        },
                      ]}
                    >
                      <Input value={stateProduct.rating} name='rating' onChange={handleOnChange}/>
                    </Form.Item>
                    <Form.Item
                      label="Count in stock"
                      name="countInStock"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your count in stock product!',
                        },
                      ]}
                    >
                      <Input value={stateProduct.countInStock} name='countInStock' onChange={handleOnChange}/>
                    </Form.Item>
                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your description product!',
                        },
                      ]}
                    >
                      <Input value={stateProduct.description} name='description' onChange={handleOnChange}/>
                    </Form.Item>
                    <Form.Item
                      name="image"
                      label="Image"
                    >
                      <WrapperUploadFile onChange={handleOnChangeImage} name="image">
                          <Button icon={<UploadOutlined />}>Click to Upload</Button>
                      </WrapperUploadFile>
                      {
                        stateProduct?.image && (
                            <img src={stateProduct?.image} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt='image product'/>
                        )
                      }
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 20,
                        span: 4,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                </Form>
              </Loading>
            </Modal>
            <DrawerComponent title='Update Product' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="60%" height="fit-content">
              <Loading spinning={isLoadingUpdate}>
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
                          message: 'Please input your name product!',
                        },
                      ]}
                    >
                      <Input value={stateProductDetails.name} name='name' onChange={handleOnChangeDetails}/>
                    </Form.Item>
                    <Form.Item
                      label="Type"
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your type product!',
                        },
                      ]}
                    >
                      <Input value={stateProductDetails.type} name='type' onChange={handleOnChangeDetails}/>
                    </Form.Item>
                    <Form.Item
                      label="Price"
                      name="price"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your price product!',
                        },
                      ]}
                    >
                      <Input value={stateProductDetails.price} name='price' onChange={handleOnChangeDetails}/>
                    </Form.Item>
                    <Form.Item
                      label="Rating"
                      name="rating"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your rating product!',
                        },
                      ]}
                    >
                      <Input value={stateProductDetails.rating} name='rating' onChange={handleOnChangeDetails}/>
                    </Form.Item>
                    <Form.Item
                      label="Count in stock"
                      name="countInStock"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your count in stock product!',
                        },
                      ]}
                    >
                      <Input value={stateProductDetails.countInStock} name='countInStock' onChange={handleOnChangeDetails}/>
                    </Form.Item>
                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your description product!',
                        },
                      ]}
                    >
                      <Input value={stateProductDetails.description} name='description' onChange={handleOnChangeDetails}/>
                    </Form.Item>
                    <Form.Item
                      name="image"
                      label="Image"
                    >
                      <WrapperUploadFile onChange={handleOnChangeImageDetails} name="image">
                          <Button icon={<UploadOutlined />}>Click to Upload</Button>
                      </WrapperUploadFile>
                      {
                        stateProductDetails?.image && (
                            <img src={stateProductDetails?.image} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
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
        </div>
    )
}

export default ProductAdmin;