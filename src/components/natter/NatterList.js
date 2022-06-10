import Natter from "./Natter";
import { useState, useEffect } from "react";
import { Jumbotron, Container } from "react-bootstrap";

const NatterList = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log(props);
    fetch(
      !props.getForFollowing
        ? "/api/v1/natter/user/" + props.userId
        : "/api/v1/natter/"
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
    const natters = [];
    if (items.list != undefined) {
      items.list.forEach((nat) => natters.push(nat));
    }
    return (
      <Container>
        <ul>
          {natters.map((natter) => (
            <Natter key={natter.id.id} value={natter} />
          ))}
        </ul>
      </Container>
    );
  }
};

export default NatterList;
