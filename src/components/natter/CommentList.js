import { Container } from "react-bootstrap";
import NewComment from "./Natter";
import Comment from "./Comment";

const CommentList = (props) => {
  return (
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
  );
};

export default CommentList;
