import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const UserPreview = (props) => {
  return (
    <Card>
      <Card.Body>
        <Link
          className="link-style"
          to={{
            pathname: `/userProfile/${props.user.id}`,
          }}
          state={{ id: props.user.id }}
        >
          <Card.Title>
            {props.user.firstName + " " + props.user.lastName}
          </Card.Title>
        </Link>
        <Card.Text>{props.user.email}</Card.Text>
        <Card.Footer className="footer-align">
          <FontAwesomeIcon
            size="lg"
            style={{
              color: "white",
            }}
            icon={faUser}
          />{" "}
          {props.user.followers && props.user.followers > 1
            ? props.user.followers + " followers"
            : props.user.followers + " follower"}{" "}
        </Card.Footer>
        <Card.Footer className="footer-align">
          <FontAwesomeIcon
            size="lg"
            style={{
              color: "white",
            }}
            icon={faUser}
          />{" "}
          {props.user.following} following
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default UserPreview;
