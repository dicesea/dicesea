import { handleRefresh } from "@/utils";
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

const Button = styled.button`
  font-size: 12px;
  font-weight: 400;
  padding: 8px 10px;
  border-radius: 50px;
  background: #0069ff;
  color: #fff;
  border: 0;
  text-align: center;
`;

const Error: FC<IProps> = ({ message }) => (
  <Container>
    {/* <Title>Error : {message}</Title> */}
    <Title>Something went wrong</Title>
    <Button onClick={handleRefresh}>Refresh</Button>
  </Container>
);

export default Error;
