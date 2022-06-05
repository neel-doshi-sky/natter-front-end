import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Comment from "./Comment";
import NewComment from "./NewComment";
import CommentList from "./CommentList";

const NatterWithComments = (props) => {
  // your link creation
  console.log(props);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>{props.value.body}</Card.Title>
          <Card.Text>{props.value.authorName}</Card.Text>
          <Card.Footer>Date: {props.value.dateCreated}</Card.Footer>
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
