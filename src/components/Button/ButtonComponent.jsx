import React from "react";
import { WrapperButtonComponent } from "./style";

const ButtonComponent = ({
  size,
  styleButton,
  styleTextButton,
  textButton,
  ...rest
}) => {
  return (
    <WrapperButtonComponent size={size} style={styleButton} {...rest}>
      <span style={styleTextButton}>{textButton}</span>
    </WrapperButtonComponent>
  );
};

export default ButtonComponent;
