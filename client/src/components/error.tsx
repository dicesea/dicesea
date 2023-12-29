import { FC } from "react";
import styled from "styled-components";

type IProps = {
  message: string;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  padding: 10px;
`;

const Error: FC<IProps> = ({ message }) => (
  <Container>
    <Title>Error : {message}</Title>
  </Container>
);

export default Error;
