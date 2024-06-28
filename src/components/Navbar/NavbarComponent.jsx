import React from "react";
import {
  WrapperContent,
  WrapperLabelText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import { Checkbox, Rate } from "antd";

const NavbarComponent = () => {
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return <WrapperTextValue>{option}</WrapperTextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}>
            {options.map((option) => {
              return <Checkbox value={option.value}>{option.lable}</Checkbox>;
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option) => {
          return (
            <>
              <Rate
                style={{ fontSize: "12px" }}
                allowHalf
                defaultValue={option}
              />
              <span style={{ fontSize: "11px" }}>{`from ${option} star`}</span>
            </>
          );
        });
      case "price":
        return options.map((option) => {
          return <WrapperTextPrice>{option}</WrapperTextPrice>;
        });
      default:
        return <></>;
    }
  };
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <WrapperLabelText>Label</WrapperLabelText>
      <WrapperContent>
        {renderContent("text", ["Dell", "Iphone", "Samsung"])}
      </WrapperContent>
      <WrapperContent>
        {renderContent("checkbox", [
          { value: "a", lable: "A" },
          { value: "b", lable: "B" },
          { value: "c", lable: "C" },
        ])}
      </WrapperContent>
      <WrapperContent>{renderContent("star", [3, 4, 5])}</WrapperContent>
      <WrapperContent>
        {renderContent("price", ["under 40.000", "over 40.000"])}
      </WrapperContent>
    </div>
  );
};

export default NavbarComponent;
