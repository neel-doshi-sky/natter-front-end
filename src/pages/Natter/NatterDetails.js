import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NatterWithComments from "../../components/natter/NatterWithComments";
import NotFound from "../NotFound";

const NatterDetails = () => {
  // page content
  const pageTitle = "This will have the natter with all comments";
  const location = useLocation();
  const id = location.state.id;
  console.log(location);
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
    return <NotFound errorCode={error.status}></NotFound>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    var natter = {};
    if (items.responseObject !== undefined) {
      natter = items.responseObject;
    }

    return (
      <>
        {location.state.userId && natter && natter.userLikes && (
          <NatterWithComments
            value={natter}
            userId={location.state.userId}
            isLikedByUser={natter.userLikes.includes(location.state.userId)}
          ></NatterWithComments>
        )}
      </>
    );
  }
};

export default NatterDetails;
