import { links } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

const F1k5wjb5 = styled.header`
  transition-duration: 0.3s;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  /* padding-top: 1.5rem;
  padding-bottom: 1.5rem; */
  width: 100%;
  z-index: 500;
  top: 0;
  left: 0;
  position: fixed;
`;

const W1nwvqds = styled.nav`
  /* container */
  /* width: 100%; */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 640px) {
    max-width: 640px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 1024px) {
    max-width: 1024px;
  }

  @media (min-width: 1536px) {
    max-width: 1536px;
  }

  @media (min-width: 1280px) {
    max-width: 1280px;
  }

  /* navbar */
  display: grid;
  height: 80px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const C1hzbei0 = styled.div`
  grid-column: span 1 / span 1;

  a {
    gap: 8px;
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  h1 {
    color: #000;
    font-size: 18px;
    font-weight: 800;
    line-height: 24px;
  }
`;

const GGGjjhshhhs = styled(Link)`
  transition-property: scale;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  background-color: #fff;
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
  display: inline-flex;

  h1 {
    &.active-link {
      color: #2665d6;
    }
  }
`;

const Dfsffsfgjk = styled.div`
  display: flex;
`;

const Fgsggsgggs = styled.div`
  display: none;
  justify-content: center;

  @media (min-width: 1024px) {
    grid-column: span 3 / span 3;
  }
  @media (min-width: 1280px) {
    grid-column: span 1 / span 1;
  }
  @media (min-width: 1024px) {
    display: flex;
  }
`;

const Uliststtsts = styled.ul`
  background-color: #fff;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 9999px;
  align-items: center;
  width: fit-content;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Ligauyayghc = styled.li`
  position: relative;
`;

const Lshshhshs = styled(Link)`
  text-decoration: none;
  position: relative;
  font-weight: 600;
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  display: inline-block;
  color: #000;

  &.active-link {
    color: #2665d6;
  }
`;

const Shshhshhs = styled.div`
  justify-content: flex-end;
  align-items: center;
  min-width: fit-content;
  display: flex;
`;

const Gggsgsgs = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    margin-right: 0.5rem;
  }
`;

const Dgsggsggs = styled(Link)`
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  transition-property: scale;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  text-decoration: none;

  ${({ theme }) => theme.media.lg} {
    margin-right: 0.5rem;
  }
`;

const GFgsgdssj = styled.span`
  @media (min-width: 1024px) {
    display: none;
  }
`;

const Hshhshshs = styled.span`
  display: block;
  position: relative;
`;

const Buststss = styled(Link)`
  transition-property: scale;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  color: #000;
  text-transform: capitalize;
  font-weight: 600;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  cursor: pointer;
  background-color: #fff;
  text-decoration: none;

  &.active-link {
    color: #2665d6;
  }
`;

const GDDGgsgss = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  transition-property: scale;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  border: 0px;
  cursor: pointer;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Logo = styled(Image)`
  animation: ${spin} 2s linear infinite;
`;

const HHSGgsgsg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1000;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &.open {
    transform: translateX(0);
    transition: all 0.3s ease-in-out;
  }

  &.closed {
    transform: translateX(100%);
    transition: all 0.3s ease-in-out;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const GSFFFShs = styled.div`
  flex-direction: column;
  height: 100%;
  display: flex;
`;

const NSBBGSG = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  /* width: 100%; */
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const JJSHSH = styled.div``;

const Mnsggsh = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  height: 4.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: background-color 0.3s, color 0.3s;
  transition-property: scale;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  color: #fff;
  text-transform: capitalize;
  font-weight: 600;
  text-decoration: none;

  &.active-link {
    color: #2665d6;
  }

  &:hover {
    background-color: #2665d6;
    color: #fff;
  }
`;

const Jhshhshdggd = styled.p`
  margin-top: auto;
  text-align: center;
  color: hsla(0, 0%, 100%, 0.4);
  font-size: 0.75rem;
  line-height: 1rem;
  padding-bottom: 1.75rem;
`;

const Header: React.FC = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const currentYear = new Date().getFullYear();
  return (
    <>
      <F1k5wjb5>
        <W1nwvqds>
          <C1hzbei0>
            <Dfsffsfgjk>
              <GGGjjhshhhs href="/">
                <Logo
                  src="/logos/dicesea-logo.svg"
                  alt="DiceSea"
                  height={30}
                  width={30}
                />
                <h1 className={router.asPath === "/" ? "active-link" : ""}>
                  DiceSea
                </h1>
              </GGGjjhshhhs>
            </Dfsffsfgjk>
          </C1hzbei0>
          <Fgsggsgggs>
            <Uliststtsts>
              <Ligauyayghc>
                {links.map((link, i) => (
                  <Lshshhshs
                    key={i}
                    href={link.url}
                    className={router.asPath === link.url ? "active-link" : ""}
                  >
                    {link.title}
                  </Lshshhshs>
                ))}
              </Ligauyayghc>
            </Uliststtsts>
          </Fgsggsgggs>
          <Shshhshhs>
            <Gggsgsgs>
              <Hshhshshs>
                <Buststss
                  href="/create"
                  className={router.asPath === "/create" ? "active-link" : ""}
                >
                  Create
                </Buststss>
              </Hshhshshs>
            </Gggsgsgs>
            {/* <Dgsggsggs href="/cart">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke={router.asPath === "/cart" ? "#2665d6" : "#000"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Dgsggsggs> */}
            <Dgsggsggs href="/profile">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21"
                  stroke={router.asPath === "/profile" ? "#2665d6" : "#000"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke={router.asPath === "/profile" ? "#2665d6" : "#000"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </Dgsggsggs>
            <GFgsgdssj>
              <GDDGgsgss onClick={() => setToggle(!toggle)}>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.75 12h16.5M3.75 6h16.5M3.75 18h16.5"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </GDDGgsgss>
            </GFgsgdssj>
          </Shshhshhs>
        </W1nwvqds>
      </F1k5wjb5>
      {toggle ? (
        <HHSGgsgsg>
          <GSFFFShs>
            <NSBBGSG>
              <C1hzbei0>
                <Dfsffsfgjk>
                  <GGGjjhshhhs href="/" onClick={() => setToggle(!toggle)}>
                    <Logo
                      src="/logos/dicesea-logo.svg"
                      alt="DiceSea"
                      height={30}
                      width={30}
                    />
                    <h1 className={router.asPath === "/" ? "active-link" : ""}>
                      DiceSea
                    </h1>
                  </GGGjjhshhhs>
                </Dfsffsfgjk>
              </C1hzbei0>
              <GFgsgdssj>
                <GDDGgsgss onClick={() => setToggle(!toggle)}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="32"
                    width="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path>
                  </svg>
                </GDDGgsgss>
              </GFgsgdssj>
            </NSBBGSG>
            <JJSHSH>
              {links.map((link, i) => (
                <Mnsggsh
                  key={i}
                  href={link.url}
                  className={router.asPath === link.url ? "active-link" : ""}
                  onClick={() => setToggle(!toggle)}
                >
                  {link.title}
                </Mnsggsh>
              ))}
              <Mnsggsh
                href="/create"
                className={router.asPath === "/create" ? "active-link" : ""}
                onClick={() => setToggle(!toggle)}
              >
                Create
              </Mnsggsh>
            </JJSHSH>
            <Jhshhshdggd>© {currentYear} DiceSea, Limited.</Jhshhshdggd>
          </GSFFFShs>
        </HHSGgsgsg>
      ) : null}
    </>
  );
};

export default Header;
