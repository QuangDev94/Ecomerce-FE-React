import { Image } from "antd";
import styled from "styled-components";

export const WrapperPictureSmall = styled(Image)`
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const WrapperNameProduct = styled.h1`
  color: rgb(36, 36, 36);
  font-size: 24px;
  font-weight: bold;
  line-height: 32px;
  word-break: break-word;
  margin-top: 0;
`;

export const WrapperTextSolded = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;

export const WrapperProductPrice = styled.div`
  background: rgb(250, 250, 250);
  border-radius: 4px;
`;

export const WrapperTextPrice = styled.h1`
  font-size: 22px;
  line-height: 40px;
  margin-right: 8px;
  font-weight: 500;
`;

export const WrapperAddress = styled.div`
  margin-bottom: 20px;
  span.address {
    text-decoration: underline;
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsisl;
  }
  span.change-address {
    color: rgb(11, 116, 229);
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    flex-shrink: 0;
  }
`;

export const WrapperProducQuality = styled.div`
  margin: 20px 0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
`;
