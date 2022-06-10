import { Card } from "react-bootstrap";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

const Comment = (props) => {
  // your link creation
  const [value, setValue] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  var isOwnedByAuth = props.value.ownedByAuth;

  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const submitForm = (value) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.value.id, body: value }),
    };
    fetch("/api/v1/natter/", requestOptions)
      .then((response) => response.json())
      .then((data) => window.location.href);
  };

  return (
    <Card>
      <Card.Body>
        {!showEditForm && <Card.Body>{props.value.body}</Card.Body>}
        {showEditForm && isOwnedByAuth && (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm(value);
              window.location.href = window.location.href;
            }}
            onChange={(e) => handleChange(e)}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder={props.value.body} />
              <Form.Text className="text-muted" value={value}></Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        )}
        <Card.Footer>{props.value.authorName}</Card.Footer>
        <Card.Footer>Date: {props.value.dateCreated}</Card.Footer>
      </Card.Body>
      <Card.Body>
        {isOwnedByAuth && (
          <Button
            variant="danger"
            onClick={() => {
              fetch("/api/v1/natter/" + props.value.id, {
                method: "DELETE",
              }).then(() => (window.location.href = window.location.href));
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
  );
};

export default Comment;
