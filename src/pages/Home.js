import Header from "../components/Header";
import Meta from "../components/Meta";
import NatterList from "../components/natter/NatterList";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import NewNatter from "../components/natter/NewNatter";
import { Jumbotron, Container } from "react-bootstrap";

const Home = () => {
  // page content
  const pageTitle = "NATR";
  const pageDescription = "what's the latest natter?";
  const natters = [];

  const isLoggedIn = false;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/v1/natter/")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return (
      <>
        <Jumbotron fluid>
          <Container>
            <h1>Welcome to Natr!</h1>
            <p>
              Login using the link below to see what people are nattering about!
            </p>
            <br></br>
            <Button href="http://localhost:8080/oauth2/authorization/google">
              Login
            </Button>
          </Container>
        </Jumbotron>
      </>
    );
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const Natter = (id, body, author) => {
      return { id: id, body: body, author: author };
    };

    const natterArray = [];
    if (items.list != undefined) {
      items.list.forEach((nat) => natterArray.push(nat));
    }

    return (
      <>
        <div>
          <Meta title={pageTitle} />
          <Header head={pageTitle} description={pageDescription} />
        </div>
        <NewNatter />
        <NatterList natters={natterArray}></NatterList>
      </>
    );
  }
};

export default Home;
