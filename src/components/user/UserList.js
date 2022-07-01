import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import UserPreview from "./UserPreview";
import NotFound from "../../pages/NotFound";

const UserList = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [reload, setReload] = useState(false);
  const location = useLocation();
  const id = location.state.id;
  const following = location.state.following;
  const title = location.state.following
    ? location.state.userName + " follows..."
    : location.state.userName + "'s followers...";

  useEffect(() => {
    fetch(
      "/api/v1/user/" +
        (following ? "following" : "followers") +
        (id ? "/" + id : "")
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setReload(false);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          setReload(false);
        }
      );
  }, []);
  if (error) {
    console.log(error);
    return <NotFound errorCode={error.status}></NotFound>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const users = [];
    if (items.list != undefined) {
      items.list.forEach((user) => users.push(user));
    }
    return (
      <Container>
        <h1>{title}</h1>
        <ul>
          {users.map((user) => (
            <UserPreview
              key={user.id}
              user={user}
              userId={props.userId}
              following={following}
            />
          ))}
        </ul>
      </Container>
    );
  }
};

export default UserList;
