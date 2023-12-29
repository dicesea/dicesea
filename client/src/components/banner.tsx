import { IBanner } from "@/interfaces";
import styled from "styled-components";

export const CQNxzHnvmz = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  @media (min-width: 414px) {
    padding: 0px;
  }

  @media (min-width: 360px) {
    padding: 0px;
  }

  @media (min-width: 1280px) {
    padding: 0px 30px;
  }
`;

export const CQNxzHnvmzgsggs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  height: 450px;
  width: 1200px;

  @media (min-width: 414px) {
    border-radius: 0px;
    margin-top: 80px;
  }

  @media (min-width: 360px) {
    border-radius: 0px;
    margin-top: 80px;
  }

  @media (min-width: 1280px) {
    border-radius: 30px;
    margin-top: 100px;
  }
`;

export const TCUAnhYqtF = styled.h1`
  color: #ffffff;
  font-size: 70px;

  @media (min-width: 768px) {
    font-size: 130px;
  }
`;

export default function Banner({ title, backgroundImage }: IBanner) {
  return (
    <CQNxzHnvmz>
      <CQNxzHnvmzgsggs style={{ backgroundImage: `url(${backgroundImage})` }}>
        <TCUAnhYqtF>{title}</TCUAnhYqtF>
      </CQNxzHnvmzgsggs>
    </CQNxzHnvmz>
  );
}
