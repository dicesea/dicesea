import { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import Animation from "./animation";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Animation>{children}</Animation>
      <Footer />
    </>
  );
};

export default Layout;
