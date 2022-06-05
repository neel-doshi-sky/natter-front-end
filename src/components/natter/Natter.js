import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Natter = (props) => {
  // your link creation

  return (
    <Card>
      <Card.Body>
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: `/natter/${props.value.id.id}`,
          }}
          state={{ id: props.value.id.id }}
        >
          <Card.Title>{props.value.body}</Card.Title>
        </Link>
        <Card.Text>{props.value.authorName}</Card.Text>
        <Card.Footer>Comments: {props.value.commentCount}</Card.Footer>
        <Card.Footer>Date: {props.value.dateCreated}</Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default Natter;
