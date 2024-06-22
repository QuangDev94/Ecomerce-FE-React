import TypeProductComponent from '../../components/TypeProduct/TypeProductComponent'
import { WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/Slider/SliderComponent'
import slider1 from '../../assets/images/slider1.webp';
import slider2 from '../../assets/images/slider2.jpg';
import slider3 from '../../assets/images/slider3.jpg';
import slider4 from '../../assets/images/slider4.jpg';
import CardComponent from '../../components/Card/CardComponent';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { useEffect, useState } from 'react';
import { Button, Flex } from 'antd';

const HomePage = () => {
  const searchValue = useSelector((state) => state.product.searchValue);
  const [limitValue,setLimitValue] = useState(8)
  const fetchAllProduct = async (search,limit) => {
    const res = await ProductService.getAllProduct(search,limit);
    return res.response;
  };
  const fetchAllType = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res.data;
  };

  const {isLoading,data: products, isPlaceholderData} = useQuery({
    queryKey: ['products', searchValue,limitValue],
    queryFn: () => fetchAllProduct(searchValue,limitValue),
    retry: 3,
    retryDelay: 1000,
    placeholderData: (prev) => prev
  });
  const {isLoading: isLoadingType,data: types} = useQuery({
    queryKey: ['type'],
    queryFn: fetchAllType,
    retry: 3,
    retryDelay: 1000
  });
  return (
    <>
      <div style={{padding: '0 120px'}}>
        <Loading spinning={isLoadingType}>
          <WrapperTypeProduct>
            {
              types.map((item) => {
                return (
                  <TypeProductComponent key={item} name={item}/>
                )
              })
            }
          </WrapperTypeProduct>
        </Loading>
      </div>
      <div id='container' style={{padding: '0 120px',backgroundColor: "#efefef",height: "10000px"}}>
        <SliderComponent arrImage={[slider1,slider2,slider3,slider4]} />
        <Loading spinning={isLoading}>
          <WrapperProducts>
            {
              products?.data?.map((product) => {
                return <CardComponent 
                          key={product._id}
                          id={product._id}
                          name={product.name}
                          price={product.price}
                          image={product.image}
                          rating={product.rating}
                          type={product.type}
                          description={product.description}
                          countInStock={product.countInStock}
                          discount={product.discount}
                          solded={product.solded}
                        />
              })
            }
          </WrapperProducts>
        </Loading>
        <Loading spinning={isPlaceholderData}>
          <div style={{marginTop: '15px', display: 'flex', justifyContent: 'center'}}>
          <Flex vertical gap="small" style={{ width: '30%' }}>
            <Button 
              type="primary" 
              block 
              onClick={() => setLimitValue((prev) => prev + 4)}
              disabled={products?.total === products?.data?.length || products?.totalPage === 1}
            >
              More
            </Button>
          </Flex>
          </div>
        </Loading>
      {/* < NavbarComponent />  */}
      </div>
    </>
  )
}

export default HomePage