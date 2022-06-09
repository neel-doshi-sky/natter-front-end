// components
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { useState } from "react";

const Layout = (props) => {
  return (
    <>
      {console.log(props)}
      <Menu isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
