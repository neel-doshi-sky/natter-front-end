import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { printDate } from "../../util/DateUtil";

const Natter = (props) => {
  const [isLiked, setIsLiked] = useState(
    props.value.userLikes ? props.value.userLikes.includes(props.userId) : false
  );

  const handleClick = () => {
    // 👇️ toggle
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

    // 👇️ or set to true
    // setIsActive(true);
  };
  return (
    <Card className="listCard">
      <Card.Body>
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: `/natter/${props.value.id.id}`,
          }}
          state={{ id: props.value.id.id, userId: props.userId }}
        >
          <Card.Title>{props.value.body}</Card.Title>
        </Link>
        <br></br>
        <Card.Text>
          <Link
            className="link-style"
            to={{
              pathname: `/userProfile/${props.value.id.authorId}`,
            }}
            state={{ id: props.value.id.authorId }}
          >
            By {props.value.authorName}
            <br></br>
          </Link>
          <br></br>
          <Card.Footer>
            <Button
              style={{
                background: "none",
                border: "none",
                padding: "0,0,0,0",
                margin: "0",
              }}
              onClick={() => {
                handleClick();
                fetch("/api/v1/natter/like/" + props.value.id.id, {
                  method: "POST",
                }).then(() => console.log("liked"));
              }}
            >
              <FontAwesomeIcon
                size="xl"
                style={{
                  color: isLiked ? "cyan" : "white",
                }}
                icon={faThumbsUp}
              />{" "}
              {props.value.likes}
            </Button>
            <Button
              style={{
                background: "none",
                border: "none",
                padding: "0,0,0,0",
                margin: "0",
              }}
            >
              <FontAwesomeIcon
                size="xl"
                style={{
                  color: "white",
                }}
                icon={faComment}
              />{" "}
              {props.value.commentCount}
            </Button>
          </Card.Footer>
        </Card.Text>
        <Card.Footer className="footer-align"></Card.Footer>
        <Card.Footer>{printDate(props.value.dateCreated)}</Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default Natter;
