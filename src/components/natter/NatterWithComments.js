import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { Button } from "react-bootstrap";
import { useState } from "react";
import EditNatter from "./EditNatter";

const NatterWithComments = (props) => {
  // your link creation
  console.log(props);
  const [showEditForm, setShowEditForm] = useState(false);
  var isOwnedByAuth = props.value.ownedByAuth;

  return (
    <Container>
      <Card>
        <Card.Body>
          {!showEditForm && <Card.Title>{props.value.body}</Card.Title>}
          {showEditForm && (
            <EditNatter id={props.value.id} original={props.value.body} />
          )}
          <Card.Text>{props.value.authorName}</Card.Text>
          <Card.Footer>Date: {props.value.dateCreated}</Card.Footer>
        </Card.Body>
        <Card.Body>
          {isOwnedByAuth && (
            <Button
              variant="danger"
              onClick={() => {
                fetch("/api/v1/natter/" + props.value.id, {
                  method: "DELETE",
                }).then(() => (window.location.href = "/"));
              }}
            >
              Delete
            </Button>
          )}
          {isOwnedByAuth && (
            <Button
              variant="primary"
              onClick={() => {
                setShowEditForm(!showEditForm);
              }}
            >
              Edit
            </Button>
          )}
        </Card.Body>
      </Card>
      <Container>
        <div>Comments:</div>
        <NewComment id={props.value.id} />
        <ul>
          {props.value.comments && props.value.comments.length ? (
            props.value.comments.map((comment) => (
              <Comment key={comment.id.id} value={comment} />
            ))
          ) : (
            <p>No Comments</p>
          )}
        </ul>
      </Container>
    </Container>
  );
};

export default NatterWithComments;
