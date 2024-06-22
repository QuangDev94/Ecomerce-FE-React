import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeaderUser } from './style'
import { Button, Divider, Form, Input, Modal, Select, Space } from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import TableComponent from '../Table/TableComponent';
import { UploadOutlined,DeleteOutlined, EditOutlined,SearchOutlined } from '@ant-design/icons';
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


const ProductAdmin = () => {
  // Fetch all product and type
  const fetchAllProduct = async () => {
    const res = await ProductService.getAllProduct();

    return res;
  };
  const fetchAllType = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res.data;
  };
  const {isLoading: isLoadingFetchProduct, data: allProduct,refetch} = useQuery({
    queryKey: ['allProduct'],
    queryFn: fetchAllProduct,
    retry: 3,
    retryDelay: 1000,
    refetchInterval: 0,
    refetchOnWindowFocus: true,
  });
  const {isLoading: isLoadingType,data: types} = useQuery({
    queryKey: ['type'],
    queryFn: fetchAllType,
    retry: 3,
    retryDelay: 1000
  });
  const dataTable = allProduct?.response?.data?.length && 
  allProduct?.response?.data?.map((product) => {
    return {...product,key: product._id}
  });
  //End Fetch all product and type

  // Search column
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
      sorter: (a,b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Type',
      dataIndex: 'type',
      filters: [
        {
          text: 'Phone',
          value: 'Phone'
        },
        {
          text: 'TV',
          value: 'TV'
        }
      ],
      onFilter: (value,record) => {
        if(value === 'TV') {
          return record.type === value
        } else if(value === 'Phone') {
          return record.type === value
        }
      }

    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a,b) => a.price - b.price,
      filters: [
        {
          text: '>= 200',
          value: '>='
        },
        {
          text: '< 200',
          value: '<'
        }
      ],
      onFilter: (value,record) => {
        if(value === '>=') {
          return record.price >= 200
        } else if(value === '<') {
          return record.price < 200
        }
      }
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a,b) => a.rating - b.rating
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },
  ];
  // End Search column

  // Create Product
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
  const [createForm] = Form.useForm();

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
      createForm.resetFields();
      handleCancel();
      refetch();
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
  
  const handleOnChangeType = (value) => {
    setStateProduct({
      ...stateProduct,
      type : value
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

    // Handle Select Type
  const [items, setItems] = useState(types);
  const [newType, setNewType] = useState('');
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setNewType(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    if(newType) {
      setItems([...items, newType]);
      setNewType('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
    return
  };
    // End Handle Select Type
  // End Create Product

  // Update Product
  const [isOpenDrawer,setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate,setIsLoadingUpdate] = useState(false);
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
  const [updateForm] = Form.useForm();

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
    updateForm.setFieldsValue(stateProductDetails);
    setIsLoadingUpdate(false);

  },[updateForm,stateProductDetails]);

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

  const onUpdateFinish = (values) => {
    let access_token = localStorage.getItem("access_token");
    access_token = JSON.parse(access_token);
    mutationUpdate.mutate({id: stateProductDetails.id,stateProductDetails,access_token});
  };
  const onUpdateFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleOnChangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name] : e.target.value
    });
  }
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
  // End Update Product

  // Delete Product

  const [idDeleteProduct,setIdDeleteProduct] = useState();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const mutationDeleted = useMutationHooks(
    async (data) => {
      const { id,access_token} = data;
      const res = await ProductService.deleteProduct(
        id,access_token
      );
      return res;
    }
  );

  const {
    data:dataDeleted,
    isPending: isPendingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted
  } = mutationDeleted;

  const handleDeleteProduct =  () => {
    let access_token = localStorage.getItem("access_token");
    access_token = JSON.parse(access_token);
    mutationDeleted.mutate({id: idDeleteProduct,access_token});
  }

  useEffect(() => {
    if(isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success();
      refetch();
      setIdDeleteProduct('');
      setIsModalDeleteOpen(false);
    }
    if(isErrorDeleted) {
      message.error();
    }
  },[isSuccessDeleted,isErrorDeleted,isPendingDeleted]);
  // End Delete Product

  // Delete many
  const [selectionKeys,setSelectionKeys] = useState([]);
  const [isModalDeleteManyOpen,setIsModalDeleteManyOpen] = useState(false);
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectionKeys(selectedRowKeys)
    }
  };

  const mutationDeleteMany = useMutationHooks(
    async (data) => {
      const { ids,access_token} = data;
      const res = await ProductService.deleteManyProduct(
        ids,access_token
      );
      return res;
    }
  );
  const {
    data: deletedMany,
    isPending: isPendingProductMany,
    isSuccess: isSuccessProductMany,
    isError: isErrorProductMany
  } = mutationDeleteMany;

  const handleDeleteProductMany = () => {
    setIsModalDeleteManyOpen(true);
  };

  const handleDeleteManyOk = () => {
    let access_token = localStorage.getItem("access_token");
    access_token = JSON.parse(access_token);
    mutationDeleteMany.mutate({ids: selectionKeys,access_token})
  }
  useEffect(() => {
    if(isSuccessProductMany && deletedMany?.status === "OK") {
      message.success();
      setIsModalDeleteManyOpen(false);
      setSelectionKeys([]);
      refetch();
    }
    if(isErrorProductMany) {
      message.error();
    }
  },[isSuccessDeleted,isErrorProductMany,isPendingProductMany]);
  // End Delete many
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
          {
            selectionKeys?.length > 0 && (
              <>
                <div 
                  style={{
                    background: '#df4848',
                    color: '#fff',
                    fontSize: '14px',
                    width: '140px',
                    padding: '10px',
                    textAlign: 'center',
                    marginTop: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                  onClick={handleDeleteProductMany}
                >
                  Delete all selected
                </div>
                <Modal title="Delete Many Product" open={isModalDeleteManyOpen} onOk={handleDeleteManyOk} onCancel={() => setIsModalDeleteManyOpen(false)}>
                  <Loading spinning={isPendingProductMany}>
                    <p>Are you sure delete many selected products ?</p>
                  </Loading>
                </Modal>
              </>
            )
          }
          <TableComponent
            rowSelection={rowSelection}
            data={dataTable} 
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
          <Modal forceRender title="Create New Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
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
                    <Select
                      name="type"
                      onChange={handleOnChangeType}
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider
                            style={{
                              margin: '8px 0',
                            }}
                          />
                          <Space
                            style={{
                              padding: '0 8px 4px',
                            }}
                          >
                            <Input
                              placeholder="Please enter item"
                              ref={inputRef}
                              value={newType}
                              onChange={onNameChange}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                              Add new type
                            </Button>
                          </Space>
                        </>
                      )}
                      options={
                        items?.map((item) => ({
                          label: item,
                          value: item,
                        }))
                      }
                    />
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
                              borderRadius: '5px',
                              objectFit: 'cover',
                              marginTop: '5px'
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
          <DrawerComponent forceRender title='Update Product' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="60%" height="fit-content">
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
          <Modal title="Delete Product" open={isModalDeleteOpen} onOk={handleDeleteProduct} onCancel={() => setIsModalDeleteOpen(false)}>
            <Loading spinning={isPendingDeleted}>
              <p>Are you sure delete this product ?</p>
            </Loading>
          </Modal>
      </div>
  )
}

export default ProductAdmin;