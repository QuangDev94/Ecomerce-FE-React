import React from "react";
import { Card } from "antd";
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
    <Card
      hoverable
      style={{
        width: 200,
        marginBottom: "15px",
      }}
      styles={{
        body: {
          padding: "10px",
        },
      }}
      cover={<img alt="example" src={image} style={{ height: 200 }} />}
      onClick={() => navigate(`/product-detail/${id}`)}>
      <img
        src={tick}
        style={{
          width: 68,
          height: 14,
          position: "absolute",
          top: 183,
          left: 0,
        }}
        alt="tick"
      />
      <Meta title={name} />
      <WrapperReportText>
        <span>{rating}</span>{" "}
        <StarFilled style={{ fontSize: "10px", color: "yellow" }} />
        <span style={{ padding: "0 3px" }}>|</span>{" "}
        <span>Solded {solded || 1000}+</span>
      </WrapperReportText>
      <WrapperPriceText>
        {convertPrice(price)}
        <WrapperDiscountText>-{discount || 0}%</WrapperDiscountText>
      </WrapperPriceText>
    </Card>
  );
};

export default CardComponent;
