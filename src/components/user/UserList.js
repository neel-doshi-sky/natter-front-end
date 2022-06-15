import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import UserPreview from "./UserPreview";

const UserList = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const location = useLocation();
  const id = location.state.id;
  const following = location.state.following;

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
    console.log(error);
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const users = [];
    if (items.list != undefined) {
      items.list.forEach((user) => users.push(user));
    }
    return (
      <Container>
        <ul>
          {users.map((user) => (
            <UserPreview key={user.id} user={user} userId={props.userId} />
          ))}
        </ul>
      </Container>
    );
  }
};

export default UserList;
