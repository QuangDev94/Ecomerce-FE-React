import styled from "styled-components";
import ButtonComponent from "../../components/Button/ButtonComponent";

export const WrraperContainer = styled.div`
  padding: 0 120px;

  @media only screen and (max-width: 1531px) {
    padding: 0 30px;
  }

  @media only screen and (max-width: 500px) {
    padding: 0 5px;
  }
`;

export const WrapperTypeProduct = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  justify-content: center;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  padding: 10px 0;
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
  margin-top: 80px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
`;
