import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "bootstrap";
import NatterWithComments from "../../components/natter/NatterWithComments";

const NatterDetails = () => {
  // page content
  const pageTitle = "This will have the natter with all comments";
  const location = useLocation();
  const id = location.state.id;
  console.log(location);
  console.log(id);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/api/v1/natter/${id}`)
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
        {" "}
        <div>Login to coninue</div>
        <Button href="http://localhost:8080/login">Login</Button>
      </>
    );
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    var natter = {};
    if (items.responseObject !== undefined) {
      natter = items.responseObject;
    }
    console.log(natter);

    return (
      <>
        <NatterWithComments value={natter}></NatterWithComments>
      </>
    );
  }

  return (
    <div>
      <Header head={pageTitle} description={location.state.id} />
    </div>
  );
};

export default NatterDetails;
