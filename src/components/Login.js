import React from "react";
import { Jumbotron, Container, Button } from "react-bootstrap";

const Login = () => {
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
};
export default Login;
