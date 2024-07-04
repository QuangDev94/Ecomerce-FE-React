import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 18px;
  margin: 20px 0;
`;

export const WrapperContent = styled.div`
  border: 1px solid #ccc;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  gap: 20px;
`;

export const WrapperLabel = styled.label`
  min-width: 40px;
  color: #000;
  font-size: 12px;
  font-weight: 600;
`;

export const WrapperInput = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 20px;
`;

export const WrapperUploadFile = styled(Upload)`
  & .ant-upload-list-item-container {
    display: none;
  }
`;
