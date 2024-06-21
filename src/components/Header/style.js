import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  background-color: rgb(26, 148, 255);
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  flex-wrap: nowrap;
`;

export const WrapperHeaderText = styled.span`
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  color: white;
  cursor: pointer;
`;

export const WrapperHeaderAcount = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 3px;
  padding-left: 10px;
  cursor: pointer;
`;

export const WrapperHeaderCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  padding-left: 10px;
`;

export const WrapperContentPopover = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;
