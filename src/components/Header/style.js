import { Badge, Col, Row } from "antd";
import Search from "antd/es/input/Search";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  @media only screen and (max-width: 1531px) {
    padding: 10px 30px;
  }
  @media only screen and (max-width: 500px) {
    padding: 10px 0;
  }
  background-color: #f14040;
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  flex-wrap: nowrap;
`;

export const WrapperHeaderText = styled.span`
  font-size: 22px;
  font-weight: bold;
  font-style: italic;
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
  cursor: pointer;
`;

export const WrapperContentPopover = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;

export const WrapperSearch = styled(Search)`
  & .ant-btn {
    background-color: #292e3d;
  }
  &
    :where(.css-dev-only-do-not-override-j9bb5n).ant-btn-primary:not(
      :disabled
    ):not(.ant-btn-disabled):hover {
    color: #fff;
    background: #ff4d4f;
  }
  & .ant-input-outlined:focus {
    border-color: #00000073;
  }
`;

export const WrraperBagde = styled(Badge)`
  &.css-dev-only-do-not-override-j9bb5n.ant-badge .ant-badge-count {
    background-color: #292e3d;
  }
`;

export const WrraperColAccount = styled(Col)`
  .responsive-col {
    display: flex;
  }
  // @media only screen and (max-width: 650px) {
  //   & :where(.css-dev-only-do-not-override-j9bb5n).ant-col-7 {
  //     display: none;
  //   }
  // }
`;
