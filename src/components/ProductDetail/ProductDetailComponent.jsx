import { Col, Image, InputNumber, Rate, Row } from "antd";
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
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
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
  return (
    <Loading spinning={isLoading}>
      <Row
        style={{
          background: "#fff",
          borderRadius: "4px",
          padding: "20px 10px",
          flex: "wrap",
        }}>
        <Col
          xs={{
            flex: "100%",
            offset: 1,
          }}
          md={{
            flex: "80%",
            offset: 1,
          }}
          lg={{
            flex: "60%",
            offset: 1,
          }}
          xl={{
            flex: "40%",
            offset: 1,
          }}
          style={{ margin: 0, marginBottom: "20px" }}>
          <Image
            src={productDetails?.data?.image}
            alt="image product main"
            preview={false}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          {/* <Row style={{ paddingTop: "10px" }}>
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
          </Row> */}
        </Col>
        <Col style={{ padding: "0 20px" }}>
          <WrapperNameProduct>{productDetails?.data?.name}</WrapperNameProduct>
          <WrapperTextSolded>
            <Rate disabled value={productDetails?.data?.rating} />
            <span> | Solded {productDetails?.data?.solded}</span>
          </WrapperTextSolded>
          <WrapperProductPrice>
            <WrapperTextPrice>
              Price: {convertPrice(productDetails?.data?.price)}
            </WrapperTextPrice>
          </WrapperProductPrice>
          <WrapperAddress>
            <span>Send To </span>
            <span className="address">
              {user?.address}, {user?.city || ""}
            </span>
            -{" "}
            <span
              className="change-address"
              onClick={() => navigate("/profile-user")}
              style={{ cursor: "pointer" }}>
              Change address
            </span>
          </WrapperAddress>
          <LikeButtonComponent
            dataHref={
              process.env.REACT_APP_IS_LOCAL
                ? "https://developers.facebook.com/docs/plugins/"
                : window.location.href
            }
          />
          <WrapperProducQuality>
            <div style={{ marginTop: "10px", fontWeight: "bold" }}>
              Quality:{" "}
            </div>
            <div style={{ margin: "10px 0" }}>
              <InputNumber
                min={1}
                max={productDetails?.data?.quality}
                defaultValue={1}
                onChange={handleChangeQuantity}
              />
            </div>
          </WrapperProducQuality>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}>
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
          </div>
        </Col>
      </Row>
      <CommentFbComponent
        dataHref={
          process.env.REACT_APP_IS_LOCAL
            ? "https://developers.facebook.com/docs/plugins/comments#configurator"
            : window.location.href
        }
        width="100%"
      />
    </Loading>
  );
};

export default ProductDetailComponent;
