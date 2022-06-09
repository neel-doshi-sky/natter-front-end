import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const UserDetails = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/v1/user/user")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
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
  // your link creation
  if (error) {
    console.log(error);
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    console.log(user);
    return (
      <>
        {user && user.responseObject && (
          <Card className="text-center">
            <Card.Header></Card.Header>
            <Card.Body>
              <Card.Title>
                {user.responseObject.firstName +
                  " " +
                  user.responseObject.lastName}
              </Card.Title>
              <Card.Text>{user.responseObject.email}</Card.Text>
              <Button variant="primary">{user.responseObject.followers}</Button>
              <br></br>
              <br></br>
              <Button variant="primary">{user.responseObject.following}</Button>
              <br></br>
              <br></br>
              {!user.responseObject.isLoggedInUser &&
                !user.responseObject.isFollowing && (
                  <Button variant="success">+ Follow</Button>
                )}
              {!user.responseObject.isLoggedInUser &&
                user.responseObject.isFollowing && (
                  <Button variant="danget">- Unfollow</Button>
                )}
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
          </Card>
        )}
      </>
    );
  }
};

export default UserDetails;
