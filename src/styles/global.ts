import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: Plus Jakarta Display;
  src: url("/fonts/PlusJakartaSans/PlusJakartaSans-Regular.ttf");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: Plus Jakarta Display;
  src: url("/fonts/PlusJakartaSans/PlusJakartaSans-Medium.ttf");
  font-style: medium;
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: Plus Jakarta Display;
  src: url("/fonts/PlusJakartaSans/PlusJakartaSans-SemiBold.ttf");
  font-style: semi-bold;
  font-weight: 600;
  font-display: swap;
}

@font-face {
  font-family: Plus Jakarta Display;
  src: url("/fonts/PlusJakartaSans/PlusJakartaSans-ExtraBold.ttf");
  font-style: bold;
  font-weight: 700;
  font-display: swap;
}

body,
html {
    margin: 0px;
    padding: 0px;
  font-family: Plus Jakarta Display, -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
  scroll-behavior: smooth;
}

* {
    margin: 0px;
    padding: 0px;
  font-family: Plus Jakarta Display, -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif !important;
}


  body {
    font-size: 16px;
    margin: 0px;
    padding: 0px;
    scroll-behavior: smooth;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  a {
    text-decoration:none;
  }

  h1,h2,h3,h4,h5,h6 {
    margin:0;
  }


  &::-webkit-scrollbar {
    width: 3px;
  }
  `;

export const CQNxzHnvmz = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  /* background: #003087; */
  background: #2e5fd2;
  /* background: #2584f4; */
`;

export const TCUAnhYqtF = styled.h1`
  color: #ffffff;
  font-size: 70px;

  @media (min-width: 992px) {
    font-size: 130px;
  }
`;

export const Ri7F7VI0vR = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

export const KKcGPqIXEb = styled(Link)`
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  background-color: #fff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.05);
  padding: 6px 12px;
  border-radius: 50px;
  text-decoration: none;
  color: #000;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  gap: 0.5rem;

  svg {
    width: 24px;
    height: 24px;
  }
`;
