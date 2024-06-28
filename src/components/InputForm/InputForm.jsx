import { Input } from "antd";
import React, { useState } from "react";
import { WrapperInputForm } from "./style";

const InputForm = (props) => {
  const [valueInput, setValueInput] = useState();
  const { placeholder, ...rest } = props;
  return (
    <WrapperInputForm placeholder={placeholder} value={valueInput} {...rest} />
  );
};

export default InputForm;
