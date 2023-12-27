import { IBanner } from "@/interfaces";
import styled from "styled-components";

export const CQNxzHnvmz = styled.section`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const CQNxzHnvmzgsggs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover; /* or 'contain' based on your preference */
  height: 500px;
  width: 1250px;
  margin-top: 100px;
  border-radius: 20px;
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
