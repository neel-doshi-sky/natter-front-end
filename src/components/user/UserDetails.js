import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NotFound from "../../pages/NotFound";

const UserDetails = (props) => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(props.id ? "/api/v1/user/" + props.id : "/api/v1/user/")
      .then((res) => res.json())
      .then(
        (result) => {
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
    return <NotFound errorCode={error.status}></NotFound>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
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
              <Button>
                <Link
                  className="link-style"
                  to={{
                    pathname: `/userProfile/followers/${props.id}`,
                  }}
                  state={{
                    id: props.id,
                    following: false,
                    userName: user.responseObject.firstName,
                  }}
                >
                  {user.responseObject.followers}
                </Link>
              </Button>
              <br></br>
              <br></br>
              <Button>
                <Link
                  className="link-style"
                  to={{
                    pathname: `/userProfile/following/${props.id}`,
                  }}
                  state={{
                    id: props.id,
                    following: true,
                    userName: user.responseObject.firstName,
                  }}
                >
                  {user.responseObject.following}
                </Link>
              </Button>
              <br></br>
              <br></br>
              {!user.responseObject.loggedInUser &&
                !user.responseObject.userIsFollowing && (
                  <Button
                    onClick={() => {
                      fetch("/api/v1/user/follow/" + user.responseObject.id, {
                        method: "POST",
                      }).then(
                        () => (window.location.href = window.location.href)
                      );
                    }}
                    variant="success"
                  >
                    + Follow
                  </Button>
                )}
              {!user.responseObject.loggedInUser &&
                user.responseObject.userIsFollowing && (
                  <Button
                    onClick={() => {
                      fetch("/api/v1/user/unfollow/" + user.responseObject.id, {
                        method: "POST",
                      }).then(
                        () => (window.location.href = window.location.href)
                      );
                    }}
                    variant="danger"
                  >
                    Unfollow
                  </Button>
                )}
              {!user.responseObject.loggedInUser &&
                user.responseObject.userIsAFollower && (
                  <Card.Body className="text-muted">
                    {user.responseObject.firstName + " follows you!"}
                  </Card.Body>
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
