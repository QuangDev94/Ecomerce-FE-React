import React from "react";
import { useNavigate } from "react-router-dom";
import { WrapperTypeComponent } from "./style";

const TypeProductComponent = ({ name }) => {
  const navigate = useNavigate();
  return (
    <WrapperTypeComponent
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/products/${name}`, { state: name })}>
      {name}
    </WrapperTypeComponent>
  );
};

export default TypeProductComponent;
