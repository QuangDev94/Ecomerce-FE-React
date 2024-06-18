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

const renderAction = () => {
  return (
    <div>
      <DeleteOutlined style={{color: 'red',paddingRight: '5px',cursor: 'pointer'}}/>
      <EditOutlined  style={{color: 'green',paddingLeft: '5px',cursor: 'pointer'}}/>
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
    const [form] = Form.useForm();
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
        form.resetFields();
        handleCancel();
      }
      if(isError) {
        message.error();
      }
    },[isSuccess,isError])
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
    const handleOnChange = (e) => {
      setStateProduct({
        ...stateProduct,
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

    // Fetch all product
    const fetchAllProduct = async () => {
      const res = await ProductService.getAllProduct();

      return res;
    };
    const {isLoading: isLoadingFetchProduct, data: allProduct} = useQuery({
      queryKey: ['allProduct'],
      queryFn: fetchAllProduct,
      retry: 3,
      retryDelay: 1000
    });
    const dataTable = allProduct?.response?.data?.length && 
    allProduct?.response?.data?.map((product) => {
      return {...product,key: product._id}
    });
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
            <TableComponent products={dataTable} columns={columns} isLoading={isLoadingFetchProduct}/>
            <Modal title="Create New Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
              <Loading spinning={isPending}>
                <Form
                    form={form}
                    name="basic"
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
        </div>
    )
}

export default ProductAdmin;