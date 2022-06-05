import { Card } from "react-bootstrap";

const Comment = (props) => {
  // your link creation

  return (
    <Card>
      <Card.Body>
        <Card.Body>{props.value.body}</Card.Body>
        <Card.Footer>{props.value.authorName}</Card.Footer>
        <Card.Footer>Date: {props.value.dateCreated}</Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default Comment;
