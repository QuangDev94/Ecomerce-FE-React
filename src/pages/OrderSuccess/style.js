import { Radio } from "antd";
import styled from "styled-components";

export const WrapperContent = styled.div`
  width: 100%;
`;

export const WrapperValue = styled.div`
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 255, 255);
  padding: 10px;
  width: fit-content;
  border-radius: 6px;
  margin-top: 4px;
`;

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  @media only screen and (max-width: 500px) {
    padding: 3px;
  }
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
`;

export const Lable = styled.span`
  font-size: 12px;
  color: #000;
  font-weight: bold;
`;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  margin-top: 12px;
`;

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  @media only screen and (max-width: 500px) {
    padding: 3px;
  }
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: bold;
    font-size: 13px;
  }
  margin: 10px 0;
`;
