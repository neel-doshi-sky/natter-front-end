import { Link } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

const Menu = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("new");
    console.log(props);

    fetch("/api/v1/user/")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          console.log(props);
          setIsLoaded(true);
          setUser(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      );
  }, []);
  return (
    <Container>
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          NATR
        </Link>
        <Nav>
          {props.isLoggedIn && user && user.responseObject && (
            <>
              <li>
                <Link to="/myProfile" className="nav-link px-2 link-secondary">
                  {user.responseObject.firstName +
                    " " +
                    user.responseObject.lastName}
                </Link>
              </li>
              <li>
                <Link to="/myProfile" className="nav-link px-2 link-secondary">
                  {user.responseObject.followers}
                </Link>
              </li>
              <li>
                <Link to="/myProfile" className="nav-link px-2 link-secondary">
                  {user.responseObject.following}
                </Link>
              </li>
            </>
          )}
        </Nav>
      </header>
    </Container>
  );
};

export default Menu;
