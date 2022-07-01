import { Card, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const UserPreview = (props) => {
  return (
    <Card>
      <Card.Body>
        <Row>
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
        </Row>
        <Row>
          {props.following && (
            <>
              <div className="mb-2">
                <br></br>
                <Button
                  onClick={() => {
                    fetch("/api/v1/user/unfollow/" + props.user.id, {
                      method: "POST",
                    }).then(
                      () => (window.location.href = window.location.href)
                    );
                  }}
                  variant="outline-danger"
                >
                  Unfollow
                </Button>
              </div>
            </>
          )}
          {/* {!user.responseObject.loggedInUser &&
                user.responseObject.userIsAFollower && (
                  <Card.Body className="text-muted">
                    {user.responseObject.firstName + " follows you!"}
                  </Card.Body>
                )} */}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserPreview;
