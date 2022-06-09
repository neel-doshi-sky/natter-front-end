import Header from "../components/Header";
import Meta from "../components/Meta";
import NatterList from "../components/natter/NatterList";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import NewNatter from "../components/natter/NewNatter";
import { Jumbotron, Container } from "react-bootstrap";
import UserDetails from "../components/user/UserDetails";
import { useLocation } from "react-router-dom";

const UserProfile = (props) => {
  // page content
  const pageTitle = "NATR";
  const pageDescription = "what's the latest natter?";
  const natters = [];

  const isLoggedIn = false;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const location = useLocation();
  const id = location.state.id;

  useEffect(() => {
    fetch(`/api/v1/natter/user/${id}`)
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
    const natterArray = [];
    if (items.list != undefined) {
      items.list.forEach((nat) => natterArray.push(nat));
    }

    return (
      <>
        <UserDetails />
        <NatterList natters={natterArray}></NatterList>
      </>
    );
  }
};

export default UserProfile;
