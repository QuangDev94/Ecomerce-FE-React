import { Col, Image, InputNumber, Rate, Row } from "antd";
import imageProductSmall1 from "../../assets/productsSmall/productSmall1.png";
import imageProductSmall2 from "../../assets/productsSmall/productSmall2.png";
import imageProductSmall3 from "../../assets/productsSmall/productSmall3.png";
import imageProductSmall4 from "../../assets/productsSmall/productSmall4.png";
import {
  WrapperAddress,
  WrapperNameProduct,
  WrapperPictureSmall,
  WrapperProducQuality,
  WrapperProductPrice,
  WrapperTextPrice,
  WrapperTextSolded,
} from "./style";
import ButtonComponent from "../Button/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import Loading from "../Loading/Loading.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addOrderProduct,
  resetAddOrder,
} from "../../redux/slices/orderSlice.js";
import { useEffect, useState } from "react";
import { convertPrice, initFacebookSDK } from "../../utils.js";
import * as message from "../Message/Message.jsx";
import LikeButtonComponent from "../LikeButton/LikeButtonComponent.jsx";
import CommentFbComponent from "../CommentFb/CommentFbComponent.jsx";

const ProductDetailComponent = ({ idProduct }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    initFacebookSDK();
  }, []);
  useEffect(() => {
    if (order.isOrderSuccess) {
      message.success("Have added in cart");
    }
    return () => {
      dispatch(resetAddOrder());
    };
  });
  const fetchDetailsProduct = async (id) => {
    const res = await ProductService.getDetailsProduct(id);
    return res;
  };
  const { isLoading, data: productDetails } = useQuery({
    queryKey: ["products", idProduct],
    queryFn: () => fetchDetailsProduct(idProduct),
    retry: 3,
    retryDelay: 1000,
  });
  const handleChangeQuantity = (value) => {
    setQuantity(value);
  };
  const handleBuyProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.data?.name,
            amount: quantity,
            image: productDetails?.data?.image,
            price: productDetails?.data?.price,
            product: productDetails?.data?._id,
            discount: productDetails?.data?.discount,
            quality: productDetails?.data?.quality,
          },
        }),
      );
    }
  };
  console.log(productDetails);
  return (
    <Loading spinning={isLoading}>
      <Row style={{ background: "#fff", borderRadius: "4px", padding: "10px" }}>
        <Col span={10}>
          <Image
            src={productDetails?.data?.image}
            alt="image product main"
            preview={false}
            style={{ border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <Row style={{ paddingTop: "10px" }}>
            <Col span={4}>
              <WrapperPictureSmall
                src={imageProductSmall1}
                alt="image product main"
                preview={false}
              />
            </Col>
            <Col span={4}>
              <WrapperPictureSmall
                src={imageProductSmall2}
                alt="image product main"
                preview={false}
              />
            </Col>
            <Col span={4}>
              <WrapperPictureSmall
                src={imageProductSmall3}
                alt="image product main"
                preview={false}
              />
            </Col>
            <Col span={4}>
              <WrapperPictureSmall
                src={imageProductSmall4}
                alt="image product main"
                preview={false}
              />
            </Col>
            <Col span={4}>
              <WrapperPictureSmall
                src={imageProductSmall1}
                alt="image product main"
                preview={false}
              />
            </Col>
            <Col span={4}>
              <WrapperPictureSmall
                src={imageProductSmall2}
                alt="image product main"
                preview={false}
              />
            </Col>
          </Row>
        </Col>
        <Col span={14} style={{ padding: "0 20px" }}>
          <WrapperNameProduct>{productDetails?.data?.name}</WrapperNameProduct>
          <WrapperTextSolded>
            <Rate disabled value={productDetails?.data?.rating} />
            <span> | Solded 1000+</span>
          </WrapperTextSolded>
          <WrapperProductPrice>
            <WrapperTextPrice>
              {convertPrice(productDetails?.data?.price)}
            </WrapperTextPrice>
          </WrapperProductPrice>
          <WrapperAddress>
            <span>Send To </span>
            <span className="address">{user?.address}</span>-{" "}
            <span
              className="change-address"
              onClick={() => navigate("/profile-user")}
              style={{ cursor: "pointer" }}>
              Change address
            </span>
          </WrapperAddress>
          <LikeButtonComponent dataHref="https://developers.facebook.com/docs/plugins/" />
          <WrapperProducQuality>
            <div style={{ marginTop: "10px" }}>Quality: </div>
            <div style={{ margin: "10px 0" }}>
              <InputNumber
                min={1}
                max={productDetails?.data?.quality}
                defaultValue={1}
                onChange={handleChangeQuantity}
              />
            </div>
          </WrapperProducQuality>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ButtonComponent
              size={20}
              styleButton={{
                background: "rgb(255,57,69)",
                height: "48px",
                width: "220px",
                border: "none",
                borderRadius: "4px",
              }}
              textButton="Buy"
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
              onClick={handleBuyProduct}
            />
            <ButtonComponent
              size={20}
              styleButton={{
                background: "#fff",
                height: "48px",
                width: "220px",
                border: "1px solid rgb(13,92,182)",
                borderRadius: "4px",
              }}
              textButton="Buy Price Affter"
              styleTextButton={{ color: "rgb(13,92,182)", fontSize: "15px" }}
            />
          </div>
        </Col>
        <div
          class="fb-like"
          data-href="https://developers.facebook.com/docs/plugins/"
          data-width=""
          data-layout=""
          data-action=""
          data-size="s"
          data-share="true"></div>
        <CommentFbComponent
          dataHref="https://developers.facebook.com/docs/plugins/comments#configurator"
          width="100%"
        />
      </Row>
    </Loading>
  );
};

export default ProductDetailComponent;
