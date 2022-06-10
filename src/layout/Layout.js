// components
import Menu from "../components/Menu";
import Footer from "../components/Footer";

const Layout = (props) => {
  return (
    <>
      {console.log(props)}
      <Menu
        isLoggedIn={props.isLoggedIn}
        setIsLoggedIn={props.setIsLoggedIn}
        user={props.user}
      />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
