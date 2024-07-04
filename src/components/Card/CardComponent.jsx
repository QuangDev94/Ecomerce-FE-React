import React from "react";
import { Card, Col } from "antd";
import { StarFilled } from "@ant-design/icons";
import {
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
} from "./style";
import tick from "../../assets/ticks/tick.png";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
  const {
    name,
    type,
    image,
    price,
    rating,
    countInStock,
    description,
    discount,
    solded,
    id,
  } = props;
  const { Meta } = Card;
  const navigate = useNavigate();

  return (
    <Col
      xs={{
        flex: "100%",
        offset: 1,
      }}
      // sm={{
      //   flex: "45%",
      //   offset: 1,
      // }}
      md={{
        flex: "40%",
        offset: 1,
      }}
      lg={{
        flex: "29%",
        offset: 1,
      }}
      xl={{
        flex: "20%",
        offset: 1,
      }}
      style={{ marginBottom: "20px" }}>
      <Card
        hoverable
        style={{
          maxWidth: "100%",
          height: 310,
        }}
        styles={{
          body: {
            padding: "10px",
          },
        }}
        cover={<img alt="example" src={image} style={{ height: 230 }} />}
        onClick={() => navigate(`/product-detail/${id}`)}>
        <img
          src={tick}
          style={{
            width: 68,
            height: 16,
            position: "absolute",
            top: 211,
            left: 0,
          }}
          alt="tick"
        />
        <Meta title={name} style={{ maxWidth: "220px" }} />
        <WrapperReportText>
          <span>{rating}</span>{" "}
          <StarFilled style={{ fontSize: "10px", color: "yellow" }} />
          <span style={{ padding: "0 3px" }}>|</span>{" "}
          <span>Solded {solded || 0}+</span>
        </WrapperReportText>
        <WrapperPriceText>
          {convertPrice(price)}
          <WrapperDiscountText>-{discount || 0}%</WrapperDiscountText>
        </WrapperPriceText>
      </Card>
    </Col>
  );
};

export default CardComponent;
