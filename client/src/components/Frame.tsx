import React from "react";
import { IFrame } from "@/interfaces";
import styled from "styled-components";

export const CQNxzHnvmz = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 0px 30px;

  @media (min-width: 414px) {
    padding: 0px;
  }

  // Small
  @media (min-width: 360px) {
    padding: 0px;
  }

  // Medium
  @media (min-width: 1280px) {
    padding: 0px 30px;
  }
`;

export const CQNxzHnvmzgsggs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 450px;
  width: 100%;
  overflow: hidden;

  @media (min-width: 414px) {
    border-radius: 0px;
    margin-top: 80px;
  }

  // Small
  @media (min-width: 360px) {
    border-radius: 0px;
    margin-top: 80px;
  }

  // Medium
  @media (min-width: 1280px) {
    border-radius: 30px;
    margin-top: 100px;
  }
`;

export const VideoFrame = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
`;

export const TCUAnhYqtF = styled.h1`
  color: #ffffff;
  font-size: 70px;

  @media (min-width: 768px) {
    font-size: 130px;
  }
`;

export default function Frame({ videoId }: IFrame) {
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <CQNxzHnvmz>
      <CQNxzHnvmzgsggs>
        <VideoFrame src={youtubeEmbedUrl} allowFullScreen />
      </CQNxzHnvmzgsggs>
    </CQNxzHnvmz>
  );
}
