import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const ProgressContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #f1f1f1;
`;

const ProgressBar = styled.div<{ width: number }>`
  height: 100%;
  background-color: #0069ff;
  width: ${(props) => props.width}%;
  transition: width 0.3s ease-in-out;
`;

const fadeOutAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ProgressDismiss = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: transparent;
  animation: ${fadeOutAnimation} 0.5s linear forwards;
`;

const Progress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setDismissed(true);
        }
        return prevProgress + 10;
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {!dismissed && (
        <ProgressContainer>
          <ProgressBar width={progress} />
        </ProgressContainer>
      )}
      {dismissed && <ProgressDismiss />}
    </>
  );
};

export { Progress };
