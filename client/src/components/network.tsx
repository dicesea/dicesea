import { FC } from "react";
import styled from "styled-components";

type IProps = {
  refetch: Function;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 5px;
  background-color: #fff;
  min-width: 100vw;
`;

export const Button = styled.button`
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  font-style: normal;
  color: #ffffff;

  border: 0;
  width: 100%;
  height: 45px;
  cursor: pointer;
  background: #0069ff;
  border-radius: 50px;

  @media (min-width: 640px) {
    width: 200px;
  }
  @media (min-width: 768px) {
    width: 200px;
  }
  @media (min-width: 1024px) {
    width: 200px;
  }
  @media (min-width: 1280px) {
    width: 200px;
  }
  @media (min-width: 1536px) {
    width: 200px;
  }
`;

const Network: FC<IProps> = ({ refetch }) => (
  <Container>
    <h1>Something went wrong</h1>
    <Button onClick={() => refetch()}>Refetch</Button>
  </Container>
);

export default Network;
