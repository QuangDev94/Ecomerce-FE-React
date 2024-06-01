import styled from "styled-components";
import ButtonComponent from "../../components/Button/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  height: 44px;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
  &: hover {
    background: rgb(13, 92, 182);
    span {
      color: #fff;
    }
  }
`;

export const WrapperProducts = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;
