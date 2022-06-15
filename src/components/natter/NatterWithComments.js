import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { Button } from "react-bootstrap";
import { useState } from "react";
import EditNatter from "./EditNatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NatterWithComments = (props) => {
  // your link creation
  const [showEditForm, setShowEditForm] = useState(false);
  var isOwnedByAuth = props.value.ownedByAuth;

  const [isLiked, setIsLiked] = useState(
    props.isLikedByUser ? props.isLikedByUser : false
  );

  const handleClick = () => {
    // 👇️ toggle
    console.log(props);
    setIsLiked((current) => !current);
    props.value.likes = !isLiked
      ? props.value.likes + 1
      : props.value.likes - 1;
    if (!isLiked) {
      props.value.userLikes.splice(
        props.value.userLikes.indexOf(props.userId),
        1
      );
    } else {
      props.value.userLikes.push(props.userId);
    }
  };

  return (
    <>
      {props.userId && props.value && (
        <Container>
          <Card>
            <Card.Body>
              {!showEditForm && <Card.Title>{props.value.body}</Card.Title>}
              {showEditForm && (
                <EditNatter id={props.value.id} original={props.value.body} />
              )}
              <Link
                className="link-style"
                to={{
                  pathname: `/userProfile/${props.value.authorId}`,
                }}
                state={{ id: props.value.authorId }}
              >
                By {props.value.authorName}
              </Link>
              <Card.Footer>
                Date:{" "}
                {props.value.dateCreated
                  ? Date(props.value.dateCreated)
                  : props.value.dateCreated}
              </Card.Footer>
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
          <Card.Footer>
            <Button
              style={{ background: "none", border: "none" }}
              onClick={() => {
                handleClick();
                fetch("/api/v1/natter/like/" + props.value.id, {
                  method: "POST",
                });
              }}
            >
              <FontAwesomeIcon
                size="lg"
                style={{
                  color: isLiked ? "cyan" : "white",
                }}
                icon={faThumbsUp}
              />{" "}
              {props.value.likes}
            </Button>
          </Card.Footer>
          <Container>
            <div>
              <FontAwesomeIcon
                size="lg"
                style={{
                  color: "white",
                }}
                icon={faComment}
              />{" "}
              Comments:
            </div>
            <NewComment id={props.value.id} />
            <ul>
              {props.value.comments && props.value.comments.length ? (
                props.value.comments.map((comment) => (
                  <Comment key={comment.id} value={comment} />
                ))
              ) : (
                <p>No Comments</p>
              )}
            </ul>
          </Container>
        </Container>
      )}
    </>
  );
};

export default NatterWithComments;
